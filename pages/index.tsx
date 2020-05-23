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
                const requestBody: Gpt2RequestBody = {
                  length: 100,
                  prefix: inputText,
                };

                fetch('https://gpt2-epjrw3kbeq-uc.a.run.app', {
                  method: 'POST',
                  body: JSON.stringify(requestBody),
                })
                  .then((res) => res.json())
                  .then((res) => {
                    setShowMore(true);
                    setResult(res.text);
                    setRunning1(false);
                    setShowAnother(true);
                  });
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

                  const requestBody: Gpt2RequestBody = {
                    length: 100,
                    prefix: lastSentence,
                  };

                  fetch('https://gpt2-epjrw3kbeq-uc.a.run.app', {
                    method: 'POST',
                    body: JSON.stringify(requestBody),
                  })
                    .then((res) => res.json())
                    .then((res) => {
                      setShowMore(true);
                      setResult(`${result} ${res.text.replace(result, '')}`);
                      setRunning2(false);
                    });
                }}
              >
                More
                <div className='ld ld-ring ld-spin'></div>
              </button>
            )}
          </div>
        </div>
        <div className='result'>
          <p>
            <b>{inputText}</b> {result}
          </p>
        </div>
      </div>
    </Styles>
  );
};

const Styles = styled.div`
  & {
    margin-bottom: 3rem;
  }
  .main {
    display: flex;
    flex-wrap: wrap;
    margin: 0.8rem 0rem 0rem 3rem;
  }
  .first {
    font-family: Inter, sans-serif;
  }
  .header {
    margin: 2rem 0rem 0rem 3rem;
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
    width: 40vw;
    height: 60vh;
    display: flex;
    flex-direction: column;
  }
  .input textarea {
    resize: none;
    height: 100%;
    width: 100%;
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
    white-space: pre-wrap;
  }
  @media (max-width: 768px) {
    .main {
      margin: 0.8rem 0rem 0rem 1.6rem;
    }
    .header {
      margin: 1rem 1.6rem;
    }
    .header h1 {
      font-size: 2.4rem;
    }
    .header h2 {
      font-size: 1rem;
    }
    .input {
      margin: 1rem 1.6rem 0rem 0rem;
      width: 100%;
      height: 40vh;
    }
    .input textarea:focus {
      outline: none;
    }
    .result {
      margin: 2rem 0rem;
      width: 100%;
    }
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
