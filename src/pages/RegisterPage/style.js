import styled from "styled-components";

export const RegisterPageMainStyle = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 3rem 0;
  background-color: var(--main-page-bg);

  .axiosButton {
    height: 3rem;
    margin-top: 2rem;
  }
  .axiosButton > * {
    height: 100%;
  }

  .disabled-input {
    pointer-events: none !important;
    opacity: 0.5;
  }

  & span.essential {
    color: orange;
    padding-left: 0.2rem;
  }

  & form.terms > label {
    padding-left: 1rem;
  }

  & form.terms > label > a {
    color: var(--brown);
  }

  & form.terms + div > span {
    margin-top: 5rem;
    width: 100%;
    height: 3rem;
    display: flex;
  }

  /* 체크박스 크기 키우기 */
  input[type="checkbox"] {
    width: 1.4em;
    height: 1.4em;
    accent-color: var(--brown-light);
    vertical-align: middle;
    margin-right: 0.3em;
  }

  & > section {
    width: 75vw;
    max-width: 1440px;
    margin: 0 auto;
    padding: 3rem 3rem;
    background-color: var(--gray-0);
    border-radius: 1rem;
    border: 1px solid var(--gray-4);
  }

  /* 텍스트 박스 */
  & > section > div {
    margin-bottom: 2rem;
  }

  & > section > div > h1 {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  & > section h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
    margin-top: 1rem;
  }

  /* 에러 */
  & span.error {
    color: red;
    font-size: 0.8rem;
    visibility: hidden;
  }

  /* 인풋 col */
  & > section > div:nth-child(2) > .col {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin: 0.7rem 0;
  }

  & > section > div:nth-child(2) > .col > div {
    width: 49%;
  }

  & > section > div:nth-child(2) > .col > div > span {
    font-size: 0.8rem;
  }

  & > section > div:nth-child(2) > .col-full {
    width: 100%;
    margin: 1rem 0;
  }

  @media screen and (max-width: 768px) {
    & > section {
      width: 90vw;
      padding: 3rem 2rem;
    }

    & > section > div > h1 {
      font-size: 1.9rem;
    }
    & > section > div > h1 + p {
      font-size: 0.9rem;
    }

    /* 인풋 col */
    & > section > div:nth-child(2) > .col {
      display: block;
    }

    & > section > div:nth-child(2) > .col > div {
      width: 100% !important;
      margin-bottom: 1.6rem;
    }
  }
`;

export const RegisterPageMenuStyle = styled.div`
  width: 100%;
  & > h2 + div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  & .col > div {
    width: 49%;
  }

  @media screen and (max-width: 768px) {
    & .col > div {
      width: 100% !important;
      margin-bottom: 1.6rem;
    }

    & > h2 + div {
      flex-direction: column;
      align-items: flex-start;
    }

    & .menu-list > p + div {
      height: 200px !important;
    }
  }

  & .col > div > p {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
  }

  & span.essential {
    color: orange;
    padding-left: 0.2rem;
  }

  & .menu-add > div > * {
    margin-bottom: 1rem;
  }

  & .menu-list > p + div {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 430px;
    overflow-y: auto;
    border: 1px solid var(--gray-4);
    border-radius: 0.5rem;
    background-color: var(--gray-0);
  }

  /* 메뉴 아이템 */
  & .menu-item {
    padding: 1rem 2rem;
    border-bottom: 1px solid var(--gray-2);
  }

  & .menu-item > div > p {
    gap: 0.6rem;
  }

  & .menu-item .icon > * {
    cursor: pointer;
    font-size: 1.2rem;
    color: var(--gray-4);
    transition: all 0.2s ease-in-out;
  }

  & .menu-item .icon > *:hover {
    color: var(--brown-light);
  }

  & .menu-item .menu-item-info {
    font-size: 0.9rem;
    color: var(--gray-4);
    margin-top: 0.5rem;
  }
`;

export const RegisterPageScheduleStyle = styled.div`
  width: 100%;

  @media screen and (max-width: 768px) {
    & > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 7vh !important;
    }

    & > div > * {
      width: 100% !important;
    }
  }
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4vh !important;
  }

  @media screen and (min-width: 769px) {
    & > div {
      gap: 0 0.4rem;
    }

    & label {
      display: none;
    }

    /* 요일 */
    & > div > span:nth-child(1) {
      width: 13%;
    }

    /* 시간 */
    & > div > form:nth-child(2),
    & > div > form:nth-child(4) {
      width: 40%;
    }

    & > div > form:nth-child(4) {
      margin-right: 1rem;
    }

    /* 주소찾기 버튼 */
    & > div > span:nth-child(5) {
      width: 20%;
      height: 56px;
      display: flex;
    }

    & > div > form:nth-child(6) {
      pointer-events: none;
    }

    & > div > form:nth-child(6),
    & > div > form:nth-child(7) {
      width: 60%;
    }
  }
`;
