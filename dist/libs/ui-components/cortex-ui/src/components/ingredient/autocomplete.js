import { __decorate, __metadata } from "tslib";
import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { timeout } from '../../helper/helper';
import './button';
import './icon';
let Autocomplete = class Autocomplete extends LitElement {
    constructor() {
        super(...arguments);
        this.height = '48px';
        this.resize = 'none';
        this.type = 'default';
        this.width = '100%';
        this.unitGap = '12px';
        this.noPadding = false;
        this.disabled = false;
        this.longErrorMessage = false;
        this.borderColor = '#c9d4f1';
        this.options = [];
        this.open = false;
        this.filter = true;
        this.textAlign = 'left';
        this.fixed = false;
        this.maxHeight = '280px';
        this.multiple = false;
        this.filteredOptions = [];
        this.multiOptions = [];
        this.language = 'th';
        this.locale = {
            en: {
                suggestion: 'Suggestion',
                typing: 'Typing..',
            },
            th: {
                suggestion: 'ตัวเลือกแนะนำ',
                typing: 'กำลังระบุเอง..',
            },
        };
    }
    render() {
        return html `
      <style>
        :host {
          --position: ${this.fixed ? 'fixed' : 'absolute'};
          --textAlign: ${this.textAlign};
          --background: ${this.backgroundColor ?? (this.disabled ? 'var(--gray-200)' : 'transparent')};
          --maxHeight: ${this.maxHeight};
        }
        ::slotted(textarea) {
          resize: ${this.resize};
          /* font-family: 'Sarabun-Regular'; */
        }

        .label-text {
          margin-bottom: 12px ${this.error ? '; color: #F3655C' : ''};
        }

        .input-outer {
          column-gap: ${this.unitGap};
        }

        .input-wrapper {
          height: ${this.height};
          width: ${this.width};
        }

        .detail-wrapper {
          display: ${this.textError || this.maxLength ? 'block' : 'none'};
        }

        .text-length {
          color: ${+this.textLength > +this.maxLength ? '#F3655C' : '#c9d4f1'};
        }

        .unit-text {
          margin-bottom: ${this.textError || this.maxLength ? '36px' : '0'};
        }
      </style>
      <div style="margin-bottom:12px ${this.error ? '; color: #F3655C' : ''}" ?hidden="${!this.label}">
        ${this.label}
      </div>
      <div class="input-outer" style="column-gap: ${this.unitGap};">
        <div style="width: 100%">
          <div
            class="input-wrapper"
            style="border-color: ${(!this.disabled && this.error) || this.textLength > this.maxLength
            ? '#F3655C'
            : this.borderColor};
            ${this.borderWidth ? `border: ${this.borderWidth};` : ''}
            ${this.noPadding ? `padding: 0px;` : ''}"
          >
            <div class="input-icon-wrapper">
              <slot></slot>
            </div>
          </div>
          <div class="detail-wrapper">
            <div
              class="text-error"
              ?hidden="${!(this.textError && this.error && !this.disabled)}"
              style="${this.longErrorMessage ? 'white-space: nowrap;position:relative' : 'position:relative'}"
            >
              <c-icon color="red" icon="icon-error" size="12"></c-icon>
              ${this.textError}
            </div>
            <div ?hidden="${!this.maxLength}" class="text-length">${this.textLength || 0}/${this.maxLength}</div>
          </div>
        </div>
        <div class="unit-text" ?hidden="${!this.unit}">${this.unit}</div>
      </div>
      <div ?hidden="${!this.open}" class="list-options menu-list-wrapper">
        <div class="list-wrapper">
          <div style="font-size:12px; color:gray; padding:12px">
            ${this.filteredOptions?.length ? this.locale[this.language].suggestion : this.locale[this.language].typing}
          </div>
          ${this.filteredOptions &&
            this.filteredOptions?.map(option => html `
                <div class="menu-list" @click="${() => this.selectOption(option)}">
                  ${option.text}
                  ${option.subText ? html `<span class="menu-list-subtext">${option.subText}</span>` : undefined}
                </div>
              `)}
        </div>
      </div>
    `;
    }
    connectedCallback() {
        super.connectedCallback();
        this.input.addEventListener('keyup', (e) => {
            this.setOptions();
            if (this.multiple && !this.open && this.filteredOptions.length) {
                const listOptions = this.shadowRoot?.querySelector('.list-options');
                this.showOptions(listOptions);
            }
        });
    }
    updated(changedProperties) {
        if (changedProperties.get(`options`)) {
            this.setOptions();
        }
    }
    firstUpdated() {
        const listOptions = this.shadowRoot?.querySelector('.list-options');
        this.input.addEventListener('focus', () => {
            this.showOptions(listOptions);
        });
        this.input.addEventListener('focusout', () => {
            listOptions.classList.add('options-close');
            timeout(300).then(() => {
                listOptions.classList.remove('options-close');
                this.open = false;
            });
        });
    }
    get input() {
        return this.querySelector('input') || this.querySelector('textarea');
    }
    showOptions(listOptions) {
        this.filteredOptions = this.options;
        const inputOuter = this.shadowRoot?.querySelector('.input-outer').getBoundingClientRect();
        if (this.fixed) {
            listOptions.style.top = `${inputOuter.top + inputOuter.height}px`;
            listOptions.style.left = `${inputOuter.left}px`;
        }
        listOptions.style.minWidth = `${inputOuter.width}px`;
        this.open = true;
    }
    selectOption(option) {
        this.multiOptions.push(option);
        const value = this.generateInputValueBySelectedOption(option, this.input.value);
        this.input.value = value;
        if (this.multiple) {
            this.input.focus();
        }
        this.dispatchEvent(new CustomEvent('getValue', {
            detail: {
                value,
                option: this.multiple ? this.multiOptions : option,
            },
            bubbles: true,
        }));
    }
    setOptions() {
        if (!this.filter) {
            this.filteredOptions = this.options;
            return;
        }
        const valueToCompare = this.multiple ? this.lastWord() : this.input.value;
        this.filteredOptions = this.options?.filter(option => option?.text.toLowerCase().includes(valueToCompare.toLowerCase()));
    }
    lastWord() {
        const inputValue = this.input.value;
        const splitValue = inputValue.split(/\s/);
        return splitValue[splitValue.length - 1];
    }
    generateInputValueBySelectedOption(option, inputValue) {
        let newValue = this.multiple ? inputValue.replace(new RegExp(`${this.lastWord()}$`), option.text) : option.text;
        newValue += option.subText ? ` ${option.subText}` : '';
        if (this.multiple) {
            newValue += ' ';
        }
        return newValue;
    }
};
Autocomplete.styles = css `
    ::slotted(textarea) {
      border: none;
      margin-top: 6px;
      outline: none;
      width: 100%;
      height: 100%;
      background: none;
      font-family: S;
      color: var(--cl-text);
    }

    ::slotted(input) {
      border: none;
      width: 100%;
      outline: none;
      height: 100%;
      background: none;
      color: var(--cl-text);
    }

    .input-outer {
      display: flex;
      align-items: center;
      width: 100%;
    }
    .input-wrapper {
      border: 1px solid;
      padding: 6px 12px;
      border-radius: 8px;
      box-sizing: border-box;
      position: relative;
      background: var(--background);
    }
    .input-icon-wrapper {
      display: flex;
      align-items: center;
      width: 100%;
      column-gap: 10px;
      height: 100%;
    }
    .text-length {
      position: absolute;
      right: 0;
      color: #c9d4f1;
    }
    .text-error {
      color: #f3655c;
      font-weight: 400;
      font-size: 12px;
      position: absolute;
      left: 0;
    }
    .detail-wrapper {
      margin-top: 6px;
      height: 26px;
      position: relative;
    }

    .list-options {
      background: white;
      position: var(--position);
      z-index: 10;
      opacity: 0;
      animation: slideY 0.35s ease forwards;
    }

    .options-close {
      animation: slideYOut 0.35s ease forwards;
    }

    @keyframes slideY {
      from {
        opacity: 0;
        transform: translate(0, 30%);
      }
      to {
        opacity: 1;
        transform: translate(0, 0%);
      }
    }

    @keyframes slideYOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    .menu-list:hover {
      background: #5096ff;
      color: white;
      border-radius: 6px;
    }

    .menu-list {
      padding: 12px 12px 12px 26px;
      box-sizing: border-box;
      margin: 0 4px;
      border-radius: 4px;
      display: block;
      cursor: pointer;
    }

    .menu-list-wrapper {
      padding: 4px 0;
      box-sizing: border-box;
      box-shadow: 0px 2px 8px #2a39590a, 0px 16px 32px #3f527a1f;
      border-radius: 6px;
      overflow: hidden;
      max-width: 100%;
      max-height: var(--maxHeight);
    }

    .menu-list-subtext {
      color: #c9d4f1;
    }

    .list-wrapper {
      max-height: var(--maxHeight);
      overflow: auto;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #8ba3b8;
    }

    /* width */
    ::-webkit-scrollbar {
      width: 10px;
      height: 8px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #bbc5ce;
      border-radius: 10px;
    }
  `;
