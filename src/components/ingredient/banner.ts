import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { timeout } from '../../helper/helper';
import { CImage } from '../../interfaces/components.interface';
import './image';

@customElement('c-banner')
export class Banner extends LitElement {
  static styles = css`
    .banner-wrapper {
      width: 100%;
      height: var(--height);
      position: relative;
      overflow: hidden;
      background: var(--gray-300);
      border-radius: 24px;
    }

    .sun-img {
      position: absolute;
      z-index: 1;
    }

    .sun-position {
      left: -60px;
      top: -60px;
    }

    .slot-wrapper {
      position: absolute;
      z-index: 2;
      left: 0;
      top: 0;
    }

    .main-image {
      position: absolute;
      right: 0;
    }
  `;

  @property()
  bannerHeight: string;

  @property()
  imageHeight: string;

  @property()
  imageWidth: string;

  @property()
  image: string;

  render() {
    return html`
      <style>
        :host {
          width: 100%;
          --height: ${this.bannerHeight};
        }
      </style>
      <div class="banner-wrapper">
        <div class="slot-wrapper">
          <slot></slot>
        </div>
        <c-image .draggable="${false}" src="morning-image" @loaded="${this.sunImageLoaded}" class="sun-img"></c-image>
        <c-image
          .draggable="${false}"
          src="${this.image}"
          class="main-image"
          height="${this.imageHeight}"
          width="${this.imageWidth}"
        ></c-image>
      </div>
    `;
  }

  sunImageLoaded() {
    const sunImg = this.shadowRoot?.querySelector('.sun-img') as CImage;
    timeout(100).then(() => {
      sunImg.classList.add('sun-position');
    });
  }
}
