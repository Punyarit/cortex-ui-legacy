import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('c-translate')
export class Translate extends LitElement {
  render() {
    return html`
      <div id="translator">
        <slot></slot>
      </div>
    `;
  }
}
