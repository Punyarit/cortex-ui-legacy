import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import './image';
let Unauthorization = class Unauthorization extends LitElement {
    render() {
        return html `
      <div class="wrapper">
        <c-image .draggable="${false}" src="unauthorization"></c-image>
        <h3>ขอโทษด้วยคุณไม่สามารถเข้าถึงหน้านี้ได้</h3>
        <span>ลองตรวจสอบความถูกต้อง</span><span>หรือสิทธิในการเข้าถึงของคุณอีกครั้ง</span>
      </div>
    `;
    }
};
Unauthorization.styles = css `
    .wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 400px;
      color: var(--cl-title);
      user-select: none;
      cursor: default;
    }
  `;
Unauthorization = __decorate([
    customElement('c-unauthorization')
], Unauthorization);
export { Unauthorization };
//# sourceMappingURL=unauthorization.js.map