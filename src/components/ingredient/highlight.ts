import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('c-highlight')
export class Highlight extends LitElement {
  static styles = css``;

  @property({ type: String }) public p = '';
  @property({ type: Object }) public highlight?: Record<string, string>;

  @query('.paragraph-data') private paragraphData!: HTMLElement;

  render() {
    return html` <div class="paragraph-data">${this.p}</div> `;
  }

  updated() {
    if (this.highlight && this.p) this.highlightText();
  }

  private highlightText() {
    let paragraph = this.p;
    for (const [keyText, styles] of Object.entries(this.highlight)) {
      const [
        fontSize = '16px',
        fontWeight = '400',
        color = 'var(--gray-800)',
        textDecoration = 'none',
        backgroundColor = 'transparent',
      ] = styles.split(' ');
      const span = `<span style="font-size:${fontSize}; font-weight:${fontWeight}; color:${color}; text-decoration:${textDecoration}; background-color:${backgroundColor}">`;

      paragraph = paragraph.replace(new RegExp(`<\\${keyText}-`, 'gm'), span);
    }
    paragraph = paragraph.replace(new RegExp(`-\\$>`, 'gm'), `</span>`);

    this.paragraphData.innerHTML = paragraph;
  }
}
