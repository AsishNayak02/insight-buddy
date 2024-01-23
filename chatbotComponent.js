const styles = `
.card-container {
    
  height: 50vh;
margin-top: 250px;
margin-right: 400px;

}
.card {
  background-color: rgba(255, 255, 255, 0.04);
  aspect-ratio: 13/16;
  width: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  transition: transform 1s ease, width 1s ease;
  
}


.title-bar {
  
  padding: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon {
  font-size: 24px;
  margin-right: 8px;
  color: white;
}
.avatar {
  display: flex;
  float:right;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 1px;
  margin-top:9px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.chat-history-container {
  height: 300px;
  padding: 10px;
  overflow-y: auto;
  max-height: 100%;
  background-color:#dad6d6;
  &::-webkit-scrollbar {
      width: 8px;
  }

  &::-webkit-scrollbar-track {
      background: #f0f0f0; 
  }

  &::-webkit-scrollbar-thumb {
      background-color: #000000; 
      border-radius: 8px; 
      border: 2px solid #020405; 
  }

  scrollbar-width: thin;
  scrollbar-color: #030405 #f0f0f0; 
}


.chat-message {
  padding: 10px;
  margin-bottom: 10px;
  max-width: 50%;
  word-wrap: break-word;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  
}
.user-message {
  background-color:purple;
  text-align: right;
  margin-left: auto;
  margin-right:30px;
  max-width: 50%;
  color: #fff;
}
#p{
  background-color: #f06868;
  text-align: right;
  margin-left: auto;
}
.bot-message {
  background-color: #2ecc71;
  color: black;
}
.input-container {
  display: flex;
  align-items: center;
  padding: 10px;   
  background-color: #dad6d6; 
}

.user-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin-right: 8px;
}

.send-btn {
  padding: 8px 16px;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 15px;

}

  body {font-family: Arial, Helvetica, sans-serif;}
  * {box-sizing: border-box;}
.open-button{
  
  color: white;
  font-size: 24px;
  padding: 14px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  bottom: 23px;
  right: 28px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease; /* Add smooth transitions */
}
.close-button {
  
  color: white;
  font-size: 24px;
  padding: 14px;
  border: none;
  cursor: pointer;
  opacity: 1;
  position: fixed;
  bottom: 23px;
  right: 28px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease; 
}

.open-button:hover, .close-button:hover {
  
  transform: scale(1.1); 
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); 
}

.open-button:active, .close-button:active {
  transform: scale(0.9); 
}

.chat-popup {
  display: none;
  position: fixed;
  bottom: 40px;
  right: 15px;
  z-index: 9;
}

.red-dot {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  right: 5px;
}
@media only screen and (max-width: 360px)  {
  .chat-popup {
    width:80%;
    margin-right:20px;
    bottom:20px;
  }
}
@media only screen and (max-width: 400px)  {
  .chat-popup {
    width:80%;
    margin-right:20px;
    bottom:20px;
  }
}
`

// Creates a style element, adds styles to it, and appends it to the document head.
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

// Initializes variables for unread messages count, close button state, and an audio element.
let unreadMessagesCount = 0;
let btnClose = 0;

// Focuses on the input field.
function inputFieldFun() {
  const inputField = document.querySelector('.user-input');
  inputField.focus();
}

// Opens the chat form, removes red dots from buttons, and updates the popup icon.
function openForm(userIcon) {
  btnClose = 0;
  document.getElementById("myForm").style.display = "block";
  const openButton = document.querySelector('.open-button');
  removeRedDotFromButton(openButton);
  const closeButton = document.querySelector('.close-button');
  removeRedDotFromButton(closeButton);
  requestAnimationFrame(() => {
    inputFieldFun();
  });
  updatePopupIcon(userIcon);
}


// Removes red dots from a given button.
function removeRedDotFromButton(button) {
  const redDot = button.querySelector('.red-dot');
  if (redDot) {
    redDot.remove();
  }
}

// Closes the chat form and updates the close button icon.
function closeForm(closeIcon) {
  btnClose = 1;
  document.getElementById("myForm").style.display = "none";
  updateCloseButtonIcon(closeIcon);
}

// Updates the popup icon with the specified user icon.
function updatePopupIcon(userIcon) {
  const popupIcon = document.querySelector('.open-button');
  popupIcon.textContent = userIcon;
}

// Updates the close button icon with a close symbol.
function updateCloseButtonIcon(closeIcon) {
  const closeButton = document.querySelector('.close-button');
  closeButton.textContent = closeIcon;
}


function createChatbox(buttonColor, userIcon, closeIcon) {
  const chatboxContent = `
      <div class="chat-popup" id="myForm">
        <div class="form-container" id="chatbot-container" ></div>
        <button type="button" class="close-button" onclick="closeForm('${closeIcon}')" style="background-color: ${buttonColor};">${closeIcon}<span class="notification-symbol-close"></span></button>
      </div>
      <button class="open-button" onclick="openForm('${userIcon}')" style="background-color: ${buttonColor};">${userIcon}<span class="notification-symbol"></span></button>
    `;
  document.body.innerHTML += chatboxContent;
}

