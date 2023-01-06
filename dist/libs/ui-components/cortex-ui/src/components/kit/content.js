import { __decorate, __metadata } from "tslib";
import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
let Content = class Content extends LitElement {
    constructor() {
        super(...arguments);
        this.bgContent = '--bg-content';
        this.padding = '18px 20px';
        this.defaultPadding = '18px 20px';
        this.hideBg = false;
        this.hideShadow = false;
        this.stickyTop = false;
        this.hasScroll = false;
        this.hideScroll = false;
        this.columnGap = '0';
        this.rowGap = '0';
        this.justifyContent = 'flex-start';
        this.alignItems = 'flex-start';
        this.width = '100%';
        this.opacity = 1;
        this.list = false;
        this.type = 'container';
    }
    render() {
        return html `
      <style>
        :host {
          width: ${this.width};
          position: ${this.stickyTop ? 'sticky' : 'static'};
          top: 0;
          left: 0;
          z-index: ${this.stickyTop ? '999' : 'auto'};
        }
        .content-scroll {
          overflow: ${this.hideScroll ? 'hidden' : 'overlay'};
        }
        .content-wrapper {
          background: var(${this.hideBg ? '--bg' : this.bgContent});
          box-shadow: ${this.hideShadow ? 'none' : '0 4px 16px #666f9f14'};
          border-radius: ${this.hideBg ? 'inherit' : '16px'};
          padding: ${this.hasScroll ? '0 20px 18px 0' : this.padding || this.defaultPadding};
          justify-content: ${this.justifyContent};
          align-items: ${this.alignItems};
          /* width: ${this.width}; */
          border: ${this.error ? '1px solid red' : this.warning ? '1px solid #FF8C04' : '1px solid transparent'};
          opacity: ${this.opacity};
        }

        .content-align-layout {
          display: flex;
          flex-direction: column;
          column-gap: ${this.columnGap};
          row-gap: ${this.rowGap};
        }
      </style>
      <div class="content-wrapper">
        <div id="content">
          <slot></slot>
        </div>
      </div>
    `;
    }
    firstUpdated() {
        const contentWrapper = this.shadowRoot?.querySelector('.content-wrapper');
        if (this.alignLayout) {
            contentWrapper.style.display = 'flex';
            const alignLayoutSplitted = this.alignLayout.split(' ');
            this.justifyContent = alignLayoutSplitted[0];
            this.alignItems = alignLayoutSplitted[1] ? this.alignItems : alignLayoutSplitted[1];
        }
        if (this.columnGap !== '0' || this.rowGap !== '0') {
            const contentInside = this.shadowRoot?.querySelector('#content');
            contentInside.classList.add('content-align-layout');
        }
        if (this.hasScroll) {
            const clientTop = contentWrapper?.getBoundingClientRect()?.top;
            contentWrapper.classList.add('content-scroll');
            if (clientTop)
                contentWrapper.style.maxHeight = `calc(100vh - ${clientTop + 36}px)`;
        }
        if (this.type === 'list') {
            contentWrapper?.classList?.add('content-list');
        }
    }
};
Content.styles = css `
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #8ba3b8;
    }

    /* width */
    ::-webkit-scrollbar {
      width: 10px;
      height: 8px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #bbc5ce;
      border-radius: 10px;
    }
    .content-scroll {
      position: absolute;
      right: 0;
      left: 376px;
    }

    .content-wrapper {
      position: relative;
      transition: var(--theme-bg-transition);
    }

    .content-list {
      cursor: pointer;
      transition: box-shadow 0.2s, background 0.125s;
    }

    .content-list:active {
      background: whitesmoke;
    }

    .content-list:hover {
      box-shadow: 0 2px 8px rgba(42, 57, 89, 0.04), 0 16px 32px rgba(63, 82, 122, 0.12);
    }
  `;
__decorate([
    property(),
    __metadata("design:type", Object)
], Content.prototype, "bgContent", void 0);
__decorate([
    property(),
    __metadata("design:type", Boolean)
], Content.prototype, "error", void 0);
__decorate([
    property(),
    __metadata("design:type", Boolean)
], Content.prototype, "warning", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Content.prototype, "padding", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Content.prototype, "defaultPadding", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Content.prototype, "hideBg", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Content.prototype, "hideShadow", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Content.prototype, "stickyTop", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Content.prototype, "hasScroll", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Content.prototype, "hideScroll", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Content.prototype, "alignLayout", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Content.prototype, "columnGap", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Content.prototype, "rowGap", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Content.prototype, "justifyContent", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Content.prototype, "alignItems", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Content.prototype, "width", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Content.prototype, "opacity", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Content.prototype, "list", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Content.prototype, "type", void 0);
Content = __decorate([
    customElement('c-content')
], Content);
export { Content };
//# sourceMappingURL=content.js.map