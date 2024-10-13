import { ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { githubButtonContext } from '../../store/githubButtonContext';
const ButtonEl = styled.button`
  display: inline-block;
  outline: none;
  border: none;
  border-radius: 0;
  background-color: transparent;
  &.enabled {
    background-color: #000;
    color: #fff;
  }
  &.disabled {
    background-color: #aaa;

    color: #000;
  }
`;
const Button: React.FC<{
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}> = ({ children, onClick }) => {
  const { enabled } = useContext(githubButtonContext);

  return (
    <ButtonEl
      onClick={onClick}
      disabled={!enabled}
      className={`${enabled ? 'enabled' : 'disabled'}`}
    >
      {children}
    </ButtonEl>
  );
};

export default Button;