// Main Chatbot component with functions for handling user interactions and rendering.
const ChatbotComponent = (apiEndpoint, buttonColor, title, userAvatar, userIcon, closeIcon, notificationAudio) => {
  const state = {
    userMessage: '',
    chatHistory: [],
    products: [],
  };
  
  const audioElement = document.createElement('audio');
  audioElement.src = notificationAudio;

  // Adds a welcome message to the chat history after a timeout.
  const addWelcomeMessage = () => {
    const welcomeMessage = { text: 'Welcome! How can I assist you today?', sender: 'bot' };
    state.chatHistory = [welcomeMessage];
    render();
  };

  // Timeout for adding a welcome message.
  const welcomeMessageTimeout = setTimeout(addWelcomeMessage, 1000);

  // Handle changes in the user message input field.
  const handleUserMessageChange = (e) => {
    state.userMessage = e.target.value;
  };

  // Handles keypress events, triggering message sending on 'Enter'.
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Handles the beep sound for incoming bot messages when the chatbox is closed.
  const handleBeep = (message) => {
    if (message.sender === 'bot' && message.text !== 'typing...' && btnClose === 1) {
      audioElement.play();
      addRedDotToButton('.open-button');
      addRedDotToButton('.close-button');
    }
  }

  // Adds a red dot to the chat button.
  function addRedDotToButton(buttonSelector) {
    const button = document.querySelector(buttonSelector);
    const redDot = document.createElement('div');
    redDot.className = 'red-dot';
    button.appendChild(redDot);

  }

  // Handles sending a user message, fetching products, and processing bot responses.
  const handleSendMessage = () => {
    const userMsg = state.userMessage;
    state.userMessage = '';

    if (!userMsg.trim()) return;
    const selectedAvatar = userAvatar;
    const newUserMessageWithAvatar = {
      text: userMsg,
      sender: 'user',
      avatar: selectedAvatar,
    };

    state.chatHistory = [...state.chatHistory, newUserMessageWithAvatar];
    const botTyping = { text: 'typing...', sender: 'bot' };
    state.chatHistory = [...state.chatHistory, botTyping];


    const fetchProducts = async () => {
      try {
        const response = await fetch(apiEndpoint + `${userMsg}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const apiResponse = await response.json();

        if (apiResponse.products && apiResponse.products.length > 0) {
          const product = apiResponse.products[0];
          const title = product.title;
          const price = product.price || 'Price not specified';
          const botResponse = { text: `Price for ${title}: $${price}`, sender: 'bot' };
          state.chatHistory = [...state.chatHistory, botResponse];
          handleBeep(botResponse);
          requestAnimationFrame(() => {
            inputFieldFun();
          });
        } else {
          const botResponse = { text: `Product "${userMsg}" not found.`, sender: 'bot' };
          state.chatHistory = [...state.chatHistory, botResponse];
          handleBeep(botResponse);
          requestAnimationFrame(() => {
            inputFieldFun();
          });
        }
        render();
      }
      catch (error) {
        throw error;
      }
    };
    setTimeout(fetchProducts, 5000);
    setTimeout(() => {
      state.chatHistory = state.chatHistory.filter((message) => message.sender !== 'bot' || message.text !== 'typing...');
    }, 5000);
    render();
  };


  function createTitleBar(buttonColor, userIcon, title) {
    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.style.backgroundColor = buttonColor;

    const icon = document.createElement('span');
    icon.className = 'icon';
    icon.textContent = userIcon;

    const h4 = document.createElement('h4');
    h4.style.color = 'white';
    h4.textContent = title;

    titleBar.appendChild(icon);
    titleBar.appendChild(h4);

    return titleBar;
  }

  // Function to create a chat history container element
  function createChatHistoryContainer(state) {
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

    return chatHistoryContainer;
  }

  // Function to create an input container element
  function createInputContainer(state) {
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
    button.style.backgroundColor = buttonColor;
    button.addEventListener('click', handleSendMessage);

    inputContainer.appendChild(input);
    inputContainer.appendChild(button);

    return inputContainer;
  }

  // Function to create a card element
  function createCard(buttonColor, userIcon, title, state) {
    const card = document.createElement('div');
    card.className = 'card';

    const titleBar = createTitleBar(buttonColor, userIcon, title);
    const chatHistoryContainer = createChatHistoryContainer(state);
    const inputContainer = createInputContainer(state);

    card.appendChild(titleBar);
    card.appendChild(chatHistoryContainer);
    card.appendChild(inputContainer);

    return {card, chatHistoryContainer};
  }

  // Function to create a card container element
  function createCardContainer() {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    return cardContainer;
  }

  // Function to create the chat UI dynamically based on the state
  function createChatUI(buttonColor, userIcon, title, state) {
    const cardContainer = createCardContainer();
    const {card, chatHistoryContainer} = createCard(buttonColor, userIcon, title, state);

    const chatbotContainer = document.getElementById('chatbot-container');
    chatbotContainer.innerHTML = '';

    cardContainer.appendChild(card);
    chatbotContainer.appendChild(cardContainer);
    chatHistoryContainer.scrollTop = chatHistoryContainer.scrollHeight;
  }


  // Renders the chat UI based on the current state.
  const render = () => {

    document.body.onload = function () { createChatbox(buttonColor, userIcon, closeIcon); };
    createChatUI(buttonColor, userIcon, title, state);
  }
  return {
    render,
  };
};