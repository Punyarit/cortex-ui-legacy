import dayjs from 'dayjs';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { customEvent } from '../../helper/helper';
import { SortStatusType } from '../../interfaces';
import { CSort } from '../../interfaces/components.interface';
@customElement('c-sort-group')
export class SortGroup extends LitElement {
  static styles = css``;

  @property() public data: Record<any, any>[] = [];

  public sortedData: Record<any, any>[] = [];
  public sortCache: Record<string, number> = {};

  private updateOnce = false;
  private isKeepSortScore = false;
  private sortScore = {};
  private cSorts!: NodeListOf<CSort>;

  // FIX: improve later
  private sortCalcValue = {
    '0': 1,
    '1': 100000000,
    '2': 1000,
  };

  private hasPriority = false;

  render() {
    return html` <slot></slot> `;
  }

  public sort(
    status: SortStatusType,
    key?: string[],
    name?: string,
    priority: '0' | '1' | '2' = '0',
    type?: 'date' | 'string'
  ) {
    this.sortByStatus(status, key, priority, type);
    this.getSortedEvent();
    if (name) this.setCSortStatus(name);
    this.updateOnce = true;
  }

  setCSortStatus(name: string) {
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

  sortByStatus(status: SortStatusType, key?: string[], priority: '0' | '1' | '2' = '0', type?: 'date' | 'string') {
    const cloneData = JSON.parse(JSON.stringify(this.data || [])) as Record<any, any>[];
    setTimeout(() => {
      if (this.hasPriority) {
        this.sortCache = { ...this.sortScore };
        cloneData.forEach(res => {
          let value: any;
          try {
            value = key?.length ? this.findValueOfLastKey(key, res) : '';
          } catch {
            value = '';
          }

          if (type === 'date') {
            value = dayjs(value).valueOf();
          }

          if (+priority > 0) {
            this.setSortScore(status, this.sortCalcValue[priority] * value, res);
          } else {
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

  setSortScore(status: SortStatusType, value: number, res: Record<string, string>) {
    if (status === 'ascending') {
      this.sortCache[res.id] = (this.sortCache[res.id] || 0) + value;
    } else if (status === 'descending') {
      this.sortCache[res.id] = (this.sortCache[res.id] || 0) - value;
    }
  }

  findValueOfLastKey(keys: string[], data: DeepStringRecord) {
    if (keys.length) {
      const value = keys.reduce<DeepStringRecordValue | DeepStringRecordValue[]>((innerData, key) => {
        // FIX: this component is not done yet
        // @ts-ignore
        return typeof innerData === 'string' ? undefined : innerData?.[key];
      }, data as DeepStringRecordValue);

      return value;
    }
    return '';
  }
  connectedCallback() {
    super.connectedCallback();
    this.cSorts = this.querySelectorAll<CSort>('c-sort');
  }
}

type DeepStringRecord = {
  [key: string]: DeepStringRecordValue | DeepStringRecordValue[];
};

type DeepStringRecordValue = DeepStringRecord | string | undefined;
