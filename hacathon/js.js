const url = 'https://open-ai21.p.rapidapi.com/claude3';
const options = {
    method: 'POST',
    headers: {
        'x-rapidapi-key': '9c9ea6935dmsh6df8038c4215f8ap10e703jsn6f2883cbf9e7',
        'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
        'Content-Type': 'application/json'
    },
};

document.getElementById('chatbot-header').addEventListener('click', () => {
    const chat = document.getElementById('chat');
    if (chat.style.display === 'none') {
        chat.style.display = 'flex';
        document.getElementById('chatbot').style.height = '600px';
    } else {
        chat.style.display = 'none';
        document.getElementById('chatbot').style.height = '50px';
    }
});

document.getElementById('send-btn').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    if (!userInput.trim()) return;

    const requestBody = {
        messages: [
            {
                role: 'user',
                content: userInput
            }
        ],
        web_access: false
    };

    options.body = JSON.stringify(requestBody);

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const botResponse = result.result;
        displayMessage(userInput, 'user');
        displayMessage(botResponse, 'bot');
    } catch (error) {
        console.error(error);
        displayMessage('Error occurred. Please try again.', 'bot');
    }

    document.getElementById('user-input').value = '';
});

function displayMessage(message, sender) {
    const chat = document.getElementById('chat');
    const messageElement = document.createElement('div');
    messageElement.className = sender === 'user' ? 'user-message' : 'bot-message';
    messageElement.textContent = message;
    chat.appendChild(messageElement);
    chat.scrollTop = chat.scrollHeight;
}