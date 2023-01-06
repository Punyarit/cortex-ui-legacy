import '@material/mwc-checkbox';
import { CheckboxBase } from '@material/mwc-checkbox/mwc-checkbox-base';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { customEvent } from '../../helper/helper';
@customElement('c-checkbox')
export class Checkbox extends LitElement {
  static styles = css`
    .checkbox-wrapper {
      display: inline-block;
      background: var(--c-checkbox-background);
      width: 18px;
      height: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border-radius: 2px;
    }
  `;

  @property({ type: Object })
  checked = false;

  @property({ type: Object })
  disabled = false;

  @property({ type: Object })
  styles = {
    border: 'var(--gray-400)',
    disabledColor: 'var(--gray-500)',
    checkedBackground: 'var(--gray-600)',
    background: 'var(--bg-content)',
  };

  render() {
    return html`
      <style>
        :host {
          --mdc-checkbox-unchecked-color: ${this.styles.border};
          --mdc-checkbox-disabled-color: ${this.styles.disabledColor};
          --mdc-theme-secondary: ${this.styles.checkedBackground};
          --c-checkbox-background: ${this.styles.background};
        }
      </style>
      <div class="checkbox-wrapper">
        <mwc-checkbox
          .disabled="${this.disabled}"
          .checked="${this.checked}"
          @change="${(e: Event) => this.onChange(e)}"
        ></mwc-checkbox>
      </div>
    `;
  }

  onChange(e: Event) {
    customEvent(this, 'change', {
      checked: (e.composedPath()[0] as CheckboxBase).checked,
    });
  }
}
