import '@material/mwc-button';
import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../ingredient/button';
import '../ingredient/icon';

enum Sizes {
  small = '46px',
  medium = '54px',
}

enum Status {
  standby = 'standby',
  active = 'active',
  error = 'error',
  disabled = 'disabled',
}

enum StatusBorderColors {
  standby = 'var(--gray-400)',
  active = 'var(--color-5-500)',
  error = 'var(--system-colors-error)',
  disabled = 'var(--cl-input-disabled)',
}

enum StatusBackgroundColors {
  standby = 'var(--neutral-100)',
  active = 'var(--neutral-100)',
  error = 'var(--neutral-100)',
  disabled = 'var(--cl-input-disabled)',
}

interface FilterRow {
  label: string;
  keyName: string;
}

interface Option {
  text?: string;
  value?: string;
  parent?: Array<SelectedOption>;
  [key: string]: string | number | Array<Option> | Array<SelectedOption>;
}

interface SelectedOption {
  index: number;
  text: string;
  value: string;
}

@customElement('c-cascade-search')
export class CascadeSearch extends LitElement {
  static styles = css`
    .form-title {
      font-size: 14px;
      color: var(--grey-700);
      margin-bottom: 8px;
    }

    .input-wrapper {
      display: flex;
      font-size: 18px;
      align-items: center;
      border-style: solid;
      border-width: 1px;
      border-radius: 8px;
      margin-bottom: 2px;
    }

    .icon {
      padding: 12px;
      display: flex;
    }

    .input {
      display: flex;
      flex: 1;
    }

    .input input {
      font-size: 16px;
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: var(--gray-800);
    }

    .input input,
    .input input:focus {
      border-width: 0px;
      outline: none;
    }

    .input input::placeholder {
      color: var(--gray-500);
      opacity: 1;
      font-weight: 400;
      font-size: 16px;
    }

    .input input::-ms-input-placeholder {
      color: var(--gray-500);
      font-weight: 400;
      font-size: 16px;
    }

    .input input::-ms-input-placeholder {
      color: var(--gray-500);
      font-weight: 400;
      font-size: 16px;
    }

    .suggestion-wrapper {
      margin-top: 5px;
      position: absolute;
      z-index: 99;
      background-color: var(--gray-100);
      width: 100%;
      box-shadow: 0px 4px 32px rgba(63, 82, 122, 0.12);
      border-radius: 8px;
      min-width: 500px;
      padding: 5px;
      flex-direction: column;
      overflow: auto;
      min-height: 320px;
    }

    .suggestion-wrapper.left {
      left: 0;
    }

    .suggestion-wrapper.right {
      right: 0;
    }

    .suggestion-title {
      font-weight: 400;
      font-size: 14px;
      color: var(--gray-500);
      padding: 5px 10px;
    }

    .no-matching-results {
      display: flex;
      justify-content: center;
      align-content: center;
      padding: 40px 0px;
      flex-direction: column;
    }

    .no-matching-image {
      display: flex;
      justify-content: center;
      margin-bottom: 5px;
    }

    .no-matching-message {
      font-weight: 600;
      font-size: 16px;
      color: var(--gray-600);
      display: flex;
      justify-content: center;
    }

    .suggestion-option-wrapper {
      overflow-y: auto;
      min-height: 200px;
      max-height: 375px;
    }

    .suggestion-option {
      padding: 10px 24px;
      font-weight: 400;
      font-size: 16px;
      color: var(--gray-800);
      cursor: pointer;
      margin-bottom: 1px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .suggestion-option:hover {
      background-color: var(--gray-200);
    }

    .filter-wrapper {
      border-bottom: 1px solid var(--gray-300);
      padding: 5px 0px;
      margin-bottom: 5px;
    }

    .filter-row {
      display: flex;
      flex-grow: 1;
      padding: 8px 10px;
      align-content: center;
    }

    .filter-label {
      font-weight: 400;
      font-size: 14px;
      color: var(--gray-500);
      margin-right: 10px;
      align-items: top;
      display: flex;
      padding: 5px 0px;
    }

    .filter-item-wrapper {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      overflow: hidden;
    }

    .filter-item {
      background: var(--gray-300);
      border-radius: 8px;
      padding: 5px 8px;
      cursor: pointer;
      color: #3f527a;
      font-weight: 400;
      font-size: 14px;
    }

    .filter-item.active {
      background: #3f527a;
      cursor: pointer;
      color: var(--gray-100);
    }

    .filter-item-more {
      padding: 8px 0px;
      display: flex;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
    }

    .hide {
      display: none;
    }

    .link {
      text-decoration-line: underline;
      color: var(--color-5-500);
      cursor: pointer;
    }

    .filter-item-more {
      padding: 8px 0px;
      display: flex;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
    }

    .hide {
      display: none;
    }

    .link {
      text-decoration-line: underline;
      color: #247cff;
      cursor: pointer;
    }
  `;

