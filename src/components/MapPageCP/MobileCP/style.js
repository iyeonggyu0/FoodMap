import styled from "styled-components";

export const MobileCPMainStyle = styled.section`
  position: absolute;
  width: 0;
  height: 100vh;

  & > .ftList,
  & > .ftDetails {
    z-index: 999;
    width: 100vw;
    background-color: var(--gray-0);
    padding: 2rem;

    border-radius: 1rem 1rem 0 0;
    box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);
    height: 40vh;
    position: absolute;
    transition: all 0.2s ease-in-out;
  }

  & > .ftList {
    padding-right: 0;
  }

  & > .ftList > h3 {
    padding-right: 2rem;
  }

  & > .ftList > ul {
    overflow-y: scroll;
    padding-right: calc(2rem - 12px);
  }

  & h3 {
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  /* 상단 여백 */
  & .marginTop {
    height: 2rem;
  }

  & .ftDetails > section {
    width: 100%;
    height: 100%;
    position: relative;
    margin-top: 1.6rem;
  }

  /* 기본정보 */
  & .ftDetails > section.info {
    & > div:first-child {
      width: 100%;
      height: 28%;
      max-height: 170px;
      background-color: var(--gray-2);
      color: var(--gray-3);
      border-radius: 12px;
    }

    & h3.name {
      font-size: 1.4rem;
      font-weight: 600;
      margin-bottom: 0.8rem;
    }

    & p.intro {
      font-size: 1rem;
      color: var(--gray-5);
      margin-bottom: 1.2rem;
      line-height: 1.5;
    }

    & p.category.review {
      font-size: 1rem;
      color: var(--gray-5);

      & .category {
        font-weight: 600;
        color: var(--brown-dark);
      }

      & .icon {
        color: orange;
        padding-right: 0.5rem;
      }
    }
  }

  & .ftDetails > section.menu {
    overflow-y: scroll;

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
  }

  & .ftDetails > section.schedule {
    & ul {
      color: var(--gray-5);
      margin-bottom: 1.2rem;
      border-top: 1px solid var(--gray-2);
      font-family: "Noto Sans KR", sans-serif;
    }

    & ul > li {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--gray-2);
      color: var(--gray-4);
      gap: 1rem;
    }

    & ul > li > span:nth-child(1) {
      font-weight: 600;
    }

    & ul > li > span:nth-child(3) {
      flex: 1;
      text-align: center;
    }
  }

  & .ftDetails > section.review {
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
      font-size: 0.95rem;
      color: var(--gray-5);
    }

    & .reviewItem {
      padding: 1.6rem 0;
      border-bottom: 1px solid var(--gray-2);

      & > p:nth-child(1) {
        margin-bottom: 0.5rem;
        font-weight: 600;
      }

      & > p:nth-child(1) > span:nth-child(2) {
        font-size: 0.95rem;
      }

      & > p:nth-child(1) > span:nth-child(2) .icon {
        color: orange;
      }
    }
  }
`;

export const MobileCPButtonStyle = styled.section`
  width: 0vw;
  height: 100vh;
  position: absolute;
  z-index: 998;

  & > div.gps,
  & > div.home,
  & > div.menu,
  & > div.relay {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--gray-0);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    font-size: 0.9rem;

    transition: all 0.15s ease-in-out;
    cursor: pointer;
    position: absolute;
  }

  & > div.gps {
    color: var(--brown-dark);
    left: calc(100vw - 1rem - 40px);
    top: 1rem;
  }

  & > div.home {
    color: var(--brown);
    left: calc(100vw - 1.6rem - 80px);
    top: 1rem;
  }

  & > div.relay {
    color: var(--brown-light);
    left: calc(100vw - 2.2rem - 120px);
    top: 1rem;
  }

  & > div.menu {
    color: var(--brown-light);
    left: calc(100vw - 1rem - 40px) !important;
    bottom: 1rem !important;
  }

  & > div.gps:hover,
  & > div.home:hover,
  & > div.relay:hover,
  & > div.menu:hover {
    background-color: var(--brown-light);
    color: var(--gray-0);
  }
`;
