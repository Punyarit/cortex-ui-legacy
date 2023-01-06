import { __decorate, __metadata } from "tslib";
import '@material/mwc-circular-progress';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let Spinner = class Spinner extends LitElement {
    constructor() {
        super(...arguments);
        this.size = '0';
    }
    render() {
        return html ` <mwc-circular-progress indeterminate density="${this.size}"></mwc-circular-progress> `;
    }
};
__decorate([
    property(),
    __metadata("design:type", Object)
], Spinner.prototype, "size", void 0);
Spinner = __decorate([
    customElement('c-spinner')
], Spinner);
export { Spinner };
//# sourceMappingURL=spinner.js.map