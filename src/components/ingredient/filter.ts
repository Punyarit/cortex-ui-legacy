import '@material/mwc-checkbox';
import { CheckboxBase } from '@material/mwc-checkbox/mwc-checkbox-base';
import '@material/mwc-menu';
import { MenuBase } from '@material/mwc-menu/mwc-menu-base';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Search } from '../ingredient/search';
import '../kit/wrap';
import './button';
import './divider';
import './icon';
import './image';
import './search';

@customElement('c-filter')
export class Filter extends LitElement {
  static styles = css`
    mwc-checkbox {
      --mdc-theme-secondary: #247cff;
    }

    .menu-wrapper {
      color: #3f527a;
      border: 0;
      appearance: none;
      outline: none;
      border-radius: 8px;
      padding: 9px 20px;
      display: flex;
      column-gap: 16px;
      justify-content: space-between;
      box-sizing: border-box;
      background: #e7eeff;
    }

    .menu-wrapper-selected {
      color: #247cff;
      border: 0;
      appearance: none;
      outline: none;
      border-radius: 8px;
      padding: 9px 20px;
      display: flex;
      column-gap: 16px;
      justify-content: space-between;
      box-sizing: border-box;
      background: #d3e5ff;
    }

    ::placeholder {
      font-family: Sarabun-Regular;
      color: #c9d4f1;
    }

    .menu-list {
      padding: 4px 0px 4px 16px;
      box-sizing: border-box;
      margin: 0 4px;
      border-radius: 4px;
      display: flex;
      align-items: center;
    }

    .menu-list:hover {
      background: #f0f6ff;
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
      /* overflow: auto; */
      padding: 4px 0;
      font-family: var(--font-family);
      font-size: var(--fs-16);
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

    .filter-title-text {
      color: #a5b7da;
    }

    .clear-all-text {
      color: #247cff;
    }

    .filter-list {
      overflow: auto;
    }

    .no-matching-result-font {
      /* Title 4 */
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      /* Grey Scale/500 */
      color: #a5b7da;
    }

    .checkbox-disabled {
      pointer-events: none;
    }

    .selected-max-width {
      max-width: var(--selected-width);
    }

    .option-max-width {
      max-width: var(--option-width);
    }

    .selected-wrapper {
      font-weight: 600;
      margin-left: 12px;
      display: flex;
    }

    .text-ellipsis {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;

  @property({
    type: Array,
  })
  filterBy?: string[];

  @property()
  filterName?: string;

  @property()
  minWidth?: string;

  @property({ type: Object })
  fixed = false;

  @state()
  search: {
    value?: string;
  }[];

  @property()
  searchType = 'includes';

  @property()
  selectedMaxWidth = 'auto';

  @property()
  optionMaxWidth = 'auto';

  @state()
  searched: Record<string, unknown>[];

  @state()
  shownChoices: Record<string, unknown>[];

  @property({ type: String })
  displaySelected: 'default' | 'short' | 'all' = 'default';

  @property()
  maxHeight = '30vh';

  @state()
  selected = [];

  @property({ type: Object })
  defaultSelected = [];

  @property()
  wrapperFontSize?: string;

  @property()
  padding?: string;

  @property()
  display?: string;

  @property({
    type: Number,
  })
  maxSelected?: number;

  @property({ type: Object })
  searchable = true;

  @property({ type: Object })
  sortSelected = true;

  @property({ type: Object })
  sortDisplaySelected = false;

  render() {
    return html`
      <style>
        :host {
          --selected-width: ${this.selectedMaxWidth};
          --option-width: ${this.optionMaxWidth};
        }
        .filter-list {
          max-height: ${this.maxHeight};
        }

