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
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
  let unreadMessagesCount = 0;
  let btnClose = 0;
  const audioElement = document.createElement('audio');
  audioElement.src = 'ping-82822.mp3';

  function inputFieldFun() {
    const inputField = document.querySelector('.user-input');
    inputField.focus();
  }

  function openForm() {
    btnClose = 0;
    document.getElementById("myForm").style.display = "block";
    const openButton = document.querySelector('.open-button');
    removeRedDotFromButton(openButton);
    const closeButton = document.querySelector('.close-button');
    removeRedDotFromButton(closeButton);
    requestAnimationFrame(() => {
        inputFieldFun();
    });
    updatePopupIcon();
  }

  function removeRedDotFromButton(button) {
      const redDot = button.querySelector('.red-dot');
      if (redDot) {
          redDot.remove();
      }
  }

  function closeForm() {
    btnClose = 1;
    document.getElementById("myForm").style.display = "none";
    updateCloseButtonIcon();
  }

  function updatePopupIcon() {
    const popupIcon = document.querySelector('.open-button');
    popupIcon.textContent = '🤖';
  }

  function updateCloseButtonIcon() {
    const closeButton = document.querySelector('.close-button');
    closeButton.textContent = '❌';
  }

  function createChatbox(btncr) {
    const chatboxContent = `
      <div class="chat-popup" id="myForm">
        <div class="form-container" id="chatbot-container" ></div>
        <button type="button" class="close-button" onclick="closeForm()" style="background-color: ${btncr};">❌<span class="notification-symbol-close"></span></button>
      </div>
      <button class="open-button" onclick="openForm()" style="background-color: ${btncr};">🤖<span class="notification-symbol"></span></button>
    `;
    document.body.innerHTML += chatboxContent;
  }
  
  const ChatbotComponent = (apiEndpoint, btncr, title, avt) => {
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
   
   const handleKeyPress = (e) => {
     if (e.key === 'Enter') {
       handleSendMessage();
     }
   };

   const handleBeep = (message) => {
    if (message.sender === 'bot' && message.text !== 'typing...' && btnClose === 1) {
      audioElement.play();
      addRedDotToButton('.open-button');
      addRedDotToButton('.close-button');
    }
   }

  function addRedDotToButton(buttonSelector) {
    const button = document.querySelector(buttonSelector);
    const redDot = document.createElement('div');
    redDot.className = 'red-dot';
    button.appendChild(redDot);
    
  }
   const handleSendMessage = () => {
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
     

     const fetchProducts = async () => {
      try {
        console.log(userM);
        const response = await fetch(apiEndpoint + `${userM}`);
        const apiResponse = await response.json();
        console.log(apiResponse);
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
          const botResponse = { text: `Product "${userM}" not found.`, sender: 'bot' };
          state.chatHistory = [...state.chatHistory, botResponse];
          handleBeep(botResponse);
          requestAnimationFrame(() => {
           inputFieldFun();
         });
        }
        render();
        }
         catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    setTimeout(fetchProducts, 5000);
    setTimeout(() => {
  state.chatHistory = state.chatHistory.filter((message) => message.sender !== 'bot' || message.text !== 'typing...');
}, 5000);
render();
   };
   
   const render = () => {
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
   return {
     render,
   };
 };






