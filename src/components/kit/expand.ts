import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../ingredient/button';
import '../ingredient/icon';
@customElement('c-expand')
export class Expand extends LitElement {
  static styles = css`
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
      position: relative;
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

  @property()
  subject?: string;

  @property({ type: Object })
  hideContent = true;

  @property({ type: Object })
  error?: boolean;

  @property()
  subjectSize = '18px';

  @property()
  subjectColor = 'var(--cl-title)';

  @property()
  subjectWeight = '600';

  @property()
  iconSize = '10';

  @property()
  iconColor = '';

  @property()
  colGap = '26px';

  @property()
  size: 'small' | 'medium' = 'medium';

  @property()
  buttonHeight = '40';

  @property()
  toggleText?: string;

  @property()
  subjectBackgroundColor?: string;

  @property()
  subjectRadius = '0px';

  @property()
  corner = 'LEFT';

  @property({ type: Object })
  fluid = false;

  @property()
  subjectWhiteSpace = 'normal';

  render() {
    return html`
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
}
