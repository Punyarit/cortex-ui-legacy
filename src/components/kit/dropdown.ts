import { MenuBase } from '@material/mwc-menu/mwc-menu-base';
import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { timeout } from '../../helper/helper';
import('@material/mwc-menu');

type Position =
  | 'TOP_LEFT'
  | 'TOP_RIGHT'
  | 'BOTTOM_LEFT'
  | 'BOTTOM_RIGHT'
  | 'TOP_START'
  | 'TOP_END'
  | 'BOTTOM_START'
  | 'BOTTOM_END';
@customElement('c-dropdown')
export class Dropdown extends LitElement {
  static styles = css`
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
  @query('mwc-menu')
  mwcMenu?: MenuBase;

  @property()
  minWidth?: string;

  @property({ type: Object })
  fixed = false;

  @property()
  event: 'click' | 'mouseover' | 'all' = 'click';

  @property()
  cursor: 'default' | 'pointer' = 'default';

  @property()
  type: 'deflat' | 'menu' = 'deflat';

  @property()
  position: Position = 'BOTTOM_LEFT';

  @property({ type: Boolean })
  withArrow = false;

  @property({
    type: Object,
  })
  hold = true;

  @state()
  timeout?: ReturnType<typeof setTimeout>;

  @property()
  delay = '500';

  @property()
  width = undefined;

  @property({
    type: Object,
  })
  withDialog = false;

  private updateOnce = false;

  @property({ type: Boolean }) disabled = false;

  render() {
    return html`
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
          : html` <mwc-menu
              id="mwcMenu"
              @opened="${() => this.dropdownTrigger('opened')}"
              @closed="${() => {
                this.removeArrow();
                this.dropdownTrigger('closed');
              }}">
              <div
                id="dropdown-item-wrapper"
                @click="${this.selfClick}"
                @mouseover="${this.mouseOVer}"
                @mouseout="${this.mouseOut}">
                <slot name="dropdown"></slot>
              </div>
            </mwc-menu>`}
      </div>
    `;
  }
  selfClick() {
    if (this.type === 'menu') {
      const mwcMenu = this.shadowRoot?.querySelector('#mwcMenu') as MenuBase;
      mwcMenu.close();
    }
  }
  updated() {
    if (!this.updateOnce) {
      const dropdownWrapper = this.shadowRoot?.querySelector('.dropdown-wrapper');
      if (this.event === 'all') {
        dropdownWrapper?.addEventListener('click', () => {
          this.showMenu();
        });
        dropdownWrapper?.addEventListener('mouseover', () => {
          this.showMenu();
        });
        return;
      }
      dropdownWrapper?.addEventListener(this.event, () => {
        this.showMenu();
      });
      this.updateOnce = true;
    }
  }
  async mouseOut() {
    if (!this.hold) {
      this.timeout = setTimeout(() => {
        this.mwcMenu?.close();
      }, +this.delay);
    }
  }
  dropdownTrigger(event: string) {
    this.dropdownDispatchEvent(event, { status: event.toUpperCase() });
  }
  mouseOVer() {
    if (this.timeout) clearTimeout(this.timeout);
  }
  async showMenu() {
    const menuWrapper = this.shadowRoot?.querySelector('.dropdown-wrapper') as HTMLDivElement;
    const mwcMenu = this.shadowRoot?.querySelector('#mwcMenu') as MenuBase;
    const menuSurface = mwcMenu?.shadowRoot
      ?.querySelector('mwc-menu-surface')
      ?.shadowRoot?.querySelector('.mdc-menu-surface');
    const menuList = mwcMenu?.shadowRoot
      ?.querySelector('mwc-list')
      ?.shadowRoot?.querySelector('.mdc-deprecated-list');

    if (menuWrapper && mwcMenu && menuSurface && menuList) {
      // fix scroll and shadow
      (menuSurface as HTMLDivElement).style.overflow = 'visible';
      (menuSurface as HTMLDivElement).style.borderRadius = '8px';
      (menuSurface as HTMLDivElement).style.overflow = 'hidden';
      (menuSurface as HTMLDivElement).style.boxShadow =
        '0px 2px 8px #2a39590a, 0px 16px 32px #3f527a1f';
      (menuSurface as HTMLDivElement).style.zIndex = '9999';
      (menuList as HTMLDivElement).style.padding = 'var(--mdc-list-vertical-padding, 0) 0';

      if (this.fixed) {
        const menuClientRect = menuWrapper.getBoundingClientRect();

        if (this.withDialog) {
          const host = this.shadowRoot?.host as HTMLElement;
          host.style.setProperty('--with-dialog-left', `0`);
          host.style.setProperty('--with-dialog-top', `0`);
          mwcMenu.classList.add('with-dialog');

          timeout(0).then(() => {
            const mwcMenu = this.shadowRoot?.querySelector('#mwcMenu') as MenuBase;
            const mwcRect = mwcMenu.getBoundingClientRect();

            if (this.withArrow) {
              host.style.setProperty(
                '--with-dialog-left',
                `${menuClientRect.x - mwcRect.x - 15}px`
              );
              host.style.setProperty(
                '--with-dialog-top',
                `${menuClientRect.y - mwcRect.y + menuClientRect.height + 15}px`
              );
              host.style.setProperty('--with-arrow-left', `${menuClientRect.x - mwcRect.x}px`);
              host.style.setProperty(
                '--with-arrow-top',
                `${menuClientRect.y - mwcRect.y + menuClientRect.height - 15}px`
              );
              mwcMenu.classList.add('with-arrow');
            } else {
              host.style.setProperty('--with-dialog-left', `${menuClientRect.x - mwcRect.x}px`);
              host.style.setProperty(
                '--with-dialog-top',
                `${menuClientRect.y - mwcRect.y + menuClientRect.height}px`
              );
              mwcMenu.classList.add('with-dialog');
            }
          });
        } else {
          mwcMenu.fixed = true;
          if (this.position === 'BOTTOM_LEFT') {
            mwcMenu.x = menuClientRect.left / 2;
            mwcMenu.y = (menuClientRect.top + menuClientRect.height) / 2;
          } else if (this.position === 'TOP_LEFT') {
            mwcMenu.x = menuClientRect.left / 2;
            mwcMenu.y = menuClientRect.top / 2;
          }
        }
      } else {
        mwcMenu.anchor = menuWrapper;
        mwcMenu.corner = this.position;
      }

      if (!this.minWidth) {
        this.minWidth = `${menuWrapper.offsetWidth}px`;
      }

      mwcMenu.show();
    }
  }

  private removeArrow(): void {
    const mwcMenu = this.shadowRoot?.querySelector('#mwcMenu') as MenuBase;
    if (mwcMenu?.classList.contains('with-arrow')) {
      mwcMenu?.classList.remove('with-arrow');
    }
  }

  public close() {
    const mwcMenu = this.shadowRoot?.querySelector('#mwcMenu') as MenuBase;
    this.removeArrow();
    mwcMenu.close();
  }

  dropdownDispatchEvent(event: string, value: Record<string, unknown>) {
    this.dispatchEvent(
      new CustomEvent(`dropdown-${event}`, {
        detail: {
          ...value,
        },
        bubbles: true,
      })
    );
  }
}
