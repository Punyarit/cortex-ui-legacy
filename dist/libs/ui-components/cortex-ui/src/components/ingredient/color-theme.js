import { __decorate, __metadata } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let ColorTheme = class ColorTheme extends LitElement {
    constructor() {
        super(...arguments);
        this.width = '180px';
        this.height = '180px';
        this.palette = [];
    }
    render() {
        const [hightlight, neutral, base] = this.palette;
        return html `
      <style>
        :host {
          --width: ${this.width};
          --height: ${this.height};
        }
      </style>
      <div class="color-theme-wrapper">
        <div class="color-display" style="background:${neutral}"></div>
        <div class="color-split-wrapper">
          <div class="color-display" style="background:${hightlight}"></div>
          <div class="color-display" style="background:${base}"></div>
        </div>
      </div>
    `;
    }
};
ColorTheme.styles = css `
    .color-theme-wrapper {
      border-radius: 50%;
      width: var(--width);
      height: var(--height);
      overflow: hidden;
    }

    .color-display {
      width: 100%;
      height: 90px;
    }

    .color-split-wrapper {
      display: flex;
    }
  `;
__decorate([
    property(),
    __metadata("design:type", Object)
], ColorTheme.prototype, "width", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ColorTheme.prototype, "height", void 0);
__decorate([
    property({
        type: Array,
    }),
    __metadata("design:type", Array)
], ColorTheme.prototype, "palette", void 0);
ColorTheme = __decorate([
    customElement('c-color-theme')
], ColorTheme);
export { ColorTheme };
//# sourceMappingURL=color-theme.js.map