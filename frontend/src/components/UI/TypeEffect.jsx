import React from 'react'
import  ReactTypingEffect  from 'react-typing-effect';
import { tokens, useMode } from '../../Theme';
const TypeEffect = ({list}) => {
  const [theme] = useMode(); // Ensure useMode returns the correct theme
  const colors = tokens(theme.palette.mode); // Make sure tokens function is defined properly

  return (
    <ReactTypingEffect
      text={list}
      cursorRenderer={(cursor) => (
        <h1 style={{ color: "whitesmoke", fontSize: "25px" }}>{cursor}</h1>
      )}
      displayTextRenderer={(text, i) => {
        return (
          <h1>
            {text.split("").map((char, i) => {
              const key = `${i}`;
              return (
                <span
                  key={key}
                  style={{ color: colors.grey[500], fontSize: "25px" }}
                >
                  {char}
                </span>
              );
            })}
          </h1>
        );
      }}
    />
  );
}

export default TypeEffect
