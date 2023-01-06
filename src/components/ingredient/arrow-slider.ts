import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../ingredient/icon';

@customElement('c-arrow-slider')
export class ArrowSlider extends LitElement {
  static styles = css`
    .arrow-slider-wrapper {
      display: flex;
      width: 100%;
      position: relative;
      align-items: center;
    }

    .arrow {
      position: absolute;
      z-index: 2;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background: #8998e140;
      cursor: pointer;
      user-select: none;
      transition: background 0.25s ease;
      color: var(--color-5-500);
    }

    .arrow:active {
      background: #30408d40;
    }
    .left {
      left: -20px;
    }

    .right {
      right: -20px;
    }

    .content {
      width: 100%;
      position: relative;
      z-index: 1;
    }

    .hide {
      display: none;
    }
  `;

  @state()
  scrollValue = 0;

  render() {
    return html`
      <style></style>
      <div class="arrow-slider-wrapper">
        <div @click="${() => this.slide('left')}" class="arrow left">
          <c-icon size="14" icon="chevron-left"></c-icon>
        </div>

        <div class="content">
          <slot></slot>
        </div>

        <div @click="${() => this.slide('right')}" class="arrow right">
          <c-icon size="14" icon="chevron-right"></c-icon>
        </div>
      </div>
    `;
  }

  updated() {
    const content = this.shadowRoot?.host?.firstElementChild;
    const maxScrollLeft = content.scrollWidth - content.clientWidth;

    const left = this.shadowRoot?.querySelector('.left');
    const right = this.shadowRoot?.querySelector('.right');

    if (this.scrollValue === 0) {
      left.classList.add('hide');
    } else if (this.scrollValue === maxScrollLeft) {
      right.classList.add('hide');
    } else {
      left.classList.remove('hide');
      right.classList.remove('hide');
    }
  }

  slide(type: string) {
    const content = this.shadowRoot?.host?.firstElementChild;
    const maxScrollLeft = content.scrollWidth - content.clientWidth;

    if (type === 'left') {
      if (this.scrollValue - 180 <= 0) {
        this.scrollValue = 0;
      } else {
        this.scrollValue = this.scrollValue - 180;
      }
    } else {
      if (this.scrollValue + 180 >= maxScrollLeft) {
        this.scrollValue = maxScrollLeft;
      } else {
        this.scrollValue = this.scrollValue + 180;
      }
    }

    content.scrollTo({
      top: 0,
      left: this.scrollValue,
      behavior: 'smooth',
    });
  }
}
