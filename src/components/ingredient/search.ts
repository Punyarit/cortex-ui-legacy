import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property, queryAssignedNodes, state } from 'lit/decorators.js';
import './button';
import './icon';

type CaseType = 'startsWith' | 'includes';

export interface Case {
  type: CaseType;
  key?: string;
}

@customElement('c-search')
export class Search extends LitElement {
  static styles = css`
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

  @property()
  height = '48px';
  @property()
  resize = 'none';
  @property()
  error?: boolean;
  @property()
  type: 'default' | 'fluid' = 'default';
  @property()
  width = '100%';

  @property()
  border = '1px solid var(--bg-input-border)';

  @property({ type: Object })
  allowedSpecialCharacters: string[] = [];

  @property({
    type: Array,
  })
  search = [];

  @property({
    type: Array,
  })
  case: Case[] = [];

  @state()
  searched: unknown[] = [];

  @state()
  isUpdated = false;

  @property()
  backgroundColor? = 'var(--bg-input)';

  @queryAssignedNodes('', false, 'input')
  _input?: HTMLInputElement[];

  @property({ type: String })
  fontFamily: 'BaiJamjuree-Regular' | 'Sarabun-Regular' = 'Sarabun-Regular';

  render() {
    return html`
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
              html`<c-icon
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

  inputDispatchEvent(event: string, data: Record<string, unknown> = {}): void {
    this.dispatchEvent(
      new CustomEvent(event, {
        detail: {
          ...data,
        },
        bubbles: true,
      })
    );
  }

  isArrayOfString(data: unknown): data is string[] {
    if (!Array.isArray(data)) return false;
    return data.every(item => typeof item === 'string');
  }

  findValueOfLastKey(keys: string[], data: DeepStringRecord): string | string[] {
    if (keys.length) {
      const value = keys.reduce<DeepStringRecordValue | DeepStringRecordValue[]>((innerData, key) => {
        if (Array.isArray(innerData)) {
          return innerData
            .map(eachInnerData => (typeof eachInnerData === 'string' ? undefined : eachInnerData?.[key]))
            .flat();
        }

        return typeof innerData === 'string' ? undefined : innerData?.[key];
      }, data as DeepStringRecordValue);

      if (typeof value === 'string' || this.isArrayOfString(value)) return value;

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

    const inputValue = input?.value?.replace(
      new RegExp(`((?!\\d|\\w|[ก-๛]|[./+\-,()${this.allowedSpecialCharacters?.join('')}]| ).)`, 'g'),
      ''
    );

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
    const allFiltered: unknown[] = [];
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
      const filtered: unknown[] = this.search?.filter(data => {
        // หาค่าในสุดของ Object
        let value: string | string[];
        try {
          value = keys?.length ? this.findValueOfLastKey(keys, data) : '';
        } catch {
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

  checkWithSearchTextByCaseType(caseType: CaseType, value: string, searchText: string): boolean {
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

  updated(e: Map<string, unknown>) {
    if (e.get('search')) {
      this.executeSearch();
    }

    if (!this.isUpdated && this.search) {
      this.executeSearch();
      this.isUpdated = true;
    }
  }
}

type DeepStringRecord = {
  [key: string]: DeepStringRecordValue | DeepStringRecordValue[];
};

type DeepStringRecordValue = DeepStringRecord | string | undefined;
