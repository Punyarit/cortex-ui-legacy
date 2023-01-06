import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../ingredient/divider';
import '../../ingredient/skeleton';
import '../../kit/content';
import '../../kit/wrap';

@customElement('c-physician-skeleton')
export class PhysicianSkeleton extends LitElement {
  static styles = css``;
  render() {
    return html`
      <c-content>
        <c-wrap mt="24px">
          <c-skeleton width="220px" height="30px"></c-skeleton>
          <c-wrap d="flex" colGap="24px" mt="18px" pl="40px">
            <c-skeleton width="160px" height="40px"></c-skeleton>
            <c-skeleton width="160px" height="40px"></c-skeleton>
            <c-skeleton width="160px" height="40px"></c-skeleton>
            <c-skeleton width="160px" height="40px"></c-skeleton>
          </c-wrap>
        </c-wrap>
        <c-divider gap="26px"></c-divider>
        <c-wrap d="flex" justify="space-between" aligns="center">
          <c-skeleton width="220px" height="30px"></c-skeleton>
          <c-skeleton width="200px" height="50px"></c-skeleton>
        </c-wrap>

        <!-- table -->
        <c-wrap mt="24px" d="grid" colGrid="auto auto" rowGap="24px" colGap="24px" justify="center">
          ${[1, 0.8, 0.6, 0.4, 0.2].map(
            opacity => html`
              <c-wrap .opacity="${opacity}" d="flex" colGap="16px">
                <c-skeleton type="circle" width="40px" height="40px"></c-skeleton>
                <c-skeleton width="400px" height="40px"></c-skeleton>
              </c-wrap>
              <c-wrap .opacity="${opacity}" d="flex" colGap="16px">
                <c-skeleton type="circle" width="40px" height="40px"></c-skeleton>
                <c-skeleton width="400px" height="40px"></c-skeleton>
              </c-wrap>
            `
          )}
        </c-wrap>
      </c-content>
    `;
  }
}
