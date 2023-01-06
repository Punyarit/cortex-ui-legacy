import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { getTextWidth } from '../../helper/helper';

@customElement('c-paragraph')
export class Paragraph extends LitElement {
  static styles = css`
    .paragraph-wrapper {
      width: var(--width);
      font-size: var(--fontSize);
      position: relative;
    }

    .dash-wrapper {
      display: flex;
      width: 100%;
      padding-top: var(--top);
      height: 100%;
      flex-direction: column;
      row-gap: var(--row-gap);
      pointer-events: none;
      overflow: hidden;
    }

    .dash-line {
      width: 100%;
      display: block;
      border-bottom: 1px dashed var(--color);
    }

    .paragraph-text {
      position: absolute;
      display: flex;
      column-gap: var(--margin);
    }

    .label-no-dot {
      margin-left: var(--label-dot);
    }

    .paragraph-data {
      display: -webkit-box !important;
      -webkit-line-clamp: var(--max-lines);
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: var(--line-height);
      color: var(--color);
      top: -2px;
      position: relative;
    }

    .label-text {
      display: inline;
      white-space: nowrap;
    }
  `;

  @property({
    type: Object,
  })
  config: {
    paragraphHTML: boolean;
    labelDot: 'no-dot' | 'no-first-dot' | 'has-dot';
  } = {
    paragraphHTML: false,
    labelDot: 'has-dot',
  };

  @property()
  label?: string;

  @property({
    type: Number,
  })
  minLines = 2;

  @property({
    type: Number,
  })
  maxLines = 2;

  @property()
  size = '16px';

  @property()
  rowGap = '22px';

  @property()
  color = 'var(--gray-800)';

  @property()
  width = '100%';

  @property({
    type: Object,
  })
  highlight?: Record<string, string>;

  @property()
  margin = '12px';

  @property({
    type: String,
  })
  paragraph!: string;

  @property()
  lineHeight = '23px';

  @property({
    type: Number,
  })
  lineTop = 2;

  public labelWidth?: number;

  public host!: HTMLElement;

  @state()
  public dashLineElement!: TemplateResult<1>[];

  @query('.paragraph-data')
  paragraphData!: HTMLElement;

  render() {
    return html`
      <style>
        :host {
          --fontSize: ${this.size};
          --width: ${this.width};
          --row-gap: ${this.rowGap};
          --margin: ${this.margin};
          --max-lines: ${this.maxLines};
          --line-height: ${this.lineHeight};
          --color: ${this.color};
          --top: ${+this.size.replace('px', '') + this.lineTop}px;

          width: ${this.width};
        }
      </style>
      <div class="paragraph-wrapper">
        <div class="paragraph-text">
          ${this.label ? html`<div class="label-text">${this.label}</div>` : undefined}

          <div class="paragraph-data">${this.paragraph}</div>
        </div>
        <div class="dash-wrapper">
          <!-- renderLine -->
          ${this.dashLineElement}
        </div>
      </div>
    `;
  }

  firstUpdated() {
    this.host = this.shadowRoot?.host as HTMLElement;
    if (this.paragraph) {
      this.setParagraph();
    }
  }

  updated(e: Map<string, string>) {
    const paragraph = e?.get('paragraph');
    if (typeof paragraph !== 'undefined') {
      this.setParagraph();
    }
  }

  setParagraph() {
    this.renderLine();
    if (this.config.paragraphHTML) {
      setTimeout(() => {
        this.setParagraphHTML();
      }, 10);
    }

    if (this.highlight) {
      setTimeout(() => {
        this.highlightText();
      }, 10);
    }
  }

  setParagraphHTML() {
    this.paragraphData.innerHTML = this.paragraph;
  }

  countTextLines(): number {
    const paragraphText = this.shadowRoot?.querySelector('.paragraph-text') as HTMLElement;
    const height = paragraphText?.offsetHeight;
    return Math.round(height / +this.rowGap.replace('px', ''));
  }

  calcLines() {
    const textLines = this.countTextLines();

    switch (true) {
      case textLines >= this.minLines && textLines <= this.maxLines:
        return textLines;

      case textLines >= this.minLines && textLines >= this.maxLines:
        return this.maxLines;

      case textLines <= this.minLines && textLines <= this.maxLines:
      default:
        return this.minLines;
    }
  }

  renderLine() {
    const displayLines = this.calcLines();
    if (displayLines) {
      const element = [] as TemplateResult<1>[];
      for (let index = 0; index < displayLines!; index++) {
        const dashLineElement = document.createElement('div');
        dashLineElement.classList.add('dash-line');

        // remove label dot
        if (
          this.label &&
          ((this.config.labelDot === 'no-first-dot' && index === 0) || this.config.labelDot === 'no-dot')
        ) {
          this.labelWidth = getTextWidth(this.label, this.size);
          this.host.style.setProperty('--label-dot', `${this.labelWidth + 4}px`);
          dashLineElement.classList.add('label-no-dot');
        }

        element.push(html`${dashLineElement}`);
      }
      this.dashLineElement = element;
    }
  }

  highlightText() {
    let paragraph = JSON.parse(JSON.stringify(this.paragraphData.innerHTML)) as string;

    for (const [keyText, styles] of Object.entries(this.highlight!)) {
      const [fontSize = '16px', fontWeight = '400', color = 'var(--gray-800)'] = styles.split(' ');

      paragraph = paragraph.replace(
        new RegExp(keyText, 'g'),
        `<span style="font-size:${fontSize}; font-weight:${fontWeight}; color:${color}">${keyText}</span>`
      );
    }
    this.paragraphData.innerHTML = paragraph;
  }
}
