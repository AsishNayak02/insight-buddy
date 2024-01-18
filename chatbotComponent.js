const ChatbotComponent = (apiEndpoint) => {
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
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        state.products = data;
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

    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';

    const card = document.createElement('div');
    card.className = 'card';

    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.style.backgroundColor=btncr;

    const icon = document.createElement('span');
    icon.className = 'icon';
    icon.textContent = '🤖';

    const h4 = document.createElement('h4');
    h4.style.color = 'white';
    h4.textContent = 'Insight Buddy';

    titleBar.appendChild(icon);
    titleBar.appendChild(h4);
    card.appendChild(titleBar);

    const chatHistoryContainer = document.createElement('div');
    chatHistoryContainer.className = 'chat-history-container';

    state.chatHistory.forEach((message, index) => {
      const messageDiv = document.createElement('div');
      messageDiv.className = `chat-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`;
      messageDiv.textContent = message.text;
      chatHistoryContainer.appendChild(messageDiv);
    });

    card.appendChild(chatHistoryContainer);

    const inputContainer = document.createElement('div');
    inputContainer.className = 'input-container';

    const input = document.createElement('input');
    input.className = 'user-input';
    input.type = 'text';
    input.value = state.userMessage;
    input.placeholder = 'Enter Request...';
    input.addEventListener('input', handleUserMessageChange);

    const button = document.createElement('button');
    button.className = 'send-btn';
    button.textContent = 'Send';
    button.style.backgroundColor=btncr;
    button.addEventListener('click', handleSendMessage);

    inputContainer.appendChild(input);
    inputContainer.appendChild(button);
    card.appendChild(inputContainer);

    cardContainer.appendChild(card);
    chatbotContainer.appendChild(cardContainer);
    $('#scroll').scrollTop(1000000);
  }

return {
  render,
};
};