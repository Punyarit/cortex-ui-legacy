import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { getParamsObject, getParamsString, setBrowserTabName, timeout } from '../../helper/helper';
import '../kit/content';

interface Tab {
  path: string;
  text: string;
  value?: string;
  index?: number;
  disabled?: boolean;
}

@customElement('c-content-tab')
export class ContentTab extends LitElement {
  static styles = css`
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

  @property({
    type: Array,
  })
  tabs: Tab[] = [];

  @state()
  currentContent!: Tab | undefined;

  @state()
  path!: string | undefined;

  @state()
  sliderWidth!: string;

  @state()
  sliderLeft!: string;

  @query('.content-tab-wrapper')
  _contentTapWrapper!: HTMLDivElement;

  @property()
  isAppendPath = true;

  @property()
  filteredElement: HTMLDivElement[] = [];

  @state()
  lastTabRightStamp!: number;

  @property()
  paddingTab = '0';

  @property()
  updatePathState = true;

  @property()
  sortTab = false;

  @property()
  query: 'param' | 'path' | 'none' = 'path';

  @property()
  tabMoreSpace = 150;
  // prop tabMoreSpace ไว้สำหรับปรับแต่งให้การแสดง tab more แสดงผลได้ถูกต้อง
  // โดย tabMoreSpace คือค่าสำหรับคำนวนพื้นที่เหลืออยู่ของด้านขวาสุดชงแถบ Tab

  @property()
  rendering: 'every-content' | 'current-content' = 'every-content';

  @property({ type: Object })
  changeBrowserTitle = true;

  @property()
  borderRadius?: string;

  @property({ type: String })
  tabUpdate: 'every-time' | 'once' = 'every-time';

  private element!: Record<string, HTMLDivElement>;

  private tabDataOnce: Tab[] = [];

  @property()
  render() {
    return html`
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
          ${(this.tabUpdate === 'every-time' ? this.tabs : this.tabDataOnce).map(
            (tab) =>
              html`
                <div
                  id="${tab.path}"
                  class="tab-wrapper ${this.path === tab.path ? 'hightlight' : ''}"
                  @click="${() => (tab?.disabled ? undefined : this.changeTab(tab.path))}">
                  <div class="tab-text">${tab.text}</div>
                </div>
              `
          )}
        </div>
        <div class="slider"></div>

        ${this.filteredElement.length > 0
          ? html` <c-dropdown class="dropdown-tab-more">
              <div class="tab-wrapper-more">
                More <c-icon size="12" icon="chevron-down"></c-icon>
              </div>
              <div slot="dropdown" class="dropdown-list">
                ${this.filteredElement.map((res) => html` ${res} `)}
              </div>
            </c-dropdown>`
          : undefined}
      </div>
      <div class="current-content-wrapper">
        <slot name="${this.currentContent?.path}"></slot>
      </div>
    `;
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

    window.addEventListener('resize', () => {
      this.setTabMore();
    });

    this.onDispatchEvent('changeTab', {
      changeTab: this.changeTab.bind(this),
    });
  }

  updated(changedProperties: { has: (state: string) => boolean }) {
    if (this.tabUpdate === 'once' && this.tabDataOnce.length === 0) {
      this.tabDataOnce = JSON.parse(JSON.stringify(this.tabs));
    }

    timeout(0).then(() => {
      this.setTabMore();
    });

    if (changedProperties?.has(`tabs`)) {
      let currPath: string | null = null;

      if (this.query === 'path') {
        const path = location.pathname.split('/');
        currPath = path[path.length - 1];
      } else if (this.query === 'param') {
        const params = new URLSearchParams(location.search);
        const getParam: string | null = params.get('tab');
        if (getParam) {
          currPath = getParam;
        } else {
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
      const element = {} as Record<string, HTMLDivElement>;
      (this.childNodes as NodeListOf<HTMLDivElement>).forEach((tab) => {
        element[tab.slot] = tab;
      });
      this.element = element;
    } else {
      this.innerHTML = ``;
      this.append(this.element![this!.currentContent!.path as string]);
    }
  }

  setSlider(currPath?: string) {
    const tabTextElement = currPath ? this.shadowRoot?.querySelector(`#${currPath}`) : null;

