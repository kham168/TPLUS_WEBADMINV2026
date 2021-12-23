import HttpRequest from './http_request'

class ChatProvider extends HttpRequest {
    constructor() {
        // api api
        super('http://128.199.104.34:7000')
    }

    async getChatRoomUnRead() {


        this.setHeader({})
        // example path http://128.199.104.34:7000/this.get()
        const {data} = await this.get('/api/v1/admin/chat?filter=unread')

        return data
    }

    async getChatRoom() {

        this.setHeader({})

        const {data} = await this.get('/api/v1/admin/chat')

        return data
    }

    async getChatRoomOne({chat_room_id}) {

        this.setHeader({})

        const {data} = await this.get('/api/v1/admin/chat/'+chat_room_id)

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