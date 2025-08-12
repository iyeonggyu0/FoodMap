import styled from "styled-components";

export const PcReviewCPMainStyle = styled.section`
  height: 100vh;
  position: absolute;
  z-index: 1000;
  top: 0;

  background-color: var(--gray-0);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
  padding: 0 2rem;

  & > div {
    width: 100%;
    min-height: 180px;
    gap: 1.6rem;
  }

  & > div > div:nth-child(1) {
    text-align: center;
    font-size: 2.2rem;
    font-weight: 600;
    line-height: 1.3;
  }
  & > div > div:nth-child(1) span {
    color: var(--brown-dark);
    display: inline-block;
    max-width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: bottom;
  }

  & .starControllerIcon {
    display: inline-block;

    width: 32px;
    height: 32px;
    border-radius: 50%;

    font-size: 1rem;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    color: var(--gray-0);
    background-color: var(--brown-light);

    transition: all 0.05s;

    &:hover {
      font-size: 1.1rem;
    }
  }
  & .starSpan {
    font-size: 2rem;
    margin-bottom: 8px;
    color: #fbcf3cff;
  }

  & .textAreaDiv {
    margin-bottom: 2rem;
  }
`;
