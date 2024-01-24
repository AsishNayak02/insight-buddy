// chatbot.js
const handleKeyPress = (e, state, handleSendMessage) => {
  if (e.key === 'Enter') {
    handleSendMessage();
  }
};
function handleUserMessageChange(event, state) {
  state.userMessage = event.target.value;
}
function addRedDotToButton(buttonOrSelector) {
  const button =
  typeof buttonOrSelector === 'string'
    ? document.querySelector(buttonOrSelector)
    : buttonOrSelector;

if (!button) {
  console.error('Invalid button or selector:', buttonOrSelector);
  return;
}

const redDot = document.createElement('div');
redDot.className = 'red-dot';
button.appendChild(redDot);
  }
  
  function removeRedDotFromButton(button) {
    const redDot = button.querySelector('.red-dot');
    if (redDot) {
        redDot.remove();
    }
  }
  
  function updatePopupIcon() {
    const popupIcon = document.querySelector('.open-button');
    popupIcon.textContent = '🤖';
  }
  
  function updateCloseButtonIcon() {
    const closeButton = document.querySelector('.close-button');
    closeButton.textContent = '❌';
  }
  
  function handleBeep(message, btnClose, audioElement) {
    if (message.sender === 'bot' && message.text !== 'typing...' && btnClose === 1) {
        audioElement.play();
        addRedDotToButton('.open-button');
        addRedDotToButton('.close-button');
      }
    }
  
  function fetchProducts(apiEndpoint) {
    // Mocked data for testing
    return Promise.resolve([
      {
        brand: 'Apple',
        category: 'smartphones',
        description: 'An apple mobile which is nothing like apple',
        discountPercentage: 12.96,
        id: 1,
        images: [
          'https://cdn.dummyjson.com/product-images/1/1.jpg',
          'https://cdn.dummyjson.com/product-images/1/2.jpg',
          'https://cdn.dummyjson.com/product-images/1/3.jpg',
          'https://cdn.dummyjson.com/product-images/1/4.jpg',
          'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
        ],
        price: 549,
        rating: 4.69,
        stock: 94,
        thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
        title: 'iPhone 9',
      },
    ]);
  }
  
  async function handleSendMessage(state, avt, userMessage, btnClose, audioElement, inputFieldFun, render) {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        state.products = data;
        render(); // Render after fetching products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  
    const userM = state.userMessage;
    state.userMessage = '';
  
    if (!userM.trim()) return;
  
    const selectedAvatar = avt;
    const newUserMessageWithAvatar = {
      text: userM,
      sender: 'user',
      avatar: selectedAvatar,
    };
  
    state.chatHistory = [...state.chatHistory, newUserMessageWithAvatar];
    const botTyping = { text: 'typing...', sender: 'bot' };
    state.chatHistory = [...state.chatHistory, botTyping];
    const sanitizedUserMessage = userM.toLowerCase().replace(/\s/g, '');
  
    setTimeout(() => {
      if (sanitizedUserMessage === 'hi' || sanitizedUserMessage === 'hello') {
        const botResponse = { text: 'Hello! How can I assist you today?', sender: 'bot' };
        state.chatHistory = [...state.chatHistory, botResponse];
        handleBeep(botResponse);
        inputFieldFun(); // Move inputFieldFun here
      } else if (sanitizedUserMessage === 'whoareyou') {
        const botResponse = { text: "I'm a friendly chatbot here to help!", sender: 'bot' };
        state.chatHistory = [...state.chatHistory, botResponse];
        handleBeep(botResponse);
        inputFieldFun(); // Move inputFieldFun here
      } else {
        // ... (your existing code for handling other messages)
      }
  
      state.chatHistory = state.chatHistory.filter((message) => message.sender !== 'bot' || message.text !== 'typing...');
  
      render(); // Move render here
    }, 5000);
  }
  
  
  function addWelcomeMessage(state, render) {
    const welcomeMessage = { text: 'Welcome! How can I assist you today?', sender: 'bot' };
    state.chatHistory = [welcomeMessage];
    console.log('called this');
    render();
  }
  
  function createChatbox(btncr) {
    const chatboxContent = `
    <div class="chat-popup" id="myForm">
    <div class="form-container" id="chatbot-container" ></div>
    <button type="button" class="close-button" onclick="closeForm()" style="background-color: ${btncr};">❌<span class="notification-symbol-close"></span></button>
    </div>
    <button class="open-button" onclick="openForm()" style="background-color: ${btncr};">🤖<span class="notification-symbol"></span></button>
    `;
    document.body.innerHTML += chatboxContent;  }
  
  function render(state, btncr, title) {
    document.body.onload = function () { createChatbox(btncr); };
    const chatbotContainer = document.getElementById('chatbot-container');
    chatbotContainer.innerHTML = '';
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    const card = document.createElement('div');
    card.className = 'card';
    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.style.backgroundColor = btncr;
    const icon = document.createElement('span');
    icon.className = 'icon';
    icon.textContent = '🤖';
    const h4 = document.createElement('h4');
    h4.style.color = 'white';
    h4.textContent = title;
    titleBar.appendChild(icon);
    titleBar.appendChild(h4);
    card.appendChild(titleBar);
    const chatHistoryContainer = document.createElement('div');
    chatHistoryContainer.className = 'chat-history-container';
    
    state.chatHistory.forEach((message, index) => {
      const messageDiv = document.createElement('div');
      messageDiv.className = `chat-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`;
      messageDiv.textContent = message.text;
      if (message.sender === 'user') {
        const avatarSpan = document.createElement('span');
        avatarSpan.className = 'avatar';
        avatarSpan.textContent = message.avatar;
        chatHistoryContainer.appendChild(avatarSpan);
      }
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
    input.addEventListener("keyup", handleKeyPress);
   
    const button = document.createElement('button');
    button.className = 'send-btn';
    button.textContent = 'Send';
    button.style.backgroundColor = btncr;
    button.addEventListener('click', handleSendMessage);
    
    inputContainer.appendChild(input);
    inputContainer.appendChild(button);
   
    card.appendChild(inputContainer);
    cardContainer.appendChild(card);
    chatbotContainer.appendChild(cardContainer);
   
    chatHistoryContainer.scrollTop = chatHistoryContainer.scrollHeight;
   }
  
  const initialState = {
    userMessage: '',
    chatHistory: [],
    products: [],
  };
  
  export {
    addRedDotToButton,
    removeRedDotFromButton,
    updatePopupIcon,
    updateCloseButtonIcon,
    handleBeep,
    fetchProducts,
    handleSendMessage,
    addWelcomeMessage,
    createChatbox,
    render,
    handleUserMessageChange,
    handleKeyPress,
    initialState,
  };