import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../ingredient/skeleton';
import '../../kit/content';
import '../../kit/wrap';

@customElement('c-screening-skeleton')
export class ScreeningSkeleton extends LitElement {
  render() {
    return html`
      <c-content>
        <c-wrap pl="14px" type="fluid">
          <!-- title -->
          <c-skeleton width="200px" height="40px"></c-skeleton>

          <!-- input 1 -->
          <c-wrap opacity="0.8" mt="20px" d="flex" colGap="20px" type="fluid">
            <c-skeleton width="140px" height="30px"></c-skeleton>
            <c-wrap ml="42px" d="flex" colGap="50px">
              <c-skeleton type="circle" width="30px" height="30px"></c-skeleton>
              <c-skeleton type="circle" width="30px" height="30px"></c-skeleton>
            </c-wrap>
            <c-wrap ml="32px">
              <c-skeleton width="640px" height="60px"></c-skeleton>
              <c-wrap mt="12px" d="flex" colGap="16px">
                <c-skeleton width="180px" height="40px"></c-skeleton>
                <c-skeleton width="180px" height="40px"></c-skeleton>
              </c-wrap>
            </c-wrap>
          </c-wrap>

          <!-- input 2 -->
          <c-wrap opacity="0.6" mt="40px" d="flex" colGap="20px" type="fluid">
            <c-skeleton width="140px" height="30px"></c-skeleton>
            <c-wrap ml="42px" d="flex" colGap="50px">
              <c-skeleton type="circle" width="30px" height="30px"></c-skeleton>
              <c-skeleton type="circle" width="30px" height="30px"></c-skeleton>
            </c-wrap>
            <c-wrap ml="32px">
              <c-skeleton width="640px" height="60px"></c-skeleton>
              <c-wrap mt="12px" d="flex" colGap="16px">
                <c-skeleton width="180px" height="40px"></c-skeleton>
                <c-skeleton width="180px" height="40px"></c-skeleton>
              </c-wrap>
            </c-wrap>
          </c-wrap>

          <!-- input 3 -->
          <c-wrap opacity="0.4" mt="40px" d="flex" layout="column" rowGap="16px">
            <c-skeleton width="226px" height="40px"></c-skeleton>
            <c-skeleton width="1000px" height="100px"></c-skeleton>
          </c-wrap>
        </c-wrap>
      </c-content>
    `;
  }
}
