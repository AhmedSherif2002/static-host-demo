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
  const [githubRepoInputValue, setGithubRepoInputValue] = useState<string>('');
  const [projectNameInputValue, setProjectNameInputValue] =
    useState<string>('');
  const { setIsEnabled } = useContext(githubButtonContext);
  useEffect(() => {
    if (
      githubRepoInputValue &&
      githubRepoInputValue.startsWith('https://github.com/') &&
      projectNameInputValue
    ) {
      console.log('valid');
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
      console.log('invalid');
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
          value={githubRepoInputValue}
        />
        <InputWithLabel
          name="projectName"
          labelText="Project Name"
          placeHolder="project name"
          onChange={onChangeProjectNameHandler}
          value={projectNameInputValue}
        />

        <Button onClick={() => {}}>Deploy Static Site</Button>
      </FormEl>
    </>
  );
}

export default App;
