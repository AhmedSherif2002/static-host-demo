import React from 'react';
import styled from 'styled-components';
import InputBox from './InputBox.Component';
const InputWithLabelEl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  label {
    font-size: 1.1rem;
    color: #000;
    align-self: flex-start;
  }
`;
const InputWithLabel: React.FC<{
  labelText: string;
  name: string;
  placeHolder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}> = ({ labelText, name, placeHolder, onChange, value }) => {
  return (
    <InputWithLabelEl>
      <label htmlFor={name}>{labelText}</label>
      <InputBox placeHolder={placeHolder} onChange={onChange} value={value} />
    </InputWithLabelEl>
  );
};

export default InputWithLabel;
