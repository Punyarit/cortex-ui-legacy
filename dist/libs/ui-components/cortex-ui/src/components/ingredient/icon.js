import { __decorate, __metadata } from "tslib";
import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let Icon = class Icon extends LitElement {
    constructor() {
        super(...arguments);
        this.icon = '';
        this.size = '18';
        this.color = 'inherit';
        this.weight = '400';
        this.background = 'transparent';
        this.transition = '0';
        this.rounded = false;
    }
    render() {
        return html `
      <style>
        :host {
          display: inline-flex;
          --fontFamily: 'fontello-${this.icon}';
          --fontSizr: ${this.size}px;
          --fontWeight: ${this.weight};
          --color: ${this.activeColor ? this.activeColor : this.color ? this.color : 'var(--cl-icon)'};
          --background: ${this.background};
          --borderRadius: ${this.rounded ? '50%' : 0};
          --transition: ${this.transition};
        }
      </style>
      <span class="icon-wrapper">
        <slot></slot>
        &#xe800;
      </span>
    `;
    }
};
Icon.styles = css `
    .icon-wrapper {
      display: inline-grid;
      place-items: center;
      font-family: var(--fontFamily);
      font-size: var(--fontSizr);
      font-weight: var(--fontWeight);
      color: var(--color);
      background: var(--background);
      border-radius: var(--borderRadius);
      transition: var(--transition);
    }
  `;
__decorate([
    property(),
    __metadata("design:type", Object)
], Icon.prototype, "icon", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Icon.prototype, "size", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Icon.prototype, "color", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Icon.prototype, "weight", void 0);
__decorate([
    property(),
    __metadata("design:type", Boolean)
], Icon.prototype, "hover", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Icon.prototype, "activeColor", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Icon.prototype, "background", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Icon.prototype, "transition", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Icon.prototype, "rounded", void 0);
Icon = __decorate([
    customElement('c-icon')
], Icon);
export { Icon };
//# sourceMappingURL=icon.js.map