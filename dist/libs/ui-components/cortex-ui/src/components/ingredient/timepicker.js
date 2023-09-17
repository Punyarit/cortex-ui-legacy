import { __decorate, __metadata } from "tslib";
import dayjs from 'dayjs';
import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import '../kit/dropdown';
import './button';
import './icon';
import './input';
let TimePicker = class TimePicker extends LitElement {
    constructor() {
        super(...arguments);
        this.timestamp = '';
        this.disabled = false;
        this.width = '140px';
        this.height = '48px';
        this.value = {
            hour: '00',
            minute: '00',
        };
        this.isUpdated = false;
        this.initValue = 'after';
        this.fixed = false;
        this.error = false;
        this.renderTimeSelect = (type) => html ` <div class="time-select-wrapper">
    <c-button @click="${() => this.setTime(type, 'increase')}" buttonWidth="48" buttonHeight="48" type="flat">
      <c-icon color="#247CFF" size="12" icon="chevron-up"></c-icon>
    </c-button>
    <c-input width="48px" height="48px">
      <input
        @input="${e => this.formatInput(type, e)}"
        @keydown="${(e) => this.storeValue(e)}"
        id="${type}-input"
        type="number"
        min="0"
        value="${type === 'hour' ? this.hourValue ?? '00' : this.minuteValue ?? '00'}"
        max="${type === 'hour' ? 23 : 59}"
      />
    </c-input>
    <c-button @click="${() => this.setTime(type, 'decrease')}" buttonWidth="48" buttonHeight="48" type="flat">
      <c-icon color="#247CFF" size="12" icon="chevron-down"></c-icon>
    </c-button>
  </div>`;
    }
    render() {
        return html `
      <style>
        :host {
          --input-color: #c9d4f1;
          --icon-color: #7386af;
        }
        .disabled {
          cursor: not-allowed;
        }
      </style>
      <c-dropdown
        .disabled="${this.disabled}"
        @dropdown-opened="${this.triggerDropdown}"
        @dropdown-closed="${this.triggerDropdown}"
        width="${this.width}"
        .fixed="${this.fixed}"
      >
        <div>
          <c-input
            .error="${this.error}"
            width="${this.width}"
            borderColor="${this.disabled ? 'var(--gray-400)' : 'var(--input-color)'}"
            height="${this.height}"
            .disabled="${this.disabled}"
            class="${this.disabled ? 'disabled' : ''}"
          >
            <c-icon class="${this.disabled ? 'disabled' : ''}" icon="u_clock" color="var(--icon-color)"></c-icon>
            <span class="${this.disabled ? 'disabled' : ''}"
              >${this.hourDisplay ?? '--'}:${this.minuteDisplay ?? '--'}</span
            >
          </c-input>
        </div>

        <div slot="dropdown">
          <div class="title-wrapper">
            <div class="time-picker-text">Time picker</div>
            <div class="btn-wrapper">
              <c-button @click="${this.resetValue}" type="flat" buttonWidth="60"> Reset </c-button>

              <c-button @click="${this.applyValue}" buttonWidth="60"> Apply </c-button>
            </div>
          </div>
          <div class="timepicker-wrapper">
            ${this.renderTimeSelect('hour')}
            <div>:</div>
            ${this.renderTimeSelect('minute')}
          </div>

          ${this.errorText
            ? html ` <div class="error-wrapper">
                <c-icon icon="icon-error"></c-icon>
                <span class="error-text">${this.errorText}</span>
              </div>`
            : undefined}
        </div>
      </c-dropdown>
    `;
    }
    applyValue() {
        this.hourValue = this.hourInputRef.value;
        this.minuteValue = this.minuteInputRef.value;
        this.hourDisplay = this.hourValue;
        this.minuteDisplay = this.minuteValue;
        this.value = {
            hour: this.hourValue,
            minute: this.minuteValue,
        };
        this.dropdownRef.close();
        this.errorText = '';
        this.dispatchWithCurrentTime('apply');
    }
    dispatchWithCurrentTime(event) {
        const currDateTime = dayjs(+this.timestamp)
            .hour(+this.hourValue)
            .minute(+this.minuteValue)
            .valueOf();
        this.onDispatchEvent(event, {
            timestamp: currDateTime,
            hour: +this.hourValue,
            minute: +this.minuteValue,
        });
    }
    resetValue() {
        if (this.timestamp) {
            this.setTimeStamp();
            this.hourInputRef.value = this.hourValue;
            this.minuteInputRef.value = this.minuteValue;
        }
        else {
            this.hourInputRef.value = '00';
            this.minuteInputRef.value = '00';
        }
        this.errorText = '';
        this.dispatchWithCurrentTime('reset');
    }
    setTimeStamp() {
        const time = dayjs(+this.timestamp);
        this.hourValue = time.format('HH');
        this.minuteValue = time.format('mm');
    }
    storeValue(e) {
        this.oldValue = e.target.value;
    }
    setTime(type, operate) {
        const input = this.shadowRoot?.querySelector(`#${type}-input`);
        const maxValue = type === 'hour' ? 23 : 59;
        let timeValue = 0;
        if (operate === 'increase') {
            timeValue = +input.value + 1;
        }
        else {
            timeValue = +input.value === 0 ? 0 : +input.value - 1;
        }
        if (timeValue <= maxValue) {
            input.value = timeValue.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        }
        this.setTimeState(type, input.value);
    }
    formatInput(type, e) {
        const input = this.shadowRoot?.querySelector(`#${type}-input`);
        const maxValue = type === 'hour' ? 23 : 59;
        if (+input.value > maxValue) {
            input.value = this.oldValue;
            this.errorText =
                type === 'hour' ? 'The time must be formatted as 24 hours' : 'The time must be formatted as 59 minutes';
        }
        else {
            this.errorText = '';
        }
        if (input.value.length === 1) {
            input.value = '0' + input.value;
        }
        if (input.value.length === 3) {
            input.value = input.value.slice(1, 3);
        }
        if (e.data === '-') {
            input.value = this.oldValue;
        }
        this.setTimeState(type, input.value);
        this.dropdownTriggerEvent();
    }
    setTimeState(type, value) {
        if (type === 'hour') {
            this.hourValue = value;
        }
        else {
            this.minuteValue = value;
        }
        this.dropdownTriggerEvent();
    }
    triggerDropdown(event) {
        const host = this.shadowRoot?.host;
        host.style.setProperty('--input-color', event.detail.status === 'OPENED' ? '#5096FF' : '#C9D4F1');
        host.style.setProperty('--icon-color', event.detail.status === 'OPENED' ? '#5096FF' : '#7386AF');
    }
    updated(changedProps) {
        if (this.timestamp) {
            this.setTimeStamp();
            if (this.initValue === 'before' || this.isUpdated) {
                this.hourDisplay = this.hourValue;
                this.minuteDisplay = this.minuteValue;
            }
        }
        this.isUpdated = true;
        super.update(changedProps);
    }
    dropdownTriggerEvent() {
        this.dispatchWithCurrentTime('getValue');
    }
    onDispatchEvent(event, data) {
        this.dispatchEvent(new CustomEvent(event, {
            detail: {
                ...data,
            },
            bubbles: true,
        }));
    }
};
TimePicker.styles = css `
    c-input span,
    c-input c-icon {
      user-select: none;
      cursor: default;
    }

    .timepicker-wrapper {
      width: 285px;
      display: flex;
      align-items: center;
      column-gap: 6px;
      justify-content: center;
      padding: 12px;
      box-sizing: border-box;
    }

    .time-select-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 12px;
    }

    input[type='number'] {
      -moz-appearance: textfield;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    .title-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 12px 0;
      box-sizing: border-box;
      font-size: var(--fs-14);
    }

    .btn-wrapper {
      display: flex;
      column-gap: 6px;
    }

    .reset-btn {
      color: var(--color-5-500);
    }

    .time-picker-text {
      color: var(--gray-500);
    }

    .error-wrapper {
      color: #f3655c;
      display: flex;
      column-gap: 12px;
      font-size: 12px;
      padding: 0 12px 12px;
    }
  `;
__decorate([
    property(),
    __metadata("design:type", Object)
], TimePicker.prototype, "timestamp", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], TimePicker.prototype, "disabled", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], TimePicker.prototype, "width", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], TimePicker.prototype, "height", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], TimePicker.prototype, "oldValue", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], TimePicker.prototype, "hourDisplay", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], TimePicker.prototype, "minuteDisplay", void 0);
__decorate([
    query('#minute-input'),
    __metadata("design:type", HTMLInputElement)
], TimePicker.prototype, "minuteInputRef", void 0);
__decorate([
    query('#hour-input'),
    __metadata("design:type", HTMLInputElement)
], TimePicker.prototype, "hourInputRef", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], TimePicker.prototype, "initValue", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], TimePicker.prototype, "errorText", void 0);
__decorate([
    query('c-dropdown'),
    __metadata("design:type", Object)
], TimePicker.prototype, "dropdownRef", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], TimePicker.prototype, "fixed", void 0);
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Object)
], TimePicker.prototype, "error", void 0);
TimePicker = __decorate([
    customElement('c-timepicker')
], TimePicker);
export { TimePicker };
//# sourceMappingURL=timepicker.js.map