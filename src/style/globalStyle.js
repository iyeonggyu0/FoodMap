import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&family=Roboto:wght@100;300;400;500;700;900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@100;200;300;400;500;600;700;800;900&display=swap');

    :root {
      /* 갈색 계열 */
      --brown-light: #A47764;
      --brown: #543C35;
      --brown-dark: #746563;

      --main-page-bg: #F7F3F1;

      /* 포인트 그린 */
      --green-accent: #22C55E;

      /* 회색 계열 */
      --gray-0: #FFFFFF;
      --gray-1: #F7F3F1;
      --gray-2: #EDEDED;
      --gray-3: #D5D5D5;
      --gray-4: #A4A4A4;
      --gray-5: #7B8694;
      --gray-6: #49505A;

      /* 남색 계열 */
      --navy: #111827;
    }



  ${reset}
  *,*::before, *::after{
	  margin: 0;
	  padding: 0;
	  border: 0;
    box-sizing: border-box;
    vertical-align: baseline;
  }
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
	  display: block;
  }
  body {
	  line-height: 1;
    font-family: 'Noto Sans KR', 'Roboto', 'Nanum Gothic', 'Ubuntu', 'Gothic A1', sans-serif;
  }
  ol, ul {
	  list-style: none;
  }
  blockquote, q {
  	quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
	  content: '';
	  content: none;
  }
  table {
	  border-collapse: collapse;
	  border-spacing: 0;
  }
  a, a:link, a:visited, a:hover, a:active{
    color: #202123;
    text-decoration: none;
  }
  -ms-overflow-style: block; /* IE and Edge */
  scrollbar-width: block; /* Firefox */

    // 가로의 중앙
    .flexWidthCenter {
    display: flex;
    justify-content: center;
  }

  // 세로의 중앙
  .flexHeightCenter {
    display: flex;
    align-items: center;
  }

  // 정중앙
  .flexCenter {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flexBetween{
    display: flex;
    justify-content: space-between;
  }

  .flexBetweenCol{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

`;

export default GlobalStyle;
