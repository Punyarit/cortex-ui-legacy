import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { customEvent, findEmptySlot } from '../../helper/helper';
import '../ingredient/checkbox';

interface EmptySlot {
  'alt-text'?: boolean;
}

@customElement('c-color-card')
export class ColorCard extends LitElement {
  static styles = css`
    .content-wrapper {
      width: 100%;
      height: 100%;
      border: var(--borders);
    }

    .title-text {
      padding: 8px 14px;
      font-size: 14px;
      font-weight: 600;
    }

    .alt-text {
      padding: 8px 14px;
      font-size: 14px;
      font-weight: 600;
    }

    .card-header {
      display: flex;
    }

    .alt-wrapper {
      display: flex;
      column-gap: 6px;
      align-items: center;
    }
  `;

  @property()
  subject: string;

  @property()
  bgTitle: string;

  @property()
  bgContent: string;

  @property()
  clTitle: string;

  @property()
  radius: string;

  @property()
  fluid = false;

  @property()
  highlight = false;

  @property()
  padding: string;

  @property()
  borders: string;

  @property()
  overflow = `hidden`;

  @property()
  titlePosition: 'center' | 'left' = 'center';

  @property()
  config = {
    checkbox: false,
  };

  @property()
  styles = {
    checkbox: {
      border: 'var(--gray-400)',
      disabledColor: 'var(--gray-500)',
      checkedBackground: 'var(--gray-600)',
      background: 'var(--bg-content)',
    },
  };

  @property()
  checked = false;

  @property()
  disabled = false;

  @state()
  emptySlot: EmptySlot;

  render() {
    return html`
      <style>
        :host {
          flex-grow: ${this.fluid ? 1 : 0};
          flex-basis: ${this.fluid ? 0 : 'auto'};
          --borders: ${this.borders};
          --mdc-checkbox-unchecked-color: var(--gray-500);
        }

        .content-wrapper {
          background: ${this.bgContent};
          border-radius: ${this.radius};
          overflow: ${this.overflow};
          cursor: default;
        }
        .content-hightlight {
          transition: 0.25s;
        }
        .content-hightlight:hover {
          box-shadow: 0 0px 0 4px ${this.clTitle};
        }
        .card-header {
          background: ${this.bgTitle};
          color: ${this.clTitle};
          justify-content: ${this.titlePosition === 'left' ? 'space-between' : 'center'};
        }

        .alt-text {
          padding: 8px ${this.config.checkbox ? '14px 8px 0' : '14px'} !important;
        }
      </style>

      <div class="content-wrapper ${this.highlight && 'content-hightlight'}">
        <div class="card-header">
          ${this.subject ? html`<div class="title-text">${this.subject}</div>` : html`<slot name="subject"></slot>`}

          <div class="alt-wrapper">
            ${this.config.checkbox
              ? html`
                  <c-checkbox
                    .styles="${this.styles.checkbox}"
                    .checked="${this.checked}"
                    .disabled="${this.disabled}"
                    @change="${(e: CustomEvent) => this.checkboxChange(e)}"
                  ></c-checkbox>
                `
              : undefined}
            ${this.emptySlot?.['alt-text']
              ? undefined
              : html`<div class="alt-text"><slot name="alt-text"></slot></div>`}
          </div>
        </div>
        <div class="content" style="padding: ${this.padding ?? '12px'}">
          <slot></slot>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    const slots = this.shadowRoot?.querySelectorAll('slot');
    this.emptySlot = findEmptySlot(slots);
  }

  checkboxChange(e: CustomEvent) {
    customEvent(this, 'change', {
      checked: e.detail.checked,
    });
  }
}
