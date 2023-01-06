import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
@customElement('c-content-skeleton')
export class ContentSkeleton extends LitElement {
  static styles = css``;
  render() {
    return html` <div>content-skeleton!</div> `;
  }
}
