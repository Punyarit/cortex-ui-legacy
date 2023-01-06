import { __decorate, __metadata } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
let Papers = class Papers extends LitElement {
    constructor() {
        super(...arguments);
        this.padding = '0';
        this.height = 'auto';
        this.width = 'auto';
        this.config = {
            pageNumber: 'NONE',
            dynamicPage: true,
        };
        this.nextPageLine = true;
        this.preview = false;
        // when c-print is preview it will provide padding top 32
        // async print will print from print preview
        this.printPreviewPaddingTop = 32;
        // this property for magic number with angular
        this.pageMargin = 0;
    }
    render() {
        return html `
      <style>
        :host {
          --padding: ${this.padding};
          --box-shadow: ${this.nextPageLine ? '0 0 2px 2px rgba(0,0,0,0.7)' : 'none'};
        }
      </style>
      <div class="outside-wrapper">
        <div class="content">
          <slot data-content name="content"></slot>
        </div>
        <div class="wrapper">
          <div data-paper class="paper-wrapper">
            <div class="header-page">
              <slot name="header"></slot>
            </div>
            <div class="footer-page">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    `;
    }
    firstUpdated() {
        this.observeDom();
    }
    observeDom() {
        const observer = new MutationObserver(() => {
            this.genaratePaper();
        });
        const config = { subtree: true, childList: true };
        observer.observe(this, config);
        return observer;
    }
    updated() {
        this.style.setProperty('--width', `${this.width}`);
        this.style.setProperty('--height', `${this.height}`);
        if (!this.config.dynamicPage || this.pageMargin !== 0) {
            this.genaratePaper();
        }
        if (this.preview) {
            this.pageMargin = 0;
        }
    }
    genaratePaper() {
        setTimeout(() => {
            let tuneValue = +this.pageMargin;
            const paperHeight = +this.height.replace('px', '');
            const header = this?.querySelector('[slot="header"]');
            const footer = this?.querySelector('[slot="footer"]');
            const rows = this.querySelectorAll('c-row');
            // add margin header margin first row
            rows[0].shadowRoot.lastElementChild.style.paddingTop = `${this.headerPageRef.offsetHeight}px`;
            let paperHeightStack = paperHeight;
            rows.forEach(cRow => {
                const rowWrapper = cRow?.shadowRoot?.lastElementChild;
                if (cRow?.offsetHeight + cRow?.offsetTop + this.printPreviewPaddingTop >
                    paperHeightStack - this.footerPageRef.offsetHeight - tuneValue) {
                    // add margin to row
                    rowWrapper.style.paddingTop = `${paperHeightStack -
                        (cRow?.offsetTop - this.printPreviewPaddingTop) +
                        this.headerPageRef.offsetHeight -
                        tuneValue}px`;
                    tuneValue += +this.pageMargin;
                    // this condition is for avoiding creating empty paper
                    const wrapper = this.shadowRoot?.querySelector('.wrapper');
                    if (wrapper?.offsetHeight < cRow?.offsetHeight + cRow?.offsetTop) {
                        // create paper
                        const newHeader = header?.cloneNode(true);
                        const newFooter = footer?.cloneNode(true);
                        newHeader?.classList?.add('header-page');
                        newFooter?.classList?.add('footer-page');
                        const newPaper = this.paperRef?.cloneNode();
                        newPaper.appendChild(newHeader);
                        newPaper.appendChild(newFooter);
                        this.wrapperRef?.appendChild(newPaper);
                    }
                    // stack
                    paperHeightStack += paperHeight;
                }
            });
        }, 0);
    }
};
Papers.styles = css `
    .paper-wrapper {
      max-width: var(--width);
      min-width: var(--width);
      max-height: var(--height);
      min-height: var(--height);
      background: var(--white-1);
      box-sizing: border-box;
      overflow: hidden;
      height: var(--height);
      display: flex;
      flex-flow: column;
      position: relative;
      box-shadow: var(--box-shadow);
    }

    .header-page {
      position: absolute;
      top: 0;
    }

    .footer-page {
      position: absolute;
      bottom: 0;
    }

    .outside-wrapper {
      position: relative;
    }

    .wrapper {
      margin-bottom: 32px;
    }

    .content {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100000;
    }
  `;
__decorate([
    property(),
    __metadata("design:type", Object)
], Papers.prototype, "padding", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Papers.prototype, "height", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Papers.prototype, "width", void 0);
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Object)
], Papers.prototype, "config", void 0);
__decorate([
    query('[data-paper]'),
    __metadata("design:type", HTMLDivElement)
], Papers.prototype, "paperRef", void 0);
__decorate([
    query('.wrapper'),
    __metadata("design:type", HTMLDivElement)
], Papers.prototype, "wrapperRef", void 0);
__decorate([
    query('.header-page'),
    __metadata("design:type", HTMLDivElement)
], Papers.prototype, "headerPageRef", void 0);
__decorate([
    query('.footer-page'),
    __metadata("design:type", HTMLDivElement)
], Papers.prototype, "footerPageRef", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Papers.prototype, "nextPageLine", void 0);
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Object)
], Papers.prototype, "preview", void 0);
__decorate([
    property({
        type: Number,
    }),
    __metadata("design:type", Object)
], Papers.prototype, "pageMargin", void 0);
Papers = __decorate([
    customElement('c-papers')
], Papers);
export { Papers };
//# sourceMappingURL=papers.js.map