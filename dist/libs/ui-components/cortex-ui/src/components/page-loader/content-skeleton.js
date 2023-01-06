import { __decorate } from "tslib";
import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
let ContentSkeleton = class ContentSkeleton extends LitElement {
    render() {
        return html ` <div>content-skeleton!</div> `;
    }
};
ContentSkeleton.styles = css ``;
ContentSkeleton = __decorate([
    customElement('c-content-skeleton')
], ContentSkeleton);
export { ContentSkeleton };
//# sourceMappingURL=content-skeleton.js.map