import { __decorate, __metadata } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
let Highlight = class Highlight extends LitElement {
    constructor() {
        super(...arguments);
        this.p = '';
    }
    render() {
        return html ` <div class="paragraph-data">${this.p}</div> `;
    }
    updated() {
        if (this.highlight && this.p)
            this.highlightText();
    }
    highlightText() {
        let paragraph = this.p;
        for (const [keyText, styles] of Object.entries(this.highlight)) {
            const [fontSize = '16px', fontWeight = '400', color = 'var(--gray-800)', textDecoration = 'none', backgroundColor = 'transparent',] = styles.split(' ');
            const span = `<span style="font-size:${fontSize}; font-weight:${fontWeight}; color:${color}; text-decoration:${textDecoration}; background-color:${backgroundColor}">`;
            paragraph = paragraph.replace(new RegExp(`<\\${keyText}-`, 'gm'), span);
        }
        paragraph = paragraph.replace(new RegExp(`-\\$>`, 'gm'), `</span>`);
        this.paragraphData.innerHTML = paragraph;
    }
};
Highlight.styles = css ``;
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Highlight.prototype, "p", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], Highlight.prototype, "highlight", void 0);
__decorate([
    query('.paragraph-data'),
    __metadata("design:type", HTMLElement)
], Highlight.prototype, "paragraphData", void 0);
Highlight = __decorate([
    customElement('c-highlight')
], Highlight);
export { Highlight };
//# sourceMappingURL=highlight.js.map