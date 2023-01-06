import dayjs from 'dayjs';
import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { yearFormat } from '../../helper/helper';
import type { CCalendar, CDropdown, CInput } from '../../interfaces/components.interface';
import '../kit/dropdown';
import './calendar';
import './double-calendar';
import './icon';
import './input';

@customElement('c-datepicker')
export class Datepicker extends LitElement {
  static styles = css`
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

  @property({
    type: Object,
  })
  config = {
    doubleCalendar: false,
    dateRange: false,
    withDialog: false,
    fixed: false,
  };

  @property()
  initValue: 'before' | 'after' = 'after';

  public defaultDateSelect = 'เลือกวันที่';

  @property({
    type: Object,
  })
  date = new Date();

  @property()
  public startDate?: number;

  @state()
  public startDateFormat = this.defaultDateSelect;

  @property()
  public endDate?: number;

  @state()
  public endDateFormat = this.defaultDateSelect;

  @query('c-dropdown')
  _cDropdown!: CDropdown;

  @property()
  language = 'th';

  public dateSelected?: Date;

  @state()
  public dateSelectedFormat = this.defaultDateSelect;

  @query('.calendar-wrapper')
  _wCalendar!: CCalendar;

  @query('#input-calendar')
  _inputCalendar!: CInput;

  @query('#left-input-calendar')
  _leftInputCalendar!: CInput;

  @query('#right-input-calendar')
  _rightInputCalendar!: CInput;

  @state()
  private dateState: 'start' | 'end' = 'start';

  @property({ type: Boolean }) disabled = false;

  @property({
    type: String,
  })
  max?: Date | number;

  @property({
    type: String,
  })
  min?: Date | number;

  @property()
  error?: boolean;

  @property()
  textError?: string;

  @property({ type: String }) public height?: string;
  @property({ type: String }) public width?: string;
  private isUpdated = false;

  render() {
    return html`
      <c-dropdown
        @closed="${this.closedDropdown}"
        .withDialog="${this.config.withDialog}"
        .fixed="${this.config.fixed}"
      >
        ${this.config.doubleCalendar
          ? html`
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
          : html`
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
          : html` <div slot="dropdown" disabled="${this.disabled}">
              ${this.config.doubleCalendar
                ? html`
                    <c-double-calendar
                      language="${this.language}"
                      .startDate="${this.startDate}"
                      .endDate="${this.endDate}"
                      .date="${this.date}"
                      @selected="${(e: CustomEvent) => this.selectedDateRange(e.detail)}"
                      dateState="${this.dateState}"
                      @apply="${this.applySelectedDate}"
                    ></c-double-calendar>
                  `
                : html`
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
    if (this.isUpdated) return;
    this.isUpdated = true;

    if ((this.date || (this.startDate && this.endDate)) && this.initValue === 'before') {
      this.initCalendar();
    }

    if (this.config.doubleCalendar && this.startDate && this.endDate && this.initValue === 'before') {
      this.initDoubleCalendar();
    }

    this.initValue = 'after';
  }

  public reset() {
    this.startDate = undefined;
    this.endDate = undefined;
    this.startDateFormat = this.defaultDateSelect;
    this.endDateFormat = this.defaultDateSelect;
  }

  focusInputCalendar() {
    this._wCalendar?.classList.add('focus');
    this._inputCalendar!.borderColor = 'var(--color-5-500)';
  }

  focusDateStartInput() {
    this.dateState = 'start';
    if ((!this.startDate && !this.endDate) || (this.startDate && this.endDate)) {
      this._leftInputCalendar.classList.add('focus');
      this._leftInputCalendar.borderColor = 'var(--color-5-500)';
    } else if (this.startDate && !this.endDate) {
      this._rightInputCalendar.classList.add('focus');
      this._rightInputCalendar.borderColor = 'var(--color-5-500)';
    }
  }

  focusDateEndInput() {
    this.dateState = 'end';
    if (!this.startDate && !this.endDate) {
      this._leftInputCalendar.classList.add('focus');
      this._leftInputCalendar.borderColor = 'var(--color-5-500)';
    } else if ((this.startDate && this.endDate) || (this.startDate && !this.endDate)) {
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
    } else {
      this._wCalendar?.classList.remove('focus');
      this._inputCalendar.borderColor = 'var(--gray-400)';
    }
  }

  selectedDate(e: CustomEvent) {
    this.dateSelected = e.detail.date;
    this.dateSelectedFormat = this.dateSelected
      ? dayjs(this.dateSelected).format(`D/MM/${yearFormat(this.language)}`)
      : this.defaultDateSelect;

    if (this.initValue === 'after') {
      this.animationClosed(this.dateSelectedFormat);
    }
    this.onDispatchEvent('selected', { date: this.dateSelected });
  }

  selectedDateRange(e: { startDate: number; endDate: number }) {
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

  animationClosed(dateValue: string | number | undefined) {
    if (dateValue && this._cDropdown) {
      this._cDropdown!.mwcMenu!.style!.transition = 'opacity 0.5s ease, transform 0.5s ease';
      this._cDropdown!.mwcMenu!.style!.opacity = '0';
      this._cDropdown!.mwcMenu!.style!.transform = 'scale(0.2)';
      this.closedDropdown();

      setTimeout(() => {
        this._cDropdown!.mwcMenu!.style!.transform = 'scale(1)';
        this._cDropdown!.mwcMenu!.style!.opacity = '1';
        this._cDropdown!.mwcMenu!.close();
      }, 500);
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
