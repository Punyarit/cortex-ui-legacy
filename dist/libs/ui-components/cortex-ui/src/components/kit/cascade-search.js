import { __decorate, __metadata } from "tslib";
import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../ingredient/button';
import '../ingredient/icon';
var Sizes;
(function (Sizes) {
    Sizes["small"] = "46px";
    Sizes["medium"] = "54px";
})(Sizes || (Sizes = {}));
var Status;
(function (Status) {
    Status["standby"] = "standby";
    Status["active"] = "active";
    Status["error"] = "error";
    Status["disabled"] = "disabled";
})(Status || (Status = {}));
var StatusBorderColors;
(function (StatusBorderColors) {
    StatusBorderColors["standby"] = "var(--gray-400)";
    StatusBorderColors["active"] = "var(--color-5-500)";
    StatusBorderColors["error"] = "var(--system-colors-error)";
    StatusBorderColors["disabled"] = "var(--cl-input-disabled)";
})(StatusBorderColors || (StatusBorderColors = {}));
var StatusBackgroundColors;
(function (StatusBackgroundColors) {
    StatusBackgroundColors["standby"] = "var(--neutral-100)";
    StatusBackgroundColors["active"] = "var(--neutral-100)";
    StatusBackgroundColors["error"] = "var(--neutral-100)";
    StatusBackgroundColors["disabled"] = "var(--cl-input-disabled)";
})(StatusBackgroundColors || (StatusBackgroundColors = {}));
let CascadeSearch = class CascadeSearch extends LitElement {
    constructor() {
        super(...arguments);
        this.textAlign = 'left';
        this.suggestionAlign = 'left';
        this.filterRows = [];
        this.suggestionKeyName = '';
        this.suggestionTitle = '';
        this.textColumnName = 'text';
        this.valueColumnName = 'value';
        this.required = false;
        this.placeholder = '';
        this._filterRowMaxHeight = 70;
        this._inputHeight = Sizes.medium;
        this._suggestionMaxHeight = 620;
        this._selectedFilterRows = [];
        this._selectedOption = null;
        this._suggestions = [];
        this.status = Status.standby;
        this.displaySuggestion = false;
        this.filterRowExpand = {};
        this._handlePageClick = (event) => {
            if (this.status !== Status.disabled) {
                if (event.target === this) {
                    if (this.status !== Status.active) {
                        this._generateSuggestions();
                        this.status = Status.active;
                        this.displaySuggestion = true;
                    }
                }
                else {
                    if (this.status === Status.active) {
                        const validInput = this._validateInput();
                        if (validInput) {
                            this.status = Status.standby;
                        }
                        else {
                            this.status = Status.error;
                        }
                        this._focusOutInput(validInput);
                    }
                }
            }
        };
    }
    get _inputEl() {
        return this.shadowRoot.getElementById('input_form');
    }
    set disabled(disabled) {
        if (disabled) {
            this.status = Status.disabled;
        }
    }
    set size(size) {
        if (Object.keys(Sizes).includes(size)) {
            this._inputHeight = Sizes[size];
            this.requestUpdate();
        }
    }
    set values(values) {
        if (this.filterRows.length > 0) {
            if (values.length > this.filterRows.length) {
                values.map((value, index) => {
                    if (index < this.filterRows.length - 1) {
                        this._selectedFilterRows.push(value);
                    }
                    else {
                        this._selectedOption = value;
                    }
                });
            }
        }
    }
    render() {
        return html `
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
    connectedCallback() {
        super.connectedCallback();
        document.body.addEventListener('click', this._handlePageClick);
    }
    disconnectedCallback() {
        document.body.removeEventListener('click', this._handlePageClick);
        super.disconnectedCallback();
    }
    firstUpdated() {
        this._syncInputValue();
    }
    updated() {
        if (this._suggestionOptionsIsDisplaying()) {
            this._updateFilterSeeMoreDisplaying();
        }
    }
    _syncInputValue() {
        if (this._selectedOption?.text && this._selectedOption?.text !== this._inputEl?.value) {
            this._inputEl.value = this._selectedOption?.text;
        }
    }
    _suggestionOptionsIsDisplaying() {
        const suggestionOptionsStyle = this._getStyleFromElement('#suggestion-wrapper');
        return suggestionOptionsStyle.display === 'none' ? false : true;
    }
    _getStyleFromElement(selector) {
        const element = this._getShadowElement(selector);
        return window.getComputedStyle(element);
    }
    _getShadowElement(selector) {
        return this.shadowRoot.querySelector(selector);
    }
    _updateFilterSeeMoreDisplaying() {
        const filterWrapper = this._getShadowElement('.filter-wrapper');
        const filterItems = filterWrapper.getElementsByClassName('filter-item-wrapper');
        for (let i = 0; i < filterItems.length; i++) {
            const filterItem = filterItems[i];
            const filterItemMore = filterItem.parentElement.getElementsByClassName('filter-item-more')[0];
            if (filterItem.scrollHeight > this._filterRowMaxHeight) {
                if (filterItemMore.classList.contains('hide')) {
                    filterItemMore.classList.remove('hide');
                }
            }
            else {
                if (!filterItemMore.classList.contains('hide')) {
                    filterItemMore.classList.add('hide');
                }
            }
        }
    }
    _focusOutInput(validInput) {
        const selectedOptions = [];
        if (validInput && this._selectedOption) {
            selectedOptions.push(...this._selectedFilterRows, this._selectedOption);
        }
        this.dispatchEvent(new CustomEvent('getValue', {
            detail: {
                selectedOptions,
            },
            bubbles: true,
        }));
        this._clearSelectedFilter();
        this._clearSuggestions();
        this.displaySuggestion = false;
        if (this.status === Status.active) {
            this.status = Status.standby;
        }
        this._inputEl.blur();
    }
    _clearInput() {
        this._inputEl.value = '';
    }
    _clearSelectedOption() {
        this._selectedOption = null;
    }
    _focusInput() {
        this._inputEl.focus();
    }
    _clearSelectedFilter() {
        this._selectedFilterRows = [];
    }
    _clearSuggestions() {
        this._suggestions = [];
    }
    _validateInput() {
        if (this._inputEl?.value.length > 0) {
            if (this._suggestions.length > 0) {
                for (let i = 0; i < this._suggestions.length; i++) {
                    const suggestion = this._suggestions[i];
                    if (suggestion[this.textColumnName] === this._inputEl?.value) {
                        this._selectedOption = {
                            index: i,
                            text: suggestion[this.textColumnName],
                            value: suggestion[this.valueColumnName],
                        };
                        return true;
                    }
                }
            }
            else if (this._selectedOption && this._selectedOption.text === this._inputEl?.value) {
                return true;
            }
        }
        if (!this.required && this._inputEl?.value.length === 0) {
            this._clearSelectedOption();
            return true;
        }
        return false;
    }
    _generateSuggestions() {
        let filteredOptions = this._filterOptions(this.options, 0);
        if (this._inputEl?.value.length > 0) {
            filteredOptions = this._filterUserInputOptions(filteredOptions);
        }
        this._suggestions = filteredOptions;
    }
    _filterOptions(options, rowIndex, parents = []) {
        const filteredOptions = [];
        if (rowIndex < this.filterRows.length) {
            const keyName = this.filterRows[rowIndex]['keyName'];
            if (options[keyName]) {
                const nextRowOptions = options[keyName];
                const nextIndex = rowIndex + 1;
                if (this._selectedFilterRows[rowIndex]) {
                    const selectedIndex = this._selectedFilterRows[rowIndex]['index'];
                    const nextParents = [...parents, this._selectedFilterRows[rowIndex]];
                    filteredOptions.push(...this._filterOptions(nextRowOptions[selectedIndex], nextIndex, nextParents));
                }
                else {
                    for (let j = 0; j < nextRowOptions.length; j++) {
                        const nextParents = [
                            ...parents,
                            {
                                index: j,
                                text: nextRowOptions[j][this.textColumnName],
                                value: nextRowOptions[j][this.valueColumnName],
                            },
                        ];
                        filteredOptions.push(...this._filterOptions(nextRowOptions[j], nextIndex, nextParents));
                    }
                }
            }
            return filteredOptions;
        }
        else {
            const returnOptions = options[this.suggestionKeyName];
            return returnOptions.map(returnOption => {
                return { ...returnOption, parents };
            });
        }
    }
    _filterUserInputOptions(filteredOptions) {
        return filteredOptions.filter(options => {
            const optionText = options[this.textColumnName].toString().toLowerCase();
            return optionText.startsWith(this._inputEl?.value.toLowerCase());
        });
    }
    _renderInputElement() {
        return html `
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
    _renderSuggestionElement() {
        return html `
      <div id="suggestion-wrapper" class="suggestion-wrapper ${this.suggestionAlign}">
        ${this._renderFilterElement()}
        <div class="suggestion-title">${this.suggestionTitle}</div>
        ${this._renderSuggestionOption()}
      </div>
    `;
    }
    _renderFilterElement() {
        const numberOfRender = this._selectedFilterRows.length + 1;
        let selectedOption = this.options;
        return html `
      <div class="filter-wrapper">
        ${this.filterRows.slice(0, numberOfRender).map((filterRow, filterRowIndex) => {
            const displayFilterItems = selectedOption[filterRow.keyName];
            const filterRowMaxHeightClass = this.filterRowExpand[filterRowIndex] ? '' : 'filter-row-max-height';
            return html `
            <div class="filter-row">
              <div class="filter-label">${filterRow.label}</div>
              <div>
                <div class="filter-item-wrapper ${filterRowMaxHeightClass}">
                  ${Array.isArray(displayFilterItems) &&
                displayFilterItems.map((filterItem, filterItemIndex) => {
                    let activeClass = '';
                    const filterOptionText = filterItem[this.textColumnName];
                    const filterOptionValue = filterItem[this.valueColumnName];
                    if (this._selectedFilterRows[filterRowIndex]?.value === filterOptionValue) {
                        activeClass = 'active';
                        selectedOption = filterItem;
                    }
                    return html `
                      <div
                        class="filter-item ${activeClass}"
                        @click="${() => this._selectFilterOption(filterRowIndex, filterItemIndex, filterOptionText, filterOptionValue)}"
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
    _selectFilterOption(rowIndex, index, text, value) {
        if (this._selectedFilterRows[rowIndex]) {
            let addToFilter = true;
            if (this._selectedFilterRows[rowIndex]['value'] === value) {
                addToFilter = false;
            }
            this._selectedFilterRows = this._selectedFilterRows.slice(0, rowIndex);
            if (addToFilter) {
                this._selectedFilterRows.push({ index, text, value });
            }
        }
        else {
            this._selectedFilterRows.push({ index, text, value });
        }
        this._generateSuggestions();
        this.requestUpdate();
    }
    _renderFilterItemMoreRow(filterRowIndex, filterLabel) {
        return html `
      <div class="filter-item-more hide">
        ${this.filterRowExpand[filterRowIndex]
            ? html `
              <a
                class="link"
                @click="${(event) => {
                event.stopPropagation();
                this._handleSeeLessButtonClick(filterRowIndex);
            }}"
              >
                See less ${filterLabel}
              </a>
            `
            : html `
              <a
                class="link"
                @click="${(event) => {
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
    _handleSeeMoreButtonClick(filterRowIndex) {
        this.filterRowExpand[filterRowIndex] = true;
        this.requestUpdate();
    }
    _handleSeeLessButtonClick(filterRowIndex) {
        this.filterRowExpand[filterRowIndex] = false;
        this.requestUpdate();
    }
    _renderSuggestionOption() {
        return html `
      <div class="suggestion-option-wrapper">
        ${this._suggestions.length > 0 ? this._renderSuggestions() : this._renderNoMatchingResults()}
      </div>
    `;
    }
    _renderSuggestions() {
        return html `
      ${this._suggestions.map((suggestion, suggestionIndex) => {
            const suggestionOptionValue = suggestion[this.valueColumnName];
            const suggestionOptionText = suggestion[this.textColumnName];
            const parents = suggestion.parents;
            return html `<div
          class="suggestion-option"
          @click="${(event) => {
                event.stopPropagation();
                this._selectSuggestionOption(suggestionIndex, suggestionOptionText, suggestionOptionValue, parents);
            }}"
        >
          ${suggestionOptionText}
        </div>`;
        })}
    `;
    }
    _selectSuggestionOption(index, text, value, parents) {
        this._selectedOption = { index, text, value };
        if (this._selectedFilterRows.length !== parents.length) {
            this._selectedFilterRows = parents;
        }
        this._inputEl.value = text;
        this._focusOutInput(true);
    }
    _renderNoMatchingResults() {
        return html `
      <div class="no-matching-results">
        <div class="no-matching-image">
          <c-image src="cascade-search-no-matching-results" draggable="false"></c-image>
        </div>
        <div class="no-matching-message">No matching results.</div>
      </div>
    `;
    }
    _onInput() {
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
    _handleClearInputButtonClick() {
        this._clearInput();
        this._clearSelectedOption();
        this._clearSelectedFilter();
        this._generateSuggestions();
        this._focusInput();
        this.displaySuggestion = true;
        this.requestUpdate();
    }
};
CascadeSearch.styles = css `
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
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], CascadeSearch.prototype, "label", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], CascadeSearch.prototype, "textAlign", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], CascadeSearch.prototype, "backgroundColor", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], CascadeSearch.prototype, "suggestionAlign", void 0);
__decorate([
    property({ type: Option }),
    __metadata("design:type", Object)
], CascadeSearch.prototype, "options", void 0);
__decorate([
    property(),
    __metadata("design:type", Array)
], CascadeSearch.prototype, "filterRows", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], CascadeSearch.prototype, "suggestionKeyName", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], CascadeSearch.prototype, "suggestionTitle", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], CascadeSearch.prototype, "textColumnName", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], CascadeSearch.prototype, "valueColumnName", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], CascadeSearch.prototype, "required", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], CascadeSearch.prototype, "placeholder", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], CascadeSearch.prototype, "status", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], CascadeSearch.prototype, "displaySuggestion", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], CascadeSearch.prototype, "filterRowExpand", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], CascadeSearch.prototype, "disabled", null);
__decorate([
    property({ type: String }),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], CascadeSearch.prototype, "size", null);
__decorate([
    property(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], CascadeSearch.prototype, "values", null);
CascadeSearch = __decorate([
    customElement('c-cascade-search')
], CascadeSearch);
export { CascadeSearch };
//# sourceMappingURL=cascade-search.js.map