const admin = require('../handler/admin');

const adminroute = [
    {
        method: 'POST',
        path: '/admin/login',
        handler: admin.loginadmin
    },
    {
        method: 'GET',
        path: '/admin/users',
        handler: admin.getusers
    },
    {
        method: 'POST',
        path: '/admin/send-messages',
        handler: admin.sendmessages
    },
    {
        method: 'POST',
        path: '/admin/close-chat/{username}',
        handler: admin.closechat
    },
];

module.exports = adminroute;