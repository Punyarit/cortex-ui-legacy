import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../ingredient//divider';
import '../../ingredient/skeleton';
import '../../kit/content';

@customElement('c-encounter-timeline-skeleton')
export class EncounterTimelineSkeleton extends LitElement {
  static styles = css``;

  render() {
    return html`
      <c-content>
        <c-wrap d="flex" colGap="24px">
          <c-skeleton width="140px" height="36px"></c-skeleton>
          <c-skeleton width="140px" height="36px"></c-skeleton>
          <c-skeleton width="140px" height="36px"></c-skeleton>
        </c-wrap>
        <c-divider gap="24px"></c-divider>
        <c-skeleton width="200px" height="36px"></c-skeleton>
        <c-wrap mt="22px">
          <c-wrap d="flex" justify="center" colGap="60px">
            ${[1, 2, 3, 4, 5].map(
              () => html` <c-wrap d="flex" layout="column" rowGap="12px" aligns="center">
                <c-skeleton width="160px" height="30px"></c-skeleton>
                <c-skeleton width="160px" height="160px"></c-skeleton>
              </c-wrap>`
            )}
          </c-wrap>
        </c-wrap>
      </c-content>

      <c-wrap mt="24px">
        <c-skeleton width="200px" height="36px"></c-skeleton>
        <c-wrap mt="16px">
          <c-content>
            <c-wrap d="flex" layout="column" rowGap="12px">
              <c-skeleton width="140px" height="30px"></c-skeleton>
              <c-skeleton width="220px" height="30px"></c-skeleton>
            </c-wrap>
            <c-wrap d="flex" justify="flex-end" colGap="16px">
              <c-skeleton width="100px" height="30px"></c-skeleton>
              <c-skeleton width="100px" height="30px"></c-skeleton>
            </c-wrap>
          </c-content>
        </c-wrap>
      </c-wrap>
    `;
  }
}
