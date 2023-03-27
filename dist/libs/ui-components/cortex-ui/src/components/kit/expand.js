import { __decorate, __metadata } from "tslib";
import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../ingredient/button';
import '../ingredient/icon';
let Expand = class Expand extends LitElement {
    constructor() {
        super(...arguments);
        this.hideContent = true;
        this.subjectSize = '18px';
        this.subjectColor = 'var(--cl-title)';
        this.subjectWeight = '600';
        this.iconSize = '10';
        this.iconColor = '';
        this.colGap = '26px';
        this.size = 'medium';
        this.buttonHeight = '40';
        this.subjectRadius = '0px';
        this.corner = 'LEFT';
        this.fluid = false;
        this.subjectWhiteSpace = 'normal';
        this.stickyTitle = false;
    }
    render() {
        return html `
      <style>

        :host {
          --corner: ${this.corner === 'LEFT' ? 'row' : 'row-reverse'};
          --rotateShow:${this.corner === 'LEFT' ? '270deg' : '0deg'};
          --rotateHide:${this.corner === 'LEFT' ? '359deg' : '180deg'};
          --width: ${this.fluid ? '100%' : 'auto'};
          --justifyContent: ${this.fluid ? 'space-between' : 'start'}
        }
        .title-text {
          font-weight: ${this.subjectWeight};
          font-size: ${this.subjectSize};
          color: ${this.subjectColor};
          white-space: ${this.subjectWhiteSpace};
        }

        .title-wrapper {
          column-gap: ${this.colGap};
          ${this.subjectBackgroundColor ? 'background-color: ' + this.subjectBackgroundColor + ';' : ''}
          border-radius: ${this.subjectRadius} 0 0 ${this.subjectRadius};
        }

        .expand-title-wrapper {
          position: ${this.stickyTitle ? 'sticky' : 'relative'};
          ${this.stickyTitle ? 'top:0;' : ''}
          ${this.subjectBackgroundColor ? 'background-color: ' + this.subjectBackgroundColor + ';' : ''}
          border-radius: ${this.subjectRadius};

        }
      </style>
      <div class="expand-wrapper">
        <div @click="${this.showContent}" class="expand-title-wrapper">
          <div class="title-wrapper">
            <c-button id="expand-button" buttonHeight="${this.buttonHeight}" type="icon">
              <div class="icon-wrapper chevron-${this.hideContent ? 'hide' : 'show'}" slot="icon-button">
                <c-icon icon="chevron-down" size="${this.iconSize}" color="${this.iconColor}"></c-icon>
              </div>
            </c-button>
            <div class="title-text ${this.error ? 'error' : ''}">${this.subject}</div>
          </div>
          <div>
            <slot name="icon-expand"></slot>
          </div>
        </div>
        <div class="content-wrapper content-${this.hideContent ? 'hide' : 'show'}">
          <slot ?hidden="${this.hideContent}"></slot>
        </div>
      </div>
    `;
    }
    firstUpdated() {
        if (this.size === 'small') {
            this.subjectSize = '14px';
            this.subjectWeight = '400';
            this.iconSize = '8';
            this.colGap = '8px';
            this.buttonHeight = '30';
        }
        if (Array.isArray(this.subject)) {
            this.toggleText = this.subject[1];
            this.subject = this.subject[0];
        }
    }
    showContent() {
        const store = this.subject;
        this.subject = this.toggleText || this.subject;
        this.toggleText = store;
        this.hideContent = !this.hideContent;
    }
};
Expand.styles = css `
    .title-wrapper {
      display: flex;
      align-items: center;
      flex-direction: var(--corner);
      justify-content: var(--justifyContent);
      width: var(--width);
    }

    .expand-title-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1;
      /* TODO: w8 for test other page */
      /* margin-bottom: 6px; */
      cursor: pointer;
    }

    .title-text {
      user-select: none;
      transition: var(--theme-cl-transition);
    }

    .icon-wrapper {
      transition: transform 0.5s;
    }

    .chevron-hide {
      transform: rotate(var(--rotateShow));
    }

    .chevron-show {
      transform: rotate(var(--rotateHide));
    }

    .content-show {
      opacity: 1;
      margin-top: -5px;
    }

    .content-hide {
      opacity: 0;
    }

    .content-wrapper {
      width: 100%;
      transition: opacity 0.5s ease;
      margin-top: 2px;
    }

    .expand-wrapper {
      position: relative;
    }

    .error {
      color: #f3655c;
    }
  `;
__decorate([
    property(),
    __metadata("design:type", String)
], Expand.prototype, "subject", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], Expand.prototype, "hideContent", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Boolean)
], Expand.prototype, "error", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Expand.prototype, "subjectSize", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Expand.prototype, "subjectColor", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Expand.prototype, "subjectWeight", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Expand.prototype, "iconSize", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Expand.prototype, "iconColor", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Expand.prototype, "colGap", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Expand.prototype, "size", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Expand.prototype, "buttonHeight", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Expand.prototype, "toggleText", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Expand.prototype, "subjectBackgroundColor", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Expand.prototype, "subjectRadius", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Expand.prototype, "corner", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], Expand.prototype, "fluid", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Expand.prototype, "subjectWhiteSpace", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], Expand.prototype, "stickyTitle", void 0);
Expand = __decorate([
    customElement('c-expand')
], Expand);
export { Expand };
//# sourceMappingURL=expand.js.map