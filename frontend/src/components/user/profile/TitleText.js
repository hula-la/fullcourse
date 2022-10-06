import styled from 'styled-components';

const Text = styled.div`
  /* height: 5vh; */
  margin-top: 3vh;
  padding-bottom: 2vh;
  background: url('/img/baseline.png') center no-repeat;
  background-position-y: 0;
  background-position-x: 0;
  background-size: 11rem 2.5rem;
  font-size: 2rem;
  @media only screen and (min-device-width: 479px) and (max-device-width: 800px) {
    background-size: auto 1.5rem;
    font-size: 1rem;
  }
  font-family: Tmoney;
  color: #333333;
  text-align: start;
`;

const TitleText = (props) => {
  return <Text>{props.content}</Text>;
};

export default TitleText;
