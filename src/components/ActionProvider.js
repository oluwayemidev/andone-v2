import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const roboWhatFunc = () => {
    const botMessage = createChatBotMessage('I\'m Joseph, a bot and i\'m here to assist you.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const solarPanelFunc = () => {
    const botMessage = createChatBotMessage('How can I help you with solar panels?', {
        delay: 500,
        widget: 'solarquestions'
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const solarPanelQst1Func = () => {
    const botMessage = createChatBotMessage('Sure! We offer a wide variety of solar panels for different needs. Our panels are designed to be efficient and durable.', {
        delay: 500,
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const solarPanelQst2Func = () => {
    const botMessage = createChatBotMessage('Great! We offer a range of products and services. Our team of professionals will help you choose the right panels for your needs. May I ask for your Name, Email address and  Location to provide you a quote?', {
        delay: 500,
        widget: 'yesorno'
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const noFunc = () => {
    const botMessage = createChatBotMessage('No problem. Let me know if you have any other questions.', {
        delay: 500,
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const yesornoFunc = () => {
    const botMessage = createChatBotMessage( {
        widget: 'quote'
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const quoteFunc = () => {
    const botMessage = createChatBotMessage('Ok', {
        delay: 1000,
        widget: 'quote'
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            roboWhatFunc,
            solarPanelFunc,
            solarPanelQst1Func,
            solarPanelQst2Func,
            yesornoFunc,
            quoteFunc,
            noFunc,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;