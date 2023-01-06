import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../ingredient/image';
let Error401 = class Error401 extends LitElement {
    render() {
        return html `
      <div class="error-wrapper">
        <c-image .draggable="${false}" src="unauthorization"></c-image>
        <div class="text-1">ขออภัย คุณไม่สามารถเข้าถึงหน้านี้ได้</div>
        <div class="text-2">ลองตรวจสอบความถูกต้องหรือสิทธิ์ในการเข้าถึงของคุณอีกครั้ง</div>
      </div>
    `;
    }
};
Error401.styles = css `
    .error-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      row-gap: 16px;
      margin-bottom: 60px;
    }

    .text-1 {
      color: var(--gray-700);
      font-weight: var(--font-semibold);
      font-size: var(--fs-18);
    }

    .text-2 {
      color: var(--gray-600);
    }

    .text-refresh {
      color: var(--color-5-500);
      cursor: pointer;
      user-select: none;
      transition: color 0.125s;
    }

    .text-refresh:active {
      color: var(--color-5-600);
    }
  `;
Error401 = __decorate([
    customElement('c-error-401')
], Error401);
export { Error401 };
//# sourceMappingURL=error-401.js.map