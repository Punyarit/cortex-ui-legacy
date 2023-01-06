import { __decorate, __metadata } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let Section = class Section extends LitElement {
    constructor() {
        super(...arguments);
        this.bg = 'black';
        this.gap = '18px';
        this.count = false;
        this.padding = '0 24px 24px 24px';
    }
    render() {
        return html `
      <style>
        :host {
          --background: ${this.bg};
          --row-gap: ${this.gap};
          --padding: ${this.p ? '24px' : this.padding};
          width: 100%;
        }
      </style>

      ${this.p ? html `<div class="topic-wrapper">${this.p}</div>` : undefined}

      <div class="row-wrapper" aria-label="$1">
        <slot></slot>
      </div>
    `;
    }
    firstUpdated() {
        if (this.count) {
            const cRows = this.shadowRoot?.host.querySelectorAll('c-row');
            cRows.forEach((ele, i) => {
                ele.ariaLabel = `${i + 1}`;
            });
        }
    }
};
Section.styles = css `
    .topic-wrapper {
      background: var(--background);
      padding: 8px 24px;
      width: 100%;
      font-weight: 600px;
      color: var(--white-1);
      border-radius: 4px;
      box-sizing: border-box;
    }

    .row-wrapper {
      padding: var(--padding);
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      row-gap: var(--row-gap);
    }
  `;
__decorate([
    property(),
    __metadata("design:type", String)
], Section.prototype, "p", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Section.prototype, "bg", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Section.prototype, "gap", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Section.prototype, "count", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Section.prototype, "padding", void 0);
Section = __decorate([
    customElement('c-section')
], Section);
export { Section };
//# sourceMappingURL=section.js.map