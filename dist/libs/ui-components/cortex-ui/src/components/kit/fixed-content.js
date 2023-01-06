import { __decorate, __metadata } from "tslib";
import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
let FixedContent = class FixedContent extends LitElement {
    constructor() {
        super(...arguments);
        this.bgContent = '--bg-content';
        this.hideBg = false;
        this.hideShadow = false;
        this.stickyTop = false;
        this.hasScroll = false;
        this.hideScroll = false;
        this.columnGap = '0';
        this.rowGap = '0';
        this.justifyContent = 'flex-start';
        this.alignItems = 'flex-start';
    }
    render() {
        return html `
      <style>
        :host {
          width: 100%;
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
          box-shadow: ${this.hideShadow ? 'none' : '0 4px 16px rgba(102, 111, 159, 0.08)'};
          border-radius: ${this.hideBg ? 'inherit' : '16px'};
          padding: ${this.hasScroll ? '0 20px 18px 0' : '18px 20px'};
          position: relative;
          justify-content: ${this.justifyContent};
          align-items: ${this.alignItems};
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
        if (this.alignLayout) {
            const contentWrapper = this.shadowRoot?.querySelector('.content-wrapper');
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
            const contentWrapper = this.shadowRoot?.querySelector('.content-wrapper');
            const clientTop = contentWrapper.getBoundingClientRect().top;
            contentWrapper.classList.add('content-scroll');
            contentWrapper.style.maxHeight = `calc(100vh - ${clientTop + 36}px)`;
        }
    }
};
FixedContent.styles = css `
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
  `;
__decorate([
    property(),
    __metadata("design:type", Object)
], FixedContent.prototype, "bgContent", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], FixedContent.prototype, "hideBg", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], FixedContent.prototype, "hideShadow", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], FixedContent.prototype, "stickyTop", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], FixedContent.prototype, "hasScroll", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], FixedContent.prototype, "hideScroll", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], FixedContent.prototype, "alignLayout", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], FixedContent.prototype, "columnGap", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], FixedContent.prototype, "rowGap", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FixedContent.prototype, "justifyContent", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FixedContent.prototype, "alignItems", void 0);
FixedContent = __decorate([
    customElement('c-fixed-content')
], FixedContent);
export { FixedContent };
//# sourceMappingURL=fixed-content.js.map