import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { constantColorTheme, coolTheme, standardTheme, warmTheme } from '../../theme/colorTheme';
import { fontTheme } from '../../theme/fontTheme';
import { transitionTheme } from '../../theme/transitionTheme';

@customElement('c-theme')
export class Theme extends LitElement {
  static styles = [constantColorTheme, coolTheme, standardTheme, warmTheme, fontTheme, transitionTheme];

  render() {
    return html` <slot></slot> `;
  }

  firstUpdated() {
    const theme = localStorage.getItem('theme');
    const cTheme = this.shadowRoot?.host;

    if (theme) {
      cTheme.className = theme;
    }
  }
}
