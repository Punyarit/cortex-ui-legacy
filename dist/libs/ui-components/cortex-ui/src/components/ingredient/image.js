import { __decorate, __metadata } from "tslib";
import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
let Image = class Image extends LitElement {
    constructor() {
        super(...arguments);
        this.draggable = true;
        this.loading = 'eager';
        this.isUrl = (srcToCheck) => {
            const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
            const regex = new RegExp(expression);
            return srcToCheck.match(regex);
        };
    }
    render() {
        return html `
      <style>
        :host {
          width: ${this.width};
          height: ${this.height};
        }
      </style>
      <img
        loading="${this.loading}"
        draggable="${this.draggable}"
        width="${this.width}"
        height="${this.height}"
        src="${this.image?.default ?? this.image}"
        alt="${this.alt ?? this.src?.replace(/-/g, ' ')}"
      />
    `;
    }
    async connectedCallback() {
        super.connectedCallback();
        if (this.src) {
            this.requestUpdate();
        }
    }
    async updated() {
        if (this.isUrl(this.src ?? '') || this.isBase64(this.src ?? '')) {
            this.image = this.src;
        }
        else {
            this.image = (await import(`../../../../../../../src/assets/images/${this.src}.png`));
        }
        if (this.image) {
            this.dispatchEvent(new CustomEvent('loaded', {
                detail: {
                    description: 'Image is loaded',
                },
                bubbles: true,
            }));
        }
    }
    isBase64(src) {
        const base64Regex = /^data:image\/(png|jpeg|gif);base64,/;
        return base64Regex.test(src);
    }
};
Image.styles = css `
    :host {
      display: inline-flex;
    }
  `;
__decorate([
    state(),
    __metadata("design:type", Object)
], Image.prototype, "image", void 0);
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Object)
], Image.prototype, "draggable", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Image.prototype, "src", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Image.prototype, "width", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Image.prototype, "height", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Image.prototype, "alt", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Image.prototype, "loading", void 0);
Image = __decorate([
    customElement('c-image')
], Image);
export { Image };
//# sourceMappingURL=image.js.map