__decorate([
    property(),
    __metadata("design:type", Object)
], Autocomplete.prototype, "height", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Autocomplete.prototype, "resize", void 0);
__decorate([
    property(),
    __metadata("design:type", Boolean)
], Autocomplete.prototype, "error", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Autocomplete.prototype, "type", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Autocomplete.prototype, "width", void 0);
__decorate([
    property(),
    __metadata("design:type", Number)
], Autocomplete.prototype, "textLength", void 0);
__decorate([
    property(),
    __metadata("design:type", Number)
], Autocomplete.prototype, "maxLength", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Autocomplete.prototype, "textError", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Autocomplete.prototype, "label", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Autocomplete.prototype, "unit", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Autocomplete.prototype, "unitGap", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Autocomplete.prototype, "backgroundColor", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Autocomplete.prototype, "borderWidth", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Autocomplete.prototype, "noPadding", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Autocomplete.prototype, "disabled", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Autocomplete.prototype, "longErrorMessage", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Autocomplete.prototype, "borderColor", void 0);
__decorate([
    property({
        type: Array,
    }),
    __metadata("design:type", Array)
], Autocomplete.prototype, "options", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Autocomplete.prototype, "open", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Autocomplete.prototype, "filter", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Autocomplete.prototype, "textAlign", void 0);
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Object)
], Autocomplete.prototype, "fixed", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Autocomplete.prototype, "maxHeight", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Autocomplete.prototype, "multiple", void 0);
__decorate([
    state(),
    __metadata("design:type", Array)
], Autocomplete.prototype, "filteredOptions", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Autocomplete.prototype, "language", void 0);
Autocomplete = __decorate([
    customElement('c-autocomplete')
], Autocomplete);
export { Autocomplete };
//# sourceMappingURL=autocomplete.js.map