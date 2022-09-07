import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
  transform: translateY(-100%);
  display: flex;
  justify-content: center;
`;

const FooterDiv = styled.div`
  width: 100%;
  border-top: 2px solid #333333;
  padding-top: 1rem;
`;

const Footer = () => {
  return (
    <Wrapper>
      <FooterDiv>
        <div>
          <h2>Full Course</h2>
        </div>
        <div>example@ssafy.com</div>
      </FooterDiv>
    </Wrapper>
  );
};

export default Footer;
