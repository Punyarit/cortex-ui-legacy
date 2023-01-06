import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../ingredient/divider';
import '../ingredient/skeleton';
@customElement('c-profile-skeleton')
export class ProfileSkeleton extends LitElement {
  static styles = css`
    .profile-wrapper {
      width: 320px;
      background: var(--bg-content);
      box-shadow: var(--shadow);
      border-radius: 16px;
      height: 100%;
      padding: 8px 20px 20px 20px;
      box-sizing: border-box;
    }
  `;
  render() {
    return html`
      <div class="profile-wrapper">
        <c-wrap mt="28px" d="flex" justify="space-between">
          <!-- profile -->
          <c-skeleton width="86px" height="86px" type="circle"></c-skeleton>

          <c-wrap styles="height:80px" d="flex" layout="column" justify="center" rowGap="16px">
            <c-skeleton width="170px" height="22px"></c-skeleton>
            <c-skeleton width="140px" height="22px" opacity="0.4"></c-skeleton>
          </c-wrap>
        </c-wrap>
        <c-wrap mt="30px" d="flex" layout="column" rowGap="12px">
          <c-skeleton width="150px" height="20px"></c-skeleton>
          <c-skeleton width="280px" height="24px" opacity="0.4"></c-skeleton>
          <c-skeleton width="280px" height="24px" opacity="0.4"></c-skeleton>
        </c-wrap>

        <c-wrap d="flex" layout="column" rowGap="12px" mt="36px">
          <c-skeleton width="150px" height="20px"></c-skeleton>

          ${[null, null, null].map(
            () => html`
              <c-wrap type="fluid" d="flex" justify="space-between">
                <c-skeleton width="90px" height="22px" opacity="0.4"></c-skeleton>
                <c-skeleton width="172px" height="22px" opacity="0.4"></c-skeleton>
              </c-wrap>
            `
          )}
        </c-wrap>

        <c-wrap d="flex" layout="column" rowGap="12px" mt="36px">
          <c-skeleton width="150px" height="20px"></c-skeleton>

          ${[null, null, null, null, null].map(
            () => html`
              <c-wrap type="fluid" d="flex" justify="space-between">
                <c-skeleton width="90px" height="22px" opacity="0.4"></c-skeleton>
                <c-skeleton width="172px" height="22px" opacity="0.4"></c-skeleton>
              </c-wrap>
            `
          )}
        </c-wrap>
      </div>
    `;
  }
}
