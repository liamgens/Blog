import styled, { css } from 'styled-components';


const Button = styled.button`
  border-radius: 3px;
  background: transparent;
  color: #4a90e2;
  border: 2px solid #4a90e2;
  width: ${props => props.width ? props.width : "200px"};
  height: ${props => props.height ? props.height : "30px"};
  font-family: helvetica;
  font-size: 12px;
  cursor: pointer;

  &:active {
    position: relative;
    top: 1px;
  };
  &:hover{
    background:;
  }

${
  props => props.primary && css`
    background: #4a90e2;
    color: white;
  `}
`;

export default Button;