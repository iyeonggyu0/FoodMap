import styled from "styled-components";

// =========================
// 메인 컨테이너 및 전체 레이아웃
// =========================
export const RegisterPageMainStyle = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 3rem 0;
  background-color: var(--main-page-bg);

  /* 등록 버튼 영역 */
  .axiosButton {
    height: 3rem;
    margin-top: 2rem;
  }
  .axiosButton > * {
    height: 100%;
  }

  /* 입력 비활성화 스타일 */
  .disabled-input {
    pointer-events: none !important;
    opacity: 0.5;
  }

  /* 필수 표시 */
  & span.essential {
    color: orange;
    padding-left: 0.2rem;
  }

  // =========================
  // 약관 영역
  // =========================
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

  // =========================
  // section(폼 전체) 및 내부 구조
  // =========================
  & > section {
    width: 75vw;
    max-width: 1440px;
    margin: 0 auto;
    padding: 3rem 3rem;
    background-color: var(--gray-0);
    border-radius: 1rem;
    border: 1px solid var(--gray-4);
  }

  /* 각 섹션(기본정보, 메뉴, 스케줄, 사업자 등) 구분 */
  & > section > div {
    margin-bottom: 2rem;
  }

  /* 타이틀 */
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

  // =========================
  // 에러 메시지
  // =========================
  & span.error {
    color: red;
    font-size: 0.8rem;
    visibility: hidden;
  }

  // =========================
  // 기본정보 인풋 col 스타일
  // =========================
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

  // =========================
  // 반응형 스타일
  // =========================
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

  /* 안내사항 */
  & > div:last-child {
    width: 75vw;
    max-width: 1440px;
    margin: 0 auto;
    padding: 3rem 3rem;
    background-color: var(--gray-0);
    border-radius: 1rem;
    border: 1px solid var(--gray-4);
    margin-top: 3rem;
  }

  & > div:last-child > h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  & > div:last-child > p {
    font-size: 1rem;
    color: var(--gray-6);
    margin-bottom: 1rem;
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
    & > div > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 3vh !important;
    }

    & > div > div > * {
      width: 100% !important;
    }
  }

  & > div {
    margin-bottom: 3rem !important;
  }

  @media screen and (min-width: 769px) {
    & > div > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    & label {
      display: none;
    }

    /* 요일 */
    & > div > div > *:nth-child(1) {
      width: 20%;
    }

    & > div > div:nth-child(2) > *:nth-child(1) > span {
      height: 56px;
      border-radius: 0.5rem;
    }

    /* 요일 */
    & > div > div > *:nth-child(3),
    & > div > div > *:nth-child(5) {
      width: 36%;
    }
    & > div > div:nth-child(1) > *:nth-child(2),
    & > div > div:nth-child(2) > *:nth-child(2),
    & > div > div:nth-child(2) > *:nth-child(4) {
    }
  }
`;
