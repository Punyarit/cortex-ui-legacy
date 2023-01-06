import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('c-icon')
export class Icon extends LitElement {
  static styles = css`
    .icon-wrapper {
      display: inline-grid;
      place-items: center;
      font-family: var(--fontFamily);
      font-size: var(--fontSizr);
      font-weight: var(--fontWeight);
      color: var(--color);
      background: var(--background);
      border-radius: var(--borderRadius);
      transition: var(--transition);
    }
  `;

  @property()
  icon = '';

  @property()
  size = '18';

  @property()
  color = 'inherit';

  @property()
  weight = '400';

  @property()
  hover?: boolean;

  @property()
  activeColor?: string;

  @property()
  background = 'transparent';

  @property()
  transition = '0';

  @property()
  rounded = false;

  render() {
    return html`
      <style>
        :host {
          display: inline-flex;
          --fontFamily: 'fontello-${this.icon}';
          --fontSizr: ${this.size}px;
          --fontWeight: ${this.weight};
          --color: ${this.activeColor ? this.activeColor : this.color ? this.color : 'var(--cl-icon)'};
          --background: ${this.background};
          --borderRadius: ${this.rounded ? '50%' : 0};
          --transition: ${this.transition};
        }
      </style>
      <span class="icon-wrapper"> &#xe800; </span>
    `;
  }
}
