import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  .hr-sect {
    display: flex;
    flex-basis: 50%;
    width: 65%;
    margin: auto 0;
    align-items: center;
    justify-content: center;
    color: rgba(0, 0, 0, 0.35);
    font-size: 16px;
    font-weight: 700;
    margin: 1.5rem auto;
  }
  .hr-sect::before,
  .hr-sect::after {
    content: '';
    flex-grow: 1;
    background: rgba(8, 0, 0, 0.35);
    height: 3px;
    font-size: 0px;
    line-height: 0px;
    margin: 10px 16px;
  }
`;

const Circle1 = styled.div`
  position: absolute;
  width: 65px;
  height: 65px;
  left: 0px;
  top: 0px;
  border-radius: 50%;
  background: #a6dcef;
`;

const Circle2 = styled.div`
  position: absolute;
  width: 35px;
  height: 35px;
  left: 20px;
  top: 100px;
  border-radius: 50%;
  background: #a6dcef;
`;

const Circle3 = styled.div`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 77px;
  top: 69px;
  border-radius: 50%;
  background: #a6dcef;
`;

const Circle4 = styled.div`
  position: absolute;
  width: 22px;
  height: 22px;
  left: 131px;
  top: 33px;
  border-radius: 50%;
  background: #a6dcef;
`;

const Circle5 = styled.div`
  position: absolute;
  width: 65px;
  height: 65px;
  right: 0px;
  top: 0px;
  border-radius: 50%;
  background: #a6dcef;
`;

const Circle6 = styled.div`
  position: absolute;
  width: 35px;
  height: 35px;
  right: 20px;
  top: 100px;
  border-radius: 50%;
  background: #a6dcef;
`;

const Circle7 = styled.div`
  position: absolute;
  width: 48px;
  height: 48px;
  right: 77px;
  top: 69px;
  border-radius: 50%;
  background: #a6dcef;
`;

const Circle8 = styled.div`
  position: absolute;
  width: 22px;
  height: 22px;
  right: 131px;
  top: 33px;
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

const FormTitle = styled.div`
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  margin-top: 100px;
  color: #7fbcd2;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const GoogleLogin = styled.button`
  display: flex;
  width: 60%;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 2rem;
  padding-right: 1rem;
  background: #ffffff;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 700;
  color: #7a7a7a;

  .googlelogo {
    width: 80px;
    height: 50px;
  }
`;

const LoginFormBlock = styled.form``;

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
      <FormTitle>
        BUSAN
        <br />
        FULLCOURSE
      </FormTitle>
      <GoogleLogin>
        <img src="/img/GoogleLogo.webp" alt="" className="googlelogo" />
        Login through Google
      </GoogleLogin>
      <div className="hr-sect">or</div>
      {/* <LoginFormBlock>
        <form>
          <div>
            <label for="userEmail">Email*</label>
            <input id="userEmail" name="userEmail" />
          </div>
        </form>
      </LoginFormBlock> */}
    </Wrapper>
  );
};

export default LoginForm;
