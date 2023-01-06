import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
let ProfileMenu = class ProfileMenu extends LitElement {
    render() {
        return html ` <div class="profile">c-profile.menu component was created!!</div> `;
    }
};
ProfileMenu.styles = css `
    .profile {
      width: 320px;
      height: 100%;
      background: pink;
    }
  `;
ProfileMenu = __decorate([
    customElement('c-profile-menu')
], ProfileMenu);
export { ProfileMenu };
//# sourceMappingURL=profile-menu.js.map