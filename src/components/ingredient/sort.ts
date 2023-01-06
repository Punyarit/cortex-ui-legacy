import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { customEvent } from '../../helper/helper';
import type { SortStatusType } from '../../interfaces';
import { CSortGroup } from '../../interfaces/components.interface';
import './icon';
import './input';

@customElement('c-sort')
export class Sort extends LitElement {
  static styles = css`
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

  @property({ type: String })
  public name!: string;

  @property({ type: String })
  public type: 'date' | 'string' = 'string';

  @property({ type: String })
  public key!: string;

  @property({ type: String })
  public sortBy?: SortStatusType;

  @property({ type: String })
  public priority: '0' | '1' | '2' = '0';

  @property({ type: String })
  public height = '28px';

  @property({ type: Object })
  hide = false;

  @state()
  private currentStatusIndex = 0;

  @query('c-icon')
  cIcon!: HTMLElement;

  @query('c-input')
  cInput!: HTMLElement;

  public status = ['inactive', 'ascending', 'descending'] as const;

  public sorted!: Record<string, unknown>[];

  private keyArray!: string[];

  private cSortGroup!: CSortGroup;

  private updateOnce = false;
  private hasSortGroup = false;

  render() {
    return html`
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
    this.cSortGroup = this.parentElement as CSortGroup;
  }

  public sort() {
    this.changeStatus(this.sortBy);

    if (this.parentElement?.tagName === 'C-SORT-GROUP') {
      this.hasSortGroup = true;
      this.sortFromGroup(this.sortBy);
    } else {
      customEvent(this, 'sortClick', {
        status: this.status[this.currentStatusIndex],
      });
    }
  }

  public sortFromGroup(sortBy?: SortStatusType) {
    this.cSortGroup.sort(
      sortBy || this.status[this.currentStatusIndex],
      this.keyArray,
      this.name,
      this.priority,
      this.type
    );
  }

  private changeStatus(status?: SortStatusType) {
    if (status) {
      const statusIndex = this.status.indexOf(status);
      this.currentStatusIndex = statusIndex;
      return;
    }
    if (this.currentStatusIndex >= 2) {
      this.currentStatusIndex = 0;
    } else {
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
    } else {
      this.cInput.style.color = 'var(--color-5-500)';
      this.cInput.setAttribute('borderColor', 'var(--color-5-500)');
      this.cIcon.style.display = 'inline-block';
    }
    if (!this.hasSortGroup) return;
    if (this.updateOnce) return;

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

  public setStatus(index: number) {
    this.currentStatusIndex = index;
  }
}
