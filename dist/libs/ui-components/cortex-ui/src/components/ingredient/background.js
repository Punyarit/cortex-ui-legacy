import { __decorate, __metadata } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let Background = class Background extends LitElement {
    constructor() {
        super(...arguments);
        this.width = '100%';
        this.height = '100%';
        this.drag = false;
        this.repeat = 'no-repeat';
        this.size = 'cover';
        this.positionX = 'left';
        this.positionY = 'top';
        this.origin = 'padding-box';
        this.clip = 'border-box';
        this.attachment = 'scroll';
    }
    render() {
        return html `
      <style>
        :host {
          --img-url: url(${this.src});
          --repeat: ${this.repeat};
          --size: ${this.size};
          --width: ${this.width};
          --height: ${this.height};
          --positionX: ${this.positionX};
          --positionY: ${this.positionY};
          --origin: ${this.origin};
          --clip: ${this.clip};
          --attachment: ${this.attachment};
        }
      </style>
      <div class="bg">
        <slot></slot>
      </div>
    `;
    }
    async firstUpdated() {
        const image = (await import(`../../../../../../../src/assets/images/${this.src}.png`)).default;
        this.src = image;
    }
};
Background.styles = css `
    :host {
      width: 100%;
      height: 100%;
    }
    .bg {
      height: var(--height);
      width: var(--width);
      background: var(--img-url);
      background-repeat: var(--repeat);
      background-size: var(--size);
      background-position-x: var(--positionX);
      background-position-y: var(--positionY);
      background-origin: var(--origin);
      background-clip: var(--clip);
      background-attachment: var(--attachment);
    }
  `;
__decorate([
    property(),
    __metadata("design:type", String)
], Background.prototype, "src", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Background.prototype, "width", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Background.prototype, "height", void 0);
__decorate([
    property({
        type: Boolean,
    }),
    __metadata("design:type", Object)
], Background.prototype, "drag", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Background.prototype, "repeat", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Background.prototype, "size", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Background.prototype, "positionX", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Background.prototype, "positionY", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Background.prototype, "origin", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Background.prototype, "clip", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Background.prototype, "attachment", void 0);
Background = __decorate([
    customElement('c-background')
], Background);
export { Background };
//# sourceMappingURL=background.js.map