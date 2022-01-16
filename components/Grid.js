import React, { useEffect, useState } from "react";
import Box from "./Box";

export default function Grid({ words, currentWord, secretWord }) {
  const findBoxStatus = (letter, index) => {
    if (secretWord.charAt(index) == letter.toLowerCase()) {
      return "correct";
    }

    if (secretWord.split("").includes(letter.toLowerCase())) {
      return "semi";
    }

    return "wrong";
  };

  return (
    <div>
      <div className="grid grid-cols-5 gap-3">
        {words.map((word, i) =>
          word
            .toUpperCase()
            .split("")
            .map((letter, j) => (
              <Box
                key={word + letter + i + j}
                status={findBoxStatus(letter, j)}
                value={letter}
                fill={true}
              />
            ))
        )}

        {words.length < 6 ? (
          [...new Array(5)].map((none, i) => {
            if (i >= currentWord.length) return <Box key={i} status="blank" />;
            else
              return (
                <Box
                  key={i}
                  status="black"
                  value={currentWord.toUpperCase().charAt(i)}
                />
              );
          })
        ) : (
          <></>
        )}

        {words.length < 6 ? (
          [...new Array(5 - words.length)].map((none, i) =>
            [...new Array(5)].map((none2, j) => (
              <Box key={(i, j)} status="blank" />
            ))
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
