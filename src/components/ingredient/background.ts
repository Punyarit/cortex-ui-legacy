import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('c-background')
export class Background extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      height: 100%;
    }
    .bg {
      height: var(--height);
      width: var(--width);
      background: var(--img-url);
      background-repeat: var(--repeat);
      background-size: var(--size);
      background-position-x: var(--positionX);
      background-position-y: var(--positionY);
      background-origin: var(--origin);
      background-clip: var(--clip);
      background-attachment: var(--attachment);
    }
  `;

  @property()
  src!: string;

  @property()
  width = '100%';

  @property()
  height = '100%';

  @property({
    type: Boolean,
  })
  drag = false;

  @property()
  repeat = 'no-repeat';

  @property()
  size = 'cover';

  @property()
  positionX = 'left';

  @property()
  positionY = 'top';

  @property()
  origin = 'padding-box';

  @property()
  clip = 'border-box';

  @property()
  attachment = 'scroll';

  render() {
    return html`
      <style>
        :host {
          --img-url: url(${this.src});
          --repeat: ${this.repeat};
          --size: ${this.size};
          --width: ${this.width};
          --height: ${this.height};
          --positionX: ${this.positionX};
          --positionY: ${this.positionY};
          --origin: ${this.origin};
          --clip: ${this.clip};
          --attachment: ${this.attachment};
        }
      </style>
      <div class="bg">
        <slot></slot>
      </div>
    `;
  }

  async firstUpdated() {
    const image = (await import(`../../../../../../../src/assets/images/${this.src}.png`)).default;
    this.src = image;
  }
}
