import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('c-profile-skeleton')
export class SettingSkeleton extends LitElement {
  static styles = css``;
  render() {
    return html` <div>setting-skeleton!</div> `;
  }
}
