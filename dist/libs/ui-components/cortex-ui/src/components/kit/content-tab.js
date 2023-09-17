import { __decorate, __metadata } from "tslib";
/* eslint-disable */
import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { getParamsObject, getParamsString, setBrowserTabName, timeout } from '../../helper/helper';
import '../kit/content';
let ContentTab = class ContentTab extends LitElement {
    constructor() {
        super(...arguments);
        this.tabs = [];
        this.isAppendPath = true;
        this.filteredElement = [];
        this.paddingTab = '0';
        this.updatePathState = true;
        this.sortTab = false;
        this.query = 'path';
        this.tabMoreSpace = 150;
        // prop tabMoreSpace ไว้สำหรับปรับแต่งให้การแสดง tab more แสดงผลได้ถูกต้อง
        // โดย tabMoreSpace คือค่าสำหรับคำนวนพื้นที่เหลืออยู่ของด้านขวาสุดชงแถบ Tab
        this.rendering = 'every-content';
        this.changeBrowserTitle = true;
        this.tabUpdate = 'every-time';
        this.tabDataOnce = [];
        this.setTabMore = () => {
            const lastTab = this._contentTapWrapper?.lastElementChild;
            const dropdownTabMore = this.shadowRoot?.querySelector('.dropdown-tab-more');
            const spacing = dropdownTabMore ? this.tabMoreSpace : 1;
            if (this._contentTapWrapper?.getBoundingClientRect().right - spacing <= lastTab?.getBoundingClientRect().right) {
                this.lastTabRightStamp = lastTab.getBoundingClientRect().right;
                this.filteredElement.unshift(lastTab);
                if (dropdownTabMore) {
                    dropdownTabMore.style.transform = `translateX(${lastTab.offsetLeft}px)`;
                    if (this.filteredElement.some(div => div.id === this.path)) {
                        this.sliderLeft = lastTab.offsetLeft + 12 + 'px';
                        this.sliderWidth = dropdownTabMore.getBoundingClientRect().width - 24 + 'px';
                    }
                    else {
                        this.setSlider(this.path);
                    }
                }
                this._contentTapWrapper?.removeChild(lastTab);
                this.requestUpdate();
            }
            else if (this.filteredElement.length > 0 &&
                this._contentTapWrapper?.getBoundingClientRect().right - spacing >= this.lastTabRightStamp) {
                this._contentTapWrapper?.appendChild(this.filteredElement[0]);
                this.filteredElement.shift();
                if (!this.filteredElement.some(div => div.id === this.path)) {
                    this.setSlider(this.path);
                }
                this.requestUpdate();
            }
        };
    }
    render() {
        return html `
      <style>
        :host {
          --slider-width: ${this.sliderWidth};
          --slider-left: ${this.sliderLeft};
          --padding-tab: ${this.paddingTab};
          --border-radius: ${this.borderRadius};
        }
      </style>
      <div class="content-tab-outside">
        <div class="content-tab-wrapper">
          ${(this.tabUpdate === 'every-time' ? this.tabs : this.tabDataOnce).map(tab => html `
                <div
                  id="${tab.path}"
                  class="tab-wrapper ${this.path === tab.path ? 'hightlight' : ''}"
                  @click="${() => (tab?.disabled ? undefined : this.changeTab(tab.path))}"
                >
                  <div class="tab-text">${tab.text}</div>
                </div>
              `)}
        </div>
        <div class="slider"></div>

        ${this.filteredElement.length > 0
            ? html ` <c-dropdown class="dropdown-tab-more">
              <div class="tab-wrapper-more">More <c-icon size="12" icon="chevron-down"></c-icon></div>
              <div slot="dropdown" class="dropdown-list">${this.filteredElement.map(res => html ` ${res} `)}</div>
            </c-dropdown>`
            : undefined}
      </div>
      <div class="current-content-wrapper">
        <slot name="${this.currentContent?.path}"></slot>
      </div>
    `;
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('resize', this.setTabMore);
    }
    firstUpdated() {
        if (this.sortTab) {
            // FIXME: typing
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.tabs.sort((a, b) => a?.index - b?.index);
        }
        this.onDispatchEvent('getTabValue', {
            value: this.currentContent,
        });
        window.addEventListener('resize', this.setTabMore);
        this.onDispatchEvent('changeTab', {
            changeTab: this.changeTab.bind(this),
        });
    }
    updated(changedProperties) {
        if (this.tabUpdate === 'once' && this.tabDataOnce.length === 0) {
            this.tabDataOnce = JSON.parse(JSON.stringify(this.tabs));
        }
        timeout(0).then(() => {
            this.setTabMore();
        });
        if (changedProperties?.has(`tabs`)) {
            let currPath = null;
            if (this.query === 'path') {
                const path = location.pathname.split('/');
                currPath = path[path.length - 1];
            }
            else if (this.query === 'param') {
                const params = new URLSearchParams(location.search);
                const getParam = params.get('tab');
                if (getParam) {
                    currPath = getParam;
                }
                else {
                    this.queryParamTab(this.tabs?.[0].path);
                }
            }
            this.setCurrentContent(currPath);
            this.setSlider(this.path);
            this.onDispatchEvent('getTabValue', {
                value: this.currentContent,
            });
            this.onDispatchEvent('changeTab', {
                changeTab: this.changeTab.bind(this),
            });
            if (this.rendering === 'current-content') {
                this.renderCurrentContent();
            }
        }
    }
    renderCurrentContent() {
        if (!this.element) {
            const element = {};
            this.childNodes.forEach(tab => {
                element[tab.slot] = tab;
            });
            this.element = element;
        }
        else {
            this.innerHTML = ``;
            this.append(this.element[this.currentContent.path]);
        }
    }
    setSlider(currPath) {
        const tabTextElement = currPath ? this.shadowRoot?.querySelector(`#${currPath}`) : null;
        if (tabTextElement) {
            const tabTextElementRect = tabTextElement?.getBoundingClientRect();
            const dropdownTabMore = this.shadowRoot?.querySelector('.dropdown-tab-more');
            let sliderSize;
            if (this.filteredElement.some(div => div.id === currPath)) {
                sliderSize = dropdownTabMore.getBoundingClientRect().width;
            }
            else {
                sliderSize = tabTextElementRect.width;
            }
            // 24 from padding between tab (12*2)
            this.sliderWidth = sliderSize - 24 + 'px';
            // 12 from padding value
            this.sliderLeft = tabTextElementRect.left - this._contentTapWrapper?.getBoundingClientRect().left + 12 + 'px';
        }
    }
    changeTab(tabPath) {
        this.setSlider(tabPath);
        if (this.changeBrowserTitle) {
            setBrowserTabName(tabPath);
        }
        if (this.query === 'path') {
            this.queryPathTab(tabPath);
        }
        else if (this.query === 'param') {
            this.queryParamTab(tabPath);
        }
        this.setCurrentContent(tabPath);
        this.onDispatchEvent('getTabValue', {
            value: this.currentContent,
        });
        if (this.rendering === 'current-content') {
            this.renderCurrentContent();
        }
    }
    queryParamTab(tabPath) {
        const params = new URLSearchParams(location.search);
        const paramObj = getParamsObject(params);
        delete paramObj['tab'];
        const paramString = getParamsString(paramObj);
        const path0 = location.pathname + `?tab=${tabPath}${paramString}`;
        history.pushState(null, '', path0);
    }
    queryPathTab(tabPath) {
        const path = location.pathname.split('/');
        path[path.length - 1] = tabPath;
        const currPath = path.toString().replace(/[ ]*,[ ]*|[ ]+/g, '/');
        if (this.isAppendPath) {
            history[this.updatePathState ? `pushState` : `replaceState`](null, '', currPath);
        }
    }
    setCurrentContent(tabPath) {
        const currContent = tabPath ? this.tabs.find(tab => tab.path === tabPath) : this.tabs?.[0];
        this.path = currContent?.path;
        this.currentContent = currContent;
    }
    onDispatchEvent(event, data) {
        this.dispatchEvent(new CustomEvent(event, {
            detail: {
                ...data,
            },
            bubbles: true,
        }));
    }
};
ContentTab.styles = css `
    .tab-wrapper,
    .tab-wrapper-more {
      font-size: 16px;
      padding: 8px 12px;
      color: #a5b7da;
      cursor: pointer;
      font-weight: 600;
      transition: color 0.25s, background 0.25s;
      user-select: none;
      animation: fadeIn 0.5s ease forwards;
      border-radius: 6px;
    }

    .tab-wrapper-more {
      white-space: nowrap;
    }

    .tab-wrapper-more c-icon {
      margin-left: 14px;
    }

    .tab-wrapper:active {
      color: #0f428f !important;
    }

    .tab-wrapper:hover {
      color: #247cff;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .tab-text {
      padding: var(--padding-tab);
      white-space: nowrap;
    }

    .dropdown-tab-more {
      position: absolute;
      top: 0;
      transition: transform 0.25s ease-out;
    }

    .content-tab-outside {
      position: sticky;
      top: 0;
      z-index: 2;
      background: white;
      border-bottom: 2px solid var(--gray-300);
      border-radius: var(--border-radius);
    }

    .hightlight {
      color: #247cff !important;
    }

    .content-tab-wrapper {
      display: flex;
      column-gap: 6px;
      position: relative;
    }

    .slider {
      height: 2px;
      width: var(--slider-width);
      background: #247cff;
      transition: transform 0.25s, width 0.25s;
      transform: translateX(var(--slider-left));
    }

    .dropdown-list {
      padding: 6px 0;
    }
    .dropdown-list .tab-wrapper {
      padding: 6px 12px !important;
    }

    .current-content-wrapper {
      position: relative;
      z-index: 1;
    }
  `;
