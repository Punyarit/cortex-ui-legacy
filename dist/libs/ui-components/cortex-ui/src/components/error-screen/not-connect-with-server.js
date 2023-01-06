import { __decorate, __metadata } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { customEvent } from '../../helper/helper';
import '../ingredient/image';
let NotConnectWithServer = class NotConnectWithServer extends LitElement {
    constructor() {
        super(...arguments);
        this.config = {
            reload: true,
        };
    }
    render() {
        return html `
      <div class="error-wrapper">
        <c-image .draggable="${false}" src="not-connect-with-server-small"></c-image>
        <div class="text-1">ขออภัย ไม่พบการเชื่อมต่อ</div>
        <div class="text-2">ลอง refresh หน้านี้อีกครั้ง</div>
        <div @click="${this.reloadPage}" class="text-refresh">รีเฟรชอีกครั้ง</div>
      </div>
    `;
    }
    reloadPage() {
        if (this.config.reload) {
            window.location.reload();
        }
        else {
            customEvent(this, 'reload', {});
        }
    }
};
NotConnectWithServer.styles = css `
    .error-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      row-gap: 16px;
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
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], NotConnectWithServer.prototype, "config", void 0);
NotConnectWithServer = __decorate([
    customElement('c-not-connect-with-server')
], NotConnectWithServer);
export { NotConnectWithServer };
//# sourceMappingURL=not-connect-with-server.js.map