        mwc-menu {
          --mdc-menu-min-width: calc(${this.minWidth} - 8px);
        }
      </style>
      <div class="custom-menu">
        <div
          class="menu-wrapper${this.selected.length ? '-selected' : ''}"
          style="${this.padding ? `padding: ${this.padding};` : ``}${this.display
            ? `display: ${this.display};`
            : ``}"
          @click="${this.showMenu}">
          <div class="selected-wrapper" style="font-size: ${this.wrapperFontSize ?? `14px`}">
            <span> ${this.filterName} </span>
            ${this.renderSelected()}
          </div>

          <c-icon size="6" icon="chevron-down" color="#7386AF"></c-icon>
        </div>
        <mwc-menu id="mwcMenu">
          <div class="menu-list-wrapper">
            <c-wrap mt="4px" pl="4px" pr="4px" style="${this.searchable ? '' : 'display: none'}">
              <c-search
                id="filter-search"
                border="transparent"
                @getSearched="${this.getSearched}"
                .search="${this.search}"
                .case="${[{ type: this.searchType, key: 'value' }]}">
                <input type="text" placeholder="Search" />
              </c-search>
              <c-divider gap="0"></c-divider>
            </c-wrap>

            <c-wrap
              mt="12px"
              mb="12px"
              d="flex"
              justify="space-between"
              aligns="center"
              pl="12px"
              pr="12px">
              ${!this.shownChoices?.length
                ? ``
                : html`<div class="filter-title-text" style="padding: 2px 0">
                      ${this.filterName}
                    </div>
                    <c-button
                      ?hidden="${!this.selected.length}"
                      @click="${this.clearAllFilter}"
                      buttonHeight="28"
                      type="flat"
                      class="clear-all-text"
                      >Clear all</c-button
                    >`}
            </c-wrap>
            <div
              class="filter-list"
              style="${!this.shownChoices?.length ? 'cursor: context-menu;' : ''}">
              ${this.shownChoices?.map((filterText, index) => {
                const ischecked = this.selected.includes(filterText.value);
                const optionClass = `menu-list ${this.minWidth && 'menu-width'}`;
                const optionMaxWidth = `${
                  this.optionMaxWidth !== 'auto' ? 'option-max-width text-ellipsis' : ''
                } `;
                return this.maxSelected && this.selected.length >= this.maxSelected
                  ? html`
                      <div
                        @click="${() =>
                          ischecked ? this.emitData(filterText.value, index) : undefined}"
                        class="${optionClass}">
                        <mwc-checkbox
                          id="mwc-checkbox-${index}"
                          class="${ischecked ? 'checkbox-disabled' : ''}"
                          .checked=${ischecked}
                          .disabled=${!ischecked}></mwc-checkbox>
                        <span class="${optionMaxWidth}"> ${filterText.value} </span>
                      </div>
                    `
                  : html`
                      <div
                        @click="${() => this.emitData(filterText.value, index)}"
                        class="${optionClass}">
                        <mwc-checkbox
                          id="mwc-checkbox-${index}"
                          .checked=${ischecked}></mwc-checkbox>
                        <span class="${optionMaxWidth}"> ${filterText.value} </span>
                      </div>
                    `;
              })}
              ${!this.shownChoices?.length
                ? html` <c-wrap mb="12px" d="flex" justify="start" aligns="center" layout="column">
                    <c-image width="120px" src="task-management-no-matching-results"></c-image>
                    <span class="no-matching-result-font">No matching results.</span></c-wrap
                  >`
                : ``}
            </div>
          </div>
        </mwc-menu>
      </div>
    `;
  }

  private renderSelected() {
    const values = this.sortDisplaySelected ? [...this.selected]?.sort() : this.selected;

    return html`
      <div class="selected-max-width text-ellipsis">${values.length ? `: ${values[0]}` : ``}</div>
      <span style="margin-left:${this.selectedMaxWidth === 'auto' ? '4px' : '0'}">
        ${this.selected.length > 1 ? this.onRenderDisplaySelected(values) : ``}
      </span>
    `;
  }

  private onRenderDisplaySelected(selected: string[]) {
    switch (this.displaySelected) {
      case 'short':
        return `, +${selected.length - 1}`;
      case 'all':
        return selected.slice(1).map((s) => `, ${s}`);
      case 'default':
      default:
        return `${this.selectedMaxWidth !== 'auto' ? ',' : ''} and ${selected.length - 1} more`;
    }
  }

  firstUpdated() {
    this.search = this.filterBy?.map((value) => ({ value }));
    if (this.defaultSelected.length) {
      this.selected = [...this.defaultSelected];
      this.dispatchEvent(
        new CustomEvent('getValue', {
          detail: {
            selected: this.selected,
          },
          bubbles: true,
        })
      );
    }
  }

  updated(e) {
    if (e.has('filterBy')) {
      this.search = this.filterBy?.map((value) => ({ value }));
    }

    if (e.has('defaultSelected')) {
      this.selected = [...this.defaultSelected];
      this.dispatchEvent(
        new CustomEvent('getValue', {
          detail: {
            selected: this.selected,
          },
          bubbles: true,
        })
      );
    }
  }

  getSearched(e: CustomEvent) {
    this.searched = e.detail.searched;
    this.sortSearched();
  }

  sortSearched() {
    const searched = this.searched?.slice();
    if (this.sortSelected) {
      searched?.sort(
        (a, b) => +this.selected.includes(b?.value) - +this.selected.includes(a?.value)
      );
    }
    this.shownChoices = searched;
  }

  resetToDefault() {
    this.selected = [...this.defaultSelected];
    this.dispatchEvent(
      new CustomEvent('getValue', {
        detail: {
          selected: this.selected,
        },
        bubbles: true,
      })
    );
  }

  clearAllFilter() {
    this.selected = [];
    this.sortSearched();
    this.dispatchEvent(
      new CustomEvent('getValue', {
        detail: {
          selected: this.selected,
        },
        bubbles: true,
      })
    );
  }

  showMenu() {
    const menuWrapper = this.shadowRoot?.querySelector(
      `.menu-wrapper${this.selected.length ? '-selected' : ''}`
    ) as HTMLDivElement;
    const mwcMenu = this.shadowRoot?.querySelector('#mwcMenu') as MenuBase;
    const menuSurface = mwcMenu.shadowRoot
      .querySelector('mwc-menu-surface')
      .shadowRoot.querySelector('.mdc-menu-surface');
    (menuSurface as HTMLDivElement).style.overflow = 'visible';
    (menuSurface as HTMLDivElement).style.borderRadius = '8px';
    (menuSurface as HTMLDivElement).style.boxShadow =
      '0px 2px 8px #2a39590a, 0px 16px 32px #3f527a1f';
    (menuSurface as HTMLDivElement).style.zIndex = '9999';

    const menuList = mwcMenu.shadowRoot
      .querySelector('mwc-list')
      .shadowRoot.querySelector('.mdc-deprecated-list');
    (menuList as HTMLDivElement).style.padding = 'var(--mdc-list-vertical-padding, 0) 4px 0 0';

    if (this.fixed) {
      const menuClientRect = menuWrapper.getBoundingClientRect();
      mwcMenu.fixed = true;
      mwcMenu.x = menuClientRect.left / 2;
      mwcMenu.y = (menuClientRect.top + menuClientRect.height) / 2;
    } else {
      mwcMenu.anchor = menuWrapper;
      mwcMenu.corner = 'BOTTOM_LEFT';
    }

    if (!this.minWidth) {
      this.minWidth = `${menuWrapper.offsetWidth}px`;
    }

    this.sortSearched();
    mwcMenu.open = true;
    const filterSearch = this.shadowRoot?.querySelector(
      '#filter-search > input'
    ) as HTMLInputElement;
    if (filterSearch.value) {
      filterSearch.value = '';
      (filterSearch.parentNode as Search).executeSearch();
    }
  }

  emitData(value, index) {
    const mwcCheckbox = this.shadowRoot?.querySelector(`#mwc-checkbox-${index}`) as CheckboxBase;
    mwcCheckbox.checked = !mwcCheckbox.checked;
    if (mwcCheckbox.checked) {
      this.selected.push(value);
    } else {
      this.selected.splice(
        this.selected.findIndex((select) => select === value),
        1
      );
    }

    this.requestUpdate();

    this.dispatchEvent(
      new CustomEvent('getValue', {
        detail: {
          value,
          selected: this.selected,
        },
        bubbles: true,
      })
    );
  }
}
