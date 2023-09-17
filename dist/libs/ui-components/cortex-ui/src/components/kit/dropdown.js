import { __decorate, __metadata } from "tslib";
/* eslint-disable */
import { MenuBase } from '@material/mwc-menu/mwc-menu-base';
import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { timeout } from '../../helper/helper';
import('@material/mwc-menu');
let Dropdown = class Dropdown extends LitElement {
    constructor() {
        super(...arguments);
        this.fixed = false;
        this.event = 'click';
        this.cursor = 'default';
        this.type = 'deflat';
        this.position = 'BOTTOM_LEFT';
        this.withArrow = false;
        this.hold = true;
        this.delay = '500';
        this.width = undefined;
        this.withDialog = false;
        this.updateOnce = false;
        this.disabled = false;
        this.showMenu = () => {
            const menuWrapper = this.shadowRoot?.querySelector('.dropdown-wrapper');
            const mwcMenu = this.shadowRoot?.querySelector('#mwcMenu');
            const menuSurface = mwcMenu?.shadowRoot
                ?.querySelector('mwc-menu-surface')
                ?.shadowRoot?.querySelector('.mdc-menu-surface');
            const menuList = mwcMenu?.shadowRoot?.querySelector('mwc-list')?.shadowRoot?.querySelector('.mdc-deprecated-list');
            if (menuWrapper && mwcMenu && menuSurface && menuList) {
                // fix scroll and shadow
                menuSurface.style.overflow = 'visible';
                menuSurface.style.borderRadius = '8px';
                menuSurface.style.overflow = 'hidden';
                menuSurface.style.boxShadow = '0px 2px 8px #2a39590a, 0px 16px 32px #3f527a1f';
                menuSurface.style.zIndex = '9999';
                menuList.style.padding = 'var(--mdc-list-vertical-padding, 0) 0';
                if (this.fixed) {
                    const menuClientRect = menuWrapper.getBoundingClientRect();
                    if (this.withDialog) {
                        const host = this.shadowRoot?.host;
                        host.style.setProperty('--with-dialog-left', `0`);
                        host.style.setProperty('--with-dialog-top', `0`);
                        mwcMenu.classList.add('with-dialog');
                        timeout(0).then(() => {
                            const mwcMenu = this.shadowRoot?.querySelector('#mwcMenu');
                            const mwcRect = mwcMenu.getBoundingClientRect();
                            if (this.withArrow) {
                                host.style.setProperty('--with-dialog-left', `${menuClientRect.x - mwcRect.x - 15}px`);
                                host.style.setProperty('--with-dialog-top', `${menuClientRect.y - mwcRect.y + menuClientRect.height + 15}px`);
                                host.style.setProperty('--with-arrow-left', `${menuClientRect.x - mwcRect.x}px`);
                                host.style.setProperty('--with-arrow-top', `${menuClientRect.y - mwcRect.y + menuClientRect.height - 15}px`);
                                mwcMenu.classList.add('with-arrow');
                            }
                            else {
                                host.style.setProperty('--with-dialog-left', `${menuClientRect.x - mwcRect.x}px`);
                                host.style.setProperty('--with-dialog-top', `${menuClientRect.y - mwcRect.y + menuClientRect.height}px`);
                                mwcMenu.classList.add('with-dialog');
                            }
                        });
                    }
                    else {
                        mwcMenu.fixed = true;
                        if (this.position === 'BOTTOM_LEFT') {
                            mwcMenu.x = menuClientRect.left / 2;
                            mwcMenu.y = (menuClientRect.top + menuClientRect.height) / 2;
                        }
                        else if (this.position === 'TOP_LEFT') {
                            mwcMenu.x = menuClientRect.left / 2;
                            mwcMenu.y = menuClientRect.top / 2;
                        }
                    }
                }
                else {
                    mwcMenu.anchor = menuWrapper;
                    mwcMenu.corner = this.position;
                }
                if (!this.minWidth) {
                    this.minWidth = `${menuWrapper.offsetWidth}px`;
                }
                mwcMenu.show();
            }
        };
    }
    render() {
        return html `
      <style>
        .dropdown-wrapper {
          cursor: ${this.cursor};
          min-width: ${this.minWidth};
        }
        .menu-width {
          min-width: calc(${this.minWidth} - 8px);
        }
      </style>
      <div class="custom-dropdown" style="${this.width ? `width: ${this.width};` : ''}">
        <div class="dropdown-wrapper" @mouseover="${this.mouseOVer}" @mouseout="${this.mouseOut}">
          <slot></slot>
        </div>
        ${this.disabled
            ? undefined
            : html ` <mwc-menu
              id="mwcMenu"
              @opened="${() => this.dropdownTrigger('opened')}"
              @closed="${() => {
                this.removeArrow();
                this.dropdownTrigger('closed');
            }}"
            >
              <div
                id="dropdown-item-wrapper"
                @click="${this.selfClick}"
                @mouseover="${this.mouseOVer}"
                @mouseout="${this.mouseOut}"
              >
                <slot name="dropdown"></slot>
              </div>
            </mwc-menu>`}
      </div>
    `;
    }
    selfClick() {
        if (this.type === 'menu') {
            const mwcMenu = this.shadowRoot?.querySelector('#mwcMenu');
            mwcMenu.close();
        }
    }
    updated() {
        if (!this.updateOnce) {
            const dropdownWrapper = this.shadowRoot?.querySelector('.dropdown-wrapper');
            if (this.event === 'all') {
                dropdownWrapper?.addEventListener('click', this.showMenu);
                dropdownWrapper?.addEventListener('mouseover', this.showMenu);
                return;
            }
            dropdownWrapper?.addEventListener(this.event, () => {
                this.showMenu();
            });
            this.updateOnce = true;
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        const dropdownWrapper = this.shadowRoot?.querySelector('.dropdown-wrapper');
        dropdownWrapper?.removeEventListener('click', this.showMenu);
        dropdownWrapper?.removeEventListener('mouseover', this.showMenu);
    }
    async mouseOut() {
        if (!this.hold) {
            this.timeout = setTimeout(() => {
                this.mwcMenu?.close();
            }, +this.delay);
        }
    }
    dropdownTrigger(event) {
        this.dropdownDispatchEvent(event, { status: event.toUpperCase() });
    }
    mouseOVer() {
        if (this.timeout)
            clearTimeout(this.timeout);
    }
    removeArrow() {
        const mwcMenu = this.shadowRoot?.querySelector('#mwcMenu');
        if (mwcMenu?.classList.contains('with-arrow')) {
            mwcMenu?.classList.remove('with-arrow');
        }
    }
    close() {
        const mwcMenu = this.shadowRoot?.querySelector('#mwcMenu');
        this.removeArrow();
        mwcMenu.close();
    }
    dropdownDispatchEvent(event, value) {
        this.dispatchEvent(new CustomEvent(`dropdown-${event}`, {
            detail: {
                ...value,
            },
            bubbles: true,
        }));
    }
};
Dropdown.styles = css `
    .dropdown-wrapper {
      position: relative;
    }
    .custom-dropdown {
      position: relative;
      display: inline-block;
    }
    .with-dialog {
      position: fixed;
      left: var(--with-dialog-left);
      top: var(--with-dialog-top);
      z-index: 9999;
    }
    .with-arrow {
      position: fixed;
      left: var(--with-dialog-left);
      top: var(--with-dialog-top);
      z-index: 9999;
    }
    .with-arrow::before {
      content: '';
      position: fixed;
      left: var(--with-arrow-left);
      top: var(--with-arrow-top);
      border: 15px solid transparent;
      border-bottom-color: var(--gray-100);
      z-index: 10000;
    }
  `;
__decorate([
    query('mwc-menu'),
    __metadata("design:type", MenuBase)
], Dropdown.prototype, "mwcMenu", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Dropdown.prototype, "minWidth", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], Dropdown.prototype, "fixed", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Dropdown.prototype, "event", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Dropdown.prototype, "cursor", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Dropdown.prototype, "type", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Dropdown.prototype, "position", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Dropdown.prototype, "withArrow", void 0);
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Object)
], Dropdown.prototype, "hold", void 0);
__decorate([
    state(),
    __metadata("design:type", void 0)
], Dropdown.prototype, "timeout", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Dropdown.prototype, "delay", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Dropdown.prototype, "width", void 0);
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Object)
], Dropdown.prototype, "withDialog", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Dropdown.prototype, "disabled", void 0);
Dropdown = __decorate([
    customElement('c-dropdown')
], Dropdown);
export { Dropdown };
//# sourceMappingURL=dropdown.js.map