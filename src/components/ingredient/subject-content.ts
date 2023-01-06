import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('c-subject-content')
export class SubjectContent extends LitElement {
  static styles = css`
    .subject-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .type-label {
      font-size: 20px;
      font-weight: 600;
    }

    .type-sub-label {
      font-size: 18px;
      font-weight: 600;
      color: #7386af;
    }
  `;

  @property()
  label = '';

  @property()
  error?: boolean;

  @property()
  type: 'label' | 'sub-label' = 'label';

  render() {
    return html`
      <div class="subject-wrapper">
        <div class="type-${this.type}" style="color: ${this.error ? '#F3655C' : 'unset'}">${this.label}</div>
        <slot name="button"></slot>
      </div>
    `;
  }
}
