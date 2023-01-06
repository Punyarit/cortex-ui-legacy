import dayjs from 'dayjs';
import { css, html, LitElement } from 'lit';
import { customElement, property, queryAll } from 'lit/decorators.js';
import { jsonClone, yearFormat } from '../../helper/helper';
import '../kit/translation';
import './icon';
import './translate';
@customElement('c-calendar')
export class Calendar extends LitElement {
  static styles = css`
    .calendar-wrapper {
      /* width: 306px; */
      width: var(--width);
      border-radius: var(--radius);
      background: var(--gray-100);
      padding: var(--padding);
      box-sizing: border-box;
      /* mwc menu override font family */
      font-family: var(--font-family) !important;
    }

    .month-title-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .month-title {
      font-weight: 600;
      color: var(--gray-700);
    }

    .week-wrapper {
      display: flex;
      flex-wrap: wrap;
    }
    .day {
      color: var(--gray-500);
    }

    .day,
    .date,
    .prev-date,
    .next-date {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      user-select: none;
      display: grid;
      place-items: center;
    }

    .date {
      transition: background 0.25s;
      color: var(--gray-700);
    }

    .date:hover {
      color: var(--gray-600) !important;
      background: var(--gray-300) !important;
    }

    .date-wrapper {
      display: flex;
      flex-wrap: wrap;
    }

    .prev-wrapper {
      display: flex;
      flex-wrap: wrap;
    }

    .date-wrapper {
      display: flex;
      flex-wrap: wrap;
    }

    .prev-date,
    .next-date {
      color: var(--gray-400) !important;
    }

    .current-date {
      color: var(--color-5-500) !important;
      font-weight: 700;
      transition: background 0.25s;
    }

    .current-date:hover {
      background: var(--gray-300);
    }

    .selected-date {
      background: var(--color-5-400) !important;
      color: var(--gray-100) !important;
    }

    .selected-date:hover {
      background: var(--color-5-500) !important;
      color: var(--gray-100) !important;
    }

    .date-between {
      background: var(--gray-200) !important;
      border-radius: 0 !important;
    }

    .date-between:hover {
      background: var(--gray-300) !important;
    }

    .date-start,
    .date-end {
      position: relative;
      z-index: 1;
    }
    .date-start::before,
    .date-end::before {
      width: 40px;
      height: 40px;
      content: attr(data-day);
      background: var(--color-5-400) !important;
      color: var(--gray-100) !important;
      position: absolute;
      border-radius: 50%;
      display: grid;
      place-items: center;
      z-index: 0;
      transition: background 0.25s;
    }

    .date-start:hover::before {
      background: var(--color-5-500) !important;
    }

    .date-end:hover::before {
      background: var(--color-5-500) !important;
    }

    .date-start::after,
    .date-end::after {
      content: '';
      width: 20px;
      height: 40px;
      background: var(--gray-200) !important;
      position: absolute;
      z-index: -1;
    }
    .date-start::after {
      right: 0;
    }

    .date-end::after {
      left: 0;
    }

    .next-month {
      visibility: var(--next-month);
    }

    .prev-month {
      visibility: var(--prev-month);
    }
  `;

  public locales = {
    th: {
      mon: 'จ',
      tue: 'อ',
      wed: 'พ',
      thu: 'พฤ',
      fri: 'ศ',
      sat: 'ส',
      sun: 'อา',
    },

    en: {
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat',
      sun: 'Sun',
    },
  };

  @property()
  radius = '16px';

  @property()
  language = 'th';

  @property({
    type: Object,
  })
  date = new Date();

  @property()
  startDate!: Date | string | number | undefined;

  @property()
  endDate!: Date | string | number | undefined;

  @property()
  padding = '24px';

  @property()
  prevMonth: 'hidden' | 'visible' = 'visible';

  @property()
  nextMonth: 'hidden' | 'visible' = 'visible';

  @property()
  width = '328px';

  @property({
    type: Object,
  })
  config = {
    prevNextDate: false,
    dateRange: false,
  };

  @property({ type: String })
  public dateState: 'start' | 'end' = 'end';

  @property()
  selectedDate?: string | number | Date;
  public currentDate = dayjs(this.date).format('YYYY-MM-DD');
  public prevSelected = '';
  public prevDateRef!: HTMLElement;

  public startDateFormatted: string | undefined = '';
  public endDateFormatted: string | undefined = '';

  @queryAll('.date') private dateElement!: NodeListOf<HTMLDivElement>;

