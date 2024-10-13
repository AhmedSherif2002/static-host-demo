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
  span {
    display: block;
    color: red;
  }
`;
const InputWithLabel: React.FC<{
  labelText: string;
  name: string;
  placeHolder?: string;
  value: string;
  inValidText: string;
  isValid: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}> = ({
  labelText,
  name,
  placeHolder,
  onChange,
  value,
  isValid,
  inValidText,
}) => {
  return (
    <InputWithLabelEl>
      <label htmlFor={name}>{labelText}</label>
      <InputBox
        className={!isValid ? 'invalid' : ''}
        placeHolder={placeHolder}
        onChange={onChange}
        value={value}
      />
      {!isValid && <span>{inValidText}</span>}
    </InputWithLabelEl>
  );
};

export default InputWithLabel;
