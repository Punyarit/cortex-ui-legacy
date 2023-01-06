import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ui from '../../functions';
import { customEvent, setTitle } from '../../helper/helper';
import './icon';

@customElement('c-subject-page')
export class Subject extends LitElement {
  static styles = css`
    .subject-wrapper {
      display: flex;
      align-items: center;
      position: relative;
      height: 52px;
      overflow: hidden;
    }
    .back-page {
      color: #7386af;
      font-size: 18px;
      position: relative;
      z-index: 1;
      cursor: pointer;
      user-select: none;
      transition: color 0.125s ease;
      display: flex;
      column-gap: 8px;
      align-items: center;
    }

    .back-page:active {
      color: var(--gray-900);
    }

    .subject-text-wrapper {
      position: absolute;
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .subject-text {
      font-style: normal;
      font-weight: 600;
      font-size: var(--fs-28);
    }
  `;
  @property()
  subject?: string;

  @property()
  loading = false;

  @property()
  subjectWidth?: number;

  @property()
  backTo?: string | undefined;

  render() {
    return html`
      <style>
        .subject-text {
          color: ${this.loading ? 'transparent' : 'var(--cl-title)'};
        }

        .back-page {
          visibility: ${this.backTo ? 'visible' : 'hidden'};
        }
      </style>
      <div class="subject-wrapper">
        <div class="back-page">
          <c-icon icon="chevron-left" size="12"></c-icon>

          <div class="back-page" @click="${this.backPage}">Back</div>
        </div>

        <div class="subject-text-wrapper">
          <c-skeleton
            ?hidden="${!this.loading}"
            style="position:absolute"
            width="${this.subjectWidth}px"
            height="28px"
          ></c-skeleton>
          <span class="subject-text"> ${this.subject} </span>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    this.subjectWidth = this.shadowRoot?.querySelector('.subject-text').getBoundingClientRect().width;
  }

  backPage() {
    setTitle(this.backTo);
    this.requestUpdate();

    ui.transition(
      'transition-page',
      () => customEvent(this, 'back', { backTo: this.backTo }),
      'always',
      'fade-in',
      'scale-down'
    );
  }
}
