import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('c-tooltip')
export class Tooltip extends LitElement {
  static styles = css`
    span {
      display: inline-grid;
      place-items: center;
    }
    .tooltip-wrapper {
      position: relative;
    }
  `;

  @property()
  message?: string;

  @state()
  clientX?: number;

  @state()
  clientY?: number;

  @property()
  delay = '175';

  @property()
  delayOut = '0';

  @property()
  position: 'left' | 'center' | 'center-item' | 'right' | 'default' = 'default';

  @property()
  withDialog = false;

  render() {
    return html`
      <style>
        .icon-tooltip::before,
        .icon-tooltip::after {
          position: absolute;
          content: '';
          transition: opacity 0.275s, transform 0.275s;
          transition-delay: ${this.delayOut}ms;
          opacity: 0;
          transform: translate(0, -12px);
          pointer-events: none;
        }
        .icon-tooltip:hover::before {
          opacity: 1;
          transform: translate(0, 6px);
          transition-delay: ${this.delay}ms;
        }

        .icon-tooltip::before {
          font-family: Sarabun-Regular;
          content: attr(data-tooltip);
          color: white;
          padding: 12px;
          width: max-content;
          background: #3f527a;
          border-radius: 6px;
          z-index: 999;
          left: ${this.clientX}px;
          top: ${this.clientY}px;
          position: fixed;
        }
      </style>
      <span
        @mouseover="${(e: MouseEvent) => this.mouseOver(e)}"
        data-tooltip="${this.message}"
        class="tooltip-wrapper ${this.message && 'icon-tooltip'}"
      >
        <slot></slot>
      </span>
    `;
  }

  async mouseOver(e: MouseEvent) {
    const tooltipWrapper = this.shadowRoot?.querySelector('.tooltip-wrapper') as HTMLElement;
    const contentPosition = tooltipWrapper?.getBoundingClientRect();
    if (tooltipWrapper) {
      const tooltip = window.getComputedStyle(tooltipWrapper, ':before');
      const tooltipWith = tooltip?.width?.replace('px', '');
      const tooltipHeight = tooltip?.height?.replace('px', '');

      // regex: replace(/\px/g, '');

      // tooltipWith + (padding-left 12px + padding-right 12px)
      const realTooltipWidth = +tooltipWith + 24;
      const realTooltipHeight = +tooltipHeight + 24;

      switch (this.position) {
        case 'left':
          this.clientX = contentPosition.left;
          break;

        case 'center':
          this.clientX = contentPosition.width / 2 + contentPosition.left;
          break;

        // (ตำแหน่งกลางของ content) - (ตำแหน่งกลางของ tooltip)
        case 'center-item':
          this.clientX = contentPosition.width / 2 + contentPosition.left - realTooltipWidth / 2;
          // กรณีที่ clientX มีค่า < 0 จะทะลุกรอบออกไป
          this.clientX <= 0 && (this.clientX = 6);

          break;

        case 'right':
          this.clientX = contentPosition.right;
          break;

        default:
          this.clientX = e.clientX;
          break;
      }

      // เช็คว่าจะเกินขอบขวาหน้าจอไหม
      if (contentPosition.right + realTooltipWidth > document.body.clientWidth) {
        this.clientX = contentPosition.right - realTooltipWidth;
      }

      // เช็คว่าจะตกขอบล่างหน้าจอไหม
      if (contentPosition.bottom + realTooltipHeight > document.body.clientHeight) {
        // 12 เป็นพื้นที่ที่เพิ่มขึ้นใหม่ เพื่อไม่ให้ tooltip กับ content ติดกันเกินไป *เฉพาะ tooltip ที่ตกขอบล่่าง
        this.clientY = contentPosition.top - realTooltipHeight - 12;
      } else {
        this.clientY = contentPosition.top + contentPosition.height;
      }

      if (this.withDialog) {
        const cTheme = document.body.querySelector('c-theme');
        const cDialog = cTheme?.querySelector('c-dialog');
        const dialog = cDialog?.shadowRoot?.querySelector('dialog');

        if (dialog) {
          const dialogRect = dialog?.getBoundingClientRect();
          this.clientX -= dialogRect?.left;
          this.clientY -= dialogRect?.top;
        }
      }
    }
  }
}
