import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

enum PatientFlagsIcon {
  ALLERGIES = 'u_tablets',
  COMMUNICATE = 'u_comment-dots',
  SAFETY = 'u_heart-medical',
  SPECIAL_CARE = 'u_star',
  MKT = 'u_megaphone',
}

@customElement('c-profile-flag')
export class ProfileFlag extends LitElement {
  static styles = css`
    .flags-list-wrapper {
      display: flex;
      align-items: center;
      column-gap: 8px;
      padding: var(--padding);
    }

    .flags-list-wrapper:nth-child(2), /* flag icon */
    .flags-list-wrapper:nth-child(3) /* flag text */ {
      color: #7386af;
    }

    .flag-wrapper {
      cursor: pointer;
      background: #fff4e7;
      padding: 4px;
      border-radius: 4px;
      width: 28px;
      height: 28px;
      box-sizing: border-box;
      color: #ff8c04;
      transition: background 0.125s;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .flag-wrapper:active {
      background: #ebf0fa;
    }
  `;

  @property({
    type: Array,
  })
  flags = [];

  @property()
  padding = '0 16px';

  render() {
    return html`
      <style>
        :host {
          --padding: ${this.padding};
        }
      </style>
      <div class="flags-list-wrapper">
        <c-icon icon="fi_flag" color="var(--gray-600)"></c-icon>
        <span>Flag : </span>

        ${this.flags?.map(
          flag => html`
            <div @click="${() => this.flagAction()}" class="flag-wrapper">
              <c-icon icon="${PatientFlagsIcon[flag]}" size="16"></c-icon>
            </div>
          `
        )}
      </div>
    `;
  }

  flagAction(): void {
    this.dispatchEvent(
      new CustomEvent('flag', {
        bubbles: true,
      })
    );
  }
}
