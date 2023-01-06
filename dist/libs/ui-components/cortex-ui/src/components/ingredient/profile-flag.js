import { __decorate, __metadata } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
var PatientFlagsIcon;
(function (PatientFlagsIcon) {
    PatientFlagsIcon["ALLERGIES"] = "u_tablets";
    PatientFlagsIcon["COMMUNICATE"] = "u_comment-dots";
    PatientFlagsIcon["SAFETY"] = "u_heart-medical";
    PatientFlagsIcon["SPECIAL_CARE"] = "u_star";
    PatientFlagsIcon["MKT"] = "u_megaphone";
})(PatientFlagsIcon || (PatientFlagsIcon = {}));
let ProfileFlag = class ProfileFlag extends LitElement {
    constructor() {
        super(...arguments);
        this.flags = [];
        this.padding = '0 16px';
    }
    render() {
        return html `
      <style>
        :host {
          --padding: ${this.padding};
        }
      </style>
      <div class="flags-list-wrapper">
        <c-icon icon="fi_flag" color="var(--gray-600)"></c-icon>
        <span>Flag : </span>

        ${this.flags?.map(flag => html `
            <div @click="${() => this.flagAction()}" class="flag-wrapper">
              <c-icon icon="${PatientFlagsIcon[flag]}" size="16"></c-icon>
            </div>
          `)}
      </div>
    `;
    }
    flagAction() {
        this.dispatchEvent(new CustomEvent('flag', {
            bubbles: true,
        }));
    }
};
ProfileFlag.styles = css `
    .flags-list-wrapper {
      display: flex;
      align-items: center;
      column-gap: 8px;
      padding: var(--padding);
    }

    .flags-list-wrapper:nth-child(2), /* flag icon */
    .flags-list-wrapper:nth-child(3) /* flag text */ {
      color: #7386af;
    }

    .flag-wrapper {
      cursor: pointer;
      background: #fff4e7;
      padding: 4px;
      border-radius: 4px;
      width: 28px;
      height: 28px;
      box-sizing: border-box;
      color: #ff8c04;
      transition: background 0.125s;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .flag-wrapper:active {
      background: #ebf0fa;
    }
  `;
__decorate([
    property({
        type: Array,
    }),
    __metadata("design:type", Object)
], ProfileFlag.prototype, "flags", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ProfileFlag.prototype, "padding", void 0);
ProfileFlag = __decorate([
    customElement('c-profile-flag')
], ProfileFlag);
export { ProfileFlag };
//# sourceMappingURL=profile-flag.js.map