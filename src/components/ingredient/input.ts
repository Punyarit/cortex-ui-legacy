import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { customEvent } from '../../helper/helper';
import './button';
import './icon';

@customElement('c-input')
export class Input extends LitElement {
  static styles = css`
    ::slotted(textarea) {
      border: none;
      margin-top: 6px;
      outline: none;
      width: 100%;
      height: 100%;
      background: none;
      font-family: var(--font-family) !important;
      text-align: var(--textAlign);
      color: var(--cl-text);
    }

    ::slotted(input) {
      border: none;
      width: 100%;
      outline: none;
      height: 100%;
      background: none;
      text-align: var(--textAlign);
      color: var(--cl-text);
      font-family: var(--font-family) !important;
    }

    .input-outter {
      display: flex;
      align-items: center;
      width: 100%;
    }
    .input-wrapper {
      border: 1px solid;
      padding: 6px 12px;
      border-radius: 8px;
      box-sizing: border-box;
      position: relative;
      transition: var(--theme-bg-transition);
      background: var(--background);
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
      top: 0;
      right: 0;
      color: #c9d4f1;
    }
    .text-error {
      color: #f3655c;
      font-weight: 400;
      font-size: 12px;
      position: absolute;
      left: 0;
      margin-top: 6px;
    }
    .detail-wrapper {
      position: relative;
    }

    .suggestion {
      color: #7386af;
      border-top: 1px solid #e7eeff;
      padding: 6px 0;
      display: flex;
      column-gap: 8px;
      align-items: center;
    }

    .suggest-choice {
      background-color: #e7eeff;
      padding: 5px 8px;
      border-radius: 8px;
      color: #3f527a;
      cursor: pointer;
      transition: background-color 0.125s;
    }

    .suggest-choice:active {
      background-color: #c8d6f8 !important;
    }

    .suggest-choice:hover {
      background-color: #dae4fd;
    }
  `;

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
  @property()
  unitGap = '12px';
  @property()
  backgroundColor?: string;
  @property()
  borderWidth?: string;
  @property()
  noPadding = false;
  @property()
  textAlign = 'left';
  @property()
  disabled = false;
  @property()
  longErrorMessage = false;
  @property()
  borderColor = 'var(--gray-400)';
  @property()
  suggest?: string[];
  @property({ type: Boolean })
  checkLength = false;
  @property({ type: Boolean })
  maxLengthStop = false;

  @property({ type: String })
  fontFamily: 'BaiJamjuree-Regular' | 'Sarabun-Regular' = 'Sarabun-Regular';

  private updateOnce = false;

  render() {
    return html`
      <style>
        :host {
          --textAlign: ${this.textAlign};
          --background: ${this.backgroundColor ?? (this.disabled ? 'var(--gray-200)' : 'var(--bg-input)')};
          --font-family: ${this.fontFamily};
        }
        ::slotted(textarea) {
          resize: ${this.resize};
          height: ${this.suggest ? this.height : '100%'} !important;
        }

        .label-text {
          margin-bottom: 12px ${this.error ? '; color: #F3655C' : ''};
        }

        .input-outter {
          column-gap: ${this.unitGap};
        }

        .input-wrapper {
          height: ${this.suggest ? '100%' : this.height};
          width: ${this.width};
        }

        .detail-wrapper {
          display: ${this.textError || this.maxLength ? 'block' : 'none'};
        }

        .text-length {
          color: ${this.textLength && this.maxLength && +this.textLength > +this.maxLength ? '#F3655C' : '#c9d4f1'};
        }

        .unit-text {
          margin-bottom: ${this.textError || this.maxLength ? '36px' : '0'};
        }
      </style>
      <div
        style="margin-bottom:12px ${this.error ? '; color: #F3655C' : ''} ${this.longErrorMessage
          ? '; overflow: visible'
          : ''}"
        ?hidden="${!this.label}"
      >
        ${this.label}
      </div>
      <div class="input-outter" style="column-gap: ${this.unitGap};">
        <div style="width: ${this.width || '100%'}">
          <div
            class="input-wrapper"
            style="border-color: ${(!this.disabled && this.error) ||
            (this.textLength && this.maxLength && this.textLength > this.maxLength)
              ? '#F3655C'
              : this.borderColor};
            ${this.borderWidth ? `border: ${this.borderWidth};` : ''}
            ${this.noPadding ? `padding: 0px;` : ''}"
          >
            <div class="input-icon-wrapper">
              <slot></slot>
            </div>
            ${this.suggest
              ? html`
                  <div class="suggestion">
                    <div>Suggestion:</div>
                    ${this.suggest.map(choice => {
                      return html`<div @click="${() => this.chooseSuggestion(choice)}" class="suggest-choice">
                        ${choice}
                      </div> `;
                    })}
                  </div>
                `
              : undefined}
          </div>
          <div class="detail-wrapper">
            <div
              class="text-error"
              ?hidden="${!(this.textError && this.error && !this.disabled)}"
              style="${this.longErrorMessage ? 'white-space: nowrap;position:relative' : 'position:relative'}"
            >
              <c-icon color="red" icon="icon-error" size="12"></c-icon>
              ${this.textError}
            </div>
            <div ?hidden="${!this.maxLength}" class="text-length">${this.textLength || 0}/${this.maxLength}</div>
          </div>
        </div>
        <div class="unit-text" ?hidden="${!this.unit}">${this.unit}</div>
      </div>
    `;
  }

  checkValueLength(inputElement: InputType) {
    this.textLength = inputElement.value.length;
  }

  updated() {
    if (this.updateOnce) return;
    const inputElement = this.firstElementChild as InputType;
    if (this.checkLength && this.maxLength) {
      inputElement.oninput = () => this.checkValueLength(inputElement);
      inputElement.oncut = () => this.checkValueLength(inputElement);
      inputElement.onpaste = () => this.checkValueLength(inputElement);
      this.updateOnce = true;
    }
  }

  chooseSuggestion(choice: string) {
    const inputElement = this.firstElementChild as InputType;

    this.inputWithCursorPosition(inputElement, choice);
    if (this.checkLength && this.maxLength) {
      this.checkValueLength(inputElement);
    }
    this.getValue(inputElement.value);
  }

  inputWithCursorPosition(inputElement: InputType, choice: string) {
    const inputStringArr = inputElement.value.split('');
    const selectSart = inputElement!.selectionStart!;
    if (!(this.maxLengthStop && inputStringArr.length + choice.length > this.maxLength!)) {
      inputStringArr.splice(selectSart, 0, choice);
      inputElement.value = inputStringArr.join('');
      inputElement.setSelectionRange(selectSart + choice.length, selectSart + choice.length);
      inputElement.focus();
    }
  }

  getValue(value: string) {
    customEvent(this, 'getValue', {
      value,
    });
  }
}

type InputType = HTMLInputElement | HTMLTextAreaElement;
