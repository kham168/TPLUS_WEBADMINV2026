import HttpRequest from './http_request'

class ChatProvider extends HttpRequest {
    constructor() {
        // api api
        super()
    }

    async searchChatRoom({searchText}) {

        this.setHeader({

        })

        const {data} = await this.get('/api/v1/admin/chat?q='+searchText)

        return data
    }

    async getChatRoomUnRead({page}) {

        this.setHeader({

        })

        const {data} = await this.get('/api/v1/admin/chat?filter=unread&limit=20&page='+page)

        return data
    }

    async getChatRoom({page}) {

        this.setHeader({

        })

        const {data} = await this.get('/api/v1/admin/chat?limit=20&page='+page)

        return data
    }

    async getChatRoomOne({chat_room_id,page}) {

        this.setHeader({


        })

        const {data} = await this.get('/api/v1/admin/chat/'+chat_room_id+'?limit=20&page='+page)

        return data
    }



    async sendMessage({chat_room_id,message}) {


        this.setHeader({
            'Content-Type': 'application/x-www-form-urlencoded',

        })

        let args={
            'message':message,
            'room_id':chat_room_id
        }

        const {data} = await this.create('/api/v1/admin/chat/'+chat_room_id,args)
        return data
    }



    async leaveChatRoom({chat_room_id,roomChannel}) {


        this.setHeader({
            'Content-Type': 'application/x-www-form-urlencoded',
        })

        let args={
            'roomChannel':roomChannel
        }

        const {data} = await this.create('/api/v1/admin/leave/'+chat_room_id,args)

        return data
    }


}

export default ChatProvider