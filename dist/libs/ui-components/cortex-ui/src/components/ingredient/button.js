import { __decorate, __metadata } from "tslib";
import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './icon';
let Button = class Button extends LitElement {
    constructor() {
        super(...arguments);
        this.fullwidth = false;
        this.disable = false;
        this.padding = '0 12px';
        this.radius = '8px';
    }
    render() {
        return html `
      <style>
        :host {
          pointer-events: ${this.disable ? 'none' : 'auto'};
          --radius: ${this.radius};
        }
        .button-content-wrapper {
          padding: ${this.padding};
        }
      </style>
      <mwc-button raised ?disabled="${this.disable}" class="button-wrapper ${this.type}" ?fullwidth="${this.fullwidth}">
        <div class="button-content-wrapper">
          <div ?hidden="${this.type !== 'icon'}" class="button-icon-wrapper">
            <slot name="icon-button"></slot>
          </div>
          <span
            ?hidden="${this.type === 'icon'}"
            class="button-content"
            style="${this.buttonTextColor ? `color: ${this.buttonTextColor}` : ''}"
          >
            <slot></slot>
          </span>
        </div>
      </mwc-button>
    `;
    }
    async updated() {
        const mwcButtonBase = this.shadowRoot?.querySelector('mwc-button');
        if (await mwcButtonBase?.updateComplete) {
            const mwcButton = mwcButtonBase?.shadowRoot?.querySelector('button');
            if (mwcButton) {
                if (mwcButton?.disabled) {
                    switch (this.type) {
                        case 'soft':
                            mwcButton.style.backgroundColor = '#F5F8FF';
                            mwcButton.style.color = '#C9D4F1';
                            break;
                        case 'gray':
                            mwcButton.style.backgroundColor = `#F8F9FC`;
                            mwcButton.style.color = `#DADBE0`;
                            break;
                        case 'flat':
                            mwcButton.style.opacity = '0.5';
                            break;
                        default:
                            mwcButton.style.backgroundColor = '#A7CBFF';
                            mwcButton.style.color = '#FFF';
                    }
                }
                else {
                    switch (this.type) {
                        case 'gray':
                            mwcButton.style.backgroundColor = `#ECEDF1`;
                            mwcButton.style.color = `var(--gray-700)`;
                            break;
                        case 'soft':
                            mwcButton.style.backgroundColor = `#E7EEFF`;
                            mwcButton.style.color = `#247CFF`;
                            break;
                        case 'flat':
                            mwcButton.style.opacity = '1';
                            break;
                        default:
                    }
                    !this.type && (mwcButton.style.backgroundColor = `#247CFF`);
                }
                if (this.background) {
                    const mwcButton = mwcButtonBase?.shadowRoot?.querySelector('button');
                    if (mwcButton)
                        mwcButton.style.backgroundColor = this.background;
                }
            }
        }
    }
    async firstUpdated() {
        const mwcButtonBase = this.shadowRoot?.querySelector('mwc-button');
        if (await mwcButtonBase?.updateComplete) {
            const mwcButton = mwcButtonBase?.shadowRoot?.querySelector('button');
            if (mwcButton) {
                mwcButton.style.minWidth = '0px';
                mwcButton.style.textTransform = 'none';
                !this.type && (mwcButton.style.backgroundColor = `#247CFF`);
                // change mwc buttin height
                this.buttonHeight && (mwcButton.style.height = `${this.buttonHeight}px`);
                this.buttonWidth && (mwcButton.style.width = `${this.buttonWidth}px`);
                switch (this.type) {
                    case 'soft':
                        mwcButton.style.backgroundColor = `#E7EEFF`;
                        mwcButton.style.color = `#247CFF`;
                        break;
                    case 'flat':
                        mwcButtonBase?.attributes?.removeNamedItem('raised');
                        mwcButton.style.color = '#247CFF';
                        break;
                    case 'icon':
                        mwcButtonBase?.attributes?.removeNamedItem('raised');
                        mwcButton.style.width = `${mwcButton.style.height}`;
                        break;
                    case 'accent':
                        mwcButton.style.backgroundColor = `#F3655C`;
                        mwcButton.style.color = `white`;
                        break;
                    default:
                        break;
                }
                if (mwcButton?.disabled) {
                    switch (this.type) {
                        case 'soft':
                            mwcButton.style.backgroundColor = '#F5F8FF';
                            mwcButton.style.color = '#EAF2FF';
                            break;
                        case 'flat':
                            mwcButton.style.opacity = '0.5';
                            break;
                        default:
                            mwcButton.style.backgroundColor = '#A7CBFF';
                            mwcButton.style.color = '#FFF';
                    }
                }
            }
        }
        if (this.background) {
            const mwcButton = mwcButtonBase?.shadowRoot?.querySelector('button');
            if (mwcButton)
                mwcButton.style.backgroundColor = this.background;
        }
    }
};
Button.styles = css `
    .button-wrapper {
      border-radius: var(--radius);
      overflow: hidden;
    }

    .button-icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .button-content {
      font-family: Sarabun-Regular !important;
      margin-left: 4px;
      font-weight: 600;
      letter-spacing: 0.6px;
    }

    .button-content-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .icon {
      border-radius: 100% !important;
    }
  `;
__decorate([
    property(),
    __metadata("design:type", String)
], Button.prototype, "type", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Button.prototype, "buttonHeight", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Button.prototype, "buttonWidth", void 0);
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Object)
], Button.prototype, "fullwidth", void 0);
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Object)
], Button.prototype, "disable", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Button.prototype, "background", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Button.prototype, "padding", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Button.prototype, "radius", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Button.prototype, "buttonTextColor", void 0);
Button = __decorate([
    customElement('c-button')
], Button);
export { Button };
//# sourceMappingURL=button.js.map