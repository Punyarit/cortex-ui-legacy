import { __decorate, __metadata } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { findEmptySlot, timeout } from '../../helper/helper';
let Dialog = class Dialog extends LitElement {
    constructor() {
        super(...arguments);
        this.disableBackdrop = false;
        this.zIndex = 'auto';
        this.padding = '40px';
        this.width = 'fit-content';
        this.top = 'auto';
        this.dialogOpen = false;
        this.radius = '16px';
        this.dialogScroll = true;
        this.onKeyupEvent = (e) => {
            if (!this.disableBackdrop) {
                e.key === 'Escape' && this.closeDialog();
            }
        };
        this.onClickEvent = (event) => {
            event.target.id === 'dialog-wrapper' && this.disableBackdrop === false && this.closeDialog();
        };
    }
    render() {
        return html `
      <style>
        :host {
          --zIndex: ${this.zIndex};
          --padding: ${this.padding};
          --width: ${this.width};
          --height: ${this.height ?? 'auto'};
          --top: ${this.top};
          --display: ${this.top === 'auto' ? 'flex' : 'block'};
          --radius: ${this.radius};
          --overflow: ${this.dialogScroll ? 'overlay' : 'hidden'};
        }
      </style>
      <slot name="dialog"></slot>

      ${this.dialogOpen
            ? html ` <div id="dialog-wrapper">
            <dialog ?open="${this.dialogOpen}">
              <slot></slot>
              <div ?hidden="${this.emptySlot?.primaryAction || this.emptySlot?.secondaryAction}" class="button-wrapper">
                <slot name="secondaryAction"></slot>
                <slot name="primaryAction"></slot>
              </div>
            </dialog>
          </div>`
            : undefined}
    `;
    }
    connectedCallback() {
        super.connectedCallback();
        const wrapper = this.shadowRoot?.querySelector('#dialog-wrapper');
        document.addEventListener('keyup', this.onKeyupEvent);
        wrapper?.addEventListener('click', this.onClickEvent);
    }
    firstUpdated() {
        const slots = this.shadowRoot?.querySelectorAll('slot');
        if (slots) {
            this.emptySlot = findEmptySlot(slots);
            this.shadowRoot?.host?.remove();
        }
    }
    updated() {
        // added class no-print to prevent c-dialog from overlapping with c-print.
        const cDialog = this.shadowRoot?.host;
        cDialog?.classList?.add('no-print');
        const wrapper = this.shadowRoot?.querySelector('#dialog-wrapper');
        const dialog = this.shadowRoot?.querySelector('dialog');
        const parentElement = document.body?.querySelector('c-theme');
        const dialogHost = this.shadowRoot?.host;
        // if (wrapper && dialog && parentElement && dialogHost) {
        if (wrapper && dialog) {
            const hasVerticalScrollbar = wrapper?.scrollHeight > wrapper?.clientHeight;
            this.open && this.handleScroll(dialog, hasVerticalScrollbar);
        }
        if (this.open) {
            this.dialogOpen = true;
            wrapper?.classList?.add('fade-bg-in');
            wrapper?.classList?.add('fill-mode-out');
            if (dialogHost) {
                parentElement?.appendChild(dialogHost);
            }
        }
        else if (this.dialogOpen) {
            const dialog = this.shadowRoot?.querySelector('dialog');
            dialog?.classList?.remove('fill-mode-out');
            dialog?.classList?.add('fade-out');
            wrapper?.classList?.add('fade-bg-out');
            wrapper?.classList?.remove('fill-mode-out');
            timeout(200).then(() => {
                dialog?.classList?.add('fill-mode-out');
                dialog?.classList?.remove('fade-out');
                this.dialogOpen = false;
                this.shadowRoot?.host?.remove();
            });
        }
        // }
    }
    openDialog() {
        this.open = true;
    }
    handleScroll(dialog, hasVerticalScrollbar) {
        if (!dialog)
            return;
        if (hasVerticalScrollbar) {
            dialog.style.bottom = '20px';
            dialog.style.marginTop = '40px';
        }
        else {
            dialog.style.top = this.top;
            dialog.style.marginBottom = 'auto';
        }
    }
    closeDialog() {
        if (this.open) {
            this.open = false;
            this.dispatchEvent(new CustomEvent('status', {
                detail: {
                    open: false,
                },
                bubbles: true,
            }));
            this.dispatchEvent(new CustomEvent('afterclose'));
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('keyup', this.onKeyupEvent);
        const wrapper = this.shadowRoot?.querySelector('#dialog-wrapper');
        wrapper?.removeEventListener('click', this.onClickEvent);
        !this.disableBackdrop && window.removeEventListener('click', this.closeDialog);
        window.removeEventListener('keydown', this.closeDialog);
    }
};
Dialog.styles = css `
    :host {
      position: absolute;
      z-index: var(--zIndex);
    }
    #dialog-wrapper {
      display: var(--display);
      position: fixed;
      top: 0px;
      left: 0px;
      /* align-items: center;
      justify-content: center; */
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      z-index: 100;
      /* transition: visibility 0.2s, opacity 0.2s; */
      background: #29385980;
      overflow: var(--overflow);
    }

    .button-wrapper {
      display: flex;
      column-gap: 12px;
      width: 100%;
      justify-content: center;
    }

    dialog {
      position: relative;
      border: none;
      /* overflow: hidden; */
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      animation: slideY 0.35s ease forwards;
      background: var(--bg-content);
      padding: var(--padding);
      transition: 0.2s, var(--theme-bg-transition);
      width: var(--width);
      height: var(--height);
    }

    @keyframes slideY {
      0% {
        transform: translate(0, -10%);
      }
      99% {
        transform: translate(0, 0%);
      }
      100% {
        /* need to set defailt value coz transform affects some elements  */
        transform: none;
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

    .fade-out {
      transform: none !important;
      animation: fade-out 0.2s ease;
      animation-fill-mode: forwards;
    }

    .fill-mode-out {
      animation-fill-mode: none !important;
    }

    @keyframes fade-out {
      0% {
        opacity: 1;
        transform: scale(1);
      }

      99% {
        opacity: 0;
        transform: scale(0.6);
      }

      100% {
        transform: none;
      }
    }

    .fade-bg-in {
      animation: fade-bg-in 0.2s ease;
      animation-fill-mode: forwards;
    }

    .fade-bg-out {
      animation: fade-bg-out 0.2s ease;
      animation-fill-mode: forwards;
    }

    @keyframes fade-bg-in {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }
    @keyframes fade-bg-out {
      from {
        opacity: 1;
      }

      to {
        opacity: 0;
      }
    }
  `;
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Boolean)
], Dialog.prototype, "open", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Dialog.prototype, "emptySlot", void 0);
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Boolean)
], Dialog.prototype, "loading", void 0);
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Object)
], Dialog.prototype, "disableBackdrop", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Dialog.prototype, "zIndex", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Dialog.prototype, "padding", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Dialog.prototype, "width", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Dialog.prototype, "height", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Dialog.prototype, "top", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Dialog.prototype, "dialogOpen", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Dialog.prototype, "radius", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], Dialog.prototype, "dialogScroll", void 0);
Dialog = __decorate([
    customElement('c-dialog')
], Dialog);
export { Dialog };
//# sourceMappingURL=dialog.js.map