import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('c-divider')
export class Divider extends LitElement {
  static styles = css`
    .divider {
      border: none;
      width: 100%;
      transition: var(--theme-bg-transition);
      background-color: var(--background-color);
    }
  `;

  @property()
  gap = '12px';

  @property()
  size = '1px';

  @property()
  color = 'var(--bg-divider)';

  render() {
    return html`
      <style>
        :host {
          --background-color: ${this.color};
        }
      </style>
      <div class="divider" style="margin: ${this.gap} 0; height: ${this.size}"></div>
    `;
  }
}
