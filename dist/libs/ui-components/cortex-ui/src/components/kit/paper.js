import { __decorate, __metadata } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let Paper = class Paper extends LitElement {
    constructor() {
        super(...arguments);
        this.type = 'Custom';
        this.padding = '0';
    }
    render() {
        return html `
      <style>
        :host {
          --padding: ${this.padding};
        }
      </style>
      <div class="paper-wrapper">
        <slot></slot>
      </div>
    `;
    }
    updated() {
        if (this.type) {
            const host = this.shadowRoot?.host;
            switch (this.type) {
                case 'A4':
                    host.style.setProperty('--width', '210mm');
                    // 297 will display wrong when using macOs
                    host.style.setProperty('--height', '296.5mm');
                    break;
                case 'Custom':
                    host.style.setProperty('--width', `${this.width}`);
                    // 297 will display wrong when using macOs
                    host.style.setProperty('--height', `${this.height}`);
                    break;
                default:
                    break;
            }
        }
    }
};
Paper.styles = css `
    .paper-wrapper {
      max-width: var(--width);
      min-width: var(--width);
      max-height: var(--height);
      min-height: var(--height);
      background: var(--white-1);
      padding: var(--padding);
      box-sizing: border-box;
      overflow: hidden;
      height: var(--height);
      display: flex;
      flex-flow: column;
    }

    .preview-margin {
      margin-bottom: 20px;
    }
  `;
__decorate([
    property(),
    __metadata("design:type", String)
], Paper.prototype, "type", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Paper.prototype, "padding", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Paper.prototype, "height", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Paper.prototype, "width", void 0);
Paper = __decorate([
    customElement('c-paper')
], Paper);
export { Paper };
//# sourceMappingURL=paper.js.map