import styled from "styled-components";

export const MyPageInfoCPMainStyle = styled.section`
  width: 100%;
  height: 100%;
  padding: ${(props) => (props.isPc ? "4rem 8rem" : "6rem 2rem")};
  overflow-y: scroll;
  z-index: 996;

  .error {
    font-size: 0.7rem;
    color: var(--red);
  }

  & > h2 {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: nowrap;
    gap: 3rem;
    width: 100%;
    /* height: calc(100% - 6rem); */
  }
`;
