const styles = `
.card-container {
    
  height: 50vh;
 /* background-image: url("https://images.unsplash.com/photo-1692900856320-91a898b7ecbb?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"); 
  background-repeat: no-repeat;
background-attachment: fixed;
background-size: cover; */
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

@keyframes zoom {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
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
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
@keyframes slideIn {
  from {
    transform: translateY(-20px);
  }
  to {
    transform: translateY(0);
  }
}

@-webkit-keyframes slidein {
  from {background-position: top; background-size:3000px; }
  to {background-position: -100px 0px;background-size:2750px;}
  }
  
  @keyframes slidein {
  from {background-position: top;background-size:3000px; }
  to {background-position: -100px 0px;background-size:2750px;}
  
  }
  
  
  @keyframes gradient {
      0% {
          background-position: 0% 50%;
      }
      50% {
          background-position: 100% 50%;
      }
      100% {
          background-position: 0% 50%;
      }
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
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease; /* Add smooth transitions */
}

.open-button:hover, .close-button:hover {
  
  transform: scale(1.1); /* Increase the size on hover */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); /* Add a subtle shadow on hover */
}

.open-button:active, .close-button:active {
  transform: scale(0.9); /* Decrease the size when clicked */
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
/* .form-container {
  max-width: 300px;
  padding: 10px;
  background-color: white;
  margin-bottom: 70px;
}
 */`
 const styleElement = document.createElement('style');
 styleElement.innerHTML = styles;
 document.head.appendChild(styleElement);
 
 let unreadMessagesCount = 0;
 let btnClose = 0;
 const audioElement = document.createElement('audio');
  audioElement.src = 'ping-82822.mp3';

  function inputFieldFun() {
    const inputField = document.querySelector('.user-input');
    //console.log(inputField);
    inputField.focus();
  }
  function openForm() {
    btnClose = 0;
    document.getElementById("myForm").style.display = "block";
    const openButton = document.querySelector('.open-button');
    removeRedDotFromButton(openButton);
    const closeButton = document.querySelector('.close-button');
    removeRedDotFromButton(closeButton);

    let unreadMessagesCount = 0;
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
   const notificationSymbol = document.querySelector('.notification-symbol');
   if (unreadMessagesCount > 0) {
     notificationSymbol.textContent = unreadMessagesCount;
     notificationSymbol.classList.add('active');
   } else {
     notificationSymbol.classList.remove('active');
   }
   popupIcon.textContent = '🤖';
   
 }
 function updateCloseButtonIcon() {
   const closeButton = document.querySelector('.close-button');
   const notificationSymbol = document.querySelector('.notification-symbol-close');
   if (unreadMessagesCount > 0 ) {
     notificationSymbol.textContent = unreadMessagesCount;
     notificationSymbol.classList.add('active');
   } else {
     notificationSymbol.classList.remove('active');
   }
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
    //console.log("handle beep called");
    if (message.sender === 'bot' && message.text !== 'typing...' && btnClose === 1) {
      audioElement.play();
      unreadMessagesCount++;
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
    //console.log("Send message");
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
         requestAnimationFrame(() => {
          inputFieldFun();
        });
       } else if (sanitizedUserMessage === 'whoareyou') {
         const botResponse = { text: "I'm a friendly chatbot here to help!", sender: 'bot' };
         state.chatHistory = [...state.chatHistory, botResponse];
         handleBeep(botResponse);
         requestAnimationFrame(() => {
          inputFieldFun();
        });
       } else {
         let foundProduct = null;
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
       }
       state.chatHistory = state.chatHistory.filter((message) => message.sender !== 'bot' || message.text !== 'typing...');
       render();
     }, 5000);
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






