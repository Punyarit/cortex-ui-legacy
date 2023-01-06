import { __decorate, __metadata } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './icon';
let Text = class Text extends LitElement {
    constructor() {
        super(...arguments);
        // color text
        this.c = 'var(--gray-800)';
        // paragraph left
        this.pc = 'var(--gray-800)';
        // paragraph visibility
        this.pv = 'visible';
        // paragraph size
        this.ps = '16px';
        // paragraph margin-left
        this.pl = 0;
        // paragraph margin-right
        this.pr = 0;
        // paragraph weight
        this.pw = '600';
        // post text
        this.postc = 'var(--gray-800)';
        // post text color
        this.posts = '16px';
        // post text weight
        this.postw = '400';
        // post text margin-left
        this.postl = '0';
        // post text margin-right
        this.postr = '0';
        // pre right
        this.prer = '0';
        // pre left
        this.prel = '0';
        // pre size
        this.pres = '16px';
        // pre weight
        this.prew = '400';
        // pre color
        this.prec = 'var(--gray-800)';
        // checkbox right
        this.boxs = '16px';
        // checkbox color
        this.boxc = 'var(--gray-800)';
        // checkbox size
        this.boxr = '0';
        // checkbox weight
        this.boxw = '400';
        // checkbox right
        this.boxl = '0';
        this.gap = '8px';
        // box translate
        this.boxTranslate = {};
        // pre translate
        this.preTranslate = {};
    }
    render() {
        return html `
      <style>
        :host {
          --text-color: ${this.c};
          --dot-width: ${this.dotTranslate ?? this.dot};
          --gap: ${this.gap};
          --p-visibility: ${this.pv};
          --p-color: ${this.pc};
          --p-left: ${this.plTranslate ?? this.pl};
          --p-right: ${this.prTranslate ?? this.pr};
          --p-size: ${this.ps};
          --p-weight: ${this.pw};
          --box-color: ${this.boxc};
          --box-left: ${this.boxlTranslate ?? this.boxl};
          --box-right: ${this.boxrTranslate ?? this.boxr};
          --box-size: ${this.boxs};
          --box-weight: ${this.boxw};
          --pre-color: ${this.prec};
          --pre-left: ${this.prelTranslate ?? this.prel};
          --pre-right: ${this.prerTranslate ?? this.prer};
          --pre-size: ${this.pres};
          --pre-weight: ${this.prew};
          --post-color: ${this.postc};
          --post-left: ${this.postlTranslate ?? this.postl};
          --post-right: ${this.postr};
          --post-size: ${this.posts};
          --post-weight: ${this.postw};
        }
      </style>
      <div class="text-wrapper">
        <!-- p -->
        <div class="p-wrapper">${this.dataset.pTraslate ?? this.p ?? html `<span class="p-hidden">.</span> `}</div>

        <!-- box -->
        ${this.box
            ? html `
              <div class="box-wrapper">
                ${this.box?.map(t => html `
                    <div class="box-content">
                      <c-icon icon="${this.pick?.includes(t) ? 'form_checked' : 'form_unchecked'}"></c-icon>
                      <div class="box-text">${this.boxTranslate?.[t] ?? t}</div>
                    </div>
                  `)}
              </div>
            `
            : undefined}

        <!-- pre -->
        ${this.pre
            ? html `
              <ul class="pre-list">
                ${this.pre?.map(pre => html `
                    <li>
                      <span class="${this.pick?.includes(pre) ? 'pick' : ''} pre-text">
                        ${this.preTranslate[pre] ?? pre}
                      </span>
                    </li>
                  `)}
              </ul>
            `
            : undefined}
        ${this.dot
            ? html ` <div class="dashed-wrapper">
              <div class="slot-wrapper">
                <slot></slot>
              </div>
            </div>`
            : undefined}

        <!-- post -->
        ${this.post ? html `<div class="post-wrapper post-text">${this.postTranslate ?? this.post}</div>` : undefined}
      </div>
    `;
    }
};
Text.styles = css `
    ::slotted(p) {
      margin: 0;
    }

    .text-wrapper {
      display: flex;
      column-gap: var(--gap);
      color: var(--text-color);
    }

    .pre-wrapper {
      display: flex;
      font-weight: 400;
      column-gap: 2px;
    }

    .p-wrapper {
      font-weight: var(--p-weight);
      visibility: var(--p-visibility);
      margin-left: var(--p-left);
      margin-right: var(--p-right);
      font-size: var(--p-size);
      color: var(--p-color);
    }

    .post-wrapper {
      margin-left: var(--post-left);
      margin-right: var(--post-right);
    }

    .post-text {
      font-size: var(--post-size);
      color: var(--post-color);
      font-weight: var(--post-weight);
    }

    .slot-wrapper {
      font-weight: 600;
      margin-left: 14px;
      position: relative;
    }

    .dashed-wrapper {
      border-bottom: 1px dashed #2a3959;
      text-decoration: none;
      width: var(--dot-width);
      position: relative;
      bottom: 4px;
    }

    .pick {
      border-bottom: 2px solid var(--gray-800);
    }

    .box-wrapper {
      display: flex;
      column-gap: 10px;
      margin-left: 3px;
    }

    .box-content {
      display: flex;
      column-gap: 10px;
      margin-left: var(--box-left);
      margin-right: var(--box-right);
    }

    .box-text {
      font-size: var(--box-size);
      font-weight: var(--box-weight);
      color: var(--box-color);
    }

    .pre-text {
      margin-left: var(--pre-left);
      margin-right: var(--pre-right);
      color: var(--pre-color);
      font-size: var(--pre-size);
      font-weight: var(--pre-weight);
    }

    .pre-list {
      display: inline;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .pre-list li {
      display: inline;
    }

    .pre-list li::after {
      content: '/';
    }

    .pre-list li:last-child::after {
      content: '';
    }

    .p-hidden {
      visibility: hidden;
    }
  `;
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "c", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Text.prototype, "p", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "pc", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "pv", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "ps", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "pl", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "pr", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "pw", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Text.prototype, "post", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "postc", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "posts", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "postw", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "postl", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "postr", void 0);
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Array)
], Text.prototype, "pre", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "prer", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "prel", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "pres", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "prew", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "prec", void 0);
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Array)
], Text.prototype, "pick", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Text.prototype, "dot", void 0);
__decorate([
    property({
        type: Object,
    }),
    __metadata("design:type", Array)
], Text.prototype, "box", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "boxs", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "boxc", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "boxr", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "boxw", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "boxl", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Text.prototype, "gap", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Text.prototype, "locale", void 0);
Text = __decorate([
    customElement('c-text')
], Text);
export { Text };
//# sourceMappingURL=text.js.map