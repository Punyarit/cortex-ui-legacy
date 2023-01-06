import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('c-fixed-content')
export class FixedContent extends LitElement {
  static styles = css`
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
    .content-scroll {
      position: absolute;
      right: 0;
      left: 376px;
    }
  `;

  @property()
  bgContent = '--bg-content';

  @property()
  hideBg = false;

  @property()
  hideShadow = false;

  @property()
  stickyTop = false;

  @property()
  hasScroll = false;

  @property()
  hideScroll = false;

  @property()
  alignLayout?: string;

  @property()
  columnGap = '0';

  @property()
  rowGap = '0';

  @state()
  justifyContent = 'flex-start';

  @state()
  alignItems = 'flex-start';

  render() {
    return html`
      <style>
        :host {
          width: 100%;
          position: ${this.stickyTop ? 'sticky' : 'static'};
          top: 0;
          left: 0;
          z-index: ${this.stickyTop ? '999' : 'auto'};
        }
        .content-scroll {
          overflow: ${this.hideScroll ? 'hidden' : 'overlay'};
        }
        .content-wrapper {
          background: var(${this.hideBg ? '--bg' : this.bgContent});
          box-shadow: ${this.hideShadow ? 'none' : '0 4px 16px rgba(102, 111, 159, 0.08)'};
          border-radius: ${this.hideBg ? 'inherit' : '16px'};
          padding: ${this.hasScroll ? '0 20px 18px 0' : '18px 20px'};
          position: relative;
          justify-content: ${this.justifyContent};
          align-items: ${this.alignItems};
        }

        .content-align-layout {
          display: flex;
          flex-direction: column;
          column-gap: ${this.columnGap};
          row-gap: ${this.rowGap};
        }
      </style>
      <div class="content-wrapper">
        <div id="content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  firstUpdated(): void {
    if (this.alignLayout) {
      const contentWrapper = this.shadowRoot?.querySelector('.content-wrapper');

      (contentWrapper as HTMLElement).style.display = 'flex';
      const alignLayoutSplitted = this.alignLayout.split(' ');
      this.justifyContent = alignLayoutSplitted[0];
      this.alignItems = alignLayoutSplitted[1] ? this.alignItems : alignLayoutSplitted[1];
    }

    if (this.columnGap !== '0' || this.rowGap !== '0') {
      const contentInside = this.shadowRoot?.querySelector('#content');
      (contentInside as HTMLElement).classList.add('content-align-layout');
    }

    if (this.hasScroll) {
      const contentWrapper = this.shadowRoot?.querySelector('.content-wrapper');
      const clientTop = contentWrapper.getBoundingClientRect().top;
      (contentWrapper as HTMLElement).classList.add('content-scroll');
      (contentWrapper as HTMLElement).style.maxHeight = `calc(100vh - ${clientTop + 36}px)`;
    }
  }
}
