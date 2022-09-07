import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Circle1 = styled.div`
  position: absolute;
  width: 87px;
  height: 87px;
  left: 0px;
  top: 0px;
  border-radius: 50%;
  background: #a6dcef;
`;

const Circle2 = styled.div`
  position: absolute;
  width: 44px;
  height: 44px;
  left: 20px;
  top: 122px;
  border-radius: 50%;
  background: #a6dcef;
`;

const Circle3 = styled.div`
  position: absolute;
  width: 65px;
  height: 65px;
  left: 87px;
  top: 79px;
  border-radius: 50%;
  background: #a6dcef;
`;

const Circle4 = styled.div`
  position: absolute;
  width: 36px;
  height: 36px;
  left: 161px;
  top: 43px;
  border-radius: 50%;
  background: #a6dcef;
`;

const Circle5 = styled.div`
  position: absolute;
  width: 87px;
  height: 87px;
  right: 0px;
  top: 0px;
  border-radius: 50%;
  background: #a6dcef;
`;

const Circle6 = styled.div`
  position: absolute;
  width: 44px;
  height: 44px;
  right: 20px;
  top: 122px;
  border-radius: 50%;
  background: #a6dcef;
`;

const Circle7 = styled.div`
  position: absolute;
  width: 65px;
  height: 65px;
  right: 87px;
  top: 79px;
  border-radius: 50%;
  background: #a6dcef;
`;

const Circle8 = styled.div`
  position: absolute;
  width: 36px;
  height: 36px;
  right: 161px;
  top: 43px;
  border-radius: 50%;
  background: #a6dcef;
`;

const LeftWrapper = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
`;

const RightWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
`;
const LeftCircle = () => {
  return (
    <LeftWrapper>
      <Circle1 />
      <Circle2 />
      <Circle3 />
      <Circle4 />
    </LeftWrapper>
  );
};

const RightCircle = () => {
  return (
    <RightWrapper>
      <Circle5 />
      <Circle6 />
      <Circle7 />
      <Circle8 />
    </RightWrapper>
  );
};

const LoginForm = () => {
  return (
    <Wrapper>
      <LeftCircle />
      <RightCircle />
      <div></div>
    </Wrapper>
  );
};

export default LoginForm;