  private get _inputEl(): HTMLInputElement {
    return this.shadowRoot.getElementById('input_form')! as HTMLInputElement;
  }

  @property({ type: String })
  label?: string;
  @property({ type: String })
  textAlign = 'left';
  @property({ type: String })
  backgroundColor?: string;
  @property({ type: String })
  suggestionAlign = 'left';
  @property({ type: Option })
  options: Option;
  @property()
  filterRows: Array<FilterRow> = [];
  @property({ type: String })
  suggestionKeyName = '';
  @property({ type: String })
  suggestionTitle = '';
  @property({ type: String })
  textColumnName = 'text';
  @property({ type: String })
  valueColumnName = 'value';
  @property({ type: Boolean })
  required = false;
  @property({ type: String })
  placeholder = '';

  private _filterRowMaxHeight = 70;
  private _inputHeight = Sizes.medium;
  private _suggestionMaxHeight = 620;
  private _selectedFilterRows: Array<SelectedOption> = [];
  private _selectedOption: SelectedOption = null;
  private _suggestions: Array<Option> = [];

  @state()
  status: Status = Status.standby;
  @state()
  displaySuggestion = false;
  @state()
  filterRowExpand = {};

  @property({ type: Boolean })
  set disabled(disabled: boolean) {
    if (disabled) {
      this.status = Status.disabled;
    }
  }

  @property({ type: String })
  set size(size: string) {
    if (Object.keys(Sizes).includes(size)) {
      this._inputHeight = Sizes[size as keyof typeof Sizes];
      this.requestUpdate();
    }
  }

  @property()
  set values(values: Array<SelectedOption>) {
    if (this.filterRows.length > 0) {
      if (values.length > this.filterRows.length) {
        values.map((value, index) => {
          if (index < this.filterRows.length - 1) {
            this._selectedFilterRows.push(value);
          } else {
            this._selectedOption = value;
          }
        });
      }
    }
  }

