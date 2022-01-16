import React, { useEffect } from "react";
import Box from "./Box";

export default function Keyboard({ words, secretWord, keyboard, setKeyboard }) {
  const findBoxStatus = (letter, index) => {
    if (secretWord.charAt(index) == letter.toLowerCase()) {
      return "correct";
    }

    if (secretWord.split("").includes(letter.toLowerCase())) {
      return "semi";
    }

    return "wrong";
  };

  useEffect(() => {
    const letters = words[words.length - 1]?.split("");

    if (letters) {
      let i = 0;
      let newKeyboard = keyboard;

      for (const letter of letters) {
        newKeyboard[letter] =
          keyboard[letter] == "correct"
            ? keyboard[letter]
            : findBoxStatus(letter, i);
        i++;
      }

      setKeyboard({ ...keyboard, ...newKeyboard });
    }
  }, [words]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2 self-center">
        {"qwertyuiop".split("").map((letter) => (
          <Box
            key={letter}
            keyboard={true}
            value={letter}
            status={keyboard[letter]}
            fill={true}
          />
        ))}
      </div>
      <div className="flex self-center gap-2">
        {"asdfghjkl".split("").map((letter) => (
          <Box
            key={letter}
            keyboard={true}
            value={letter}
            status={keyboard[letter]}
            fill={true}
          />
        ))}
      </div>
      <div className="flex self-center gap-2 ">
        {"zxcvbnm,".split("").map((letter) => (
          <Box
            key={letter}
            keyboard={true}
            value={letter}
            status={keyboard[letter]}
            fill={true}
          />
        ))}
      </div>
    </div>
  );
}
