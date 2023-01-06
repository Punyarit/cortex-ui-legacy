import { __decorate, __metadata } from "tslib";
import '@material/mwc-checkbox';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let CheckboxCard = class CheckboxCard extends LitElement {
    constructor() {
        super(...arguments);
        this.options = [];
        this.height = 'auto';
        this.width = 'auto';
        // c-wrap properties
        this.d = 'flex';
        this.rowGap = '12px';
        this.colGap = '12px';
        this.layout = 'row';
        this.mx = 0;
        this.my = 0;
        this.justify = 'flex-start';
        this.aligns = 'flex-start';
        this.colGrid = 0;
        this.rowGrid = 'none';
    }
    render() {
        return html `
      <style>
        :host {
          --width: ${this.width};
          --height: ${this.height};
          width: ${this.width};
          height: ${this.height};
        }
      </style>
      <c-wrap
        justify="${this.justify}"
        aligns="${this.aligns}"
        colGrid="${this.colGrid}"
        rowGrid="${this.rowGrid}"
        mx="2px"
        my="2px"
        d="${this.d}"
        rowGap="${this.rowGap}"
        colGap="${this.colGap}"
        layout="${this.layout}"
      >
        ${this.options.map((option, index) => html `
            <div
              class="checkbox-card ${option.disabled ? 'disabled' : ''} ${option.checked ? 'checked' : ''}"
              @click="${() => this.selectOption(option, index)}"
            >
              <mwc-checkbox .checked="${option.checked}"></mwc-checkbox>
              <slot .value="${option}" name="${option.value}"></slot>
            </div>
          `)}
      </c-wrap>
    `;
    }
    selectOption(option, index) {
        if (!option.disabled) {
            option.checked = !option.checked;
            this.options[index] = option;
            this.onDispathEvent('getValue', { values: this.options, value: option });
            this.requestUpdate();
        }
    }
    onDispathEvent(event, data) {
        this.dispatchEvent(new CustomEvent(event, {
            detail: {
                ...data,
            },
            bubbles: true,
        }));
    }
};
CheckboxCard.styles = css `
    mwc-checkbox {
      --mdc-theme-secondary: #247cff;
    }

    .checkbox-card {
      padding: 8px 16px 8px 8px;
      display: flex;
      align-items: center;
      column-gap: 6px;
      cursor: pointer;
      box-shadow: 0px 0px 1px rgba(42, 57, 89, 0.04), 0px 2px 8px rgba(63, 82, 122, 0.08);
      border-radius: 16px;
      height: var(--height);
      width: var(--width);
      background: white;
      transition: background 0.125s ease-in;
      user-select: none;
    }

    .checkbox-card:hover {
      background: #f9f9f9;
    }

    .checkbox-card:active {
      background: #f1f1f3;
    }

    .disabled {
      color: #949cac !important;
      cursor: default !important;
    }

    .disabled:hover {
      background: white !important;
    }

    .disabled:active {
      background: white !important;
    }
  `;
__decorate([
    property({
        type: Array,
    }),
    __metadata("design:type", Array)
], CheckboxCard.prototype, "options", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], CheckboxCard.prototype, "height", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], CheckboxCard.prototype, "width", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], CheckboxCard.prototype, "d", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], CheckboxCard.prototype, "rowGap", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], CheckboxCard.prototype, "colGap", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], CheckboxCard.prototype, "layout", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], CheckboxCard.prototype, "mx", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], CheckboxCard.prototype, "my", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], CheckboxCard.prototype, "justify", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], CheckboxCard.prototype, "aligns", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], CheckboxCard.prototype, "colGrid", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], CheckboxCard.prototype, "rowGrid", void 0);
CheckboxCard = __decorate([
    customElement('c-checkbox-card')
], CheckboxCard);
export { CheckboxCard };
//# sourceMappingURL=checkbox-card.js.map