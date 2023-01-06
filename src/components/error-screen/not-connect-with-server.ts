import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { customEvent } from '../../helper/helper';
import '../ingredient/image';

@customElement('c-not-connect-with-server')
export class NotConnectWithServer extends LitElement {
  static styles = css`
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

  @property({ type: Object })
  config = {
    reload: true,
  };

  render() {
    return html`
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
    } else {
      customEvent(this, 'reload', {});
    }
  }
}
