import { __decorate, __metadata } from "tslib";
import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property, queryAssignedNodes, state } from 'lit/decorators.js';
import './button';
import './icon';
let Search = class Search extends LitElement {
    constructor() {
        super(...arguments);
        this.height = '48px';
        this.resize = 'none';
        this.type = 'default';
        this.width = '100%';
        this.border = '1px solid var(--bg-input-border)';
        this.allowedSpecialCharacters = [];
        this.search = [];
        this.case = [];
        this.searched = [];
        this.isUpdated = false;
        this.backgroundColor = 'var(--bg-input)';
        this.fontFamily = 'Sarabun-Regular';
    }
    render() {
        return html `
      <style>
        :host {
          --font-family: ${this.fontFamily};
        }

        ::slotted(textarea) {
          border: none;
          outline: none;
          width: 100%;
          resize: ${this.resize};
          height: 100%;
          background: none;
          font-family: ${this.fontFamily} !important;
        }
        .label-text {
          margin-bottom: 12px ${this.error ? '; color: #F3655C' : ''};
        }

        .input-wrapper {
          border: ${this.border};
          height: ${this.height};
          width: ${this.width};
        }
      </style>
      <div class="input-outter">
        <div style="width: 100%">
          <div class="input-wrapper" style="${this.backgroundColor ? `background-color: ${this.backgroundColor}` : ``}">
            <div class="input-icon-wrapper">
              <c-icon icon="fi_search" size="20" color="var(--gray-800)"></c-icon>
              <slot></slot>
              ${this._input &&
            this._input?.[0]?.value &&
            html `<c-icon
                icon="x-circle-input"
                color="var(--gray-400)"
                size="16"
                style="cursor: pointer"
                @click="${this.resetSearch}"
              ></c-icon>`}
            </div>
          </div>
        </div>
      </div>
    `;
    }
    inputDispatchEvent(event, data = {}) {
        this.dispatchEvent(new CustomEvent(event, {
            detail: {
                ...data,
            },
            bubbles: true,
        }));
    }
    isArrayOfString(data) {
        if (!Array.isArray(data))
            return false;
        return data.every(item => typeof item === 'string');
    }
    findValueOfLastKey(keys, data) {
        if (keys.length) {
            const value = keys.reduce((innerData, key) => {
                if (Array.isArray(innerData)) {
                    return innerData
                        .map(eachInnerData => (typeof eachInnerData === 'string' ? undefined : eachInnerData?.[key]))
                        .flat();
                }
                return typeof innerData === 'string' ? undefined : innerData?.[key];
            }, data);
            if (typeof value === 'string' || this.isArrayOfString(value))
                return value;
            throw new Error('value is not string or array of string');
        }
        return '';
    }
    searchData() {
        this.addEventListener('keyup', () => {
            this.executeSearch();
        });
    }
    resetSearch() {
        if (this._input) {
            this._input[0].value = '';
            this.inputDispatchEvent('resetSearch');
            this.executeSearch();
        }
    }
    executeSearch() {
        const input = this?.querySelector('input');
        const inputValue = input?.value?.replace(new RegExp(`((?!\\d|\\w|[ก-๛]|[./+\-,()${this.allowedSpecialCharacters?.join('')}]| ).)`, 'g'), '');
        const searchText = inputValue?.toLowerCase();
        if (input) {
            input.value = inputValue ?? '';
        }
        if (!searchText?.length) {
            this.searched = this.search;
            this.inputDispatchEvent('getSearched', { searched: this.searched });
            return;
        }
        // เนื่องจาก filtered มันจะถูก set ค่าใหม่ทุกครั้งเวลาลูปแต่ละรอบ
        // allFiltered ไว้เก็บค่า filtered กรณีที่เจอ
        const allFiltered = [];
        // ทำให้ searched เป็นค่าว่างทุกครั้งก่อนเพราะไม่งั้นมันจะเก็บค่าไว้ตลอด หากหาไม่เจอมันจะยังแสดง
        this.searched = [];
        if (!this.search?.length) {
            return;
        }
        for (let i = 0; i < this.case.length; i++) {
            // กำหนด key ที่จะเข้าถึงทั้งหมด
            const keys = this.case[i]?.key?.split('.');
            // กำหนด type
            const type = this.case[i]?.type;
            // filter หาค่า search
            const filtered = this.search?.filter(data => {
                // หาค่าในสุดของ Object
                let value;
                try {
                    value = keys?.length ? this.findValueOfLastKey(keys, data) : '';
                }
                catch {
                    value = '';
                }
                return Array.isArray(value)
                    ? value.some(val => this.checkWithSearchTextByCaseType(type, val.toLocaleLowerCase(), searchText))
                    : this.checkWithSearchTextByCaseType(type, value.toLocaleLowerCase(), searchText);
            });
            // กรณีที่เจอทุกตัว
            if (this.search?.length === filtered?.length) {
                this.searched = this.search;
            }
            // กรณีที่เจอบางตัว
            else if (filtered.length > 0) {
                allFiltered.push(...filtered);
                this.searched = [...new Set(allFiltered)];
            }
        }
        this.inputDispatchEvent('getSearched', { searched: this.searched });
    }
    checkWithSearchTextByCaseType(caseType, value, searchText) {
        switch (caseType) {
            case 'startsWith':
                return value.startsWith(searchText);
            case 'includes':
                return value.includes(searchText);
        }
    }
    firstUpdated() {
        this.searchData();
        this.inputDispatchEvent('getSearched', { searched: this.search });
    }
    updated(e) {
        if (e.get('search')) {
            this.executeSearch();
        }
        if (!this.isUpdated && this.search) {
            this.executeSearch();
            this.isUpdated = true;
        }
    }
};
Search.styles = css `
    ::slotted(input) {
      border: none;
      width: 100%;
      outline: none;
      height: 100%;
      background: none;
      font-size: 16px;
      font-family: var(--font-family) !important;
      color: var(--cl-text);
    }

    .input-outter {
      display: flex;
      align-items: center;
      width: 100%;
    }
    .input-wrapper {
      padding: 6px 12px;
      border-radius: 8px;
      box-sizing: border-box;
      position: relative;
      transition: var(--theme-bg-transition);
    }
    .input-icon-wrapper {
      display: flex;
      align-items: center;
      width: 100%;
      column-gap: 10px;
      height: 100%;
    }
    .text-length {
      position: absolute;
      right: 0;
      color: #c9d4f1;
    }
    .text-error {
      color: #f3655c;
      font-weight: 400;
      font-size: 14px;
      position: absolute;
      left: 0;
    }
    .detail-wrapper {
      margin-top: 6px;
      height: 26px;
      position: relative;
    }

    .chip-wrapper {
      background: #e7eeff;
      padding: 6px 18px;
      border-radius: 99px;
      display: inline-flex;
      align-items: center;
      column-gap: 6px;
      margin-top: 12px;

      animation: slideY 0.35s ease forwards;
    }

    @keyframes slideY {
      from {
        opacity: 0;
        transform: translate(0, -50%);
      }
      to {
        opacity: 1;
        transform: translate(0, 0%);
      }
    }

    .chip-text {
      color: #247cff;
      font-weight: 600;
      font-size: 14px;
    }
  `;
__decorate([
    property(),
    __metadata("design:type", Object)
], Search.prototype, "height", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Search.prototype, "resize", void 0);
__decorate([
    property(),
    __metadata("design:type", Boolean)
], Search.prototype, "error", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Search.prototype, "type", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Search.prototype, "width", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Search.prototype, "border", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Array)
], Search.prototype, "allowedSpecialCharacters", void 0);
__decorate([
    property({
        type: Array,
    }),
    __metadata("design:type", Object)
], Search.prototype, "search", void 0);
__decorate([
    property({
        type: Array,
    }),
    __metadata("design:type", Array)
], Search.prototype, "case", void 0);
__decorate([
    state(),
    __metadata("design:type", Array)
], Search.prototype, "searched", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Search.prototype, "isUpdated", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Search.prototype, "backgroundColor", void 0);
__decorate([
    queryAssignedNodes('', false, 'input'),
    __metadata("design:type", Array)
], Search.prototype, "_input", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], Search.prototype, "fontFamily", void 0);
Search = __decorate([
    customElement('c-search')
], Search);
export { Search };
//# sourceMappingURL=search.js.map