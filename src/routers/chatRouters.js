import { loadable } from '../shared/utils';
const pathParrent = '/chatlayout'

const chatRouters = [
    {
        path: pathParrent + '/page/:page_fb_id/:conversation_fb_id',
        component: loadable(() => import('../modules/chat/ChatBody'))
    },
    {
        path: pathParrent + '/chat-container/:page_fb_id/:conversation_fb_id',
        component: loadable(() => import('../modules/chatv2/ChatContainer'))
    },

    
]
export { chatRouters };