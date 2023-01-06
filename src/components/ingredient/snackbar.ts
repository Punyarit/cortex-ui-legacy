import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { timeout } from '../../helper/helper';

@customElement('c-snackbar')
export class Snackbar extends LitElement {
  static styles = css`
    :host {
      z-index: var(--z-index);
    }
    .snackbar-wrapper {
      display: flex;
      align-items: center;
      column-gap: 14px;
    }

    .snackbar-message {
      font-size: 20px;
      font-weight: 600;
    }

    dialog {
      position: fixed;
      top: var(--top);
      bottom: var(--bottom);
      left: 0;
      z-index: 999;
      border: none;
      overflow: hidden;
      border-radius: 8px;
      box-shadow: var(--shadow);
      animation: slideY 0.35s ease forwards;
      padding: var(--padding);
      background: var(--bg-content);
      color: white;
    }

    .dialog-close {
      animation: slideYOut 0.35s ease forwards;
    }

    @keyframes slideYOut {
      from {
        opacity: 1;
        transform: translate(0, var(--translate-out-from));
      }
      to {
        opacity: 0;
        transform: translate(0, var(--translate-out-to));
      }
    }

    @keyframes slideY {
      from {
        opacity: 0;
        transform: translate(0, var(--translate-in-from));
      }
      to {
        opacity: 1;
        transform: translate(0, var(--translate-in-to));
      }
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #8ba3b8;
    }

    /* width */
    ::-webkit-scrollbar {
      width: 10px;
      height: 8px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #bbc5ce;
      border-radius: 10px;
    }
  `;

  @property({
    type: Object,
  })
  open?: boolean;

  @property()
  duration = '5';

  @property()
  bgColor = '#2AC78E';

  @property()
  position: 'top' | 'bottom' = 'top';

  @property()
  padding = '22px 62px';

  @property()
  zIndex = 9999;

  render() {
    return html`
      <style>
        :host {
          --top: ${this.position === 'top' ? '64px' : 'auto'};
          --bottom: ${this.position === 'bottom' ? '32px' : 'auto'};
          --translate-out-from: ${this.position === 'top' ? '0%' : '-20%'};
          --translate-out-to: ${this.position === 'top' ? '-20%' : '0%'};
          --translate-in-from: ${this.position === 'top' ? '-20%' : '0%'};
          --translate-in-to: ${this.position === 'top' ? '0%' : '-20%'};

          --padding: ${this.padding};
          --z-index: ${this.zIndex};
        }
      </style>
      <dialog ?open="${this.open}" style="background-color: ${this.bgColor}">
        <div class="snackbar-wrapper">
          <slot></slot>
          <span class="snackbar-message">
            <slot name="message"></slot>
          </span>
        </div>
      </dialog>
    `;
  }

  async updated(): Promise<void> {
    if (this.open) {
      await timeout(+(this.duration + '000'));
      this.closeDialog();
    }
  }

  async closeDialog(): Promise<void> {
    const dialog = this.shadowRoot?.querySelector('dialog');
    dialog.classList.add('dialog-close');
    await timeout(350);
    dialog.classList.remove('dialog-close');
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('snackbarClose', {
        detail: {
          open: false,
        },
        bubbles: true,
      })
    );
  }
}
