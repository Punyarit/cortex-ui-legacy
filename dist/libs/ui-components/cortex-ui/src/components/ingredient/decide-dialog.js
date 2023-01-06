import { __decorate, __metadata } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { findEmptySlot, timeout } from '../../helper/helper';
let DecideDialog = class DecideDialog extends LitElement {
    constructor() {
        super(...arguments);
        this.primaryActionIconColor = '#FFFFFF';
        this.dialogOpen = false;
        this.radius = '16px';
        this.disableBackdrop = false;
    }
    render() {
        return html `
      <style>
        :host {
          --radius: ${this.radius};
        }
      </style>
      ${this.dialogOpen
            ? html `
      <div id="dialog-wrapper">
        <dialog ?open="${this.dialogOpen}">
          <div class="dialog-message">
            <div class="dialog-title">
              <slot name="title"></slot>
            </div>
            <div class="dialog-detail">
              <slot name="detail"></slot>
            </div>
          </div>
          <div class="button-wrapper">
            <c-button @click="${() => this.actionEvent('secondaryAction')}" buttonHeight="48"
              type="${this.secondaryActionType}">
              ${this.secondaryActionText}
            </c-button>
            <c-button @click="${() => this.actionEvent('primaryAction')}" buttonHeight="48"
              type="${this.primaryActionType}">
              ${this.primaryActionIconName
                ? html `<c-icon icon="${this.primaryActionIconName}" color="${this.primaryActionIconColor}" size="${this.primaryActionIconSize}"/></c-icon>`
                : html ``}
              ${this.primaryActionText}
            </c-button>
        </dialog>
      </div>`
            : undefined}
    `;
    }
    connectedCallback() {
        super.connectedCallback();
        const wrapper = this.shadowRoot?.querySelector('#dialog-wrapper');
        document.addEventListener('keydown', e => {
            if (!this.disableBackdrop) {
                e.key === 'Escape' && this.closeDialog();
            }
        });
        wrapper?.addEventListener('click', event => {
            event.target.id === 'dialog-wrapper' && !this.disableBackdrop && this.closeDialog();
        });
    }
    firstUpdated() {
        const slots = this.shadowRoot?.querySelectorAll('slot');
        this.emptySlot = findEmptySlot(slots);
        // this.shadowRoot.host.remove();
    }
    async updated() {
        const wrapper = this.shadowRoot?.querySelector('#dialog-wrapper');
        const parentElement = document.body.querySelector('c-theme');
        if (this.open) {
            this.dialogOpen = true;
            wrapper?.classList.add('fade-bg-in');
            wrapper?.classList.add('fill-mode-out');
            parentElement?.appendChild(this.shadowRoot.host);
        }
        else if (this.dialogOpen) {
            const dialog = this.shadowRoot?.querySelector('dialog');
            dialog?.classList.remove('fill-mode-out');
            dialog?.classList.add('fade-out');
            wrapper?.classList.add('fade-bg-out');
            wrapper?.classList.remove('fill-mode-out');
            timeout(200).then(() => {
                dialog?.classList.add('fill-mode-out');
                dialog?.classList.remove('fade-out');
                this.dialogOpen = false;
                this.shadowRoot.host.remove();
            });
        }
    }
    actionEvent(event) {
        this.dispatchEvent(new CustomEvent(event, {
            bubbles: true,
        }));
    }
    closeDialog() {
        this.open = false;
        this.dispatchEvent(new CustomEvent('status', {
            detail: {
                open: false,
            },
            bubbles: true,
        }));
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        !this.disableBackdrop && window.removeEventListener('click', this.closeDialog);
        window.removeEventListener('keydown', this.closeDialog);
    }
};
DecideDialog.styles = css `
    :host {
      position: absolute;
      z-index: var(--zIndex);
    }

    #dialog-wrapper {
      display: flex;
      position: fixed;
      top: 0px;
      left: 0px;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      z-index: 9999;
      transition: visibility 0.2s, opacity 0.2s;
      background: #29385980;
      overflow: overlay;
    }

    .button-wrapper {
      display: flex;
      column-gap: 12px;
      width: 100%;
      justify-content: center;
    }

    .dialog-bg {
      height: 100%;
      width: 100%;
      z-index: -1;
    }

    .dialog-message {
      font-size: 24px;
      max-width: 365px;
      text-align: center;
      font-weight: 600;
      margin-bottom: 30px;
      color: var(--cl-text);
    }

    .dialog-message .dialog-title {
      margin-bottom: 16px;
    }

    .dialog-message .dialog-detail {
      font-size: 18px;
      max-width: 365px;
      text-align: center;
      font-weight: 500;
      line-height: 28px;
      color: var(--cl-text-2);
    }

    dialog {
      position: relative;
      border: none;
      /* overflow: hidden; */
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      animation: slideY 0.35s ease forwards;
      background: var(--bg-content);
      padding: 40px;
      transition: 0.2s;
    }

    @keyframes slideY {
      0% {
        transform: translate(0, -20%);
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
      from {
        opacity: 1;
        transform: scale(1);
      }

      to {
        opacity: 0;
        transform: scale(0.6);
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
], DecideDialog.prototype, "open", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], DecideDialog.prototype, "emptySlot", void 0);
__decorate([
    property(),
    __metadata("design:type", Boolean)
], DecideDialog.prototype, "loading", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], DecideDialog.prototype, "message", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], DecideDialog.prototype, "primaryActionText", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], DecideDialog.prototype, "primaryActionIconName", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], DecideDialog.prototype, "primaryActionIconSize", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], DecideDialog.prototype, "primaryActionIconColor", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], DecideDialog.prototype, "secondaryActionText", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], DecideDialog.prototype, "primaryActionType", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], DecideDialog.prototype, "secondaryActionType", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], DecideDialog.prototype, "dialogOpen", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], DecideDialog.prototype, "radius", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], DecideDialog.prototype, "disableBackdrop", void 0);
DecideDialog = __decorate([
    customElement('c-decide-dialog')
], DecideDialog);
export { DecideDialog };
//# sourceMappingURL=decide-dialog.js.map