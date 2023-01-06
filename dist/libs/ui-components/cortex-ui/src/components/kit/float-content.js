import { __decorate } from "tslib";
import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
let FloatContent = class FloatContent extends LitElement {
    render() {
        return html ` <div>float content working!!</div> `;
    }
};
FloatContent.styles = css ``;
FloatContent = __decorate([
    customElement('c-float-content')
], FloatContent);
export { FloatContent };
//# sourceMappingURL=float-content.js.map