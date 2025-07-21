import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&family=Roboto:wght@100;300;400;500;700;900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@100;200;300;400;500;600;700;800;900&display=swap');


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
    color: black;
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

`;

export default GlobalStyle;
