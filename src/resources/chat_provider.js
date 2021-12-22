import HttpRequest from './http_request'


//const token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM3NDc0NTE3LCJleHAiOjE2Mzc0NzgxMTd9.s6MGXug5OwyEDvW6J3xmbCZxGKrAIFllEWk2y0KuIyDHCW8UFL66HZxSBmZASsFuLi_jbrsVofqTeyVv01y7-Gacoq1bFlQnwiGGGVPksyc9_n6Y5VfkK3SgHnve6VyrMLdFA6-e2U24-9W9rzal0nTsQTN0ggt_zuSmVBLjW_kW0aXUfeero0krD08EQexPi9CwZlcJdswhYq1VmkHPExobl2gdLbF8AijfXd09V_jw_RvIZX-_RasAtVn6OY76pLAbOAL2QJwfzoTjhGNfMgvZiSbdEh8X3Ksde8DA7AIv180Gq9BiAY5GbHRv46NcnQvY7CGlZoeodY5Eku0M1g'

class ChatProvider extends HttpRequest {
    constructor() {
        // api api
        super('http://128.199.104.34:7000')
    }

    async getChatRoomUnRead({token}) {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({
            //  'Authorization':token
        })
        // example path http://128.199.104.34:7000/this.get()
        const {data} = await this.get('/api/v1/admin/chat?filter=unread')

        return data
    }

    async getChatRoom({token}) {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({
          //  'Authorization':token
        })
        // example path http://128.199.104.34:7000/this.get()
        const {data} = await this.get('/api/v1/admin/chat')

        return data
    }

    async getChatRoomOne({chat_room_id,token}) {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({
          //  'Authorization':token
        })
        // example path http://128.199.104.34:7000/this.get()
        const {data} = await this.get('/api/v1/admin/chat/'+chat_room_id)

        return data
    }

    async getChatRoomClient({token}) {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({
         //   'Authorization':token
        })
        // example path http://128.199.104.34:7000/this.get()
        const {data} = await this.get('/api/v1/chat')

        return data
    }


    async sendMessage({chat_room_id,message,token}) {


        this.setHeader({
            'Content-Type': 'application/x-www-form-urlencoded',
          //  'Authorization':token
        })

        let args={
            'message':message,
            'room_id':chat_room_id
        }

        const {data} = await this.create('/api/v1/admin/chat',args)

        return data
    }

    async sendMessageClient({message,question_id,token}) {

        this.setHeader({
            'Content-Type': 'application/x-www-form-urlencoded',
          //  'Authorization':token
        })

        var args={}

        if(message != ""){
            args={
                'message':message
            }
        }else{
            args={
                'question_id':question_id
            }
        }


        const {data} = await this.create('/api/v1/chat',args)

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