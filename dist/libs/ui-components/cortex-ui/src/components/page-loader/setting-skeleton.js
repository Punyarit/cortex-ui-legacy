import { __decorate } from "tslib";
import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
let SettingSkeleton = class SettingSkeleton extends LitElement {
    render() {
        return html ` <div>setting-skeleton!</div> `;
    }
};
SettingSkeleton.styles = css ``;
SettingSkeleton = __decorate([
    customElement('c-profile-skeleton')
], SettingSkeleton);
export { SettingSkeleton };
//# sourceMappingURL=setting-skeleton.js.map