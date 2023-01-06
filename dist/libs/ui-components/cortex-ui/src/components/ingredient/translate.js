import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
let Translate = class Translate extends LitElement {
    render() {
        return html `
      <div id="translator">
        <slot></slot>
      </div>
    `;
    }
};
Translate = __decorate([
    customElement('c-translate')
], Translate);
export { Translate };
//# sourceMappingURL=translate.js.map