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

export const PcCpMainStyled = styled.section`
  & > .sideMenu {
    width: 26vw;
    height: 100vh;
    max-width: 460px;
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    background-color: var(--gray-0);
    padding: 3rem 2.5rem;
    box-shadow: 0px 0 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  & .marginTop {
    margin-top: 1.6rem;
  }

  & .sideMenu h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  & .sideMenu h3 span {
    font-size: 0.75rem;
    color: var(--gray-5);
    font-weight: 400;
  }

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

  & .sideMenu > div > ul {
    overflow-y: scroll;
    height: 70%;
    border-top: 1px solid var(--gray-2);
    /* 스크롤바 숨기기 (크로스 브라우징) */
    -ms-overflow-style: none; /* IE/Edge */
    scrollbar-width: none; /* Firefox */

    /* WebKit 브라우저 (Chrome, Safari) */
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const PcCpDetailsStyle = styled.section`
  width: 15vw;
  height: 100vh;
  position: absolute;
  background-color: var(--gray-0);
  top: 0;
  left: 17.5vw;
  z-index: 998;
  padding: 3rem 1.8rem;

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
    height: 200px;
    background-color: var(--gray-2);
    font-size: 2rem;
    color: var(--gray-3);
    margin: 2rem 0;
    border-radius: 12px;
  }

  & h3.name {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
  }

  & p.intro {
    /* font-size: 0.9rem; */
    color: var(--gray-5);
    margin-bottom: 1.2rem;
    line-height: 1.5;
  }

  & h3.name > span:nth-child(2).category {
    color: var(--gray-5);
    padding-left: 0.7rem;
    font-size: 1rem;
    /* font-weight: 400; */
  }

  /* 메뉴 */
  & h3.menu {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
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
`;
