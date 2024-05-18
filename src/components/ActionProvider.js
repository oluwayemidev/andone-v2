// src/components/ActionProvider.js
class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    greet() {
      const message = this.createChatBotMessage('Hello! How can I help you today?');
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    }
  
    // Add more actions here
  }
  
  export default ActionProvider;
  