import styled from "styled-components";

export const PcCpButtonStyled = styled.section`
  width: 0vw;
  height: 100vh;
  position: absolute;
  z-index: 999;

  & > div.gps,
  & > div.home,
  & > div.relay {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: var(--gray-0);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

    transition: all 0.15s ease-in-out;
    cursor: pointer;
    left: calc(100vw - 45px - 1rem);
    position: absolute;
  }

  & > div.gps {
    color: var(--brown-dark);
    bottom: 1rem;
  }

  & > div.home {
    color: var(--brown);
    bottom: calc(1.6rem + 45px);
  }

  & > div.relay {
    color: var(--brown-light);
    bottom: calc(2.2rem + 90px);
  }

  & > div.gps:hover,
  & > div.home:hover,
  & > div.relay:hover {
    background-color: var(--brown-light);
    color: var(--gray-0);
  }
`;

// 메인 사이드 메뉴 스타일링
export const PcCpMainStyled = styled.section`
  /* 사이드 메뉴 영역 */
  & > .sideMenu {
    width: 26vw;
    height: 100vh;
    max-width: 460px;
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    background-color: var(--gray-0);
    padding: 3rem 1.8rem;
    box-shadow: 0px 0 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: flex;
    flex-direction: column;
  }

  /* 사이드 메뉴 내부 컨텐츠 flex 설정 */
  & .sideMenu > div:last-child {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0; /* flex 아이템이 축소될 수 있도록 */
  }

  /* 상단 여백 */
  & .marginTop {
    height: 2.4rem;
  }

  /* 사이드 메뉴 제목 */
  & .sideMenu h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  /* 사이드 메뉴 제목의 보조 텍스트 */
  & .sideMenu h3 span {
    font-size: 0.75rem;
    color: var(--gray-5);
    font-weight: 400;
  }

  /* 필터 select 스타일 */
  & .filter {
    width: 100%;
    max-width: 100%;
    height: 45px;
    border-radius: 5px;
    border: 1px solid var(--gray-4);
    font-size: 0.8rem;
    padding: 0 1rem;
    background-color: var(--gray-0);
    color: var(--gray-5);
    cursor: pointer;
    overflow: hidden !important;

    /* 기본 화살표 제거 (크로스 브라우징) */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: none;
  }

  /* 사이드 메뉴 내 리스트(ul) 스크롤바 스타일 */
  & .sideMenu > div > ul {
    overflow-y: scroll;
    flex: 1;
    border-top: 1px solid var(--gray-2);

    /* 커스텀 스크롤바 스타일 */
    scrollbar-width: thin;
    scrollbar-color: var(--gray-2) transparent;

    /* Webkit 기반 브라우저용 */
    &::-webkit-scrollbar {
      width: 2px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--gray-1);
      border-radius: 8px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-button {
      display: none;
    }
  }
`;

export const PcCpDetailsStyle = styled.section`
  width: 23vw;
  max-width: 360px;
  height: 100vh;
  position: absolute;
  background-color: var(--gray-0);
  top: 0;
  left: calc(min(26vw, 460px));
  /* left: max(17.5vw, 460px); */
  z-index: 998;
  padding: 2rem 1.8rem;
  overflow-y: scroll;

  /* 스크롤바 숨기기 (크로스 브라우징) */
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */

  /* WebKit 브라우저 (Chrome, Safari) */
  &::-webkit-scrollbar {
    display: none;
  }

  /* X Mark */
  & > p {
    margin-bottom: 1rem;
  }

  & > p > .icon {
    color: var(--gray-4);
    cursor: pointer;
    transition: all 0.15s ease-in-out;
  }

  & > p > .icon:hover {
    color: var(--brown-light);
  }

  /* image */
  & > div:nth-child(2) {
    width: 100%;
    height: 28%;
    max-height: 170px;
    background-color: var(--gray-2);
    font-size: 2rem;
    color: var(--gray-3);
    margin: 2rem 0;
    border-radius: 12px;
  }

  & h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
  }

  & h3.name {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
  }

  & p.intro {
    font-size: 0.9rem;
    color: var(--gray-5);
    margin-bottom: 1.2rem;
    line-height: 1.5;
  }

  & p.category.review {
    font-size: 0.9rem;
    color: var(--gray-5);
    margin-bottom: 1.2rem;

    & .category {
      font-weight: 600;
      color: var(--brown-dark);
    }

    & .icon {
      color: orange;
      padding-right: 0.5rem;
    }
  }

  & .schedule {
    font-size: 0.7rem;
    color: var(--gray-5);
    margin-bottom: 1.2rem;
    border-top: 1px solid var(--gray-2);
    font-family: "Noto Sans KR", sans-serif;

    & > li {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--gray-2);
      color: var(--gray-4);
      gap: 1rem;
    }

    & > li > span:nth-child(1) {
      font-weight: 600;
    }

    & > li > span:nth-child(3) {
      flex: 1;
      text-align: center;
    }
  }

  & > ul.menuList > li:nth-child(1) {
    border-top: 1px solid var(--gray-2);
  }

  & > ul.menuList > li {
    padding: 1.6rem 0;
    border-bottom: 1px solid var(--gray-2);
    /* margin-bottom: 1.6rem */
  }

  & > ul.menuList > li > p:nth-child(1) > span:nth-child(1) {
    font-weight: 600;
    font-size: 1.1rem;
  }

  & > ul.menuList > li > p:nth-child(2) {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: var(--gray-5);
  }

  & .reviewItem {
    padding: 1.6rem 0;
    border-bottom: 1px solid var(--gray-2);
    font-size: 0.9rem;

    & > p:nth-child(1) {
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    & > p:nth-child(1) > span:nth-child(2) {
      font-size: 0.8rem;
    }

    & > p:nth-child(1) > span:nth-child(2) .icon {
      color: orange;
    }
  }
`;
