import { __decorate, __metadata } from "tslib";
import dayjs from 'dayjs';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { customEvent } from '../../helper/helper';
let SortGroup = class SortGroup extends LitElement {
    constructor() {
        super(...arguments);
        this.data = [];
        this.sortedData = [];
        this.sortCache = {};
        this.updateOnce = false;
        this.isKeepSortScore = false;
        this.sortScore = {};
        // FIX: improve later
        this.sortCalcValue = {
            '0': 1,
            '1': 100000000,
            '2': 1000,
        };
        this.hasPriority = false;
    }
    render() {
        return html ` <slot></slot> `;
    }
    sort(status, key, name, priority = '0', type) {
        this.sortByStatus(status, key, priority, type);
        this.getSortedEvent();
        if (name)
            this.setCSortStatus(name);
        this.updateOnce = true;
    }
    setCSortStatus(name) {
        this.cSorts.forEach(cSort => {
            if (+cSort.priority > 0 && !this.hasPriority) {
                this.hasPriority = true;
            }
            if (cSort.name !== name && !cSort.sort) {
                cSort.setStatus(0);
            }
            if (cSort.priority && !this.updateOnce) {
                setTimeout(() => {
                    this.data = this.sortedData;
                }, 0);
            }
        });
    }
    getSortedEvent() {
        setTimeout(() => {
            customEvent(this, 'getSorted', { sorted: this.sortedData });
        }, 0);
    }
    sortByStatus(status, key, priority = '0', type) {
        const cloneData = JSON.parse(JSON.stringify(this.data || []));
        setTimeout(() => {
            if (this.hasPriority) {
                this.sortCache = { ...this.sortScore };
                cloneData.forEach(res => {
                    let value;
                    try {
                        value = key?.length ? this.findValueOfLastKey(key, res) : '';
                    }
                    catch {
                        value = '';
                    }
                    if (type === 'date') {
                        value = dayjs(value).valueOf();
                    }
                    if (+priority > 0) {
                        this.setSortScore(status, this.sortCalcValue[priority] * value, res);
                    }
                    else {
                        this.setSortScore(status, value, res);
                    }
                });
                if (!this.isKeepSortScore) {
                    this.sortScore = this.sortCache;
                }
                if (+priority < 1) {
                    this.isKeepSortScore = true;
                }
                this.sortedData = cloneData.sort((a, b) => this.sortCache[a.id] - this.sortCache[b.id]);
            }
        }, 0);
    }
    setSortScore(status, value, res) {
        if (status === 'ascending') {
            this.sortCache[res.id] = (this.sortCache[res.id] || 0) + value;
        }
        else if (status === 'descending') {
            this.sortCache[res.id] = (this.sortCache[res.id] || 0) - value;
        }
    }
    findValueOfLastKey(keys, data) {
        if (keys.length) {
            const value = keys.reduce((innerData, key) => {
                // FIX: this component is not done yet
                // @ts-ignore
                return typeof innerData === 'string' ? undefined : innerData?.[key];
            }, data);
            return value;
        }
        return '';
    }
    connectedCallback() {
        super.connectedCallback();
        this.cSorts = this.querySelectorAll('c-sort');
    }
};
SortGroup.styles = css ``;
__decorate([
    property(),
    __metadata("design:type", Array)
], SortGroup.prototype, "data", void 0);
SortGroup = __decorate([
    customElement('c-sort-group')
], SortGroup);
export { SortGroup };
//# sourceMappingURL=sort-group.js.map