  private isUpdated = false;
  render() {
    return html`
      <style>
        :host {
          --padding: ${this.padding};
          --prev-month: ${this.prevMonth};
          --next-month: ${this.nextMonth};
          --radius: ${this.radius};
          --width: ${this.width};
        }
        .prev-date,
        .next-date {
          visibility: ${this.config.prevNextDate ? 'visible' : 'hidden'};
        }
      </style>
      <c-translation .locales="${this.locales}" .language="${this.language}">
        <div class="calendar-wrapper">
          <div class="month-title-wrapper">
            <c-button class="prev-month" @click="${this.goPrevMonth}" type="icon" buttonWidth="32" buttonHeight="32">
              <c-icon slot="icon-button" size="14" icon="chevron-left"></c-icon>
            </c-button>
            <div class="month-title">${this.renderMonth()}</div>
            <c-button class="next-month" @click="${this.goNextMonth}" type="icon" buttonWidth="32" buttonHeight="32">
              <c-icon slot="icon-button" size="14" icon="chevron-right"></c-icon>
            </c-button>
          </div>

          <div class="week-wrapper">
            <!-- renderWeekday -->
          </div>

          <div class="date-wrapper">${this.renderPrevDate()} ${this.renderDate()} ${this.renderNextDate()}</div>
        </div>
      </c-translation>
    `;
  }

  renderWeekday() {
    // ใช้ท่านี้ในการ Render เพราะ c-translation เข้าถึงตัวของ c-translate ไม่ได้ถ้าใช้ท่า html``
    const weekElement = this.shadowRoot?.querySelector('.week-wrapper');
    const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    let dayHtml = '';
    for (const day of weekDays) {
      dayHtml += `<c-translate class="day">${day}</c-translate>`;
    }
    if (weekElement) {
      weekElement.innerHTML = dayHtml;
    }
  }

  // @ts-ignore
  renderDate() {
    if (this.isUpdated) {
      this.date = new Date(this.date);
      const fullYear = this.date?.getFullYear();
      const month = this.date?.getMonth();
      const lastDay = new Date(fullYear, month + 1, 0).getDate();

      if (this.config.dateRange) {
        return this.renderWithDateRange(month, lastDay, fullYear);
      } else {
        return this.renderWithNormalDate(month, lastDay, fullYear);
      }
    }
  }

  renderWithNormalDate(month: number, lastDay: number, fullYear: number) {
    const element = [];
    for (let date = 1; date <= lastDay; date++) {
      const dateKey = `${fullYear}-${month + 1}-${date}`;
      const dateCurrent = { [this.currentDate]: 'current-date' }[dateKey];
      const dateFormatted = `${fullYear}-${month + 1}-${date}`;
      const dateSelected = this.prevSelected === dateKey ? 'selected-date' : '';

      element.push(
        html`<div
          data-day="${date}"
          data-date="${dateKey}"
          @click="${() => this.selectDate(new Date(dateFormatted), dateKey)}"
          class="date  ${dateCurrent} ${dateSelected}"
        >
          ${date}
        </div>`
      );
    }
    return element;
  }

  renderWithDateRange(month: number, lastDay: number, fullYear: number) {
    const element = [];
    this.startDateFormatted = this.startDate ? dayjs(this.startDate).format('YYYY-MM-DD') : undefined;
    this.endDateFormatted = this.endDate ? dayjs(this.endDate).format('YYYY-MM-DD') : undefined;
    for (let date = 1; date <= lastDay; date++) {
      const dateKey = dayjs(`${fullYear}-${month + 1}-${date}`).format('YYYY-MM-DD');
      const dateCurrent = { [this.currentDate]: 'current-date' }[dateKey];
      const dateFormatted = `${fullYear}-${month + 1}-${date}`;
      const afterStartDate = this.startDate ? dayjs(dateFormatted).isAfter(this.startDate) : undefined;
      const beforeEndDate = this.endDate ? dayjs(dateFormatted).isBefore(this.endDate) : undefined;
      const dateBetween = afterStartDate && beforeEndDate ? 'date-between' : '';

      const dateStart = this.startDateFormatted
        ? dayjs(this.startDateFormatted).isSame(dateFormatted)
          ? 'date-start'
          : ''
        : undefined;
      const dateEnd = this.endDateFormatted
        ? dayjs(this.endDateFormatted).isSame(dateFormatted)
          ? 'date-end'
          : ''
        : undefined;
      element.push(
        html`<div
          data-day="${date}"
          data-date="${dateKey}"
          @mouseover="${this.mouseOVerDateRange}"
          @click="${() => this.selecteDateRange(new Date(dateFormatted))}"
          class="date ${dateCurrent} ${dateBetween} ${dateStart} ${dateEnd}"
        >
          ${date}
        </div>`
      );
    }
    return element;
  }

