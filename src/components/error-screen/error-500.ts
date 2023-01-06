import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../ingredient/image';

@customElement('c-error-500')
export class Error500 extends LitElement {
  static styles = css`
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

  render() {
    return html`
      <div class="error-wrapper">
        <c-image .draggable="${false}" src="not-connect-server-2"></c-image>
        <div class="text-1">ขออภัย ไม่พบการเชื่อมต่อ</div>
        <div class="text-2">พบข้อผิดพลาด ลอง refresh หน้านี้อีกครั้ง</div>
      </div>
    `;
  }
}
