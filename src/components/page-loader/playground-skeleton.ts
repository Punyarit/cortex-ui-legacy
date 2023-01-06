import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../ingredient/skeleton';
import '../kit/wrap';

@customElement('c-playground-skeleton')
export class PlaygroundSkeleton extends LitElement {
  render() {
    return html`
      <c-wrap d="flex" colGap="12px" mt="14px" justify="center" aligns="center">
        <c-skeleton type="circle" width="80px" height="80px"></c-skeleton>
        <c-wrap d="flex" layout="column" rowGap="12px">
          <c-skeleton width="160px" height="36px"></c-skeleton>
        </c-wrap>
      </c-wrap>
      <c-wrap mt="12px" d="flex" rowGap="12px" aligns="center" layout="column">
        <c-skeleton width="450px" height="28px"></c-skeleton>
        <c-skeleton width="400px" height="28px"></c-skeleton>
      </c-wrap>

      <c-wrap mt="112px">
        ${[1, 0.8, 0.6, 0.4].map(
          opacity => html`
            <c-wrap mt="12px">
              <c-skeleton opacity="${opacity}" width="100%" height="90px"></c-skeleton>
            </c-wrap>
          `
        )}
      </c-wrap>
    `;
  }
}
