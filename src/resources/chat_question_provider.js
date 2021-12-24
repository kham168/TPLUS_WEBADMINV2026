import HttpRequest from './http_request'


const tokenAdmin = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmUiOiI1MjQxNjM2MiIsImlhdCI6MTYzOTY2NzUwNiwiZXhwIjoxNjcxMjI1MTA2fQ.jOegLlq-FdgkxBYwXF0Kuq5BeSdq_zaxGbiEFFgcFK-avI2MiyY8A7jFXmG3WEYLhJu4jg8X447Wm1k47_23ooEGlBJ-CznndAjqzlOwRjnmA-To7rbGhaN-2K7oqelobE7LkD7AbMEUn_Bt4OmME7KYtghvCrdsZ_eeylzDhvXUFY1oOLyj7FkMFTYjBxL4_lhUy7NBaB7jlRGJDDtcGZ7oK10D1u8On95U5vkgN64pFzPRx7SuFcp6Bz3cs-04A2PZ6CO2bikPCLHSGtmrjqSOKLClJyEP5lVixAXqKcjbQfVOSgnBF8jPk_PfFiSPeC6p1o8Sjm9mKbb-7ylNlg'
const tokenClient1 = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywicGhvbmUiOiI1NTU1NTU1NSIsImlhdCI6MTY0MDA4MTU2MiwiZXhwIjoxNjcxNjM5MTYyfQ.Xp6KNcYO5AjgL6lzrs-9uPhZjlajWZKg-5lvDvJ0IsTRZXnYejoDB6d-X7YRJUNMvuh2Y7zTwXgWHrpVH8YY3ug26U0xPEzDuSMV4gwzb314q2gMljO8BcxO-KujaqSfhbsZmGgbSUZsXqVK5Lxt-Le58fcQVLbGYJcoRszIvIdaAOamD7HteYbAWqmfaiqwZlUNTnU2MrTQMSSpPzdm3xyWruQ3NxsrkDrGyYyRlmSGoAB0-QygyFl681tnz2Qj0IGjg0t4zMtq1Ki4Lfj9UBhT9EtWSEtv8lIo3jtMhv32OladNSm9TWWgbCYtSIpN9nK1P2gmd6EWl5HTlSvXiA";

class ChatQuestionProvider extends HttpRequest {
    constructor() {
        // api api
        super('http://128.199.104.34:7000')
    }


    async getChatQuestionOne({chat_question_id}) {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({
          //  'Authorization':tokenAdmin
        })
        // example path http://128.199.104.34:7000/this.get()
        const {data} = await this.get('/api/v1/question/' + chat_question_id)

        return data
    }

    async getChatQuestion() {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({
          //  'Authorization':tokenClient1
        })
        // example path http://128.199.104.34:7000/this.get()
        const {data} = await this.get('/api/v1/question')

        return data
    }

    async getChatBaseQuestion() {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeaderBaseQuestion({
           // 'Authorization':tokenClient1

        })
        // example path http://128.199.104.34:7000/this.get()
        const {data} = await this.get('/api/v1/baseQuestion')

        return data
    }

    async getChatSubQuestion({chat_question_id}) {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({})
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

           // 'Authorization':tokenAdmin
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
        // let arg = [{
        //     "question": question, "answer": answer, "languageId": "1","image":image
        // }, {
        //     "question": questionEng, "answer": answerEng, "languageId": "2","image":imageEng
        // }]

        this.setHeader({
            'Content-Type': 'application/x-www-form-urlencoded',
           // 'Authorization':tokenAdmin
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