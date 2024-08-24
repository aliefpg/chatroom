const { chats, messages, admin } = require('../db');

const loginadmin = async (request, h) => {
    const { username, password } = request.payload;
    const admins = admin.find(a => a.username === username && a.password === password);
    if (admins) {
        return h.response({ message: 'Login successful' }).code(200);
    }
    return h.response({ error: 'Invalid credentials' }).code(401);
};

const getusers = async (request, h) => {
    const openchats = chats.filter(chat => chat.status === 'open');
    const usernames = [...new Set(openchats.map(chat => chat.username))];
    return h.response(usernames).code(200); 
};

const sendmessages = async (request, h) => {
    const { username, message } = request.payload; // Memperbaiki 'messages' menjadi 'message'
    const chat = chats.find(c => c.username === username && c.status === 'open');
    if (!chat) {
        return h.response({ error: 'Chat not found' }).code(404);
    }
    messages.push({ chatId: chat.id, sender: 'admin', message }); // Mengubah 'messages' menjadi 'message'
    return h.response({ message: 'Message sent' }).code(200);
};

const closechat = async (request, h) => {
    const username = request.params.username;
    const chat = chats.find(c => c.username === username && c.status === 'open');
    if (!chat) {
        return h.response({ error: 'Chat not found' }).code(404);
    }
    chat.status = 'closed';
    return h.response({ message: 'Chat closed successfully' }).code(200); // Memperbaiki pesan respons
};

module.exports = {
    loginadmin,
    getusers,
    sendmessages,
    closechat
};
