import HttpRequest from './http_request'



class ChatQuestionProvider extends HttpRequest {
    constructor() {
        // api api
        //25.10.235.85
        super('http://128.199.104.34:7000')
    }


    async getChatQuestionOne({chat_question_id}) {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({

        })
        // example path http://128.199.104.34:7000/this.get()
        const {data} = await this.get('/api/v1/question/' + chat_question_id)

        return data
    }

    async getChatQuestion() {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({

        })
        // example path http://128.199.104.34:7000/this.get()
        const {data} = await this.get('/api/v1/question')

        return data
    }

    async getChatBaseQuestion() {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeaderBaseQuestion({

        })
        // example path http://128.199.104.34:7000/this.get()
        const {data} = await this.get('/api/v1/baseQuestion')

        return data
    }

    async getChatSubQuestion({chat_question_id}) {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({

        })
        // example path http://128.199.104.34:7000/this.get()
        const {data} = await this.get('/api/v1/baseQuestion/'+chat_question_id+'/sub')

        return data
    }

    async createChatQuestion({

                                 question, answer, questionEng, answerEng,image,imageEng


                             }) {
        let arg = [];

        if(answer == null || answer == ''){
            arg = [{
                "question": question,  "languageId": "1","image":image
            }, {
                "question": questionEng, "languageId": "2","image":imageEng
            }]
        }else{
            arg = [{
                "question": question,"answer":answer,  "languageId": "1"
            }, {
                "question": questionEng,"answer":answerEng,"languageId": "2"
            }]
        }


        this.setHeader({

        })

        console.log(image)

        const {data} = await this.create('/api/v1/question', arg)


        return data
    }

    async createChatSubQuestion({

                                 chat_question_id,question, answer, questionEng, answerEng,image,imageEng


                             }) {
        let arg = [];

        if(answer == null || answer == ''){
            arg = [{
                "question": question,  "languageId": "1","image":image
            }, {
                "question": questionEng, "languageId": "2","image":imageEng
            }]
        }else{
            arg = [{
                "question": question,"answer":answer,  "languageId": "1"
            }, {
                "question": questionEng,"answer":answerEng,"languageId": "2"
            }]
        }

        this.setHeader({
            'Content-Type': 'application/x-www-form-urlencoded',

        })
        const {data} = await this.create('/api/v1/question/'+chat_question_id+'/newSub', arg)


        return data
    }


    async updateChatQuestion({
                                 chat_question_id,question, answer, questionEng, answerEng,image,imageEng

                             }) {
        let arg=[];

        if(answer == null || answer == ''){
            arg = [{
                "question": question,  "languageId": "1","image":image
            }, {
                "question": questionEng, "languageId": "2","image":imageEng
            }]
        }else{
            arg = [{
                "question": question,"answer":answer,  "languageId": "1"
            }, {
                "question": questionEng,"answer":answerEng,"languageId": "2"
            }]
        }


        this.setHeader({
            'Content-Type': 'application/x-www-form-urlencoded',

        })

        const {data} = await this.update('/api/v1/question/' + chat_question_id, arg)


        return data
    }


    async deleteChatQuestion({chat_question_id}) {

        this.setHeader({
           // 'Authorization':tokenAdmin
        })

        // example path http://128.199.104.34:7000/this.get()
        const {data} = await this.delete('/api/v1/question/' + chat_question_id)

        return data
    }
}

export default ChatQuestionProvider