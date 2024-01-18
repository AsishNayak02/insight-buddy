const ChatbotComponent = () => {
    const state = {
      userMessage: '',
      chatHistory: [],
      products: [],
    };
    const addWelcomeMessage = () => {
      const welcomeMessage = { text: 'Welcome! How can I assist you today?', sender: 'bot' };
      state.chatHistory = [welcomeMessage];
      render();
    };
    const welcomeMessageTimeout = setTimeout(addWelcomeMessage, 1000);
    const handleUserMessageChange = (e) => {
      state.userMessage = e.target.value;
    };
    const handleSendMessage = () => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('https://fakestoreapi.com/products');
          const data = await response.json();
          //console.log(data)
          state.products = data;
          //console.log(state.products)
          render();
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      fetchProducts();
      if (!state.userMessage.trim()) return;
      const newUserMessage = { text: state.userMessage, sender: 'user' };
      state.chatHistory = [...state.chatHistory, newUserMessage];
      const sanitizedUserMessage = state.userMessage.toLowerCase().replace(/\s/g, '');
      if (sanitizedUserMessage === 'hi' || sanitizedUserMessage === 'hello') {
        const botResponse = { text: 'Hello! How can I assist you today?', sender: 'bot' };
        state.chatHistory = [...state.chatHistory, botResponse];
      } else if (sanitizedUserMessage === 'whoareyou') {
        const botResponse = { text: "I'm a friendly chatbot here to help!", sender: 'bot' };
        state.chatHistory = [...state.chatHistory, botResponse];
      } else {
        let foundProduct = null;
        console.log(state.products)
        for (let i = 0; i < state.products.length; i++) {
          const sanitizedTitle = state.products[i].title.toLowerCase().replace(/\s/g, '');
          if (sanitizedTitle.includes(sanitizedUserMessage)) {
            foundProduct = state.products[i];
            break;
          }
        }
        if (foundProduct) {
          const { id, title, price } = foundProduct;
          const botResponse = { text: `Price for ${title}: $${price}`, sender: 'bot' };
          state.chatHistory = [...state.chatHistory, botResponse];
        } else {
          const botResponse = { text: `Product "${state.userMessage}" not found.`, sender: 'bot' };
          state.chatHistory = [...state.chatHistory, botResponse];
        }
      }
      state.userMessage = '';
      render();
    };
    const render = () => {
      const chatbotContainer = document.getElementById('chatbot-container');
      chatbotContainer.innerHTML = '';
      const chatHistoryDiv = document.createElement('div');
      chatHistoryDiv.style.height = '200px';
      chatHistoryDiv.style.overflowY = 'scroll';
      chatHistoryDiv.style.border = '1px solid #ccc';
      chatHistoryDiv.style.marginBottom = '10px';
      state.chatHistory.forEach((message, index) => {
        const messageDiv = document.createElement('div');
        messageDiv.style.padding = '5px';
        messageDiv.style.textAlign = message.sender === 'user' ? 'right' : 'left';
        messageDiv.textContent = message.text;
        chatHistoryDiv.appendChild(messageDiv);
      });
      chatbotContainer.appendChild(chatHistoryDiv);
      const input = document.createElement('input');
      input.type = 'text';
      input.value = state.userMessage;
      input.addEventListener('input', handleUserMessageChange);
      const button = document.createElement('button');
      button.textContent = 'Send';
      button.addEventListener('click', handleSendMessage);
      const inputDiv = document.createElement('div');
      inputDiv.appendChild(input);
      inputDiv.appendChild(button);
      chatbotContainer.appendChild(inputDiv);
    };
    return {
      render,
    };
  };
  
