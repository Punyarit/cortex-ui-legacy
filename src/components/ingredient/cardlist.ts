import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import './button';
import './input';

@customElement('c-cardlist')
export class CardList extends LitElement {
  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      row-gap: 12px;
    }
    .card-wrapper {
      width: 564px;
      background: #f5f8ff;
      padding: 8px 16px;
      display: flex;
      flex-direction: column;
      row-gap: 2px;
      position: relative;
    }

    .icon-remove {
      position: absolute;
      top: 6px;
      right: 12px;
      color: var(--gray-500);
      cursor: pointer;
      user-select: none;
    }

    .icon-remove:active {
      color: var(--gray-600);
    }

    .card-detail-wrapper {
      display: flex;
    }

    .label {
      width: 68px;
    }

    .add-wrapper {
      display: flex;
      column-gap: 12px;
    }
  `;

  @property()
  data: Record<string, string>[] = [];

  @query('input')
  inputRef!: HTMLInputElement;

  @property()
  error = false;

  @property()
  textError?: string;

  @property()
  disabled = false;

  @property()
  length = 5;

  private isAddedEvent = false;

  @query('input')
  _input?: HTMLInputElement;

  render() {
    return html`
      <style>
        ::placeholder {
          color: var(--${this.disabled ? 'gray-400' : 'gray-500'});
        }
      </style>
      <div class="container">
        <div class="add-wrapper">
          <c-input textError="${this.textError}" .error="${this.error}" width="460px" height="48px">
            <input .disabled="${this.disabled}" type="text" placeholder="Enter HN number" />
          </c-input>
          <c-button .disable="${this.disabled}" @click="${() => this.addInputValue()}" buttonHeight="48" type="soft">
            Add
          </c-button>
        </div>

        ${this.data?.map(res => {
          return html`
            <div class="card-wrapper">
              <div class="icon-remove" @click="${() => this.removeData(res.HN)}">
                <c-icon icon="u_trash-alt"></c-icon>
              </div>
              ${Object.entries(res).map(([key, value]) => {
                if (key === 'id') return null;
                return html`
                  <div class="card-detail-wrapper">
                    <div class="label">${key}:</div>
                    <div>${value}</div>
                  </div>
                `;
              })}
            </div>
          `;
        })}
      </div>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._input) {
      this._input?.removeEventListener('keyup', (e: KeyboardEvent) => this.enterInputValue(e.key));
    }
  }

  enterInputValue(key: string) {
    if (key === 'Enter') {
      this.addInputValue();
    }
  }

  removeData(hn: string) {
    this.onDispatchEvent('remove', { hn });
  }

  updated() {
    if (this.data.length === this.length) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }

    if (!this.isAddedEvent) {
      if (this._input) {
        this._input.addEventListener('keyup', (e: KeyboardEvent) => this.enterInputValue(e.key));
      }
      this.isAddedEvent = true;
    }
  }

  addInputValue() {
    this.onDispatchEvent('add', { input: this.inputRef?.value });
    this.inputRef.value = '';
    this.inputRef.focus();
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
