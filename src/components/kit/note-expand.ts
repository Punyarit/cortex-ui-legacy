import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../ingredient/button';
import '../ingredient/icon';
@customElement('c-note-expand')
export class NoteExpand extends LitElement {
  static styles = css`
    .note-expand-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      cursor: pointer;
    }

    .button-expand {
      position: absolute;
      top: 0;
      right: 0;
    }

    .icon-wrapper {
      transition: transform 0.5s;
    }

    .chevron-hide {
      transform: rotate(90deg);
    }

    .chevron-show {
      transform: rotate(0deg);
    }

    .content-show {
      opacity: 1;
      padding-top: 12px;
      /* transform: translate(0, 0); */
    }

    .content-hide {
      opacity: 0;
      /* transform: translate(0, -100%); */
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
    .content-scroll {
      overflow: auto;
      position: absolute;
      right: 0;
      left: 376px;
    }

    .bg-gradient {
      position: absolute;
      bottom: 0px;
      height: 30px;
      z-index: 1;
      width: 100%;
    }

    .expand-button-wrapper {
      min-width: 52px;
      z-index: 2;
    }
  `;

  @property()
  scrollValue?: number;

  @property()
  expandHeight = '160px';

  @property()
  collapseHeight = '56px';

  @state()
  expandContent = false;

  render() {
    return html`
      <style>
        #content {
          width: 100%;
          height: ${this.collapseHeight};
          overflow: ${this.expandContent ? 'auto' : 'hidden'};
        }
        .bg-gradient {
          background: ${this.expandContent
            ? 'inherit'
            : 'linear-gradient(to top, var(--bg-opacity-1), rgba(0, 0, 0, 0))'};
        }
      </style>
      <div class="note-expand-wrapper" @click="${this.showContent}">
        <div class="bg-gradient"></div>
        <div id="content">
          <slot></slot>
        </div>
        <div class="expand-button-wrapper">
          <c-button class="button-expand" buttonHeight="46" type="icon">
            <div class="icon-wrapper chevron-${this.expandContent ? 'show' : 'hide'}" slot="icon-button">
              <c-icon icon="chevron-down" size="10"></c-icon>
            </div>
          </c-button>
        </div>
      </div>
    `;
  }

  updated() {
    if (this.scrollValue >= 0) {
      const noteContent = this.shadowRoot?.querySelector('#content');
      noteContent.scrollTo({
        top: this.scrollValue,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  async showContent(): Promise<void> {
    this.expandContent = !this.expandContent;

    const content = this.shadowRoot?.querySelector('#content');
    if (this.expandContent) {
      (content as HTMLElement).style.height = this.expandHeight;
    } else {
      (content as HTMLElement).scrollTop = 0;
      (content as HTMLElement).style.height = this.collapseHeight;
    }
  }
}
