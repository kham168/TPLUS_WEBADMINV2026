import HttpRequest from './http_request'

class PostProvider extends HttpRequest {
  constructor () {
    // api api
    super('https://jsonplaceholder.typicode.com')
  }

  async getPost () {
    // example path https://api.myjson.com/bins/17k39m/this.get()
    const {data} = await this.get('/posts')
    return data
  }

  async createPost(title,body,userId){
    let obj={
      title:title,
      body:body,
      userId:userId
    }
    const {data} = await this.create('/posts',obj)
    console.log(data);
    return data
  }
}

export default PostProvider