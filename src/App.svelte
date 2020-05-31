<script>
  import randomWords from "random-words";

  let input = "";
  let generate = "Generate";

  const generateText = () => {
    generate = "Generating...";
    const prefix = new String(input);
    const randomizeInput = setInterval(
      () => (input = input + " " + randomWords()),
      1000
    );

    fetch("https://gpt2-epjrw3kbeq-uc.a.run.app", {
      method: "POST",
      body: JSON.stringify({
        max_length: 400,
        prefix: prefix
      }),
      mode: "cors",
      cache: "no-cache"
    })
      .then(res => res.json())
      .then(res => {
        clearInterval(randomizeInput);
        input = res.text;
        generate = "Generate Another";
      });
  };
</script>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
    color: black;
    user-select: text;
  }
  main {
    margin: 0.5rem 0.8rem;
  }
  h1 {
    font-size: 2.4rem;
    font-weight: 700;
  }
  h2 {
    margin: 1rem 0rem 1.6rem 0rem;
    font-size: 1.1rem;
    font-weight: 400;
  }
  textarea {
    padding: 0.8rem;
    height: 20rem;
    width: 100%;
    resize: vertical;
  }
  textarea:focus {
    outline-color: black;
  }
  button {
    margin-top: 0.5rem;
    border: none;
    padding: 0.8rem 1.6rem;
    color: white;
    background: rgb(12, 52, 255);
    background: linear-gradient(
      120deg,
      rgba(12, 52, 255, 1) 0%,
      rgba(66, 185, 255, 1) 100%
    );
    box-shadow: 0px 0px 10px rgba(0, 107, 168, 0.685);
    border-radius: 2px;
    transition: all cubic-bezier(0, 0.42, 0.3, 0.99) 0.05s;
  }
  button:active {
    box-shadow: 0px 0px 5px rgba(0, 107, 168, 0.685);
    transform: scale(0.98);
  }
  footer {
    font-size: 1rem;
    margin-top: 2rem;
  }
  a {
    color: #2f92ff;
    text-decoration: none;
  }
</style>

<main>
  <h1>transformers</h1>
  <h2>See how a modern neural network completes your text.</h2>
  <textarea
    bind:value={input}
    placeholder="Type something here..."
    name="input" />
  <button on:click={generateText} type="submit">{generate}</button>
  <footer>
    Created with ❤️ by
    <a href="https://twitter.com/raphtlw">Raphael</a>
  </footer>
</main>
