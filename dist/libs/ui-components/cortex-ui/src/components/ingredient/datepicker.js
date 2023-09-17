import { __decorate, __metadata } from "tslib";
import dayjs from 'dayjs';
import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { yearFormat } from '../../helper/helper';
import '../kit/dropdown';
import './calendar';
import './double-calendar';
import './icon';
import './input';
let Datepicker = class Datepicker extends LitElement {
    constructor() {
        super(...arguments);
        this.config = {
            doubleCalendar: false,
            dateRange: false,
            withDialog: false,
            fixed: false,
        };
        this.initValue = 'after';
        this.defaultDateSelect = 'เลือกวันที่';
        this.date = new Date();
        this.startDateFormat = this.defaultDateSelect;
        this.endDateFormat = this.defaultDateSelect;
        this.language = 'th';
        this.dateSelectedFormat = this.defaultDateSelect;
        this.dateState = 'start';
        this.disabled = false;
        this.isUpdated = false;
    }
    render() {
        return html `
      <c-dropdown
        @closed="${this.closedDropdown}"
        .withDialog="${this.config.withDialog}"
        .fixed="${this.config.fixed}"
      >
        ${this.config.doubleCalendar
            ? html `
              <div class="double-calendar-wrapper">
                <c-input
                  class="${this.disabled ? 'disabled' : ''}"
                  .disabled="${this.disabled}"
                  height="${this.height ?? '48px'}"
                  width="${this.width ?? '194px'}"
                  @click="${!this.disabled ? this.focusDateStartInput : undefined}"
                  id="left-input-calendar"
                >
                  <c-icon icon="u_calender"></c-icon>
                  <div>${this.startDateFormat}</div>
                </c-input>
                <div class="line-between"></div>
                <c-input
                  class="${this.disabled ? 'disabled' : ''}"
                  .disabled="${this.disabled}"
                  height="${this.height ?? '48px'}"
                  width="${this.width ?? '194px'}"
                  @click="${!this.disabled ? this.focusDateEndInput : undefined}"
                  id="right-input-calendar"
                >
                  <c-icon icon="u_calender"></c-icon>
                  <div>${this.endDateFormat}</div>
                </c-input>
              </div>
            `
            : html `
              <c-input
                class="${this.disabled ? 'disabled' : ''}"
                .disabled="${this.disabled}"
                height="${this.height ?? '48px'}"
                width="${this.width ?? '328px'}"
                class="calendar-wrapper"
                @click="${!this.disabled ? this.focusInputCalendar : undefined}"
                id="input-calendar"
                .error="${this.error}"
                textError="${this.textError}"
              >
                <c-icon icon="u_calender"></c-icon>
                <div>${this.dateSelectedFormat}</div>
              </c-input>
            `}
        ${this.disabled
            ? undefined
            : html ` <div slot="dropdown" disabled="${this.disabled}">
              ${this.config.doubleCalendar
                ? html `
                    <c-double-calendar
                      language="${this.language}"
                      .startDate="${this.startDate}"
                      .endDate="${this.endDate}"
                      .date="${this.date}"
                      @selected="${(e) => this.selectedDateRange(e.detail)}"
                      dateState="${this.dateState}"
                      @apply="${this.applySelectedDate}"
                    ></c-double-calendar>
                  `
                : html `
                    <c-calendar
                      language="${this.language}"
                      .startDate="${this.startDate}"
                      .endDate="${this.endDate}"
                      .date="${this.date}"
                      .config="${{ dateRange: this.config.dateRange }}"
                      @selected="${this.selectedDate}"
                    ></c-calendar>
                  `}
            </div>`}
      </c-dropdown>
    `;
    }
    initDoubleCalendar() {
        if (this.endDate && this.startDate) {
            this.selectedDateRange({
                endDate: this.endDate,
                startDate: this.startDate,
            });
        }
    }
    initCalendar() {
        this.dateSelected = this.date;
        this.dateSelectedFormat = this.dateSelected
            ? dayjs(this.dateSelected).format(`D/MM/${yearFormat(this.language)}`)
            : this.defaultDateSelect;
    }
    updated() {
        // once
        if (this.isUpdated)
            return;
        this.isUpdated = true;
        if ((this.date || (this.startDate && this.endDate)) && this.initValue === 'before') {
            this.initCalendar();
        }
        if (this.config.doubleCalendar && this.startDate && this.endDate && this.initValue === 'before') {
            this.initDoubleCalendar();
        }
        this.initValue = 'after';
    }
    reset() {
        this.startDate = undefined;
        this.endDate = undefined;
        this.startDateFormat = this.defaultDateSelect;
        this.endDateFormat = this.defaultDateSelect;
    }
    focusInputCalendar() {
        this._wCalendar?.classList.add('focus');
        this._inputCalendar.borderColor = 'var(--color-5-500)';
    }
    focusDateStartInput() {
        this.dateState = 'start';
        if ((!this.startDate && !this.endDate) || (this.startDate && this.endDate)) {
            this._leftInputCalendar.classList.add('focus');
            this._leftInputCalendar.borderColor = 'var(--color-5-500)';
        }
        else if (this.startDate && !this.endDate) {
            this._rightInputCalendar.classList.add('focus');
            this._rightInputCalendar.borderColor = 'var(--color-5-500)';
        }
    }
    focusDateEndInput() {
        this.dateState = 'end';
        if (!this.startDate && !this.endDate) {
            this._leftInputCalendar.classList.add('focus');
            this._leftInputCalendar.borderColor = 'var(--color-5-500)';
        }
        else if ((this.startDate && this.endDate) || (this.startDate && !this.endDate)) {
            this._rightInputCalendar.classList.add('focus');
            this._rightInputCalendar.borderColor = 'var(--color-5-500)';
        }
    }
    closedDropdown() {
        if (this.config.doubleCalendar) {
            this._leftInputCalendar.classList.remove('focus');
            this._leftInputCalendar.borderColor = 'var(--gray-400)';
            this._rightInputCalendar.classList.remove('focus');
            this._rightInputCalendar.borderColor = 'var(--gray-400)';
        }
        else {
            this._wCalendar?.classList.remove('focus');
            this._inputCalendar.borderColor = 'var(--gray-400)';
        }
    }
    selectedDate(e) {
        this.dateSelected = e.detail.date;
        this.dateSelectedFormat = this.dateSelected
            ? dayjs(this.dateSelected).format(`D/MM/${yearFormat(this.language)}`)
            : this.defaultDateSelect;
        if (this.initValue === 'after') {
            this.animationClosed(this.dateSelectedFormat);
        }
        this.onDispatchEvent('selected', { date: this.dateSelected });
    }
    selectedDateRange(e) {
        if ((!this.startDate && !this.endDate) || (this.startDate && this.endDate)) {
            this._leftInputCalendar.classList.remove('focus');
            this._leftInputCalendar.borderColor = 'var(--gray-400)';
            if (this.initValue === 'after') {
                this._rightInputCalendar.classList.add('focus');
                this._rightInputCalendar.borderColor = 'var(--color-5-500)';
            }
        }
        this.startDate = e.startDate;
        this.endDate = e.endDate;
        this.startDateFormat = this.startDate
            ? dayjs(this.startDate).format(`D/MM/${yearFormat(this.language)}`)
            : this.defaultDateSelect;
        this.endDateFormat = this.endDate
            ? dayjs(this.endDate).format(`D/MM/${yearFormat(this.language)}`)
            : this.defaultDateSelect;
        if (this.initValue === 'after') {
            this.animationClosed(this.endDate);
        }
        const dateRange = {
            startDate: this.startDate,
            endDate: this.endDate,
        };
        this.onDispatchEvent('selected', dateRange);
    }
    applySelectedDate() {
        this.onDispatchEvent('apply', {
            startDate: this.startDate,
            endDate: this.endDate,
        });
    }
    animationClosed(dateValue) {
        if (dateValue && this._cDropdown) {
            this._cDropdown.mwcMenu.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            this._cDropdown.mwcMenu.style.opacity = '0';
            this._cDropdown.mwcMenu.style.transform = 'scale(0.2)';
            this.closedDropdown();
            setTimeout(() => {
                this._cDropdown.mwcMenu.style.transform = 'scale(1)';
                this._cDropdown.mwcMenu.style.opacity = '1';
                this._cDropdown.mwcMenu.close();
            }, 500);
        }
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
Datepicker.styles = css `
    .double-calendar-wrapper {
      display: flex;
      column-gap: 12px;
      align-items: center;
    }

    .double-calendar-wrapper,
    .calendar-wrapper {
      color: var(--gray-600);
    }

    .focus {
      color: var(--color-5-500) !important;
    }

    .line-between {
      height: 2px;
      width: 10px;
      background: var(--gray-800);
    }

    .disabled {
      display: flex;
      align-items: center;
      column-gap: 6px;
      color: var(--gray-500) !important;
      pointer-events: none;
    }
  `;
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Object)
], Datepicker.prototype, "config", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Datepicker.prototype, "initValue", void 0);
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Object)
], Datepicker.prototype, "date", void 0);
__decorate([
    property(),
    __metadata("design:type", Number)
], Datepicker.prototype, "startDate", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Datepicker.prototype, "startDateFormat", void 0);
__decorate([
    property(),
    __metadata("design:type", Number)
], Datepicker.prototype, "endDate", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Datepicker.prototype, "endDateFormat", void 0);
__decorate([
    query('c-dropdown'),
    __metadata("design:type", Object)
], Datepicker.prototype, "_cDropdown", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Datepicker.prototype, "language", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Datepicker.prototype, "dateSelectedFormat", void 0);
__decorate([
    query('.calendar-wrapper'),
    __metadata("design:type", Object)
], Datepicker.prototype, "_wCalendar", void 0);
__decorate([
    query('#input-calendar'),
    __metadata("design:type", Object)
], Datepicker.prototype, "_inputCalendar", void 0);
__decorate([
    query('#left-input-calendar'),
    __metadata("design:type", Object)
], Datepicker.prototype, "_leftInputCalendar", void 0);
__decorate([
    query('#right-input-calendar'),
    __metadata("design:type", Object)
], Datepicker.prototype, "_rightInputCalendar", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], Datepicker.prototype, "dateState", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Datepicker.prototype, "disabled", void 0);
__decorate([
    property({
        type: String,
    }),
    __metadata("design:type", Object)
], Datepicker.prototype, "max", void 0);
__decorate([
    property({
        type: String,
    }),
    __metadata("design:type", Object)
], Datepicker.prototype, "min", void 0);
__decorate([
    property(),
    __metadata("design:type", Boolean)
], Datepicker.prototype, "error", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Datepicker.prototype, "textError", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], Datepicker.prototype, "height", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], Datepicker.prototype, "width", void 0);
Datepicker = __decorate([
    customElement('c-datepicker')
], Datepicker);
export { Datepicker };
//# sourceMappingURL=datepicker.js.map