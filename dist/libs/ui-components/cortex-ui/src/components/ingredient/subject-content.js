import { __decorate, __metadata } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let SubjectContent = class SubjectContent extends LitElement {
    constructor() {
        super(...arguments);
        this.label = '';
        this.type = 'label';
    }
    render() {
        return html `
      <div class="subject-wrapper">
        <div class="type-${this.type}" style="color: ${this.error ? '#F3655C' : 'unset'}">${this.label}</div>
        <slot name="button"></slot>
      </div>
    `;
    }
};
SubjectContent.styles = css `
    .subject-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .type-label {
      font-size: 20px;
      font-weight: 600;
    }

    .type-sub-label {
      font-size: 18px;
      font-weight: 600;
      color: #7386af;
    }
  `;
__decorate([
    property(),
    __metadata("design:type", Object)
], SubjectContent.prototype, "label", void 0);
__decorate([
    property(),
    __metadata("design:type", Boolean)
], SubjectContent.prototype, "error", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], SubjectContent.prototype, "type", void 0);
SubjectContent = __decorate([
    customElement('c-subject-content')
], SubjectContent);
export { SubjectContent };
//# sourceMappingURL=subject-content.js.map