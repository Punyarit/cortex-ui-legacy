import '@material/mwc-button';
import '@material/mwc-menu';
import type { Menu as MwcMenu } from '@material/mwc-menu';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { findEmptySlot, timeout } from '../../helper/helper';
import './icon';
import { Icon } from './icon';

interface EmptySlot {
  content?: boolean;
}

type Position =
  | 'TOP_LEFT'
  | 'TOP_RIGHT'
  | 'BOTTOM_LEFT'
  | 'BOTTOM_RIGHT'
  | 'TOP_START'
  | 'TOP_END'
  | 'BOTTOM_START'
  | 'BOTTOM_END';
@customElement('c-menu')
export class Menu extends LitElement {
  static styles = css`
    :host {
      --menu-gray-color: #2a3959;
      --menu-red-color: #f3655c;
    }
    .menu-wrapper {
    }

    .menu-input {
      color: #247cff;
      border: 0;
      appearance: none;
      outline: none;
      border-radius: 8px;
      padding: 16px 20px;
      display: flex;
      column-gap: 16px;
      justify-content: space-between;
      box-sizing: border-box;
      background: #d3e5ff;
    }

    .menu-list {
      box-sizing: border-box;
      margin: 0 4px;
      border-radius: 4px;
      display: flex;
      column-gap: 12px;
      font-family: var(--font-family) !important;
    }

    .custom-menu {
      position: relative;
      display: inline-block;
      cursor: pointer;
    }

    .custom-arrow {
      pointer-events: none;
    }

    .menu-list-wrapper {
      overflow: auto;
      padding: 4px 0;
      box-sizing: border-box;
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

    .with-dialog {
      position: fixed;
      left: var(--with-dialog-left);
      top: var(--with-dialog-top);
      z-index: 9999;
    }
  `;

  @property({
    type: Array,
  })
  menus!: {
    text?: string;
    value?: unknown;
    iconName?: string;
    color?: string;
    iconSize?: string;
    textSize?: string;
  }[];

  @property()
  menuName?: string;

  @property()
  iconName?: string;

  @property()
  iconSize?: string;

  @property()
  minWidth?: string;

  @property()
  fixed = false;

  @property()
  maxHeight = '30vh';

  @state()
  emptySlot!: EmptySlot;

  @property()
  position: Position = 'BOTTOM_LEFT';

  @property()
  withDialog = false;

  @property()
  menuListTextWrap: 'normal' | 'nowrap' = 'normal';

  @property()
  menuListHoverBackgroundColor = '#5096ff';

  @property()
  menuListHoverTextColor = 'white';

  @property()
  menuListPadding = '12px 12px 12px 26px';

  render() {
    return html`
      <style>
        mwc-menu {
          --mdc-menu-max-height: ${this.maxHeight};
        }

        .menu-list-wrapper {
          max-height: ${this.maxHeight};
        }

        .menu-wrapper {
          min-width: ${this.minWidth};
        }

        .menu-width {
          min-width: calc(${this.minWidth} - 8px);
        }

        .menu-list {
          white-space: ${this.menuListTextWrap};
          padding: ${this.menuListPadding};
        }

        .menu-list:hover {
          background: ${this.menuListHoverBackgroundColor};
          color: ${this.menuListHoverTextColor} !important;
        }
      </style>
      <div class="custom-menu">
        ${this.emptySlot?.content
          ? html`
              <div class="menu-wrapper menu-input" @click="${this.showMenu}">
                <div>
                  <c-icon
                    ?hidden="${!this.iconName}"
                    icon="${this.iconName}"
                    size="${this.iconSize}"
                    color="247CFF"
                  ></c-icon>
                  <span style="font-weight: 600;margin-left:12px;"> ${this.menuName} </span>
                </div>
                <c-icon size="6" icon="chevron-down" color="#7386AF"></c-icon>
              </div>
            `
          : html`
              <div class="menu-wrapper" @click="${this.showMenu}">
                <slot name="content"></slot>
              </div>
            `}

        <mwc-menu id="mwcMenu">
          <div class="menu-list-wrapper">
            ${this.menus?.map(
              (menu, index) =>
                html`
                  <div
                    @mouseout="${() => this.mouseOut('#icon-' + index, menu.color)}"
                    @mouseover="${() => this.mouseOver('#icon-' + index)}"
                    @click="${() => this.emitData(menu)}"
                    class="menu-list ${this.minWidth && 'menu-width'}"
                    style="color:var(--${menu.color}); font-size:${menu.textSize ?? 'var(--fs-16)'}"
                  >
                    ${menu.iconName &&
                    html`
                      <c-icon
                        id="icon-${index}"
                        ?hidden="${!menu.iconName}"
                        icon="${menu.iconName}"
                        size="${menu.iconSize}"
                        color="var(--${menu.color})"
                      ></c-icon>
                    `}
                    ${menu.text}
                  </div>
                `
            )}
          </div>
        </mwc-menu>
      </div>
    `;
  }

