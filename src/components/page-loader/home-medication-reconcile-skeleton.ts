import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../ingredient/skeleton';
import '../kit/content';

@customElement('c-home-medication-reconcile-skeleton')
export class HomeMedicationReconcileSkeleton extends LitElement {
  static styles = css``;

  render() {
    return html`
      <c-content>
        <c-wrap mt="12px" mb="32px" d="flex" justify="space-between">
          <c-skeleton width="180px" height="50px"></c-skeleton>
          <c-skeleton width="120px" height="50px"></c-skeleton>
        </c-wrap>
        <c-wrap mt="26px" d="flex" justify="space-between" aligns="center">
          <c-skeleton width="160px" height="40px"></c-skeleton>
          <c-wrap d="flex" colGap="28px" aligns="center">
            <c-skeleton width="80px" height="40px"></c-skeleton>
            <c-skeleton type="circle" width="50px" height="50px"></c-skeleton>
            <c-skeleton type="circle" width="50px" height="50px"></c-skeleton>
            <c-skeleton width="160px" height="40px"></c-skeleton>
          </c-wrap>
          <c-wrap d="flex" colGap="30px">
            <c-skeleton width="80px" height="40px"></c-skeleton>
            <c-skeleton width="60px" height="40px"></c-skeleton>
          </c-wrap>
        </c-wrap>
        ${[1, 0.8, 0.6, 0.4, 0.2].map(
          opacity => html`
            <c-wrap mt="26px" d="flex" justify="space-between" aligns="center" opacity="${opacity}">
              <c-skeleton width="260px" height="40px"></c-skeleton>
              <c-wrap d="flex" colGap="28px" aligns="center">
                <c-skeleton width="80px" height="40px"></c-skeleton>
                <c-skeleton type="circle" width="50px" height="50px"></c-skeleton>
                <c-skeleton type="circle" width="50px" height="50px"></c-skeleton>
                <c-skeleton width="260px" height="40px"></c-skeleton>
              </c-wrap>
              <c-wrap d="flex" colGap="30px">
                <c-skeleton width="80px" height="40px"></c-skeleton>
                <c-skeleton width="60px" height="40px"></c-skeleton>
              </c-wrap>
            </c-wrap>
          `
        )}
      </c-content>
    `;
  }
}