__decorate([
    property({
        type: Array,
    }),
    __metadata("design:type", Array)
], ContentTab.prototype, "tabs", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], ContentTab.prototype, "currentContent", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], ContentTab.prototype, "path", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], ContentTab.prototype, "sliderWidth", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], ContentTab.prototype, "sliderLeft", void 0);
__decorate([
    query('.content-tab-wrapper'),
    __metadata("design:type", HTMLDivElement)
], ContentTab.prototype, "_contentTapWrapper", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ContentTab.prototype, "isAppendPath", void 0);
__decorate([
    property(),
    __metadata("design:type", Array)
], ContentTab.prototype, "filteredElement", void 0);
__decorate([
    state(),
    __metadata("design:type", Number)
], ContentTab.prototype, "lastTabRightStamp", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ContentTab.prototype, "paddingTab", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ContentTab.prototype, "updatePathState", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ContentTab.prototype, "sortTab", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], ContentTab.prototype, "query", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ContentTab.prototype, "tabMoreSpace", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], ContentTab.prototype, "rendering", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], ContentTab.prototype, "changeBrowserTitle", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], ContentTab.prototype, "borderRadius", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], ContentTab.prototype, "tabUpdate", void 0);
__decorate([
    property(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContentTab.prototype, "render", null);
ContentTab = __decorate([
    customElement('c-content-tab')
], ContentTab);
export { ContentTab };
//# sourceMappingURL=content-tab.js.map