import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import Grid from "../components/Grid";
import Keyboard from "../components/Keyboard";
import { getRandomWord, checkWord } from "./api/wordList";

export default function Home() {
  const [text, setText] = useState("");
  const [words, setWords] = useState([]);
  const [secret, setSecret] = useState(getRandomWord());
  const [streak, setStreak] = useState(0);
  const [gameOver, setgameOver] = useState(false);
  const [keyboard, setKeyboard] = useState({});

  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (gameOver) {
      nextRound();
    } else if (text.length == 5) {
      if (checkWord(text)) {
        setWords([...words, text]);
        checkWin(text);
        setText("");
      } else {
        alert("Not in word list");
      }
    }
  };

  const checkWin = (word) => {
    if (word == secret) {
      //win
      setStreak(streak + 1);
      setgameOver(true);
    } else if (words.length == 5) {
      //lose
      setStreak(0);
      setgameOver(true);
    }
  };

  const nextRound = () => {
    setText("");
    setKeyboard({});
    setWords([]);
    setSecret(getRandomWord());
    setgameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10">
      <Head>
        <title>Wordle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-4xl absolute top-8 right-10">{`🔥${streak}`}</div>

      <button className="absolute top-0 font-sans text-7xl ">
        {gameOver ? secret.toUpperCase() : "WORDLE"}
      </button>

      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="text-white text-xs focus:outline-none absolute left-0 bottom-0"
          type="text"
          ref={textInput}
          onBlur={() => {
            setTimeout(textInput.current.focus(), 10);
          }}
          autoFocus
          value={text}
          maxLength={gameOver ? 0 : 5}
          spellCheck={false}
          onChange={(e) => setText(e.target.value)}
        />
      </form>

      <Grid words={words} currentWord={text} secretWord={secret} />

      <Keyboard
        words={words}
        secretWord={secret}
        keyboard={keyboard}
        setKeyboard={setKeyboard}
      />

      <footer className="absolute bottom-0  justify-center w-full h-8 ">
        <div className="w-full text-center">By Ricky Yuen</div>
      </footer>
    </div>
  );
}
