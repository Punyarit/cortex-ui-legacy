import { __decorate, __metadata } from "tslib";
import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let Divider = class Divider extends LitElement {
    constructor() {
        super(...arguments);
        this.gap = '12px';
        this.size = '1px';
        this.color = 'var(--bg-divider)';
    }
    render() {
        return html `
      <style>
        :host {
          --background-color: ${this.color};
        }
      </style>
      <div class="divider" style="margin: ${this.gap} 0; height: ${this.size}"></div>
    `;
    }
};
Divider.styles = css `
    .divider {
      border: none;
      width: 100%;
      transition: var(--theme-bg-transition);
      background-color: var(--background-color);
    }
  `;
__decorate([
    property(),
    __metadata("design:type", Object)
], Divider.prototype, "gap", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Divider.prototype, "size", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Divider.prototype, "color", void 0);
Divider = __decorate([
    customElement('c-divider')
], Divider);
export { Divider };
//# sourceMappingURL=divider.js.map