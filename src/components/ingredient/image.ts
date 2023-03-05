import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('c-image')
export class Image extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
  `;

  @state()
  image?: Record<string, string> | string;

  @property({
    type: Object,
  })
  draggable = true;

  @property()
  src?: string;

  @property()
  width?: string;

  @property()
  height?: string;

  @property()
  alt?: string;

  @property()
  loading: 'lazy' | 'eager' = 'eager';

  render() {
    return html`
      <style>
        :host {
          width: ${this.width};
          height: ${this.height};
        }
      </style>
      <img
        loading="${this.loading}"
        draggable="${this.draggable}"
        width="${this.width}"
        height="${this.height}"
        src="${(this.image as Record<string, string>)?.default ?? this.image}"
        alt="${this.alt ?? this.src?.replace(/-/g, ' ')}" />
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    if (this.src) {
      this.requestUpdate();
    }
  }

  async updated() {
    if (this.isUrl(this.src ?? '') || this.isBase64(this.src ?? '')) {
      this.image = this.src;
    } else {
      this.image = (await import(
        `../../../../../../../src/assets/images/${this.src}.png`
      )) as Record<string, string>;
    }

    if (this.image) {
      this.dispatchEvent(
        new CustomEvent('loaded', {
          detail: {
            description: 'Image is loaded',
          },
          bubbles: true,
        })
      );
    }
  }

  private isBase64(src: string): boolean {
    const base64Regex = /^data:image\/(png|jpeg|gif);base64,/;
    return base64Regex.test(src);
  }

  private isUrl = (srcToCheck: string) => {
    const expression =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    const regex = new RegExp(expression);

    return srcToCheck.match(regex);
  };
}
