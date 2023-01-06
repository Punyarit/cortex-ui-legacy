import '@material/mwc-button';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-menu';
import { MenuBase } from '@material/mwc-menu/mwc-menu-base';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { timeout } from '../../helper/helper';
import './icon';
import './search';

interface Options {
  text?: string | number;
  value?: string | number;
  subText?: string | number;
}

@customElement('c-select')
export class Select extends LitElement {
  static styles = css`
    mwc-menu {
      --mdc-menu-max-height: 280px;
    }

    .menu-wrapper {
      color: #3f527a;
      border: 0;
      appearance: none;
      outline: none;
      border-radius: 8px;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      background: var(--background);
    }

    .custom-select {
      position: relative;
      display: inline-block;
      width: var(--width);
      cursor: pointer;
    }

    .disable {
      cursor: not-allowed;
      color: var(--color-disabled);
    }

    .custom-arrow {
      pointer-events: none;
    }

    .menu-list {
      padding: 12px 12px 12px 26px;
      box-sizing: border-box;
      margin: 0 4px;
      border-radius: 4px;
      display: flex;
      column-gap: 12px;
      font-family: var(--font-family) !important;
    }

    .menu-list:hover {
      background: #5096ff;
      color: white;
    }

    .menu-list-wrapper {
      padding: 4px 0;
      overflow: auto;
      box-sizing: border-box;
      box-shadow: 0px 2px 8px rgba(42, 57, 89, 0.04), 0px 16px 32px rgba(63, 82, 122, 0.12);
      border-radius: 8px;
      background-color: var(--mdc-theme-surface, #fff);
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

    .no-matching-result-font {
      /* Title 4 */
      font-weight: 600;
      line-height: 24px;
      text-align: center;
      /* Grey Scale/500 */
      color: var(--gray-500);
      padding: 0 2px;
    }
    .text-error {
      color: #f3655c;
      font-weight: 400;
      font-size: 12px;
      margin-top: 6px;
      position: absolute;
      left: 0;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .detail-wrapper {
      position: relative;
    }

    .menu-list-subtext {
      color: #c9d4f1;
    }

    .default-placeholder {
      color: var(--gray-500) !important;
    }

    .with-dialog {
      position: fixed;
      left: var(--with-dialog-left);
      top: var(--with-dialog-top);
      z-index: 9999;
    }
  `;
  @property()
  searchCase?: 'startsWith' | 'includes' = 'startsWith';

  @property()
  default?: string;

  @property({ type: String })
  width = '100%';

  @property({
    type: Array,
  })
  options!: Options[];

  @property()
  label?: string;

  @property()
  error?: boolean;

  @property()
  textError?: string;

  @property()
  fixed = false;

  @property()
  minWidth = '100px';

  @property()
  maxHeight: null | string = '280px';

  @property()
  value?: string;

  @state()
  textDisplay?: Options;

  @property()
  disabled = false;

  @property()
  background?: string;

  @state()
  shownChoices: Options[] = [];

  @property({ type: Object })
  config = {
    placeholder: false,
  };

  @property({ type: String })
  placeholder?: string;

  @property({
    type: Object,
  })
  haveSearch = false;

  @property()
  colorDisabled = 'var(--cl-input-disabled)';

  @property()
  withDialog = false;

  @property({ type: Object })
  updateOnce = false;

  @property({ type: String })
  valueDisplay: 'text' | 'value' = 'text';

  @property({ type: String }) height = '54px';

  render() {
    return html`
      <style>
        :host {
          --width: ${this.width};
          --background: ${this.background ?? (this.disabled ? 'var(--gray-200)' : '')};
          --color-disabled: ${this.colorDisabled};
        }

        .menu-wrapper {
          min-width: ${this.minWidth};
        }
        .menu-list-wrapper {
          max-height: ${this.maxHeight};
        }
        .menu-width {
          min-width: calc(${this.minWidth} - 8px);
        }
        mwc-menu {
          --mdc-menu-min-width: calc(${this.minWidth} - 8px);
        }
      </style>
      <div
        ?hidden="${!this.label}"
        style="margin-bottom:12px ${this.error && !this.disabled ? '; color: #F3655C' : ''}"
      >
        ${this.label}
      </div>
      <div class="custom-select">
        <div
          class="menu-wrapper ${this.disabled ? 'disable' : ''}"
          @click="${this.showMenu}"
          style="height:${this.height}; border: 1px solid ${this.error ? '#F3655C' : '#c9d4f1'}; "
        >
          <span
            style="margin-right:16px"
            class="${this.placeholder && !this.textDisplay?.value ? 'default-placeholder' : ''}"
          >
            ${this.textDisplay?.[this.valueDisplay] || this.default || this.placeholder} ${this.textDisplay?.subText}
          </span>
          <c-icon size="6" icon="chevron-down" color="${!this.disabled ? '#7386AF' : '#c9d4f1'}"></c-icon>
        </div>
        <div class="detail-wrapper">
          <div class="text-error" ?hidden="${!(this.textError && this.error)}" style="position:relative">
            <c-icon color="red" icon="icon-error" size="12"></c-icon>
            ${this.textError}
          </div>
        </div>
        <mwc-menu id="mwcMenu">
          <c-wrap ?hidden="${!this.haveSearch}" mt="4px" pl="4px" pr="4px">
            <c-search
              border="transparent"
              @getSearched="${this.getSearched}"
              .search="${this.options}"
              .case="${[{ type: this.searchCase, key: 'text' }]}"
            >
              <input type="text" placeholder="Search" />
            </c-search>
            <c-divider gap="0"></c-divider>
          </c-wrap>
          <div class="menu-list-wrapper">
            ${this.shownChoices?.map(
              option =>
                html`
                  <div
                    @click="${() => this.emitData(option?.value, option?.text)}"
                    class="menu-list ${this.minWidth && 'menu-width'} "
                  >
                    ${option?.text}
                    ${option?.subText ? html`<span class="menu-list-subtext">${option?.subText}</span>` : undefined}
                  </div>
                `
            )}
            ${!this.shownChoices?.length
              ? html` <c-wrap mb="12px" d="flex" justify="start" aligns="center" layout="column">
                  <c-image width="120px" src="task-management-no-matching-results"></c-image>
                  <span class="no-matching-result-font">No matching results.</span>
                </c-wrap>`
              : ``}
          </div>
        </mwc-menu>
      </div>
    `;
  }

