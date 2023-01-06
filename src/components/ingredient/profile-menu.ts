import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('c-profile-menu')
export class ProfileMenu extends LitElement {
  static styles = css`
    .profile {
      width: 320px;
      height: 100%;
      background: pink;
    }
  `;

  render() {
    return html` <div class="profile">c-profile.menu component was created!!</div> `;
  }
}
