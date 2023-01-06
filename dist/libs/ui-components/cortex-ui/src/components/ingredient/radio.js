import { __decorate, __metadata } from "tslib";
import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
let Radio = class Radio extends LitElement {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.type = 'row';
        this.gap = 0;
        this.labelSize = 'var(--fs-16)';
        this.labelColor = 'var(--cl-text)';
        this.contentActive = false;
        this.color = 'var(--color-5-500)';
        this.disabledColor = 'var(--gray-300)';
    }
    render() {
        return html `
      <style>
        :host {
          --color: ${this.color};
          --disabled-color: ${this.disabledColor};
        }
        .radio-wrapper-outside {
          display: inline-block;
          margin-top: ${this.type === 'column' ? '26px' : '0'};
        }

        #radio-wrapper {
          flex-direction: ${this.type};
          padding-left: ${this.type === 'row' ? (this.label ? '30px' : '22px') : 0};
        }

        #radio {
          left: ${this.type !== 'column' && 0};
          bottom: ${this.type === 'column' && '24px'};
        }

        .label-text {
          margin: ${this.type === 'column' ? this.gap + ' 0 0 0' : '0 0 0 ' + this.gap};
          transition: var(--theme-cl-transition);
          font-size: ${this.labelSize};
          font-weight: ${this.labelWeight};
          color: ${this.labelColor};
          height: ${this.label ? 'auto' : this.labelSize};
        }

        #radio-wrapper.disabled .label-text {
          color: #c9d4f1;
        }
      </style>
      <div class="radio-wrapper-outside">
        <div id="radio-wrapper" class="${this.disabled ? 'disabled' : ''}" @click="${this.clickRadio}">
          <input
            ?disabled=${this.disabled}
            @change="${this.emitData}"
            type="radio"
            name="${this.group}"
            id="radio"
            .checked="${this.isChecked}"
          />
          <span class="checkmark checkmark-${this.type}"></span>
          <div class="label-text">${this.label}</div>
        </div>
      </div>
    `;
    }
    emitData() {
        this.dispatchEvent(new CustomEvent('getValue', {
            detail: {
                label: this.label,
                value: this.value,
            },
            bubbles: true,
        }));
    }
    updated() {
        // only combo with c-content
        if (this.contentActive) {
            const contentelement = this.shadowRoot?.host.parentElement;
            const contentWrapper = contentelement?.shadowRoot?.querySelector('.content-wrapper');
            if (contentWrapper) {
                contentWrapper.style.cursor = 'pointer';
                contentWrapper.onclick = () => {
                    this.emitData();
                };
            }
        }
    }
    clickRadio() {
        if (!this.disabled) {
            this.isChecked = true;
            this.emitData();
        }
    }
};
Radio.styles = css `
    #radio {
      cursor: pointer;
    }

    #radio-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      cursor: pointer;
    }

    #radio-wrapper.disabled {
      cursor: default;
    }

    #radio-wrapper input[type='radio'] {
      border: 0px;
      width: 22px;
      height: 22px;
      position: absolute;
      margin: 0;
    }

    #radio-wrapper input {
      opacity: 0;
      z-index: 1;
      position: relative;
    }

    #radio-wrapper input ~ .checkmark {
      position: absolute;
      width: 22px;
      height: 22px;
      top: 0;
      border-radius: 100%;
      box-shadow: 0px 0px 0px 2px #c9d4f1 inset;
      transition: 0.25s;
    }

    #radio-wrapper.disabled input ~ .checkmark {
      position: absolute;
      width: 22px;
      height: 22px;
      top: 0;
      border-radius: 100%;
      box-shadow: 0px 0px 0px 2px var(--disabled-color) inset;
      transition: 0.25s;
    }

    #radio-wrapper:not(.disabled) input:hover ~ .checkmark {
      box-shadow: 0px 0px 0px 7px #c9d4f1 inset;
    }

    #radio-wrapper input ~ .checkmark-column {
      transform: translate(0, -25px);
    }

    #radio-wrapper input ~ .checkmark-row {
      left: 0;
      transform: translate(0, 0);
    }

    #radio-wrapper input:checked ~ .checkmark {
      background: white;
    }

    #radio-wrapper input:checked ~ .checkmark-column {
      animation: fadeColumn 0.25s ease forwards;
    }

    #radio-wrapper input:checked ~ .checkmark-row {
      animation: fadeRow 0.25s ease forwards;
    }

    #radio-wrapper.disabled input:checked ~ .checkmark-column {
      animation: fadeColumn 0.25s ease forwards;
    }

    #radio-wrapper.disabled input:checked ~ .checkmark-row {
      animation: fadeRowDisabled 0.25s ease forwards;
    }

    @keyframes fadeColumn {
      0% {
        transform: translate(0, -25px) scale(1);
        box-shadow: 0px 0px 0px 6px #c9d4f1 inset;
      }

      50% {
        transform: translate(0, -25px) scale(1.3);
      }

      100% {
        transform: translate(0, -25px) scale(1);
        box-shadow: 0px 0px 0px 6px var(--color) inset;
      }
    }

    @keyframes fadeColumnDisabled {
      0% {
        transform: translate(0, -25px) scale(1);
        box-shadow: 0px 0px 0px 6px #a5b7da inset;
      }

      50% {
        transform: translate(0, -25px) scale(1.3);
      }

      100% {
        transform: translate(0, -25px) scale(1);
        box-shadow: 0px 0px 0px 6px #c9d4f1 inset;
      }
    }

    @keyframes fadeRow {
      0% {
        transform: translate(0, 0) scale(1);
        box-shadow: 0px 0px 0px 6px #c9d4f1 inset;
      }

      50% {
        transform: translate(0, 0) scale(1.3);
      }

      100% {
        transform: translate(0, 0) scale(1);
        box-shadow: 0px 0px 0px 6px var(--color) inset;
      }
    }

    @keyframes fadeRowDisabled {
      0% {
        transform: translate(0, 0) scale(1);
        box-shadow: 0px 0px 0px 6px #a5b7da inset;
      }

      50% {
        transform: translate(0, 0) scale(1.3);
      }

      100% {
        transform: translate(0, 0) scale(1);
        box-shadow: 0px 0px 0px 6px #c9d4f1 inset;
      }
    }
  `;
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Object)
], Radio.prototype, "disabled", void 0);
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Boolean)
], Radio.prototype, "isChecked", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Radio.prototype, "group", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Radio.prototype, "type", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Radio.prototype, "label", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Radio.prototype, "value", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Radio.prototype, "gap", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Radio.prototype, "labelSize", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Radio.prototype, "labelWeight", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Radio.prototype, "labelColor", void 0);
__decorate([
    query('#radio'),
    __metadata("design:type", HTMLInputElement)
], Radio.prototype, "radio", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Radio.prototype, "contentActive", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Radio.prototype, "color", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Radio.prototype, "disabledColor", void 0);
Radio = __decorate([
    customElement('c-radio')
], Radio);
export { Radio };
//# sourceMappingURL=radio.js.map