  showMenu() {
    if (this.disabled) return;

    const menuWrapper = this.shadowRoot?.querySelector('.menu-wrapper') as HTMLDivElement;
    const mwcMenu = this.shadowRoot?.querySelector('#mwcMenu') as MenuBase;
    const customSelect = this.shadowRoot?.querySelector('.custom-select');

    // fix scroll and shadow
    const menuSurface = (mwcMenu as MenuBase)!
      .shadowRoot!.querySelector('mwc-menu-surface')!
      .shadowRoot!.querySelector('.mdc-menu-surface');
    (menuSurface as HTMLDivElement).style.overflow = 'visible';
    (menuSurface as HTMLDivElement).style.borderRadius = '8px';
    (menuSurface as HTMLDivElement).style.boxShadow = '0px 2px 8px #2a39590a, 0px 16px 32px #3f527a1f';
    (menuSurface as HTMLDivElement).style.zIndex = '9999';

    const menuList = mwcMenu?.shadowRoot?.querySelector('mwc-list')?.shadowRoot?.querySelector('.mdc-deprecated-list');
    (menuList as HTMLDivElement).style.padding = 'var(--mdc-list-vertical-padding, 0) 0';

    if (this.fixed) {
      const menuClientRect = menuWrapper.getBoundingClientRect();

      if (this.withDialog) {
        const host = this.shadowRoot?.host as HTMLElement;
        host.style.setProperty('--with-dialog-left', `0`);
        host.style.setProperty('--with-dialog-top', `0`);
        mwcMenu!.classList.add('with-dialog');

        timeout(0).then(() => {
          const mwcMenu = this.shadowRoot?.querySelector('#mwcMenu') as MenuBase;
          const mwcRect = mwcMenu!.getBoundingClientRect();
          host.style.setProperty('--with-dialog-left', `${menuClientRect.x - mwcRect.x}px`);
          host.style.setProperty('--with-dialog-top', `${menuClientRect.y - mwcRect.y + menuClientRect.height}px`);
          mwcMenu!.classList.add('with-dialog');
        });
      } else {
        mwcMenu!.fixed = true;
        mwcMenu!.x = menuClientRect.left / 2;
        mwcMenu!.y = (menuClientRect.top + menuClientRect.height) / 2;
      }
    } else {
      mwcMenu!.anchor = menuWrapper;
      mwcMenu!.corner = 'BOTTOM_LEFT';
    }

    if (!this.minWidth) {
      this.minWidth = `${menuWrapper.offsetWidth}px`;
    } else {
      this.minWidth = `${customSelect?.getBoundingClientRect()?.width}px`;
    }

    mwcMenu!.open = true;
  }

  firstUpdated() {
    this.shownChoices = this.options;
  }

  getSearched(e: CustomEvent) {
    this.shownChoices = e.detail.searched;
  }

  willUpdate(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value')) {
      this.textDisplay = this.options?.find(option => this.value === option?.value);

      if (!this.updateOnce) this.emitData(this.textDisplay?.value, this.textDisplay?.text, this.textDisplay?.subText);

      this.requestUpdate();
    }
  }

  updated(e: Map<string, unknown>) {
    if (e.has('options')) {
      this.textDisplay = this.options?.find(option => this.value === option?.value);
      if (!this.textDisplay) {
        this.textDisplay = { text: this.default };
        this.requestUpdate();
      }
    }
  }
  emitData<T extends string | number | undefined>(value: T, text: T, subtext?: T) {
    const mwcMenu = this.shadowRoot?.querySelector('#mwcMenu') as MenuBase;

    this.dispatchEvent(
      new CustomEvent('getValue', {
        detail: {
          text,
          value,
          subtext,
        },
        bubbles: true,
      })
    );
    if (mwcMenu) mwcMenu.open = false;
  }
}