  render(): TemplateResult {
    return html`
      <style>
        :host {
          --textAlign: ${this.textAlign};
          --background: ${this.backgroundColor ??
          (this.status === Status.disabled ? 'var(--gray-200)' : 'transparent')};
        }

        .input-wrapper {
          background-color: ${StatusBackgroundColors[this.status]};
          border-color: ${StatusBorderColors[this.status]};
          height: ${this._inputHeight};
        }

        .input input:disabled {
          background-color: ${StatusBackgroundColors.disabled};
        }

        .text-error {
          color: var(--system-colors-error);
          font-weight: 400;
          font-size: 12px;
          height: 16px;
        }

        .clear {
          display: ${this._inputEl?.value.length > 0 ? 'flex' : 'none'};
          padding: 12px;
        }

        .filter-wrapper {
          display: ${this.filterRows?.length > 0 && this._inputEl?.value.length === 0 ? 'block' : 'none'};
        }

        .filter-row-max-height {
          max-height: ${this._filterRowMaxHeight}px;
        }

        .suggestion-wrapper {
          display: ${this.status === Status.active && this.displaySuggestion ? 'flex' : 'none'};
          max-height: ${this._suggestionMaxHeight}px;
        }
      </style>
      <div style="position: relative;">
        <div class="form-title" ?hidden="${!this.label}">${this.label}</div>
        ${this._renderInputElement()}
        <div class="text-error" ?hidden="${this.status !== Status.error}">
          <c-icon color="red" icon="icon-error" size="12"></c-icon> No matching results. Please enter a new message.
        </div>
        ${this._renderSuggestionElement()}
      </div>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    document.body.addEventListener('click', this._handlePageClick);
  }

  disconnectedCallback(): void {
    document.body.removeEventListener('click', this._handlePageClick);
    super.disconnectedCallback();
  }

  firstUpdated(): void {
    this._syncInputValue();
  }

  updated(): void {
    if (this._suggestionOptionsIsDisplaying()) {
      this._updateFilterSeeMoreDisplaying();
    }
  }

  private _syncInputValue(): void {
    if (this._selectedOption?.text && this._selectedOption?.text !== this._inputEl?.value) {
      this._inputEl.value = this._selectedOption?.text;
    }
  }

  private _suggestionOptionsIsDisplaying(): boolean {
    const suggestionOptionsStyle = this._getStyleFromElement('#suggestion-wrapper');
    return suggestionOptionsStyle.display === 'none' ? false : true;
  }

  private _getStyleFromElement(selector: string): CSSStyleDeclaration {
    const element = this._getShadowElement(selector);
    return window.getComputedStyle(element);
  }

  private _getShadowElement(selector: string): Element {
    return this.shadowRoot.querySelector(selector);
  }

  private _updateFilterSeeMoreDisplaying(): void {
    const filterWrapper = this._getShadowElement('.filter-wrapper');
    const filterItems = filterWrapper.getElementsByClassName('filter-item-wrapper');
    for (let i = 0; i < filterItems.length; i++) {
      const filterItem = filterItems[i];
      const filterItemMore = filterItem.parentElement.getElementsByClassName('filter-item-more')[0];
      if (filterItem.scrollHeight > this._filterRowMaxHeight) {
        if (filterItemMore.classList.contains('hide')) {
          filterItemMore.classList.remove('hide');
        }
      } else {
        if (!filterItemMore.classList.contains('hide')) {
          filterItemMore.classList.add('hide');
        }
      }
    }
  }

  private _handlePageClick = (event: Event): void => {
    if (this.status !== Status.disabled) {
      if (event.target === this) {
        if (this.status !== Status.active) {
          this._generateSuggestions();
          this.status = Status.active;
          this.displaySuggestion = true;
        }
      } else {
        if (this.status === Status.active) {
          const validInput = this._validateInput();
          if (validInput) {
            this.status = Status.standby;
          } else {
            this.status = Status.error;
          }
          this._focusOutInput(validInput);
        }
      }
    }
  };

  private _focusOutInput(validInput: boolean): void {
    const selectedOptions: Array<SelectedOption> = [];
    if (validInput && this._selectedOption) {
      selectedOptions.push(...this._selectedFilterRows, this._selectedOption);
    }

    this.dispatchEvent(
      new CustomEvent('getValue', {
        detail: {
          selectedOptions,
        },
        bubbles: true,
      })
    );

    this._clearSelectedFilter();
    this._clearSuggestions();
    this.displaySuggestion = false;
    if (this.status === Status.active) {
      this.status = Status.standby;
    }
    this._inputEl.blur();
  }

  private _clearInput(): void {
    this._inputEl.value = '';
  }

  private _clearSelectedOption(): void {
    this._selectedOption = null;
  }

  private _focusInput(): void {
    this._inputEl.focus();
  }

  private _clearSelectedFilter(): void {
    this._selectedFilterRows = [];
  }

  private _clearSuggestions(): void {
    this._suggestions = [];
  }

  private _validateInput(): boolean {
    if (this._inputEl?.value.length > 0) {
      if (this._suggestions.length > 0) {
        for (let i = 0; i < this._suggestions.length; i++) {
          const suggestion = this._suggestions[i];
          if (suggestion[this.textColumnName] === this._inputEl?.value) {
            this._selectedOption = {
              index: i,
              text: suggestion[this.textColumnName] as string,
              value: suggestion[this.valueColumnName] as string,
            };
            return true;
          }
        }
      } else if (this._selectedOption && this._selectedOption.text === this._inputEl?.value) {
        return true;
      }
    }
    if (!this.required && this._inputEl?.value.length === 0) {
      this._clearSelectedOption();
      return true;
    }

    return false;
  }

  private _generateSuggestions(): void {
    let filteredOptions = this._filterOptions(this.options, 0);
    if (this._inputEl?.value.length > 0) {
      filteredOptions = this._filterUserInputOptions(filteredOptions);
    }

    this._suggestions = filteredOptions;
  }

  private _filterOptions(options: Option, rowIndex: number, parents: Array<SelectedOption> = []): Array<Option> {
    const filteredOptions: Array<Option> = [];
    if (rowIndex < this.filterRows.length) {
      const keyName = this.filterRows[rowIndex]['keyName'];
      if (options[keyName]) {
        const nextRowOptions: Array<Option> = options[keyName] as Array<Option>;
        const nextIndex = rowIndex + 1;
        if (this._selectedFilterRows[rowIndex]) {
          const selectedIndex = this._selectedFilterRows[rowIndex]['index'];
          const nextParents = [...parents, this._selectedFilterRows[rowIndex]];
          filteredOptions.push(...this._filterOptions(nextRowOptions[selectedIndex], nextIndex, nextParents));
        } else {
          for (let j = 0; j < nextRowOptions.length; j++) {
            const nextParents = [
              ...parents,
              {
                index: j,
                text: nextRowOptions[j][this.textColumnName] as string,
                value: nextRowOptions[j][this.valueColumnName] as string,
              },
            ];
            filteredOptions.push(...this._filterOptions(nextRowOptions[j], nextIndex, nextParents));
          }
        }
      }

      return filteredOptions;
    } else {
      const returnOptions = options[this.suggestionKeyName] as Array<Option>;
      return returnOptions.map(returnOption => {
        return { ...returnOption, parents };
      });
    }
  }

  private _filterUserInputOptions(filteredOptions: Array<Option>): Array<Option> {
    return filteredOptions.filter(options => {
      const optionText = options[this.textColumnName].toString().toLowerCase();
      return optionText.startsWith(this._inputEl?.value.toLowerCase());
    });
  }

  private _renderInputElement(): TemplateResult {
    return html`
      <div class="input-wrapper ${this.status === Status.disabled ? 'disabled' : ''}">
        <div class="icon" style="cursor: default;">
          <c-icon
            size="20"
            icon="fi_search"
            color="${this.status === Status.disabled ? 'var(--cl-text-2)' : 'var(--black-1)'}"
          ></c-icon>
        </div>
        <div class="input">
          <input
            id="input_form"
            ${this.status === Status.disabled ? 'disabled' : ''}
            @input="${() => this._onInput()}"
            placeholder="${this.placeholder}"
          />
        </div>
        <div class="clear" ?hidden="${this.status === Status.disabled}">
          <c-icon
            icon="x-circle-input"
            color="#C4C4C4"
            size="18"
            style="cursor: pointer"
            @click="${() => this._handleClearInputButtonClick()}"
          ></c-icon>
        </div>
      </div>
    `;
  }

  private _renderSuggestionElement(): TemplateResult {
    return html`
      <div id="suggestion-wrapper" class="suggestion-wrapper ${this.suggestionAlign}">
        ${this._renderFilterElement()}
        <div class="suggestion-title">${this.suggestionTitle}</div>
        ${this._renderSuggestionOption()}
      </div>
    `;
  }

  private _renderFilterElement(): TemplateResult {
    const numberOfRender = this._selectedFilterRows.length + 1;
    let selectedOption = this.options;

    return html`
      <div class="filter-wrapper">
        ${this.filterRows.slice(0, numberOfRender).map((filterRow, filterRowIndex) => {
          const displayFilterItems = selectedOption[filterRow.keyName] as Array<Option>;
          const filterRowMaxHeightClass = this.filterRowExpand[filterRowIndex] ? '' : 'filter-row-max-height';

          return html`
            <div class="filter-row">
              <div class="filter-label">${filterRow.label}</div>
              <div>
                <div class="filter-item-wrapper ${filterRowMaxHeightClass}">
                  ${Array.isArray(displayFilterItems) &&
                  displayFilterItems.map((filterItem, filterItemIndex) => {
                    let activeClass = '';
                    const filterOptionText = filterItem[this.textColumnName] as string;
                    const filterOptionValue = filterItem[this.valueColumnName] as string;
                    if (this._selectedFilterRows[filterRowIndex]?.value === filterOptionValue) {
                      activeClass = 'active';
                      selectedOption = filterItem;
                    }
                    return html`
                      <div
                        class="filter-item ${activeClass}"
                        @click="${() =>
                          this._selectFilterOption(
                            filterRowIndex,
                            filterItemIndex,
                            filterOptionText,
                            filterOptionValue
                          )}"
                      >
                        ${filterOptionText}
                      </div>
                    `;
                  })}
                </div>
                ${this._renderFilterItemMoreRow(filterRowIndex, filterRow.label.toLocaleLowerCase())}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  private _selectFilterOption(rowIndex: number, index: number, text: string, value: string): void {
    if (this._selectedFilterRows[rowIndex]) {
      let addToFilter = true;
      if (this._selectedFilterRows[rowIndex]['value'] === value) {
        addToFilter = false;
      }

      this._selectedFilterRows = this._selectedFilterRows.slice(0, rowIndex);
      if (addToFilter) {
        this._selectedFilterRows.push({ index, text, value });
      }
    } else {
      this._selectedFilterRows.push({ index, text, value });
    }

    this._generateSuggestions();
    this.requestUpdate();
  }

  private _renderFilterItemMoreRow(filterRowIndex: number, filterLabel: string): TemplateResult {
    return html`
      <div class="filter-item-more hide">
        ${this.filterRowExpand[filterRowIndex]
          ? html`
              <a
                class="link"
                @click="${(event: Event): void => {
                  event.stopPropagation();
                  this._handleSeeLessButtonClick(filterRowIndex);
                }}"
              >
                See less ${filterLabel}
              </a>
            `
          : html`
              <a
                class="link"
                @click="${(event: Event): void => {
                  event.stopPropagation();
                  this._handleSeeMoreButtonClick(filterRowIndex);
                }}"
              >
                See more ${filterLabel}
              </a>
            `}
      </div>
    `;
  }

  private _handleSeeMoreButtonClick(filterRowIndex: number): void {
    this.filterRowExpand[filterRowIndex] = true;
    this.requestUpdate();
  }

  private _handleSeeLessButtonClick(filterRowIndex: number): void {
    this.filterRowExpand[filterRowIndex] = false;
    this.requestUpdate();
  }

  private _renderSuggestionOption(): TemplateResult {
    return html`
      <div class="suggestion-option-wrapper">
        ${this._suggestions.length > 0 ? this._renderSuggestions() : this._renderNoMatchingResults()}
      </div>
    `;
  }

  private _renderSuggestions(): TemplateResult {
    return html`
      ${this._suggestions.map((suggestion, suggestionIndex) => {
        const suggestionOptionValue = suggestion[this.valueColumnName] as string;
        const suggestionOptionText = suggestion[this.textColumnName] as string;
        const parents = suggestion.parents as Array<SelectedOption>;
        return html`<div
          class="suggestion-option"
          @click="${(event: Event) => {
            event.stopPropagation();
            this._selectSuggestionOption(suggestionIndex, suggestionOptionText, suggestionOptionValue, parents);
          }}"
        >
          ${suggestionOptionText}
        </div>`;
      })}
    `;
  }

  private _selectSuggestionOption(index: number, text: string, value: string, parents: Array<SelectedOption>): void {
    this._selectedOption = { index, text, value };
    if (this._selectedFilterRows.length !== parents.length) {
      this._selectedFilterRows = parents;
    }
    this._inputEl.value = text;
    this._focusOutInput(true);
  }

  private _renderNoMatchingResults(): TemplateResult {
    return html`
      <div class="no-matching-results">
        <div class="no-matching-image">
          <c-image src="cascade-search-no-matching-results" draggable="false"></c-image>
        </div>
        <div class="no-matching-message">No matching results.</div>
      </div>
    `;
  }

  private _onInput(): void {
    if (!this.displaySuggestion) {
      this.displaySuggestion = true;
    }
    if (this._selectedFilterRows.length > 0) {
      this._selectedFilterRows = [];
    }

    this._suggestions = this._filterOptions(this.options, 0);
    this._suggestions = this._filterUserInputOptions(this._suggestions);
    this.requestUpdate();
  }

  private _handleClearInputButtonClick(): void {
    this._clearInput();
    this._clearSelectedOption();
    this._clearSelectedFilter();
    this._generateSuggestions();
    this._focusInput();
    this.displaySuggestion = true;

    this.requestUpdate();
  }
}
