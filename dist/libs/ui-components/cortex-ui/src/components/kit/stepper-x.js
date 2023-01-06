import { __decorate, __metadata } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import '../ingredient/icon';
let StepperX = class StepperX extends LitElement {
    render() {
        return html `
      <div class="wrapper">
        ${this.options.map((option, index) => html `
              <div class="stepper-wrapper">
                <div class="text">${option.text}</div>
                <div class="checkpoint-wrapper">
                  <c-icon
                    id="checkpoint-${index}"
                    background="${index === this.currentIndex ? '#247cff' : 'white'}"
                    class="icon-checkpoint"
                    .rounded="${true}"
                    color="${index < this.currentIndex ? '#247CFF' : '#A7CBFF'}"
                    icon="${index < this.currentIndex ? 'check-circle-outlined' : 'check-circle-false'}"
                  ></c-icon>
                  ${index === 0 ? html `<div id="lineAbove"></div>` : undefined}
                  ${index === 0 ? html `<div id="lineUnder"></div>` : undefined}
                </div>
              </div>
            `)}
      </div>
      <slot
        name="${this.options[this.currentIndex]?.value
            ? this.options[this.currentIndex]?.value
            : this.options[this.currentIndex - 1]?.value}"
      ></slot>
    `;
    }
    updated() {
        const checkpointEnd = this.shadowRoot?.querySelector(`#checkpoint-${this.currentIndex}`);
        this._lineAbove.style.width = `${checkpointEnd.offsetLeft - this._checkpointStart.offsetLeft}px`;
    }
    firstUpdated() {
        const warpper = this.shadowRoot?.querySelector('.wrapper');
        const gridColumns = this.options.map(() => '1fr').join(' ');
        warpper.style.gridTemplateColumns = gridColumns;
    }
};
StepperX.styles = css `
    :host {
      width: 100%;
    }

    .stepper-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }

    .wrapper {
      display: grid;
      position: relative;
    }

    #lineAbove {
      position: absolute;
      height: 4px;
      background: #7cb0ff;
      transition: width 0.25s ease;
      z-index: 1;
    }

    #lineUnder {
      position: absolute;
      height: 4px;
      z-index: 0;
    }

    .text {
      color: #7386af;
      text-align: center;
    }

    .checkpoint-wrapper {
      margin-top: 12px;
      display: flex;
      align-items: center;
    }

    .icon-checkpoint {
      position: relative;
      z-index: 2;
    }
  `;
__decorate([
    property({
        type: Array,
    }),
    __metadata("design:type", Array)
], StepperX.prototype, "options", void 0);
__decorate([
    property(),
    __metadata("design:type", Number)
], StepperX.prototype, "currentIndex", void 0);
__decorate([
    query('#checkpoint-0'),
    __metadata("design:type", HTMLDivElement)
], StepperX.prototype, "_checkpointStart", void 0);
__decorate([
    query('#lineAbove'),
    __metadata("design:type", HTMLDivElement)
], StepperX.prototype, "_lineAbove", void 0);
StepperX = __decorate([
    customElement('c-stepper-x')
], StepperX);
export { StepperX };
//# sourceMappingURL=stepper-x.js.map