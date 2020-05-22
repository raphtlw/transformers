import { useState } from 'react';
import styled from 'styled-components';
import fetch from 'node-fetch';

export default () => {
  const [result, setResult] = useState('');
  const [inputText, setInputText] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [running1, setRunning1] = useState(false);
  const [running2, setRunning2] = useState(false);
  const [showAnother, setShowAnother] = useState(false);

  const generateText = (input: string) => {
    const requestBody: Gpt2RequestBody = {
      length: 300,
      prefix: input,
    };

    fetch('https://gpt2-epjrw3kbeq-uc.a.run.app', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((res) => {
        setShowMore(true);
        setResult(result + res.text);
        setRunning1(false);
        setRunning2(false);
        setShowAnother(true);
      });
  };

  return (
    <Styles>
      <div className='header'>
        <h1>transformers</h1>
        <h2>Play around with the gpt-2 writing bot</h2>
        <h3>
          Note: This website runs the small 117M model and does not support the
          full 1558M model because of memory limits.
        </h3>
      </div>
      <div className='main'>
        <div className='input'>
          <textarea
            onChange={(event) => setInputText(event.target.value)}
            placeholder='Type something here...'
          />
          <div className='generate'>
            <button
              className={`ld-ext-right ${running1 && 'running'}`}
              onClick={() => {
                setRunning1(true);
                generateText(inputText);
              }}
            >
              Generate {showAnother && 'Another'}
              <div className='ld ld-ring ld-spin'></div>
            </button>
            {showMore && (
              <button
                className={`ld-ext-right ${running2 && 'running'}`}
                onClick={() => {
                  setRunning2(true);
                  const words = result.split(' ');
                  const lastSentence = words
                    .slice(Math.max(words.length - 20, 0))
                    .join(' ');
                  console.log(lastSentence);
                  generateText(lastSentence);
                }}
              >
                Generate More
                <div className='ld ld-ring ld-spin'></div>
              </button>
            )}
          </div>
        </div>
        <div className='result'>
          <p>{result}</p>
        </div>
      </div>
    </Styles>
  );
};

const Styles = styled.div`
  & {
    margin-bottom: 3rem;
  }
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
  .header h3 {
    margin-top: 0.4rem;
    font-size: 1rem;
    font-weight: 400;
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
  .generate {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 1.6rem;
  }
  .generate button {
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
    transition: all ease-out 0.1s;
    margin: 0rem 0.6rem;
    width: 100%;
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
    word-wrap: break-word;
  }
`;

interface Gpt2RequestBody {
  length?: number;
  temperature?: number;
  top_k?: number;
  top_p?: number;
  prefix?: string;
  truncate?: string;
  include_prefix?: boolean;
}