  mouseOut(iconId: string, color?: string): void {
    const iconMenu = this.shadowRoot?.querySelector(iconId);
    if (iconMenu) {
      (iconMenu as Icon).color = color ?? '';
    }
  }
  mouseOver(iconId: string): void {
    const iconMenu = this.shadowRoot?.querySelector(iconId);
    if (iconMenu) {
      (iconMenu as Icon).color = 'white';
    }
  }

  firstUpdated() {
    const slots = this.shadowRoot?.querySelectorAll('slot');
    if (slots) {
      this.emptySlot = findEmptySlot(slots);
    }
  }

  showMenu(): void {
    const mwcMenu = this.shadowRoot?.querySelector<MwcMenu>('#mwcMenu');

    if (!mwcMenu) {
      return;
    }

    const menuWrapper = this.shadowRoot?.querySelector<HTMLDivElement>('.menu-wrapper');

    // fix scroll and shadow

    const menuSurface = mwcMenu.shadowRoot
      ?.querySelector('mwc-menu-surface')
      ?.shadowRoot?.querySelector<HTMLDivElement>('.mdc-menu-surface');

    if (menuSurface) {
      menuSurface.style.overflow = 'visible';
      menuSurface.style.borderRadius = '8px';
      menuSurface.style.boxShadow = '0 2px 8px #2a39590a, 0 16px 32px #3f527a1f';
      menuSurface.style.zIndex = '9999';
    }

    const menuList = mwcMenu.shadowRoot
      ?.querySelector('mwc-list')
      ?.shadowRoot?.querySelector<HTMLDivElement>('.mdc-deprecated-list');

    if (menuList) {
      menuList.style.padding = 'var(--mdc-list-vertical-padding, 0) 0';
    }

    if (this.fixed) {
      const menuClientRect = menuWrapper?.getBoundingClientRect();

      if (this.withDialog) {
        const host = this.shadowRoot?.host as HTMLElement;
        host.style.setProperty('--with-dialog-left', `0`);
        host.style.setProperty('--with-dialog-top', `0`);
        mwcMenu.classList.add('with-dialog');

        timeout(0).then(() => {
          const mwcMenu = this.shadowRoot?.querySelector('#mwcMenu');
          const mwcRect = mwcMenu?.getBoundingClientRect();
          host.style.setProperty('--with-dialog-left', `${(menuClientRect?.x ?? 0) - (mwcRect?.x ?? 0)}px`);
          host.style.setProperty(
            '--with-dialog-top',
            `${(menuClientRect?.y ?? 0) - (mwcRect?.y ?? 0) + (menuClientRect?.height ?? 0)}px`
          );
          mwcMenu?.classList.add('with-dialog');
        });
      } else {
        mwcMenu.fixed = true;
        if (this.position === 'BOTTOM_LEFT') {
          if (menuClientRect) {
            mwcMenu.x = menuClientRect.left / 2;
            mwcMenu.y = (menuClientRect.top + menuClientRect.height) / 2;
          }
        } else if (this.position === 'TOP_LEFT') {
          if (menuClientRect) {
            mwcMenu.x = menuClientRect.left / 2;
            mwcMenu.y = menuClientRect.top / 2;
          }
        }
      }
    } else {
      mwcMenu.anchor = menuWrapper ?? null;
      mwcMenu.corner = this.position;
    }

    if (!this.minWidth) {
      this.minWidth = `${menuWrapper?.offsetWidth ?? 0}px`;
    }

    mwcMenu.open = true;
  }

  emitData(menu: { text?: string; value?: unknown }): void {
    this.dispatchEvent(
      new CustomEvent('getValue', {
        detail: {
          text: menu.text,
          value: menu.value,
        },
        bubbles: true,
      })
    );

    const mwcMenu = this.shadowRoot?.querySelector<MwcMenu>('#mwcMenu');
    if (mwcMenu) {
      mwcMenu.open = false;
    }
  }
}
