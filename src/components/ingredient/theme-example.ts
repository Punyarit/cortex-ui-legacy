import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { coolThemeDisplay, standardThemeDisplay, warmThemeDisplay } from '../../theme/templateDisplayTheme';
import '../kit/wrap';

@customElement('c-theme-example')
export class ThemeExample extends LitElement {
  static styles = [
    standardThemeDisplay,
    warmThemeDisplay,
    coolThemeDisplay,

    css`
      .column {
        display: flex;
        flex-direction: column;
      }

      .template-wrapper {
        width: 272px;
        height: 162px;
        transition: var(--theme-bg-transition);
        background: var(--dp-bg-body);
        overflow: hidden;
        display: flex;
        border-radius: 12px;
        box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
      }

      .sidebar {
        width: 34px;
        transition: var(--theme-bg-transition);
        background: var(--dp-bg-sidebar);
        height: 100%;
        box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.09);
        padding-top: 10px;
        align-items: center;
        box-sizing: border-box;
      }

      .logo {
        background: var(--dp-cl-content);
        width: 18px;
        height: 18px;
        border-radius: 50%;
        margin-bottom: 22px;
      }

      .menu {
        background: var(--dp-cl-content);
        width: 16px;
        height: 16px;
        border-radius: 3px;
        margin-bottom: 10px;
      }
      .title {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      .page {
        background: var(--dp-cl-title);
        width: 72px;
        height: 14px;
        border-radius: 12px;
      }

      .title-right-wrapper {
        display: flex;
        column-gap: 8px;
      }

      .title-name {
        transition: var(--theme-cl-transition);
        background: var(--dp-cl-title);
        width: 44px;
        height: 14px;
        border-radius: 12px;
      }

      .title-profile {
        transition: var(--theme-cl-transition);
        background: var(--dp-cl-title);
        width: 14px;
        height: 14px;
        border-radius: 50%;
      }

      .main-wrapper {
        width: 100%;
        height: 100%;
        padding: 10px 14px;
      }

      .content-wrapper {
        display: flex;
        width: 100%;
        margin-top: 12px;
        column-gap: 12px;
      }

      .profile-card {
        transition: var(--theme-bg-transition);
        background: var(--dp-bg-content);
        box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.09);
        border-radius: 12px;
        height: 112px;
        align-items: center;
        box-sizing: border-box;
        padding: 8px 10px;
        row-gap: 12px;
      }

      .profile-card-title {
        display: flex;
        width: 100%;
        justify-content: space-between;
        column-gap: 6px;
      }
      .hn {
        height: 10px;
        width: 40px;
        transition: var(--theme-cl-transition);
        background: var(--dp-cl-content);
        border-radius: 12px;
      }

      .status {
        height: 10px;
        width: 10px;
        transition: var(--theme-cl-transition);
        background: var(--dp-cl-content);
        border-radius: 50%;
      }

      .profile-card-img {
        transition: var(--theme-bg-transition);
        background: var(--bg-profile);
        height: 36px;
        width: 36px;
        border-radius: 50%;
      }

      .profile-card-detail {
        transition: var(--theme-cl-transition);
        background: var(--dp-cl-content);
        width: 100%;
        border-radius: 8px;
        height: 30px;
      }

      .content {
        transition: var(--theme-bg-transition);
        background: var(--dp-bg-content);
        box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.09);
        border-radius: 12px;
        width: 100%;
        height: 112px;
        box-sizing: border-box;
        padding: 8px 10px;
        row-gap: 12px;
      }

      .content-title {
        height: 14px;
        width: 60px;
        transition: var(--theme-cl-transition);
        background: var(--dp-cl-content);
        border-radius: 12px;
      }

      .content-detail {
        height: 100%;
        width: 100%;
        transition: var(--theme-cl-transition);
        background: var(--dp-cl-content);
        border-radius: 12px;
      }
    `,
  ];

  render() {
    return html`
      <div class="template-wrapper">
        <div class="sidebar column">
          <div class="logo"></div>
          ${[1, 2, 3].map(() => html` <div class="menu"></div> `)}
        </div>

        <div class="main-wrapper column">
          <div class="title">
            <div class="page"></div>
            <div class="title-right-wrapper">
              <div class="title-profile"></div>
              <div class="title-name"></div>
            </div>
          </div>

          <div class="content-wrapper">
            <div class="profile-card column">
              <div class="profile-card-title">
                <div class="hn"></div>
                <div class="status"></div>
              </div>
              <div class="profile-card-img"></div>
              <div class="profile-card-detail"></div>
            </div>
            <div class="content column">
              <div class="content-title"></div>
              <div class="content-detail"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
