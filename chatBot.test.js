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
  handleUserMessageChange,
  handleKeyPress,
  

} from './chatBot.js';

jest.mock('node-fetch');

describe('fetchProducts', () => {
  it('fetches products from the API', async () => {
    // Mocking the API response
    const mockApiResponse = [{
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
    },];

    // Mocking the fetch function to return the mockApiResponse
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockApiResponse),
      })
    );

    // Call the fetchProducts function with a mock API endpoint
    const apiEndpoint = 'https://dummyjson.com/products/1';
    const products = await fetchProducts(apiEndpoint);
    // Expect the returned products to match the mockApiResponse
    expect(products).toStrictEqual(mockApiResponse)
    global.fetch.mockClear();
    delete global.fetch;
  });
});
 
describe('Chatbot Functions', () => {
 
  
  // handleKeyPress
  test('handleKeyPress calls handleSendMessage on "Enter" key press', () => {
    const state = { userMessage: '', chatHistory: [], products: [] };
    const enterKeyPressEvent = { key: 'Enter' };
    const handleSendMessageMock = jest.fn();
    handleKeyPress(enterKeyPressEvent, state, handleSendMessageMock);
    expect(handleSendMessageMock).toHaveBeenCalled();
  });

  // handlerUserMessage
  test('handleUserMessageChange updates userMessage in the state', () => {
    const state = { userMessage: '', chatHistory: [], products: [] };
    const inputValue = 'Hello, this is a test message';

    const inputEvent = { target: { value: inputValue } };
    handleUserMessageChange(inputEvent, state);
    expect(state.userMessage).toBe('Hello, this is a test message');
  });
  test('addRedDotToButton adds red dot to the button', () => {
    const button = document.createElement('button');
    document.body.appendChild(button);
    addRedDotToButton(button);
    const redDot = button.querySelector('.red-dot');
    expect(redDot).not.toBeNull();
  });

  // RemoveRedDotFromButton Test
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

  // UpdatePopupIcon Test
  test('updatePopupIcon updates the popup icon', () => {
    const popupIcon = document.createElement('span');
    popupIcon.className = 'open-button';
    document.body.appendChild(popupIcon);
    updatePopupIcon();
    expect(popupIcon.textContent).toBe('🤖');
  });

  // UpdateCloseButtonIcon Test
  test('updateCloseButtonIcon updates the close button icon', () => {
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    document.body.appendChild(closeButton);
    updateCloseButtonIcon();
    expect(closeButton.textContent).toBe('❌');
  });

  // HandleBeep Test
  test('handleBeep plays audio and adds red dot', () => {
    const audioElement = document.createElement('audio');
    const playSpy = jest.spyOn(audioElement, 'play');
    const button = document.createElement('button');
    document.body.appendChild(audioElement);
    document.body.appendChild(button);

    const message = { sender: 'bot', text: 'Test message' };
    handleBeep(message, 1, audioElement);

    expect(playSpy).toHaveBeenCalled();
    expect(button.querySelector('.red-dot')).toBeNull();
  });


  // HandleSendMessage Test
  test('handleSendMessage sends a message', async () => {
    const state = { userMessage: 'Hello', chatHistory: [], products: [] };
    const avt = '😊';
    const userMessage = 'Hello';
    const btnClose = 1;
    const audioElement = document.createElement('audio');
    const inputFieldFun = jest.fn();
    const renderFun = jest.fn();
    global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve([]) }));
    await handleSendMessage(state, avt, userMessage, btnClose, audioElement, inputFieldFun, renderFun);
    expect(state.chatHistory.length).toBeGreaterThan(0);
  });
  
  
  // AddWelcomeMessage Test
  test('addWelcomeMessage adds a welcome message', () => {
    const state = { userMessage: '', chatHistory: [], products: [] };
    const renderFun = jest.fn();
    addWelcomeMessage(state, renderFun);

    expect(state.chatHistory.length).toBeGreaterThan(0);
    expect(renderFun).toHaveBeenCalled();
  });

  // CreateChatbox Test
  test('createChatbox creates a chatbox', () => {
    const btncr = '#00FF00';
    createChatbox(btncr);
    const chatbox = document.querySelector('.chat-popup');
    expect(chatbox).not.toBeNull();
  });

  // Render Test
  test('render updates the chatbot UI', () => {
    const state = { userMessage: 'Hello', chatHistory: [], products: [] };
    const btncr = '#00FF00';
    const title = 'Chatbot Title';
    render(state, btncr, title);

    const chatHistoryContainer = document.querySelector('.chat-history-container');
    expect(chatHistoryContainer.scrollTop).toBe(chatHistoryContainer.scrollHeight);
  });

  // InitialState Test
  test('initialState returns the initial state', () => {
    const state = initialState;
    expect(state).toEqual({
      userMessage: '',
      chatHistory: [],
      products: [],
    });
  });
});