  mouseOVerDateRange(e: MouseEvent) {
    this.hoverDateBetween(e);
    this.onDispatchEvent('mouseover-daterange', {
      mouseEvent: e,
    });
  }

  hoverDateBetween(e: MouseEvent) {
    const date = e.composedPath()?.[0] as HTMLElement;
    if (this.startDate && !this.endDate) {
      this.dateElement.forEach(dateEle => {
        if (
          dayjs(dateEle.dataset.date).isAfter(this.startDate) &&
          (dayjs(dateEle.dataset.date).isBefore(date.dataset.date) ||
            dayjs(dateEle.dataset.date).isSame(date.dataset.date))
        ) {
          dateEle.className = dateEle.className + ' ' + 'date-between';
        } else {
          dateEle.classList.remove('date-between');
        }
      });
    }
  }

  selecteDateRange(date: Date) {
    if (!this.startDate && !this.endDate) {
      this.startDate = date;
    } else if (this.startDate && !this.endDate) {
      this.endDate = date;
    } else if (!this.startDate && this.endDate) {
      this.startDate = date;
    } else if (this.startDate && this.endDate && this.dateState === 'start') {
      this.endDate = undefined;
      this.startDate = date;
    } else if (this.startDate && this.endDate && this.dateState === 'end') {
      this.endDate = date;
    }

    if (this.endDate && dayjs(this.startDate).isAfter(this.endDate)) {
      if (this.dateState === 'start') {
        const startDate = this.startDate;
        const endDate = this.endDate;

        this.startDate = endDate;
        this.endDate = startDate;
      } else if (this.dateState === 'end') {
        this.startDate = this.endDate;
        this.endDate = undefined;
      }
    }

    const dateRange = {
      startDate: this.startDate,
      endDate: this.endDate,
    };
    this.onDispatchEvent('selected', dateRange);
  }

  selectDate(date: Date, dateKey: string) {
    const dateRef = this.shadowRoot?.querySelector(`[data-date="${dateKey}"]`) as HTMLElement;
    this.prevDateRef = dateRef;
    if (this.prevSelected && !(`${this.prevSelected}` === dateRef.id)) {
      const oldDateRef = this.shadowRoot?.querySelector(`[data-date="${this.prevSelected}"]`);
      oldDateRef?.classList.remove('selected-date');
    }
    this.prevSelected = dateKey;
    dateRef?.classList.add('selected-date');

    this.onDispatchEvent('selected', { date });

    return date;
  }

  renderPrevDate() {
    const date = new Date(jsonClone(this.date || new Date()));
    date.setDate(1);
    const firstDayIndex = date.getDay();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const element = [];
    for (let i = firstDayIndex; i > 0; i--) {
      element.push(html`<div class="prev-date">${prevLastDay - i + 1}</div>`);
    }
    return element;
  }

  // @ts-ignore
  renderNextDate() {
    if (this.isUpdated) {
      const lastDayIndex = new Date(this.date?.getFullYear(), this.date?.getMonth() + 1, 0).getDay();
      const nextDays = 7 - lastDayIndex - 1;
      const element = [];

      for (let i = 1; i <= nextDays; i++) {
        element.push(html`<div class="next-date">${i}</div>`);
      }
      return element;
    }
  }

  renderMonth() {
    if (this.prevDateRef) {
      this.prevDateRef.style.transition = 'background 0s';
      this.prevDateRef?.classList.remove('selected-date');

      // เวลาเปลี่ยนเดือน ถ้าไม่ทำแบบนี้จะทำให้มี animation out 0.25s ของ selected date เวลากด prevMonth/nextMonth
      setTimeout(() => {
        this.prevDateRef.style.transition = 'background 0.25s';
      }, 0);
    }

    const month = dayjs(this.date)
      .locale(this.language)
      .format(`MMMM ${yearFormat(this.language)}`);
    return month;
  }

  firstUpdated() {
    this.renderWeekday();
  }

  updated() {
    if (this.date && !this.isUpdated) {
      this.date = new Date(this.date);
      this.isUpdated = true;
    }
    if (this.selectedDate) {
      const date = new Date(this.selectedDate);
      const dateKey = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      if (this.selectedDate && !this.config.dateRange) {
        this.selectDate(date, dateKey);
      }
    }
  }

  goPrevMonth() {
    this.date?.setMonth(this.date?.getMonth() - 1);
    this.requestUpdate();
    this.onDispatchEvent('prevMonth');
  }

  goNextMonth() {
    this.date?.setMonth(this.date?.getMonth() + 1);
    this.requestUpdate();
    this.onDispatchEvent('nextMonth');
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
