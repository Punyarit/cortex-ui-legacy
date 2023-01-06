import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../ingredient/icon';
import './wrap';

interface Option {
  text: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  error?: boolean;
  displayTh?: string;
}
@customElement('c-radio-card')
export class RadioCard extends LitElement {
  static styles = css`
    .radio-card {
      display: flex;
      flex-direction: column;
      height: var(--height);
      width: var(--width);
      border-radius: 16px;
      padding: 12px;
      background: white;
      cursor: pointer;
      transition: background 0.125s ease-in;
      box-shadow: var(--shadow);
    }
    .radio-card:hover {
      background: #f9f9f9;
      opacity: 1;
    }

    .radio-card:active {
      background: #f1f1f3;
    }

    .radio-card-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
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

    .checked {
      box-shadow: 0 0 0 1px #247cff !important;
    }

    .error {
      box-shadow: 0 0 0 1px red !important;
    }

    .blur {
      opacity: 0.5;
    }

    .visible-hide {
      visibility: hidden;
    }
  `;

  @property()
  subject = '';

  @property({
    type: Array,
  })
  options!: Option[];

  @property()
  height = 'auto';

  @property()
  width = '200px';

  @property()
  clean = true;

  @property()
  errorAll = false;

  @property()
  setBlur = false;

  @property()
  noTitleText = false;

  @property()
  language?: 'th' | 'en';

  @state()
  isSelected = false;

  // c-wrap properties
  @property()
  d = 'flex';
  @property()
  rowGap = '12px';
  @property()
  colGap = '12px';
  @property()
  layout = 'row';
  @property()
  mx = 0;
  @property()
  my = 0;
  @property()
  justify = 'flex-start';
  @property()
  aligns = 'flex-start';
  @property()
  colGrid = 0;
  @property()
  rowGrid = 'none';

  @property()
  render() {
    return html`
      <style>
        :host {
          --height: ${this.height};
          --width: ${this.width};
          --shadow: ${this.errorAll
            ? '0 0 0 1px red !important'
            : '0px 0px 1px rgba(42, 57, 89, 0.04), 0px 2px 8px rgba(63, 82, 122, 0.08)'};
          width: ${this.width};
          height: ${this.height};
        }
        .check-icon-no-title {
          margin-bottom: ${this.noTitleText ? '-22px' : 'auto'};
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
        wrap="wrap"
      >
        ${this.options?.map(
          option => html`
            <div
              @click="${() => this.selectOption(option)}"
              class="radio-card ${this.setBlur && this.isSelected && option.checked === false
                ? 'blur'
                : ''} ${option.disabled ? 'disabled' : ''} ${option.checked ? 'checked' : ''} ${option.error
                ? 'error'
                : ''}"
            >
              <div class="radio-card-title">
                <div>${this.noTitleText ? '' : this.language === 'th' ? option.displayTh : option.text}</div>
                <c-icon
                  class="${this.noTitleText ? 'check-icon-no-title' : ''} ${(this.clean || option.disabled) &&
                  !option?.checked
                    ? 'visible-hide'
                    : ''}"
                  ?hidden="${(this.clean || option.disabled) && !option?.checked}"
                  size="20"
                  color="${option?.checked ? '#247CFF' : '#e2e1ea'}"
                  icon="${option?.checked ? 'check-circle-outlined' : 'check-circle-false'}"
                ></c-icon>
              </div>

              <slot name="${option.value}"></slot>
            </div>
          `
        )}
      </c-wrap>
    `;
  }

  updated(e: Map<string, unknown>) {
    if (e.has('options')) {
      this.isSelected = this.options?.some(opt => opt.checked);
    }
  }

  onDispathEvent(event: string, data?: Record<string, unknown>): void {
    this.dispatchEvent(
      new CustomEvent(event, {
        detail: {
          ...data,
        },
        bubbles: true,
      })
    );
  }
  selectOption(option: Option) {
    if (!option.disabled) {
      const newPption = [...this.options];

      for (const [index, value] of newPption.entries()) {
        value.checked = option.value === newPption[index].value;
      }

      this.options = newPption;
      option.checked = true;
      this.isSelected = this.options?.some(option => option.checked);
      this.onDispathEvent('getValue', {
        values: this.options,
        value: option,
      });
    }
  }
}
