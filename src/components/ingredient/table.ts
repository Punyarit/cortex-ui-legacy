import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('c-table')
export class Table extends LitElement {
  static styles = css`
    :host {
      flex-grow: 1;
    }
    ::slotted(th) {
      color: #7386af;
      padding: 6px 4px;
      text-align: left;
      position: sticky;
      top: 0;
      z-index: 1;
      overflow: hidden;
      font-weight: normal;
      background: var(--table-background);
    }

    ::slotted(tr) {
      background: var(--background);
    }
    .table-wrapper {
      height: var(--height);
      overflow: hidden;
    }
    .table-scroll {
      overflow: auto;
      height: 100%;
    }

    .table {
      display: table;
      width: 100%;
      position: relative;
      max-width: var(--maxWidth);
    }

    /* width */
    ::-webkit-scrollbar {
      width: 6px;
      height: 8px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #ebeced;
      border-radius: 10px;
    }
  `;

  @property()
  maxWidth = 'inherit';

  @property()
  height = 'inherit';

  @property()
  tableHeadBg = 'white';

  @property()
  scrollValue?: number;

  @property()
  background = 'white';

  render() {
    return html`
      <style>
        :host {
          --table-background: ${this.tableHeadBg};
          --background: ${this.background};
          --maxWidth: ${this.maxWidth};
          --height: ${this.height};
        }
      </style>
      <div class="table-wrapper">
        <div class="table-scroll">
          <div class="table">
            <thead>
              <slot name="head"></slot>
            </thead>
            <tbody>
              <slot name="body"></slot>
            </tbody>
          </div>
        </div>
      </div>
    `;
  }

  updated() {
    if (this.scrollValue >= 0) {
      const tableScroll = this.shadowRoot?.querySelector('.table-scroll');
      tableScroll.scrollTo({
        top: this.scrollValue,
        left: 0,
        behavior: 'smooth',
      });
    }
  }
}
