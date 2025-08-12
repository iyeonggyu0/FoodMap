import styled from "styled-components";

export const MyLikeCPMainStyle = styled.section`
  width: 100%;
  height: 100%;
  padding: ${(props) => (props.isPc ? "4rem 8rem" : "6rem 2rem")};
  overflow-y: scroll;
  z-index: 996;

  & > h2 {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }

  & .ftListIndexLi {
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;

    padding: 1rem 3rem;
    border-radius: 30px;
    border: 1px solid var(--gray-3);

    @media screen and (max-width: 768px) {
      & {
        padding: 0rem 1.5rem;
      }
    }

    & .ftScheduleDiv {
      width: 100%;
      & .schedule {
        width: 100%;
        font-size: 0.7rem;
        color: var(--gray-5);
        border-top: 1px solid var(--gray-2);
        font-family: "Noto Sans KR", sans-serif;
        padding-bottom: 2rem;

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

        & > li > span:nth-child(4) {
          flex: 0.5;
          text-align: center;
        }

        @media screen and (max-width: 768px) {
          & > li > span:nth-child(4) {
            flex: 1;
          }
        }
      }
    }

    & .ftListIndex {
      padding: 2rem 0;
      border-bottom: 1px solid var(--gray-2);
      width: 100%;

      & > p:nth-child(1) {
        margin-bottom: 0.5rem;
      }

      & > p:nth-child(1) > span:nth-child(1) {
        padding: 0.4rem 0;
        font-weight: 600;
        font-size: 1.2rem;
      }

      & > p:nth-child(1) > span:nth-child(2) {
        display: inline-block;
        width: 56px;
        font-size: 0.75rem;
        padding: 0.3rem 0;
        line-height: 1.6;
        text-align: center;
        color: var(--gray-0);
        border-radius: 16px;
      }

      & > p:nth-child(2) {
        color: var(--gray-5);
        font-size: 0.75rem;
        line-height: 1.5;
      }

      & > p:nth-child(3) {
        color: var(--gray-5);
        font-size: 0.75rem;
        margin-top: 1rem;
      }
      & > p:nth-child(4) {
        color: var(--gray-5);
        font-size: 0.75rem;
        margin-top: 0.5rem;
      }

      & .icon {
        padding-right: 0.5rem;
        color: orange;
      }
    }
  }
`;
