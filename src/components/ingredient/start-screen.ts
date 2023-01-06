import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { timeout } from '../../helper/helper';
import './image';

@customElement('c-start-screen')
export class StartScreen extends LitElement {
  static styles = css`
    .start-screen-wrapper {
      position: fixed;
      width: 100%;
      height: 100vh;
      z-index: 1;
      pointer-events: none;
    }
  `;

  @property()
  logoSrc: string;

  @property()
  size: string;

  @state()
  screenSize: {
    width: string | null;
    height: string | null;
  } = {
    width: null,
    height: null,
  };

  render() {
    return html`
      <style>
        .move-to-slider {
          transform: translate(${this.screenSize?.width}, ${this.screenSize?.height}) scale(1);
          animation: move-to-sidebar 1s ease forwards;
        }

        @keyframes move-to-sidebar {
          0% {
            transform: translate(${this.screenSize.width}, ${this.screenSize.height}) scale(1);
          }
          100% {
            transform: translate(-69px, -71px) scale(0.17);
          }
        }

        .scale-up {
          transform: translate(${this.screenSize?.width}, ${this.screenSize?.height}) scale(1);
          animation: scale-down 1s ease;
          animation-fill-mode: forwards !important;
        }

        @keyframes scale-down {
          from {
            opacity: 1;
            transform: translate(${this.screenSize?.width}, ${this.screenSize?.height}) scale(1);
          }

          to {
            opacity: 0;
            transform: translate(${this.screenSize?.width}, ${this.screenSize?.height}) scale(2);
          }
        }
      </style>
      <div class="start-screen-wrapper">
        <c-image .draggable="${false}" width="${this.size}" src="${this.logoSrc}"></c-image>
      </div>
      <slot></slot>
    `;
  }

  firstUpdated() {
    const startedScreen = sessionStorage.getItem('started-screen');
    const image = this.shadowRoot?.querySelector('c-image');

    if (startedScreen) {
      // do something
      image.classList.add('scale-up');
      sessionStorage.setItem('start-screen-animated', 'scale-up');
    } else {
      sessionStorage.setItem('started-screen', 'true');
      sessionStorage.setItem('start-screen-animated', 'move-to-slider');
      image.classList.add('move-to-slider');
    }

    const screenY = document.body.clientHeight / 2 - 106;
    const screenX = document.body.clientWidth / 2 - 100;
    this.screenSize = {
      height: screenY + 'px',
      width: screenX + 'px',
    };
    timeout(1500).then(() => {
      const startScreen = this.shadowRoot?.querySelector('.start-screen-wrapper');
      startScreen.remove();
    });
  }
}
