import { __decorate, __metadata } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { jsonClone } from '../../helper/helper';
import './calendar';
let DoubleCalendar = class DoubleCalendar extends LitElement {
    constructor() {
        super(...arguments);
        this.config = {
            dateRange: true,
            prevNextDate: false,
        };
        this.date = new Date();
        this.language = 'th';
        this.dateState = 'start';
        this.isUpdated = false;
    }
    render() {
        return html `
      <div class="double-calendar-wrapper">
        <c-calendar
          @mouseover-daterange="${(e) => this.triggerMouseOver('left', e)}"
          language="${this.language}"
          @selected="${this.selectedDateRange}"
          .startDate="${this.startDate}"
          .endDate="${this.endDate}"
          @prevMonth="${this.goPrevMonth}"
          id="left-calendar"
          .date="${this.date}"
          radius="16px 0 0 16px"
          padding="12px"
          width="306px"
          nextMonth="hidden"
          .config="${this.config}"
          dateState="${this.dateState}"
        ></c-calendar>
        <c-calendar
          @mouseover-daterange="${(e) => this.triggerMouseOver('right', e)}"
          language="${this.language}"
          @selected="${this.selectedDateRange}"
          .startDate="${this.startDate}"
          .endDate="${this.endDate}"
          @nextMonth="${this.goNextMonth}"
          id="right-calendar"
          .date="${this.nextMonth}"
          radius="0 16px 16px 0"
          padding="12px"
          width="306px"
          prevMonth="hidden"
          .config="${this.config}"
          dateState="${this.dateState}"
        ></c-calendar>
      </div>
    `;
    }
    triggerMouseOver(calendarSide, e) {
        // mouse event ที่ส่งมาจะเป็น mouse Event ของข้างที่มีการ mouseover
        if (calendarSide === 'left') {
            this._calendarRight.hoverDateBetween(e.detail.mouseEvent);
        }
        else {
            this._calendarLeft.hoverDateBetween(e.detail.mouseEvent);
        }
    }
    selectedDateRange(e) {
        this.startDate = e.detail.startDate;
        this.endDate = e.detail.endDate;
        const dateRange = {
            startDate: this.startDate,
            endDate: this.endDate,
        };
        this.onDispatchEvent('selected', dateRange);
        if (this.startDate && this.endDate) {
            this.onDispatchEvent('apply', dateRange);
        }
    }
    goNextMonth() {
        this._calendarLeft.goNextMonth();
    }
    goPrevMonth() {
        this._calendarRight.goPrevMonth();
    }
    updated(e) {
        for (const [key] of e) {
            if (key === 'date' && !this.isUpdated) {
                this.date = new Date(this.date);
                this.date.setDate(1);
                const nextMonth = new Date(jsonClone(this.date));
                nextMonth?.setMonth(this.date.getMonth() + 1);
                this.nextMonth = nextMonth;
                this.isUpdated = true;
                break;
            }
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
DoubleCalendar.styles = css `
    .double-calendar-wrapper {
      display: flex;
    }
  `;
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Object)
], DoubleCalendar.prototype, "date", void 0);
__decorate([
    query('#left-calendar'),
    __metadata("design:type", Object)
], DoubleCalendar.prototype, "_calendarLeft", void 0);
__decorate([
    query('#right-calendar'),
    __metadata("design:type", Object)
], DoubleCalendar.prototype, "_calendarRight", void 0);
__decorate([
    state(),
    __metadata("design:type", Date)
], DoubleCalendar.prototype, "nextMonth", void 0);
__decorate([
    property(),
    __metadata("design:type", Number)
], DoubleCalendar.prototype, "startDate", void 0);
__decorate([
    property(),
    __metadata("design:type", Number)
], DoubleCalendar.prototype, "endDate", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], DoubleCalendar.prototype, "language", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], DoubleCalendar.prototype, "dateState", void 0);
DoubleCalendar = __decorate([
    customElement('c-double-calendar')
], DoubleCalendar);
export { DoubleCalendar };
//# sourceMappingURL=double-calendar.js.map