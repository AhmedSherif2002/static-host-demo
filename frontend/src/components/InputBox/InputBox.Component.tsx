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
`;
const InputBox: React.FC<{
  placeHolder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}> = ({ placeHolder, onChange, value }) => {
  return (
    <Input className="Input">
      <TbWorld />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeHolder ? placeHolder : ''}
      />
    </Input>
  );
};

export default InputBox;
