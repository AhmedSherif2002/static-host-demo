import { useContext, useEffect, useState } from 'react';
import './App.css';
import Button from './components/InputBox/Button.component';
import styled from 'styled-components';
import InputWithLabel from './components/InputBox/InputWithLabel.component';
import { githubButtonContext } from './store/githubButtonContext';
const FormEl = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  button {
    align-self: flex-end;
  }
`;

function App() {
  const [isBegin, setIsBegin] = useState<boolean>(true);
  const [githubRepoInputValue, setGithubRepoInputValue] = useState<string>('');
  const [projectNameInputValue, setProjectNameInputValue] =
    useState<string>('');
  const [isRepoValid, setIsRepoValid] = useState<boolean>(true);
  const [isProjectNameValid, setIsProjectNameValid] = useState<boolean>(true);
  const { setIsEnabled } = useContext(githubButtonContext);
  useEffect(() => {
    if (isBegin) {
      setIsBegin(false);
    } else {
      if (projectNameInputValue) {
        setIsProjectNameValid(true);
      } else {
        setIsProjectNameValid(false);
      }
    }
  }, [projectNameInputValue, setIsBegin]);
  useEffect(() => {
    if (isBegin) {
      setIsBegin(false);
    } else {
      if (
        githubRepoInputValue &&
        githubRepoInputValue.startsWith('https://github.com/')
      ) {
        setIsRepoValid(true);
      } else {
        setIsRepoValid(false);
      }
    }
  }, [githubRepoInputValue, setIsBegin]);
  useEffect(() => {
    if (
      githubRepoInputValue &&
      githubRepoInputValue.startsWith('https://github.com/') &&
      projectNameInputValue
    ) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }, [githubRepoInputValue, projectNameInputValue, setIsEnabled]);
  const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8173', {
      method: 'post',
      body: JSON.stringify({
        projectName: projectNameInputValue,
        url: githubRepoInputValue,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  const onChangeGithubRepoHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGithubRepoInputValue(e.target.value);
  };
  const onChangeProjectNameHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProjectNameInputValue(e.target.value);
  };
  return (
    <>
      <FormEl action="" onSubmit={submitFormHandler}>
        <InputWithLabel
          labelText="Github Repo Url"
          name="githubUrl"
          placeHolder="https://github.com/example/clickhouse"
          onChange={onChangeGithubRepoHandler}
          isValid={isRepoValid}
          value={githubRepoInputValue}
          inValidText="please enter valid github url"
        />
        <InputWithLabel
          isValid={isProjectNameValid}
          name="projectName"
          labelText="Project Name"
          placeHolder="project name"
          inValidText="please enter project name"
          onChange={onChangeProjectNameHandler}
          value={projectNameInputValue}
        />

        <Button onClick={() => {}}>Deploy Static Site</Button>
      </FormEl>
    </>
  );
}

export default App;
