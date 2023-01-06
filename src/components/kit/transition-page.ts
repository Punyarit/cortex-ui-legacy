import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('c-transition-page')
export class TransitionPage extends LitElement {
  static styles = css`
    .fill-mode {
      animation-fill-mode: forwards !important;
    }

    .transition-wrapper {
      opacity: 1;
      transition: opacity 0.2s ease;
      height: calc(100% - 80px);
      position: relative;
      overflow: hidden;
      height: 100%;
    }

    .fade-in {
      opacity: 1;
    }

    .fade-out {
      opacity: 0;
    }

    /* slide------------------------------------------------- */
    .slide-down {
      transform: none !important;
      animation: slide-down 0.2s ease;
    }

    .slide-down-reverse {
      transform: none !important;
      animation: slide-down-reverse 0.2s ease;
    }

    @keyframes slide-down {
      from {
        transform: translate(0, -10%);
      }

      to {
        transform: translate(0, 0);
      }
    }

    @keyframes slide-down-reverse {
      from {
        transform: translate(0, 0);
      }

      to {
        transform: translate(0, -10%);
      }
    }
    /* scale---------------------------------------------------*/
    .scale-down {
      transform: none !important;
      animation: scale-down 0.2s ease;
      animation-fill-mode: forwards !important;
    }

    .scale-down-reverse {
      transform: none !important;
      animation: scale-down-reverse 0.2s ease;
      animation-fill-mode: forwards !important;
    }

    @keyframes scale-down {
      from {
        opacity: 1;
        transform: scale(1);
      }

      to {
        opacity: 0;
        transform: scale(0.9);
      }
    }

    @keyframes scale-down-reverse {
      from {
        transform: scale(0.9);
      }

      to {
        transform: scale(1);
      }
    }
  `;

  render() {
    return html`
      <div class="transition-wrapper">
        <slot></slot>
      </div>
    `;
  }
}