    if (tabTextElement) {
      const tabTextElementRect = tabTextElement?.getBoundingClientRect();
      const dropdownTabMore = this.shadowRoot?.querySelector('.dropdown-tab-more') as HTMLElement;
      let sliderSize: number;
      if (this.filteredElement.some((div) => div.id === currPath)) {
        sliderSize = dropdownTabMore.getBoundingClientRect().width;
      } else {
        sliderSize = tabTextElementRect.width;
      }
      // 24 from padding between tab (12*2)
      this.sliderWidth = sliderSize - 24 + 'px';
      // 12 from padding value
      this.sliderLeft =
        tabTextElementRect.left - this._contentTapWrapper?.getBoundingClientRect().left + 12 + 'px';
    }
  }

  changeTab(tabPath: string) {
    this.setSlider(tabPath);
    if (this.changeBrowserTitle) {
      setBrowserTabName(tabPath);
    }

    if (this.query === 'path') {
      this.queryPathTab(tabPath);
    } else if (this.query === 'param') {
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

  queryParamTab(tabPath: string) {
    const params = new URLSearchParams(location.search);
    const paramObj = getParamsObject(params);
    delete paramObj['tab'];
    const paramString = getParamsString(paramObj);
    const path0 = location.pathname + `?tab=${tabPath}${paramString}`;
    history.pushState(null, '', path0);
  }

  queryPathTab(tabPath: string) {
    const path = location.pathname.split('/');
    path[path.length - 1] = tabPath;
    const currPath = path.toString().replace(/[ ]*,[ ]*|[ ]+/g, '/');

    if (this.isAppendPath) {
      history[this.updatePathState ? `pushState` : `replaceState`](null, '', currPath);
    }
  }

  setCurrentContent(tabPath: string | null) {
    const currContent = tabPath ? this.tabs.find((tab) => tab.path === tabPath) : this.tabs?.[0];
    this.path = currContent?.path;
    this.currentContent = currContent;
  }

  setTabMore() {
    const lastTab = this._contentTapWrapper?.lastElementChild as HTMLDivElement;
    const dropdownTabMore = this.shadowRoot?.querySelector('.dropdown-tab-more') as HTMLElement;
    const spacing = dropdownTabMore ? this.tabMoreSpace : 1;

    if (
      this._contentTapWrapper?.getBoundingClientRect().right - spacing <=
      lastTab?.getBoundingClientRect().right
    ) {
      this.lastTabRightStamp = lastTab.getBoundingClientRect().right;
      this.filteredElement.unshift(lastTab);

      if (dropdownTabMore) {
        dropdownTabMore.style.transform = `translateX(${lastTab.offsetLeft}px)`;
        if (this.filteredElement.some((div) => div.id === this.path)) {
          this.sliderLeft = lastTab.offsetLeft + 12 + 'px';
          this.sliderWidth = dropdownTabMore.getBoundingClientRect().width - 24 + 'px';
        } else {
          this.setSlider(this.path);
        }
      }
      this._contentTapWrapper?.removeChild(lastTab);
      this.requestUpdate();
    } else if (
      this.filteredElement.length > 0 &&
      this._contentTapWrapper?.getBoundingClientRect().right - spacing >= this.lastTabRightStamp
    ) {
      this._contentTapWrapper?.appendChild(this.filteredElement[0]);
      this.filteredElement.shift();
      if (!this.filteredElement.some((div) => div.id === this.path)) {
        this.setSlider(this.path);
      }
      this.requestUpdate();
    }
  }

  onDispatchEvent(event: string, data?: Record<string, unknown>): void {
    this.dispatchEvent(
      new CustomEvent(event, {
        detail: {
          ...data,
        },
        bubbles: true,
      })
    );
  }
}
