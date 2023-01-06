import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../ingredient/skeleton';
let PatientListSkeleton = class PatientListSkeleton extends LitElement {
    render() {
        return html ` <div></div> `;
    }
};
PatientListSkeleton.styles = css ``;
PatientListSkeleton = __decorate([
    customElement('c-patient-list-skeleton')
], PatientListSkeleton);
export { PatientListSkeleton };
//# sourceMappingURL=patient-list-skeleton.js.map