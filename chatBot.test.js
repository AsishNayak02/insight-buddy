// chatbot.test.js
import {
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
  initialState,
} from './chatBot.js';

// Mocking fetch for testing fetchProducts function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

describe('Chatbot Functions', () => {
  test('addRedDotToButton adds red dot to the button', () => {
    const button = document.createElement('button');
    document.body.appendChild(button);
    addRedDotToButton(button);
    const redDot = button.querySelector('.red-dot');
    expect(redDot).not.toBeNull();
  });

  test('removeRedDotFromButton removes red dot from the button', () => {
    const button = document.createElement('button');
    const redDot = document.createElement('div');
    redDot.className = 'red-dot';
    button.appendChild(redDot);
    document.body.appendChild(button);
    removeRedDotFromButton(button);
    const removedRedDot = button.querySelector('.red-dot');
    expect(removedRedDot).toBeNull();
  });

  test('updatePopupIcon updates the popup icon', () => {
    const popupIcon = document.createElement('span');
    popupIcon.className = 'open-button';
    document.body.appendChild(popupIcon);
    updatePopupIcon();
    expect(popupIcon.textContent).toBe('🤖');
  });

  test('updateCloseButtonIcon updates the close button icon', () => {
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    document.body.appendChild(closeButton);
    updateCloseButtonIcon();
    expect(closeButton.textContent).toBe('❌');
  });

  test('handleBeep plays audio and adds red dot', () => {
    const audioElement = document.createElement('audio');
    const button = document.createElement('button');
    document.body.appendChild(audioElement);
    document.body.appendChild(button);

    const message = { sender: 'bot', text: 'Test message' };
    handleBeep(message, 1, audioElement);

    expect(audioElement.play).toHaveBeenCalled();
    expect(button.querySelector('.red-dot')).not.toBeNull();
  });

  test('fetchProducts fetches products', async () => {
    const apiEndpoint = 'https://example.com/products';
    const products = await fetchProducts(apiEndpoint);
    expect(products).toEqual([
      { id: 1, title: 'Product1', price: 10 },
      { id: 2, title: 'Product2', price: 20 },
    ]);
  });

  test('handleSendMessage sends a message', () => {
    const state = { userMessage: 'Hello', chatHistory: [], products: [] };
    const avt = '😊';
    const userMessage = 'Hello';
    const btnClose = 1;
    const audioElement = document.createElement('audio');
    const inputFieldFun = jest.fn();
    const renderFun = jest.fn();
    handleSendMessage(state, avt, userMessage, btnClose, audioElement, inputFieldFun, renderFun);

    // Add assertions based on the expected behavior of handleSendMessage
    expect(state.chatHistory.length).toBeGreaterThan(0);
    expect(renderFun).toHaveBeenCalled();
  });

  test('addWelcomeMessage adds a welcome message', () => {
    const state = { userMessage: '', chatHistory: [], products: [] };
    const renderFun = jest.fn();
    addWelcomeMessage(state, renderFun);

    // Add assertions based on the expected behavior of addWelcomeMessage
    expect(state.chatHistory.length).toBeGreaterThan(0);
    expect(renderFun).toHaveBeenCalled();
  });

  test('createChatbox creates a chatbox', () => {
    const btncr = '#00FF00'; // Replace with the desired button color
    createChatbox(btncr);

    // Add assertions based on the expected structure of the chatbox
    const chatbox = document.querySelector('.chat-popup');
    expect(chatbox).not.toBeNull();
  });

  test('render updates the chatbot UI', () => {
    const state = { userMessage: 'Hello', chatHistory: [], products: [] };
    const btncr = '#00FF00'; // Replace with the desired button color
    const title = 'Chatbot Title'; // Replace with the desired title
    render(state, btncr, title);

    // Add assertions based on the expected UI changes
    const chatHistoryContainer = document.querySelector('.chat-history-container');
    expect(chatHistoryContainer.scrollTop).toBe(chatHistoryContainer.scrollHeight);
  });

  test('initialState returns the initial state', () => {
    const state = initialState;
    // Add assertions based on the expected initial state
    expect(state).toEqual({
      userMessage: '',
      chatHistory: [],
      products: [],
    });
  });
});
