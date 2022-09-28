import styled from 'styled-components';

const Text = styled.div`
height: 4vh;
width: 25vw;
margin: 3vh 0;
background: url('/img/baseline.png') center no-repeat;
background-position-y: 0;
background-position-x: 0;

background-size: auto 5vh;
font-size: 4vmin;
font-family: Tmoney;
color: #333333;
text-align: start;
padding: 0;
`;

const TitleText = (props) =>{
  return(
    <Text>{props.content}</Text>
  )
}

export default TitleText;