document.getElementById('send-btn').addEventListener('click', () => {
    sendMessage();
});

document.getElementById('user-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput) {
        addMessageToChat(userInput, 'user');
        document.getElementById('user-input').value = '';
        fetchResponse(userInput);
    }
}

function addMessageToChat(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender);

    const messageContent = document.createElement('div');
    messageContent.classList.add(sender === 'user' ? 'usuario-msg' : 'bot-message');
    messageContent.textContent = message;

    messageElement.appendChild(messageContent);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTypingIndicator() {
    const chatBox = document.getElementById('chat-box');
    const typingIndicator = document.createElement('div');
    typingIndicator.id = 'typing-indicator';
    typingIndicator.classList.add('bot');
    
    const typingMessage = document.createElement('div');
    typingMessage.classList.add('bot-message');

    const typingDots = document.createElement('div');
    typingDots.classList.add('typing-dots');
    typingDots.innerHTML = '<div></div><div></div><div></div>';

    typingMessage.appendChild(typingDots);
    typingIndicator.appendChild(typingMessage);
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

async function fetchResponse(userInput) {
    showTypingIndicator();
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer chavedaAPI aqui`
            },
            body: JSON.stringify({
                model: "gpt-4",  // Substitua pelo modelo que você está usando, se necessário
                messages: [{ role: "user", content: userInput }],
                max_tokens: 150
            })
        });

        if (!response.ok) {
            console.error('Erro na resposta da API:', response.statusText, await response.text());
            addMessageToChat('Erro ao se comunicar com a API. Por favor, tente novamente mais tarde.', 'bot');
            removeTypingIndicator();
            return;
        }

        const data = await response.json();
        const botReply = data.choices[0].message.content.trim();
        removeTypingIndicator();
        addMessageToChat(botReply, 'bot');
    } catch (error) {
        console.error('Erro na solicitação:', error);
        removeTypingIndicator();
        addMessageToChat('Erro ao se comunicar com a API. Por favor, tente novamente mais tarde.', 'bot');
    }
}
