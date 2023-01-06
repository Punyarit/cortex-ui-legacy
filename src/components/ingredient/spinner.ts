import '@material/mwc-circular-progress';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('c-spinner')
export class Spinner extends LitElement {
  @property()
  size = '0';
  render() {
    return html` <mwc-circular-progress indeterminate density="${this.size}"></mwc-circular-progress> `;
  }
}
