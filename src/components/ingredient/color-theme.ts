import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('c-color-theme')
export class ColorTheme extends LitElement {
  static styles = css`
    .color-theme-wrapper {
      border-radius: 50%;
      width: var(--width);
      height: var(--height);
      overflow: hidden;
    }

    .color-display {
      width: 100%;
      height: 90px;
    }

    .color-split-wrapper {
      display: flex;
    }
  `;

  @property()
  width = '180px';

  @property()
  height = '180px';

  @property({
    type: Array,
  })
  palette: string[] = [];

  render() {
    const [hightlight, neutral, base] = this.palette;
    return html`
      <style>
        :host {
          --width: ${this.width};
          --height: ${this.height};
        }
      </style>
      <div class="color-theme-wrapper">
        <div class="color-display" style="background:${neutral}"></div>
        <div class="color-split-wrapper">
          <div class="color-display" style="background:${hightlight}"></div>
          <div class="color-display" style="background:${base}"></div>
        </div>
      </div>
    `;
  }
}
