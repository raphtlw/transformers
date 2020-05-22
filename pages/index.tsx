import { useState } from 'react';
import styled from 'styled-components';

export default () => {
  const [result, setResult] = useState('');
  const [inputText, setInputText] = useState('');

  return (
    <Styles>
      <div className='header'>
        <h1>transformers</h1>
        <h2>Play around with the gpt-2 writing bot</h2>
      </div>
      <div className='main'>
        <div className='input'>
          <textarea
            onChange={(event) => setInputText(event.target.value)}
            placeholder='Type something here...'
          />
          <button>Generate</button>
        </div>
        <div className='result'>
          <p>{result}</p>
        </div>
      </div>
    </Styles>
  );
};

const Styles = styled.div`
  .header {
    margin: 2rem 0rem 0rem 3rem;
  }
  .main {
    display: flex;
    flex-wrap: wrap;
    margin: 0.8rem 0rem 0rem 3rem;
  }
  .first {
    font-family: Inter, sans-serif;
  }
  .header h1 {
    font-size: 3rem;
    font-weight: 700;
  }
  .header h2 {
    margin: 0.4rem 0rem 0rem 0rem;
    font-size: 1.2rem;
    font-weight: 500;
  }
  .input {
    margin: 2rem 0rem 0rem 0rem;
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
  }
  .input textarea {
    resize: none;
    height: 60vh;
    width: 40vw;
    font-size: 1rem;
    padding: 1rem;
  }
  .input button {
    outline: none;
    border: none;
    cursor: pointer;
    padding: 1rem 0rem;
    background: rgb(12, 52, 255);
    background: linear-gradient(
      120deg,
      rgba(12, 52, 255, 1) 0%,
      rgba(66, 185, 255, 1) 100%
    );
    box-shadow: 0px 5px 20px rgb(0, 127, 255, 0.6);
    color: white;
    font-size: 1rem;
    border-radius: 4px;
    margin-top: 1rem;
    transition: all ease-out 0.1s;
  }
  .input button:hover {
    transform: translate(0px, -2px);
    box-shadow: 0px 10px 20px rgb(0, 127, 255, 0.6);
  }
  .input button:active {
    transition: all ease-out 0.05s;
    transform: translate(0px, 0px);
    box-shadow: 0px 5px 10px rgb(0, 127, 255, 0.6);
  }
  .result {
    margin: 2rem 0rem 0rem 4rem;
    width: 48vw;
  }
  .result p {
    font-size: 1rem;
    font-weight: 500;
  }
`;
