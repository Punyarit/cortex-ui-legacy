import { __decorate, __metadata } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { getTextWidth } from '../../helper/helper';
let Paragraph = class Paragraph extends LitElement {
    constructor() {
        super(...arguments);
        this.config = {
            paragraphHTML: false,
            labelDot: 'has-dot',
        };
        this.minLines = 2;
        this.maxLines = 2;
        this.size = '16px';
        this.rowGap = '22px';
        this.color = 'var(--gray-800)';
        this.width = '100%';
        this.margin = '12px';
        this.lineHeight = '23px';
        this.lineTop = 2;
    }
    render() {
        return html `
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
          ${this.label ? html `<div class="label-text">${this.label}</div>` : undefined}

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
        this.host = this.shadowRoot?.host;
        if (this.paragraph) {
            this.setParagraph();
        }
    }
    updated(e) {
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
    countTextLines() {
        const paragraphText = this.shadowRoot?.querySelector('.paragraph-text');
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
            const element = [];
            for (let index = 0; index < displayLines; index++) {
                const dashLineElement = document.createElement('div');
                dashLineElement.classList.add('dash-line');
                // remove label dot
                if (this.label &&
                    ((this.config.labelDot === 'no-first-dot' && index === 0) || this.config.labelDot === 'no-dot')) {
                    this.labelWidth = getTextWidth(this.label, this.size);
                    this.host.style.setProperty('--label-dot', `${this.labelWidth + 4}px`);
                    dashLineElement.classList.add('label-no-dot');
                }
                element.push(html `${dashLineElement}`);
            }
            this.dashLineElement = element;
        }
    }
    highlightText() {
        let paragraph = JSON.parse(JSON.stringify(this.paragraphData.innerHTML));
        for (const [keyText, styles] of Object.entries(this.highlight)) {
            const [fontSize = '16px', fontWeight = '400', color = 'var(--gray-800)'] = styles.split(' ');
            paragraph = paragraph.replace(new RegExp(keyText, 'g'), `<span style="font-size:${fontSize}; font-weight:${fontWeight}; color:${color}">${keyText}</span>`);
        }
        this.paragraphData.innerHTML = paragraph;
    }
};
Paragraph.styles = css `
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
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Object)
], Paragraph.prototype, "config", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Paragraph.prototype, "label", void 0);
__decorate([
    property({
        type: Number,
    }),
    __metadata("design:type", Object)
], Paragraph.prototype, "minLines", void 0);
__decorate([
    property({
        type: Number,
    }),
    __metadata("design:type", Object)
], Paragraph.prototype, "maxLines", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Paragraph.prototype, "size", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Paragraph.prototype, "rowGap", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Paragraph.prototype, "color", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Paragraph.prototype, "width", void 0);
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Object)
], Paragraph.prototype, "highlight", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Paragraph.prototype, "margin", void 0);
__decorate([
    property({
        type: String,
    }),
    __metadata("design:type", String)
], Paragraph.prototype, "paragraph", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Paragraph.prototype, "lineHeight", void 0);
__decorate([
    property({
        type: Number,
    }),
    __metadata("design:type", Object)
], Paragraph.prototype, "lineTop", void 0);
__decorate([
    state(),
    __metadata("design:type", Array)
], Paragraph.prototype, "dashLineElement", void 0);
__decorate([
    query('.paragraph-data'),
    __metadata("design:type", HTMLElement)
], Paragraph.prototype, "paragraphData", void 0);
Paragraph = __decorate([
    customElement('c-paragraph')
], Paragraph);
export { Paragraph };
//# sourceMappingURL=paragraph.js.map