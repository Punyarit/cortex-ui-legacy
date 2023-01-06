import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('c-paper')
export class Paper extends LitElement {
  static styles = css`
    .paper-wrapper {
      max-width: var(--width);
      min-width: var(--width);
      max-height: var(--height);
      min-height: var(--height);
      background: var(--white-1);
      padding: var(--padding);
      box-sizing: border-box;
      overflow: hidden;
      height: var(--height);
      display: flex;
      flex-flow: column;
    }

    .preview-margin {
      margin-bottom: 20px;
    }
  `;

  @property()
  type: 'A4' | 'Custom' = 'Custom';

  @property()
  padding = '0';

  @property()
  height: string;

  @property()
  width: string;

  render() {
    return html`
      <style>
        :host {
          --padding: ${this.padding};
        }
      </style>
      <div class="paper-wrapper">
        <slot></slot>
      </div>
    `;
  }

  updated() {
    if (this.type) {
      const host = this.shadowRoot?.host as HTMLElement;
      switch (this.type) {
        case 'A4':
          host.style.setProperty('--width', '210mm');
          // 297 will display wrong when using macOs
          host.style.setProperty('--height', '296.5mm');
          break;

        case 'Custom':
          host.style.setProperty('--width', `${this.width}`);
          // 297 will display wrong when using macOs
          host.style.setProperty('--height', `${this.height}`);
          break;

        default:
          break;
      }
    }
  }
}
