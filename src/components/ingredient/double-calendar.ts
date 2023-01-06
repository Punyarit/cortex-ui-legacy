import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { jsonClone } from '../../helper/helper';
import type { CCalendar } from '../../interfaces/components.interface';
import './calendar';

@customElement('c-double-calendar')
export class DoubleCalendar extends LitElement {
  static styles = css`
    .double-calendar-wrapper {
      display: flex;
    }
  `;

  public config = {
    dateRange: true,
    prevNextDate: false,
  };

  @property({
    type: Object,
  })
  date = new Date();

  @query('#left-calendar')
  _calendarLeft!: CCalendar;

  @query('#right-calendar')
  _calendarRight!: CCalendar;

  @state()
  public nextMonth!: Date;

  @property()
  public startDate?: number;

  @property()
  public endDate?: number;

  @property()
  language = 'th';

  @property({ type: String })
  public dateState: 'start' | 'end' = 'start';

  private isUpdated = false;

  render() {
    return html`
      <div class="double-calendar-wrapper">
        <c-calendar
          @mouseover-daterange="${(e: CustomEvent) => this.triggerMouseOver('left', e)}"
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
          @mouseover-daterange="${(e: CustomEvent) => this.triggerMouseOver('right', e)}"
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

  triggerMouseOver(calendarSide: 'left' | 'right', e: CustomEvent) {
    // mouse event ที่ส่งมาจะเป็น mouse Event ของข้างที่มีการ mouseover
    if (calendarSide === 'left') {
      this._calendarRight.hoverDateBetween(e.detail.mouseEvent);
    } else {
      this._calendarLeft.hoverDateBetween(e.detail.mouseEvent);
    }
  }

  selectedDateRange(e: CustomEvent) {
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

  updated(e: Map<string, string | Date>) {
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

  onDispatchEvent(event: string, data?: Record<string, unknown>): void {
    this.dispatchEvent(
      new CustomEvent(event, {
        detail: {
          ...data,
        },
        bubbles: true,
      })
    );
  }
}
