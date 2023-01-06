import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../ingredient/skeleton';
import '../../kit/content';
import '../../kit/wrap';
@customElement('c-evaluation-skeleton')
export class EvaluationSkeleton extends LitElement {
  static styles = css``;

  render() {
    return html`
      <c-wrap d="flex" justify="flex-end" mb="12px">
        <c-skeleton width="200px" height="50px"></c-skeleton>
      </c-wrap>
      <c-wrap d="flex" layout="column" rowGap="12px">
        ${[1, 0.8, 0.6, 0.4, 0.2].map(
          opacity => html`
            <c-wrap opacity="${opacity}" type="fluid">
              <c-content>
                <c-wrap mt="8px" mb="8px" d="flex" colGap="42px" aligns="center" pl="38px">
                  <c-skeleton type="circle" width="40px" height="40px"></c-skeleton>
                  <c-skeleton width="200px" height="40px"></c-skeleton>
                </c-wrap>
              </c-content>
            </c-wrap>
          `
        )}
      </c-wrap>
    `;
  }
}
