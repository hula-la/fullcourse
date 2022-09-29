import styled from 'styled-components';

const Button = styled.button`
  outline: 0;
  padding: 5px;
  margin: auto 0;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  font-size: 0.8rem;
  background: linear-gradient(
    90deg,
    rgba(217, 239, 255, 1) 100%,
    rgba(164, 216, 255, 1) 100%
  );
  box-shadow: 3px 3px 5px rgba(164, 216, 255, 0.64);
  color: darkslategray;
  border: solid 2px #ffffff00;
  &:hover {
    background: #ffffff;
    color: #4b94ca;
    border-color: #4b94ca;
    transition: 0.3s;
  }
`;

const StyledButton = (props) => {
  return <Button>{props.content}</Button>;
};

export default StyledButton;
