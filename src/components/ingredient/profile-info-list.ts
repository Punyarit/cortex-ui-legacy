import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../kit/wrap';
import './button';
import './icon';
import './image';
import './profile';

interface Info {
  text: string;
  value: string;
  checked: boolean;
}

@customElement('c-profile-info-list')
export class ProfileInfoList extends LitElement {
  static styles = css`
    .profile {
      width: 320px;
      background: var(--bg-content);
      box-shadow: var(--shadow);
      transition: var(--theme-bg-transition), var(--theme-cl-transition);
      border-radius: 16px;
      height: 100%;
      padding: 26px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .img-profile {
      overflow: hidden;
      border-radius: 50%;
      width: 109px;
      height: 109px;
      border: 4px solid white;
      display: inline-block;
      box-shadow: 0 0 0 4px #5096ff;
    }

    .profile-wrapper {
      position: relative;
      display: inline-block;
    }

    .info-wrapper {
      display: grid;
      width: 100%;
      place-items: center;
      margin-top: 12px;
    }

    .open-patient-form-btn c-icon {
      margin-right: 6px;
    }

    .info-list {
      display: flex;
      column-gap: 6px;
      align-items: center;
      padding: 14px 18px;
      border-radius: 8px 0px 0px 8px;
      cursor: pointer;
      user-select: none;
    }

    .info-list-focus {
      background: #f5f8ff;
    }

    .info-text {
      color: #2a3959;
    }

    .info-text-checked {
      color: #33cabb;
    }

    .info-list-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      row-gap: 6px;
      padding-left: 24px;
      box-sizing: border-box;
    }

    .last-updated {
      color: #7386af;
      margin-top: 12px;
    }
  `;

  @property()
  hidePatientForm = false;

  @property({ type: Array })
  info: Info[] = [];

  render() {
    return html`
      <style>
        .info-list-wrapper {
          /*margin top and bottom dynamic with hidePatientForm*/
          margin-top: ${this.hidePatientForm ? '0' : '24px'};
        }
      </style>
      <div class="info-wrapper">
        <c-button
          ?hidden="${this.hidePatientForm}"
          @click="${() => this.onDispathEvent('openPatientForm', { event: 'openPatientForm' })}"
          class="open-patient-form-btn"
          buttonHeight="48"
          buttonWidth="288"
          type="soft"
        >
          <c-icon icon="u_user-square" size="20" weight="300"></c-icon>
          <span>Open Patient Form</span>
        </c-button>
      </div>
      <div class="info-list-wrapper">
        ${this.info.map((info, index) => {
          return html`
            <div @click="${() => this.focusInfo(info, index)}" id="info-${index}" class="info-list">
              <c-icon
                icon="${info.checked ? 'check-circle-outlined' : 'check-circle-false'}"
                color="${info.checked ? '#33CABB' : '#C2F0EB'}"
              ></c-icon>
              <span class="info-text ${info.checked ? 'info-text-checked' : ''}"> ${info.text} </span>
            </div>
          `;
        })}
      </div>
    `;
  }

  onDispathEvent(event?: string, data?: Record<string, unknown>): void {
    this.dispatchEvent(
      new CustomEvent(event, {
        detail: {
          ...data,
        },
        bubbles: true,
      })
    );
  }

  focusInfo(info, index) {
    const infoTextAll = this.shadowRoot?.querySelectorAll(`.info-list`);
    infoTextAll.forEach(res => {
      if (res.id === `info-${index}`) {
        res.classList.add('info-list-focus');
      } else {
        res.classList.remove('info-list-focus');
      }
    });

    this.onDispathEvent('getInfo', info);
  }
}
