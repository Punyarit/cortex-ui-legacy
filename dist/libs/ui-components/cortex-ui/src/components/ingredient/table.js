import { __decorate, __metadata } from "tslib";
import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let Table = class Table extends LitElement {
    constructor() {
        super(...arguments);
        this.maxWidth = 'inherit';
        this.height = 'inherit';
        this.tableHeadBg = 'white';
        this.background = 'white';
    }
    render() {
        return html `
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
};
Table.styles = css `
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
__decorate([
    property(),
    __metadata("design:type", Object)
], Table.prototype, "maxWidth", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Table.prototype, "height", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Table.prototype, "tableHeadBg", void 0);
__decorate([
    property(),
    __metadata("design:type", Number)
], Table.prototype, "scrollValue", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Table.prototype, "background", void 0);
Table = __decorate([
    customElement('c-table')
], Table);
export { Table };
//# sourceMappingURL=table.js.map