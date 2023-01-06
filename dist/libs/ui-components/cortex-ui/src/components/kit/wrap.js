// this component use for development not for production
import { __decorate, __metadata } from "tslib";
import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let Wrap = class Wrap extends LitElement {
    constructor() {
        super(...arguments);
        this.mt = 0;
        this.mb = 0;
        this.ml = 0;
        this.mr = 0;
        this.mx = 0;
        this.my = 0;
        this.pt = 0;
        this.pb = 0;
        this.pl = 0;
        this.pr = 0;
        this.px = 0;
        this.py = 0;
        this.styles = '';
        this.type = 'default';
        this.d = 'block';
        this.justify = 'flex-start';
        this.aligns = 'flex-start';
        this.colGap = 0;
        this.rowGap = 0;
        this.colGrid = 0;
        this.rowGrid = 'none';
        this.layout = 'row';
        this.wrap = 'nowrap';
        this.opacity = 1;
        this.w = 'auto';
        this.minW = 'auto';
        this.maxW = 'auto';
        this.h = 'auto';
        this.minH = 'auto';
        this.maxH = 'auto';
        this.bg = 'transparent';
    }
    render() {
        return html `
      <style>
        :host {
          --bg: ${this.bg};
          --w: ${this.w};
          --minW: ${this.minW};
          --maxW: ${this.maxW};
          --h: ${this.h};
          --minH: ${this.minH};
          --maxH: ${this.maxH};
          width: ${this.type === 'fluid' ? '100%' : this.w};
          height: ${this.h};
        }
        /* c-wrap is a component focused on helping to mange layout / spacing not use for style bg color shadow etc. */
        .wrapper {
          margin: ${this.my || this.mt} ${this.mx || this.mr} ${this.my || this.mb} ${this.mx || this.ml};
          padding: ${this.py || this.pt} ${this.px || this.pr} ${this.py || this.pb} ${this.px || this.pl};
          display: ${this.d};
          column-gap: ${this.colGap};
          row-gap: ${this.rowGap};
          grid-template-columns: ${this.colGrid};
          grid-template-rows: ${this.rowGrid};
          justify-content: ${this.justify};
          align-items: ${this.aligns};
          flex-direction: ${this.layout};
          flex-wrap: ${this.wrap};
          opacity: ${this.opacity};
        }
      </style>
      <div class="wrapper ${this.type}" style="${this.styles}">
        <slot></slot>
      </div>
    `;
    }
};
Wrap.styles = css `
    .wrapper {
      box-sizing: border-box;
      transition: box-shadow 0.45s;
      width: var(--w);
      min-width: var(--minW);
      max-width: var(--maxW);
      height: var(--h);
      min-height: var(--minH);
      max-height: var(--maxH);
      background: var(--bg);
    }

    .default {
      position: relative;
    }

    .fluid {
      position: relative;
      width: 100%;
    }
  `;
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "mt", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "mb", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "ml", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "mr", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "mx", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "my", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "pt", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "pb", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "pl", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "pr", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "px", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "py", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "styles", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Wrap.prototype, "type", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Wrap.prototype, "d", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "justify", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "aligns", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "colGap", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "rowGap", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "colGrid", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "rowGrid", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Wrap.prototype, "layout", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "wrap", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "opacity", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "w", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "minW", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "maxW", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "h", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "minH", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "maxH", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Wrap.prototype, "bg", void 0);
Wrap = __decorate([
    customElement('c-wrap')
], Wrap);
export { Wrap };
//# sourceMappingURL=wrap.js.map