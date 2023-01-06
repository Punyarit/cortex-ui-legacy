import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('c-radio')
export class Radio extends LitElement {
  static styles = css`
    #radio {
      cursor: pointer;
    }

    #radio-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      cursor: pointer;
    }

    #radio-wrapper.disabled {
      cursor: default;
    }

    #radio-wrapper input[type='radio'] {
      border: 0px;
      width: 22px;
      height: 22px;
      position: absolute;
      margin: 0;
    }

    #radio-wrapper input {
      opacity: 0;
      z-index: 1;
      position: relative;
    }

    #radio-wrapper input ~ .checkmark {
      position: absolute;
      width: 22px;
      height: 22px;
      top: 0;
      border-radius: 100%;
      box-shadow: 0px 0px 0px 2px #c9d4f1 inset;
      transition: 0.25s;
    }

    #radio-wrapper.disabled input ~ .checkmark {
      position: absolute;
      width: 22px;
      height: 22px;
      top: 0;
      border-radius: 100%;
      box-shadow: 0px 0px 0px 2px var(--disabled-color) inset;
      transition: 0.25s;
    }

    #radio-wrapper:not(.disabled) input:hover ~ .checkmark {
      box-shadow: 0px 0px 0px 7px #c9d4f1 inset;
    }

    #radio-wrapper input ~ .checkmark-column {
      transform: translate(0, -25px);
    }

    #radio-wrapper input ~ .checkmark-row {
      left: 0;
      transform: translate(0, 0);
    }

    #radio-wrapper input:checked ~ .checkmark {
      background: white;
    }

    #radio-wrapper input:checked ~ .checkmark-column {
      animation: fadeColumn 0.25s ease forwards;
    }

    #radio-wrapper input:checked ~ .checkmark-row {
      animation: fadeRow 0.25s ease forwards;
    }

    #radio-wrapper.disabled input:checked ~ .checkmark-column {
      animation: fadeColumn 0.25s ease forwards;
    }

    #radio-wrapper.disabled input:checked ~ .checkmark-row {
      animation: fadeRowDisabled 0.25s ease forwards;
    }

    @keyframes fadeColumn {
      0% {
        transform: translate(0, -25px) scale(1);
        box-shadow: 0px 0px 0px 6px #c9d4f1 inset;
      }

      50% {
        transform: translate(0, -25px) scale(1.3);
      }

      100% {
        transform: translate(0, -25px) scale(1);
        box-shadow: 0px 0px 0px 6px var(--color) inset;
      }
    }

    @keyframes fadeColumnDisabled {
      0% {
        transform: translate(0, -25px) scale(1);
        box-shadow: 0px 0px 0px 6px #a5b7da inset;
      }

      50% {
        transform: translate(0, -25px) scale(1.3);
      }

      100% {
        transform: translate(0, -25px) scale(1);
        box-shadow: 0px 0px 0px 6px #c9d4f1 inset;
      }
    }

    @keyframes fadeRow {
      0% {
        transform: translate(0, 0) scale(1);
        box-shadow: 0px 0px 0px 6px #c9d4f1 inset;
      }

      50% {
        transform: translate(0, 0) scale(1.3);
      }

      100% {
        transform: translate(0, 0) scale(1);
        box-shadow: 0px 0px 0px 6px var(--color) inset;
      }
    }

    @keyframes fadeRowDisabled {
      0% {
        transform: translate(0, 0) scale(1);
        box-shadow: 0px 0px 0px 6px #a5b7da inset;
      }

      50% {
        transform: translate(0, 0) scale(1.3);
      }

      100% {
        transform: translate(0, 0) scale(1);
        box-shadow: 0px 0px 0px 6px #c9d4f1 inset;
      }
    }
  `;

  @property({
    type: Object,
  })
  disabled = false;

  @property({
    type: Object,
  })
  isChecked?: boolean;

  @property()
  group?: string;

  @property()
  type: 'column' | 'row' = 'row';

  @property()
  label?: string;

  @property()
  value?: string;

  @property()
  gap = 0;

  @property()
  labelSize = 'var(--fs-16)';

  @property()
  labelWeight?: string;

  @property()
  labelColor = 'var(--cl-text)';

  @query('#radio')
  radio?: HTMLInputElement;

  @property()
  contentActive = false;

  @property({ type: String })
  color = 'var(--color-5-500)';

  @property({ type: String })
  disabledColor = 'var(--gray-300)';

  render() {
    return html`
      <style>
        :host {
          --color: ${this.color};
          --disabled-color: ${this.disabledColor};
        }
        .radio-wrapper-outside {
          display: inline-block;
          margin-top: ${this.type === 'column' ? '26px' : '0'};
        }

        #radio-wrapper {
          flex-direction: ${this.type};
          padding-left: ${this.type === 'row' ? (this.label ? '30px' : '22px') : 0};
        }

        #radio {
          left: ${this.type !== 'column' && 0};
          bottom: ${this.type === 'column' && '24px'};
        }

        .label-text {
          margin: ${this.type === 'column' ? this.gap + ' 0 0 0' : '0 0 0 ' + this.gap};
          transition: var(--theme-cl-transition);
          font-size: ${this.labelSize};
          font-weight: ${this.labelWeight};
          color: ${this.labelColor};
          height: ${this.label ? 'auto' : this.labelSize};
        }

        #radio-wrapper.disabled .label-text {
          color: #c9d4f1;
        }
      </style>
      <div class="radio-wrapper-outside">
        <div id="radio-wrapper" class="${this.disabled ? 'disabled' : ''}" @click="${this.clickRadio}">
          <input
            ?disabled=${this.disabled}
            @change="${this.emitData}"
            type="radio"
            name="${this.group}"
            id="radio"
            .checked="${this.isChecked}"
          />
          <span class="checkmark checkmark-${this.type}"></span>
          <div class="label-text">${this.label}</div>
        </div>
      </div>
    `;
  }
  emitData() {
    this.dispatchEvent(
      new CustomEvent('getValue', {
        detail: {
          label: this.label,
          value: this.value,
        },
        bubbles: true,
      })
    );
  }

  updated() {
    // only combo with c-content
    if (this.contentActive) {
      const contentelement = this.shadowRoot?.host.parentElement;
      const contentWrapper = contentelement?.shadowRoot?.querySelector('.content-wrapper') as HTMLElement;

      if (contentWrapper) {
        contentWrapper.style.cursor = 'pointer';
        contentWrapper.onclick = () => {
          this.emitData();
        };
      }
    }
  }

  clickRadio() {
    if (!this.disabled) {
      this.isChecked = true;
      this.emitData();
    }
  }
}
