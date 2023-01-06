import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './image';

@customElement('c-splash-screen')
export class SplashScreen extends LitElement {
  static styles = css`
    .content-wrapper {
      width: 100%;
      height: 100vh;
      display: grid;
      place-items: center;
    }

    c-image {
      animation: pulse 1s ease infinite;
    }

    @keyframes pulse {
      0% {
        opacity: 0.4;
      }
      50% {
        opacity: 1;
      }

      100% {
        opacity: 0.4;
      }
    }
  `;

  @property()
  imgSrc?: string;

  @property()
  size: string;

  render() {
    return html`
      <div class="content-wrapper">
        <c-image .draggable="${false}" width="${this.size}" src="${this.imgSrc}" alt=""></c-image>
      </div>
    `;
  }
}
