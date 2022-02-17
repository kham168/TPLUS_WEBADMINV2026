
import axios from 'axios'
import User from "@/store/User";
import Store from '@/store/index';
import i18n from '@/i18n'
import Router from '@/router';





class HttpRequest {
//http://172.28.26.82:7001
  //http://25.10.235.85:7000
  //api 
  constructor (url = process.env.VUE_APP_BASE_SOCKET) {
    // this.axios = axios
    this.axiosInstance = axios.create({
      baseURL: url,
      timeout: 120000
    })

    this.axiosInstance.interceptors.request.use(function (config) {
      // Do something before request is sent

      return config
    }, function (error) {
      // Do something with request error


      return Promise.reject(error)
    })

    // Add a response interceptor
    this.axiosInstance.interceptors.response.use(function (response) {
      // Do something with response data
       console.log("response status:"+response.status)
      console.log("response body:")
      console.log(response)

       if(response.config.method=="post" && response.status == 200 || response.status == 201){
        setTimeout(() => {
          Store.dispatch({
          type:"action_Notifi_Success",
          message:i18n.tc('Notification.saveDataSuccess')
        })
       }, 300);

        if(response.data.message=="Updated order banner successfully"){

        }else if(response.config.url == `/api/v1/admin/chat/${response.data.message.chat_room_id}`) {

        }else if(response.data.message=="Updated new position topping successfully."){

        }
        else {
          Router.back();

        }

      }else if(response.config.method=="put" && response.status == 200){

        setTimeout(() => {
          Store.dispatch({
          type:"action_Notifi_Success",
          message:i18n.tc('Notification.editDataSuccess')
        })
       }, 300);

        if(response.data.message==`Updated priority package type ID:${response.data.data.id} success`){

         }else{
          Router.back();
        }

      }else if(response.config.method=="delete" && response.status == 200){
        setTimeout(() => {
          Store.dispatch({
          type:"action_Notifi_Success",
          message:i18n.tc('Notification.delDataSuccess')
        })
       }, 300);
       Store.commit("modalDelete_State", false);
      }
      return response
    }, function (error) {
      // Do something with response error
 
      console.log(error.response.data);
      console.log("Error response status:"+error.response.status);
      console.log(error.response.headers);

      return Promise.reject(error)
    })
  }

  setHeader (header) {
    // this.axiosInstance.defaults.headers.common[header.key] = header.value
    this.axiosInstance.defaults.headers.common = header
     this.axiosInstance.defaults.headers.common['Authorization'] = 'Bearer '+User.state.token
      this.axiosInstance.defaults.headers.common['content_language'] = 'en'
    this.axiosInstance.defaults.headers.common['Accept'] = 'application/json'
    this.axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  setHeaderBaseQuestion (header) {
    // this.axiosInstance.defaults.headers.common[header.key] = header.value
    this.axiosInstance.defaults.headers.common = header
    this.axiosInstance.defaults.headers.common['Authorization'] = 'Bearer '+User.state.token
    this.axiosInstance.defaults.headers.common['content_language'] = localStorage.getItem('lang')
    this.axiosInstance.defaults.headers.common['Accept'] = 'application/json'
    this.axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  }

  get (methodName, data) {
    return this.axiosInstance.get(methodName, {
      params: data
    })
  }

  create (methodName, data) {
    return this.axiosInstance.post(methodName, data)
  }

  update (methodName, data) {
    
    return this.axiosInstance.put(methodName, data)
  }

  delete (methodName, param, data) {
    return this.axiosInstance.delete(methodName, {
      params: param,
      data: data
    })
  }

  request (type, url, data) {
    let promise = null
    switch (type) {
      case 'GET': promise = axios.get(url, { params: data }); break
      case 'POST': promise = axios.post(url, data); break
      case 'PUT': promise = axios.put(url, data); break
      case 'DELETE': promise = axios.delete(url, data); break
      default : promise = axios.get(url, { params: data }); break
    }
    return promise
  }
}

export default HttpRequest
