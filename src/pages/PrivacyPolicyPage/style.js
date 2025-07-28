import styled from "styled-components";

export const PrivacyPolicyPageMainStyle = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 3rem 0;
  background: #f9f9f9;

  & > div {
    width: 75vw;
    max-width: 900px;
    margin: 0 auto;
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    padding: 3rem 2.5rem 2.5rem 2.5rem;
  }

  h1 {
    font-size: 2.1rem;
    font-weight: 700;
    margin-bottom: 1.2rem;
    color: #333;
    text-align: center;
  }

  p {
    font-size: 1.08rem;
    color: #444;
    line-height: 1.7;
    margin-bottom: 1.2rem;
  }

  section {
    margin-bottom: 2.2rem;
    padding-bottom: 1.2rem;
    border-bottom: 1px solid #ececec;
  }

  section:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #5a3e2b;
    margin-bottom: 0.7rem;
    margin-top: 0.5rem;
  }

  strong {
    color: #a47764;
    font-weight: 600;
  }

  /* 약관 정의(용어설명) 스타일 */
  .definition-list {
    margin: 2.5rem 0 2.5rem 0;
    padding: 2rem 2.5rem;
    background: #f5f1ee;
    border-radius: 0.7rem;
    box-shadow: 0 1px 6px rgba(90, 62, 43, 0.07);
  }
  .definition-term {
    color: #a47764;
    font-weight: 700;
    font-size: 1.08rem;
    display: inline-block;
    min-width: 7.5em;
    margin-right: 0.5em;
    vertical-align: top;
  }
  .definition-desc {
    color: #444;
    font-size: 1.08rem;
    display: inline;
  }
  .definition-item {
    margin-bottom: 0.7em;
    line-height: 1.7;
    display: block;
  }

  @media (max-width: 768px) {
    .definition-list {
      padding: 1.2rem 0.7rem;
    }
    .definition-term {
      font-size: 0.98rem;
      min-width: 5.5em;
    }
    .definition-desc {
      font-size: 0.98rem;
    }
  }

  @media (max-width: 768px) {
    & > div {
      width: 95vw;
      padding: 2rem 0.7rem 1.5rem 0.7rem;
    }
    h1 {
      font-size: 1.4rem;
    }
    h2 {
      font-size: 1.05rem;
    }
    p {
      font-size: 0.98rem;
    }
  }
`;
