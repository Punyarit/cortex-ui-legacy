import '@material/mwc-checkbox';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface Option {
  text: string;
  value: string;
  checked: boolean;
  disabled: boolean;
}

@customElement('c-checkbox-card')
export class CheckboxCard extends LitElement {
  static styles = css`
    mwc-checkbox {
      --mdc-theme-secondary: #247cff;
    }

    .checkbox-card {
      padding: 8px 16px 8px 8px;
      display: flex;
      align-items: center;
      column-gap: 6px;
      cursor: pointer;
      box-shadow: 0px 0px 1px rgba(42, 57, 89, 0.04), 0px 2px 8px rgba(63, 82, 122, 0.08);
      border-radius: 16px;
      height: var(--height);
      width: var(--width);
      background: white;
      transition: background 0.125s ease-in;
      user-select: none;
    }

    .checkbox-card:hover {
      background: #f9f9f9;
    }

    .checkbox-card:active {
      background: #f1f1f3;
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
  `;

  @property({
    type: Array,
  })
  options: Option[] = [];

  @property()
  height = 'auto';

  @property()
  width = 'auto';

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

  render() {
    return html`
      <style>
        :host {
          --width: ${this.width};
          --height: ${this.height};
          width: ${this.width};
          height: ${this.height};
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
      >
        ${this.options.map(
          (option, index) => html`
            <div
              class="checkbox-card ${option.disabled ? 'disabled' : ''} ${option.checked ? 'checked' : ''}"
              @click="${() => this.selectOption(option, index)}"
            >
              <mwc-checkbox .checked="${option.checked}"></mwc-checkbox>
              <slot .value="${option}" name="${option.value}"></slot>
            </div>
          `
        )}
      </c-wrap>
    `;
  }

  selectOption(option: Option, index: number) {
    if (!option.disabled) {
      option.checked = !option.checked;
      this.options[index] = option;
      this.onDispathEvent('getValue', { values: this.options, value: option });
      this.requestUpdate();
    }
  }

  onDispathEvent(event?: string, data?: Record<string, unknown>): void {
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
