import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('c-float-content')
export class FloatContent extends LitElement {
  static styles = css``;
  render() {
    return html` <div>float content working!!</div> `;
  }
}
