import '@material/mwc-button';
import '@material/mwc-circular-progress';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { findEmptySlot } from '../../helper/helper';

interface EmptySlot {
  subject?: boolean;
  profile?: boolean;
  loader?: boolean;
}

@customElement('c-container')
export class Container extends LitElement {
  static styles = css`
    .container {
      display: flex;
      padding-bottom: 30px;
      column-gap: 18px;
    }
    .container .profile-wrapper {
      position: relative;
      min-width: 320px;
    }

    .container .profile-wrapper > div {
      position: fixed;
      z-index: 10;
    }

    .container .content-outter-wrapper {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      margin-bottom: var(--spacing);
    }

    .loader-wrapper {
      width: 100%;
    }

    .content-page-scroll {
      margin-top: 8px;
      padding: var(--padding);
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

  @property()
  hideScroll = false;

  @property()
  rowGap = '18px';

  @state()
  emptySlot!: EmptySlot;

  @property()
  scrollEvent = false;

  @property()
  scrollValue?: number;

  @property()
  loading = false;

  @property()
  spacing = 0;

  @property()
  padding = '0 32px';

  render() {
    return html`
      <style>
        :host {
          --spacing: ${this.spacing};
          --padding: ${this.padding};
        }

        .content-page-scroll {
          overflow: ${this.hideScroll ? 'hidden' : 'var(--overflow)'};
          height: ${this.emptySlot?.subject ? '100%' : 'calc(100% - 42px)'};
        }

        .container .content-outter-wrapper {
          row-gap: ${this.rowGap};
        }
      </style>
      <!-- SUBJECT -->
      <div ?hidden="${this.emptySlot?.subject}" style="padding:0 38px">
        <slot name="subject"></slot>
      </div>
      <div class="content-page-scroll">
        <div class="container">
          <!-- profile -->
          <div ?hidden="${this.emptySlot?.profile}" class="profile-wrapper">
            <div>
              <slot name="profile"></slot>
            </div>
          </div>

          <!-- content -->
          <div class="content-outter-wrapper">
            <slot ?hidden="${this.loading}"></slot>
            <div class="loader-wrapper" ?hidden="${!this.loading}">
              <slot ?hidden="${!this.loading}" name="loader"></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    if (this.scrollEvent) {
      const container = this.shadowRoot?.querySelector('.content-page-scroll');
      container?.addEventListener('scroll', (event: Event) => {
        this.dispatchEvent(
          new CustomEvent('getScrollEvent', {
            detail: {
              event,
              container,
            },
            bubbles: true,
          })
        );
      });
    }

    const slots = this.shadowRoot?.querySelectorAll('slot');
    this.emptySlot = findEmptySlot(slots);
    this.requestUpdate();
  }

  updated() {
    if (this.scrollValue) {
      const container = this.shadowRoot?.querySelector('.content-page-scroll');
      container.scrollTop = this.scrollValue;
    }
  }
}
