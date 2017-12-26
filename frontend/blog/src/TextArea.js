import styled, { css } from 'styled-components';

const TextArea = styled.textarea`
    border-radius: 3px;
    padding: 5px;
    background: transparent;
    color: grey;
    resize: none;
    border: 2px solid #a4c7f0;
    width: ${props => props.width ? props.width : "200px"};
    height: ${props => props.height ? props.height : "30px"};
    font-family: helvetica;
    font-size: 12px;

    &:hover{
        border: 2px solid #77abe9;
    };

    &:focus{
        border: 2px solid #4a90e2;
        color: black;
        color: tran;
    };

    &:focus::-webkit-input-placeholder  {color:transparent;};
    &:focus::-moz-placeholder   {color:transparent;};
    &:-moz-placeholder   {color:transparent;};


`;

export default TextArea;