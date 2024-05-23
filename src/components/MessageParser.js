// in MessageParser.jsx
import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const greetings = ['hello', 'hi', 'hey', 'greetings'];
    const roboWhat = ['what are you', 'are you', 'who are you', 'is you'];
    const solar = ['solar', 'solar panel', 'panel'];

    if (greetings.some(greeting => message.toLowerCase().includes(greeting))) {
        actions.handleHello();
    }

    if (roboWhat.some(greeting => message.toLowerCase().includes(greeting))) {
        actions.roboWhatFunc();
    }

    if (solar.some(greeting => message.toLowerCase().includes(greeting))) {
        actions.solarPanelFunc();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;