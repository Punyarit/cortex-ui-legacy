import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../ingredient/skeleton';
import '../../kit/content';
import '../../kit/wrap';

@customElement('c-observation-summary-skeleton')
export class ObservationSummarySkeleton extends LitElement {
  static styles = css``;

  render() {
    return html`
      <c-wrap mt="12px" d="flex" justify="flex-end" mb="12px">
        <c-skeleton width="170px" height="40px"></c-skeleton>
      </c-wrap>
      <c-wrap mt="20px" type="fluid">
        <c-content>
          <c-wrap type="fluid" d="flex" justify="space-between" aligns="center">
            <c-wrap d="flex" colGap="60px">
              <c-wrap d="flex" layout="column" rowGap="12px">
                <c-skeleton width="100px" height="22px"></c-skeleton>
                <c-skeleton width="60px" height="22px"></c-skeleton>
              </c-wrap>
              <c-wrap d="flex" layout="column" rowGap="12px">
                <c-skeleton width="120px" height="22px"></c-skeleton>
                <c-skeleton width="300px" height="22px"></c-skeleton>
              </c-wrap>
            </c-wrap>
            <c-skeleton type="circle" width="40px" height="40px"></c-skeleton>
          </c-wrap>
        </c-content>
      </c-wrap>

      <c-wrap mt="12px" type="fluid">
        <c-content>
          <!-- row 1 -->
          <c-wrap d="flex" type="fluid">
            <!-- table 1 -->
            ${this.tableTemplateSkeleton()}
            <!-- table 2 -->
            ${this.tableTemplateSkeleton()}
          </c-wrap>
        </c-content>
      </c-wrap>
    `;
  }

  tableTemplateSkeleton(): TemplateResult<1> {
    return html`
      <c-wrap type="fluid" d="flex" layout="column" aligns="center">
        <c-wrap mt="12px" d="flex" colGap="16px" ml="12px">
          <c-skeleton width="110px" height="46px"></c-skeleton>
          <c-skeleton width="110px" height="46px"></c-skeleton>
          <c-skeleton width="110px" height="46px"></c-skeleton>
          <c-skeleton width="110px" height="46px"></c-skeleton>
        </c-wrap>
        <c-wrap mt="12px" d="flex" layout="column" rowGap="12px" ml="12px">
          ${[1, 0.8, 0.6, 0.4, 0.2].map(
            opacity => html` <c-skeleton opacity="${opacity}" width="488px" height="46px"></c-skeleton> `
          )}
        </c-wrap>
      </c-wrap>
    `;
  }
}
