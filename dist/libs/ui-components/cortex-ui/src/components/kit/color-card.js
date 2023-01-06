import { __decorate, __metadata } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { customEvent, findEmptySlot } from '../../helper/helper';
import '../ingredient/checkbox';
let ColorCard = class ColorCard extends LitElement {
    constructor() {
        super(...arguments);
        this.fluid = false;
        this.highlight = false;
        this.overflow = `hidden`;
        this.titlePosition = 'center';
        this.config = {
            checkbox: false,
        };
        this.styles = {
            checkbox: {
                border: 'var(--gray-400)',
                disabledColor: 'var(--gray-500)',
                checkedBackground: 'var(--gray-600)',
                background: 'var(--bg-content)',
            },
        };
        this.checked = false;
        this.disabled = false;
    }
    render() {
        return html `
      <style>
        :host {
          flex-grow: ${this.fluid ? 1 : 0};
          flex-basis: ${this.fluid ? 0 : 'auto'};
          --borders: ${this.borders};
          --mdc-checkbox-unchecked-color: var(--gray-500);
        }

        .content-wrapper {
          background: ${this.bgContent};
          border-radius: ${this.radius};
          overflow: ${this.overflow};
          cursor: default;
        }
        .content-hightlight {
          transition: 0.25s;
        }
        .content-hightlight:hover {
          box-shadow: 0 0px 0 4px ${this.clTitle};
        }
        .card-header {
          background: ${this.bgTitle};
          color: ${this.clTitle};
          justify-content: ${this.titlePosition === 'left' ? 'space-between' : 'center'};
        }

        .alt-text {
          padding: 8px ${this.config.checkbox ? '14px 8px 0' : '14px'} !important;
        }
      </style>

      <div class="content-wrapper ${this.highlight && 'content-hightlight'}">
        <div class="card-header">
          ${this.subject ? html `<div class="title-text">${this.subject}</div>` : html `<slot name="subject"></slot>`}

          <div class="alt-wrapper">
            ${this.config.checkbox
            ? html `
                  <c-checkbox
                    .styles="${this.styles.checkbox}"
                    .checked="${this.checked}"
                    .disabled="${this.disabled}"
                    @change="${(e) => this.checkboxChange(e)}"
                  ></c-checkbox>
                `
            : undefined}
            ${this.emptySlot?.['alt-text']
            ? undefined
            : html `<div class="alt-text"><slot name="alt-text"></slot></div>`}
          </div>
        </div>
        <div class="content" style="padding: ${this.padding ?? '12px'}">
          <slot></slot>
        </div>
      </div>
    `;
    }
    firstUpdated() {
        const slots = this.shadowRoot?.querySelectorAll('slot');
        this.emptySlot = findEmptySlot(slots);
    }
    checkboxChange(e) {
        customEvent(this, 'change', {
            checked: e.detail.checked,
        });
    }
};
ColorCard.styles = css `
    .content-wrapper {
      width: 100%;
      height: 100%;
      border: var(--borders);
    }

    .title-text {
      padding: 8px 14px;
      font-size: 14px;
      font-weight: 600;
    }

    .alt-text {
      padding: 8px 14px;
      font-size: 14px;
      font-weight: 600;
    }

    .card-header {
      display: flex;
    }

    .alt-wrapper {
      display: flex;
      column-gap: 6px;
      align-items: center;
    }
  `;
__decorate([
    property(),
    __metadata("design:type", String)
], ColorCard.prototype, "subject", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], ColorCard.prototype, "bgTitle", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], ColorCard.prototype, "bgContent", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], ColorCard.prototype, "clTitle", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], ColorCard.prototype, "radius", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ColorCard.prototype, "fluid", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ColorCard.prototype, "highlight", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], ColorCard.prototype, "padding", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], ColorCard.prototype, "borders", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ColorCard.prototype, "overflow", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], ColorCard.prototype, "titlePosition", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ColorCard.prototype, "config", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ColorCard.prototype, "styles", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ColorCard.prototype, "checked", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ColorCard.prototype, "disabled", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], ColorCard.prototype, "emptySlot", void 0);
ColorCard = __decorate([
    customElement('c-color-card')
], ColorCard);
export { ColorCard };
//# sourceMappingURL=color-card.js.map