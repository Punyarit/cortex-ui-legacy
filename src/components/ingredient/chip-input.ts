import '@material/mwc-button';
import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './button';
import './icon';

@customElement('c-chip-input')
export class ChipInput extends LitElement {
  static styles = css`
    ::slotted(input) {
      border: none;
      width: 100%;
      outline: none;
      height: 100%;
      background: none;
    }

    .input-outter {
      display: flex;
      align-items: center;
      width: 100%;
    }
    .input-wrapper {
      border: 1px solid;
      padding: 6px 16px;
      border-radius: 8px;
      box-sizing: border-box;
      position: relative;
    }
    .input-icon-wrapper {
      display: flex;
      align-items: center;
      width: 100%;
      column-gap: 10px;
      height: 100%;
    }
    .text-length {
      position: absolute;
      right: 0;
      color: #c9d4f1;
    }
    .text-error {
      color: #f3655c;
      font-weight: 400;
      font-size: 14px;
      position: absolute;
      left: 0;
    }
    .detail-wrapper {
      margin-top: 6px;
      height: 26px;
      position: relative;
    }

    .chip-wrapper {
      background: #e7eeff;
      padding: 6px 18px;
      border-radius: 99px;
      display: inline-flex;
      align-items: center;
      column-gap: 6px;
      margin-top: 12px;

      animation: slideY 0.35s ease forwards;
    }

    @keyframes slideY {
      from {
        opacity: 0;
        transform: translate(0, -50%);
      }
      to {
        opacity: 1;
        transform: translate(0, 0%);
      }
    }

    .chip-text {
      color: #247cff;
      font-weight: 600;
      font-size: 14px;
    }
  `;

  @property({
    type: Array,
  })
  chips?: string[] = [];
  @property()
  height = '48px';
  @property()
  resize = 'none';
  @property()
  error?: boolean;
  @property()
  type: 'default' | 'fluid' = 'default';
  @property()
  width = '100%';
  @property()
  textLength?: number;
  @property()
  maxLength?: number;
  @property()
  textError?: string;
  @property()
  label?: string;
  @property()
  unit?: string;

  render() {
    return html`
      <style>
        ::slotted(textarea) {
          border: none;
          outline: none;
          width: 100%;
          resize: ${this.resize};
          height: 100%;
          background: none;
        }
        .label-text {
          margin-bottom: 12px ${this.error ? '; color: #F3655C' : ''};
        }

        .input-wrapper {
          height: ${this.height};
          width: ${this.width};
        }

        .detail-wrapper {
          display: ${(this.textError && this.error) || this.maxLength ? 'block' : 'none'};
        }

        .text-length {
          color: ${+this.textLength > +this.maxLength ? '#F3655C' : '#c9d4f1'};
        }

        .unit-text {
          margin-bottom: ${this.textError || this.maxLength ? '36px' : '0'};
        }
      </style>
      <div style="margin-bottom:12px ${this.error ? '; color: #F3655C' : ''}" ?hidden="${!this.label}">
        ${this.label}
      </div>
      <div class="input-outter">
        <div style="width: 100%">
          <div
            class="input-wrapper"
            style="border-color: ${this.error || this.textLength > this.maxLength ? '#F3655C' : '#c9d4f1'}"
          >
            <div class="input-icon-wrapper">
              <c-icon color="#C9D4F1" icon="u_label" size="14"></c-icon>
              <slot></slot>
            </div>
          </div>
          <div class="detail-wrapper">
            <div class="text-error" ?hidden="${!(this.textError && this.error)}">${this.textError}</div>
            <div ?hidden="${!this.maxLength}" class="text-length">${this.textLength || 0}/${this.maxLength}</div>
          </div>
        </div>
        <div class="unit-text" ?hidden="${!this.unit}">${this.unit}</div>
      </div>
      <div ?hidden="${this.chips.length === 0}">${this.chipTemplate()}</div>
    `;
  }

  chipTemplate(): TemplateResult<1> {
    return html`
      ${this.chips?.map(
        (chip, index) =>
          html` <div id="chip-${index}" class="chip-wrapper">
            <span class="chip-text"> ${chip} </span>
            <c-button @click="${() => this.removeChip(index)}" background="#C9D4F1" type="icon" buttonHeight="28">
              <c-icon slot="icon-button" icon="u-times" size="12" color="#7386AF"></c-icon>
            </c-button>
          </div>`
      )}
    `;
  }

  async removeChip(index?: number): Promise<void> {
    const allChips = [...this.chips];
    allChips.splice(index, 1);
    this.chips = allChips;
    this.inputDispatchEvent('getChips', { chips: this.chips });
  }

  inputDispatchEvent(event?: string, data?: Record<string, unknown>): void {
    this.dispatchEvent(
      new CustomEvent(event, {
        detail: {
          ...data,
        },
        bubbles: true,
      })
    );
  }

  chipEventEnter(): void {
    this.addEventListener('keydown', event => {
      const inputValue = this.shadowRoot?.host.querySelector('input').value;
      if (event.key === 'Enter' && inputValue) {
        const allChip = [...this.chips];
        allChip.push(inputValue);
        this.chips = allChip;
        this.shadowRoot.host.querySelector('input').value = '';
        this.inputDispatchEvent('getChips', { chips: this.chips });
      }
    });
  }

  firstUpdated(): void {
    this.chipEventEnter();
  }
}
