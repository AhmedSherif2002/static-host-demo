import React from 'react';
import styled from 'styled-components';
import { TbWorld } from 'react-icons/tb';
const Input = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #000;
  input {
    outline: none;
    border: none;
    color: #000;
    font-size: 0.8rem;
  }
  input::placeholder {
    color: #777;
  }
  input:focus {
    border-color: cyan;
  }
  input.invalid {
    border-color: red;
  }
`;
const InputBox: React.FC<{
  placeHolder?: string;
  value: string;
  className: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}> = ({ placeHolder, onChange, value, className }) => {
  return (
    <Input className="Input">
      <TbWorld />
      <input
        className={className}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeHolder ? placeHolder : ''}
      />
    </Input>
  );
};

export default InputBox;
