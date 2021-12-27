import HttpRequest from './http_request'
const tokenAdmin = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmUiOiI5OTk5OTk5OSIsImlhdCI6MTY0MDUzNDc4NSwiZXhwIjoxNjcyMDkyMzg1fQ.HMKkGNsNXF90BUHLbXf-NbE6tN4Mr4R9C8QOAX86VjAWBIThIzqfx11Q9_JgLKcSQxkN5-VRgoixRSJB88TCjtajuSGfl0WKkPJqbI6K4dpy5Hn70ELYDgsusgb3BwdUcNaTEehUC8bGULLJPJvywpFWsMu0hVChlpmjn9AKaxLOnpj5dl_Gr64Cvb2GkwUfG6s7mZF2rdtDVto-jj53GckFqo-NKFgdfiMFSUnwLj_F0h2EstyQgHPMyH-biCL11WbKjJKHBG_-pUpn03FgDYnLpafAhamFeYd-c3YbLBzdSdst_UOf8yHRAnkgVNt7FyVkMB3rr1UKiJwyw2dJCw'

class ChatProvider extends HttpRequest {
    constructor() {
        // api api
        super('http://128.199.104.34:7000')
    }


    async getChatRoomUnRead() {

        this.setHeader({

        })

        const {data} = await this.get('/api/v1/admin/chat?filter=unread')

        return data
    }

    async getChatRoom({page}) {

        this.setHeader({

        })

        const {data} = await this.get('/api/v1/admin/chat?limit=10&page='+page)

        return data
    }

    async getChatRoomOne({chat_room_id}) {

        this.setHeader({


        })

        const {data} = await this.get('/api/v1/admin/chat/'+chat_room_id+'?limit=100000')

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