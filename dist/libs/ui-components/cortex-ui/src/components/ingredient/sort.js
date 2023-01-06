import { __decorate, __metadata } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { customEvent } from '../../helper/helper';
import './icon';
import './input';
let Sort = class Sort extends LitElement {
    constructor() {
        super(...arguments);
        this.type = 'string';
        this.priority = '0';
        this.height = '28px';
        this.hide = false;
        this.currentStatusIndex = 0;
        this.status = ['inactive', 'ascending', 'descending'];
        this.updateOnce = false;
        this.hasSortGroup = false;
    }
    render() {
        return html `
      <c-input backgroundColor="transparent" .height="${this.height}" @click="${() => this.sort()}">
        <div>
          ${this.name}
          <c-icon size="12" class="${this.status[this.currentStatusIndex]}" icon="fi_arrow-up"></c-icon>
        </div>
      </c-input>
    `;
    }
    connectedCallback() {
        super.connectedCallback();
        this.cSortGroup = this.parentElement;
    }
    sort() {
        this.changeStatus(this.sortBy);
        if (this.parentElement?.tagName === 'C-SORT-GROUP') {
            this.hasSortGroup = true;
            this.sortFromGroup(this.sortBy);
        }
        else {
            customEvent(this, 'sortClick', {
                status: this.status[this.currentStatusIndex],
            });
        }
    }
    sortFromGroup(sortBy) {
        this.cSortGroup.sort(sortBy || this.status[this.currentStatusIndex], this.keyArray, this.name, this.priority, this.type);
    }
    changeStatus(status) {
        if (status) {
            const statusIndex = this.status.indexOf(status);
            this.currentStatusIndex = statusIndex;
            return;
        }
        if (this.currentStatusIndex >= 2) {
            this.currentStatusIndex = 0;
        }
        else {
            this.currentStatusIndex = this.currentStatusIndex + 1;
        }
    }
    updated() {
        if (this.status[this.currentStatusIndex] === 'inactive') {
            setTimeout(() => {
                this.cInput.style.color = 'var(--gray-700)';
                this.cInput.setAttribute('borderColor', 'var(--gray-400)');
                this.cIcon.style.display = 'none';
            }, 130);
        }
        else {
            this.cInput.style.color = 'var(--color-5-500)';
            this.cInput.setAttribute('borderColor', 'var(--color-5-500)');
            this.cIcon.style.display = 'inline-block';
        }
        if (!this.hasSortGroup)
            return;
        if (this.updateOnce)
            return;
        this.keyArray = this.key.split('.');
        if (this.hide) {
            this.style.display = 'none';
        }
        if (this.sortBy) {
            this.sortFromGroup(this.sortBy);
        }
        if (!this.priority) {
            this.sortBy = undefined;
        }
        this.updateOnce = true;
    }
    setStatus(index) {
        this.currentStatusIndex = index;
    }
};
Sort.styles = css `
    c-icon {
      opacity: 1;
      transition: transform 0.125s, opacity 0.25s;
      translate: 0px 4px;
      margin-left: 6px;
    }

    c-input {
      display: inline-block;
      color: var(--gray-700);
      user-select: none;
      cursor: pointer;
    }

    .inactive {
      opacity: 0;
      transform: rotate(180deg);
    }

    .descending {
      opacity: 1;
      transform: rotate(0deg);
      translate: 0px -1.5px;
    }

    .ascending {
      opacity: 1;
      transform: rotate(180deg);
      translate: 0px 3.5px;
    }

    .ignore-click {
      pointer-events: none;
    }
  `;
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], Sort.prototype, "name", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], Sort.prototype, "type", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], Sort.prototype, "key", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], Sort.prototype, "sortBy", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], Sort.prototype, "priority", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Sort.prototype, "height", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], Sort.prototype, "hide", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Sort.prototype, "currentStatusIndex", void 0);
__decorate([
    query('c-icon'),
    __metadata("design:type", HTMLElement)
], Sort.prototype, "cIcon", void 0);
__decorate([
    query('c-input'),
    __metadata("design:type", HTMLElement)
], Sort.prototype, "cInput", void 0);
Sort = __decorate([
    customElement('c-sort')
], Sort);
export { Sort };
//# sourceMappingURL=sort.js.map