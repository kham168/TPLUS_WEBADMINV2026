import HttpRequest from './http_request'


//const token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM3NDc0NTE3LCJleHAiOjE2Mzc0NzgxMTd9.s6MGXug5OwyEDvW6J3xmbCZxGKrAIFllEWk2y0KuIyDHCW8UFL66HZxSBmZASsFuLi_jbrsVofqTeyVv01y7-Gacoq1bFlQnwiGGGVPksyc9_n6Y5VfkK3SgHnve6VyrMLdFA6-e2U24-9W9rzal0nTsQTN0ggt_zuSmVBLjW_kW0aXUfeero0krD08EQexPi9CwZlcJdswhYq1VmkHPExobl2gdLbF8AijfXd09V_jw_RvIZX-_RasAtVn6OY76pLAbOAL2QJwfzoTjhGNfMgvZiSbdEh8X3Ksde8DA7AIv180Gq9BiAY5GbHRv46NcnQvY7CGlZoeodY5Eku0M1g'

class PostProvider extends HttpRequest {
  constructor () {
    // api api
    super()
  }



  async getPostOne ({post_id}) {

    //Call setHeader on class HttpRequest and write common header
    //If write Header on class HttpRequest Should call like under method
     this.setHeader({})
   // example path http://128.199.104.34:7000/this.get()


     const {data} = await this.get('posts/'+post_id)

     return data
  }

  async getPost () {

    //Call setHeader on class HttpRequest and write common header
    //If write Header on class HttpRequest Should call like under method
     this.setHeader({})
   // example path http://128.199.104.34:7000/this.get()
     const {data} = await this.get('posts-news')

     return data
  }

  async createPost({

    title,
    description,
    status,
    other_lang_title,
    other_lang_description,
    other_lang_id,
    avatar,
    avatar_EN,
    newsCategoryId

  })
  {
    try{
      var bodyFormData = new FormData();
      bodyFormData.append('postTypeId',2);
      bodyFormData.append('title',title);
      bodyFormData.append('description',description);
      bodyFormData.append('status',status);
      bodyFormData.append('other_lang[0][title]',other_lang_title);
      bodyFormData.append('other_lang[0][description]',other_lang_description);
      bodyFormData.append('other_lang[0][language_id]',other_lang_id);
        bodyFormData.append('avatar[]',avatar);
        bodyFormData.append('avatar_EN[]',avatar_EN);



      for(let i =0;i<newsCategoryId.length;i++){
        bodyFormData.append('newsCategoryId[]',newsCategoryId[i]);

      }
 
    this.setHeader({
      'Content-Type': 'multipart/form-data',
    })
    const {data} = await this.create('posts',bodyFormData)
    

    return data
  }catch(e){
    console.log(e)
  }
  }

  async updatePost(
    {
    post_id,
    title,
    description,
    status,
    other_lang_title,
    other_lang_description,
    other_lang_id,
    avatar,
    avatar_EN,
      newsCategoryId}
    ){

      var bodyFormData = new FormData();
      bodyFormData.append('title',title);
      bodyFormData.append('description',description);
      bodyFormData.append('status',status);
    bodyFormData.append('startDate','');
    bodyFormData.append('endDate','');
      bodyFormData.append('other_lang[0][title]',other_lang_title);
      bodyFormData.append('other_lang[0][description]',other_lang_description);
      bodyFormData.append('other_lang[0][language_id]',other_lang_id);
        bodyFormData.append('avatar[]',avatar);
        bodyFormData.append('avatar_EN[]',avatar_EN);


    for(let i =0;i<newsCategoryId.length;i++){
      bodyFormData.append('newsCategoryId[]',newsCategoryId[i]);

    }
    

 
    this.setHeader({
      'Content-Type': 'multipart/form-data',
    })

    const {data} = await this.update('posts/'+post_id,bodyFormData)
  
  
    return data
  }


  async deletePost ({post_id}) {
 
    this.setHeader({})

   // example path http://128.199.104.34:7000/this.get()
    const {data} = await this.delete('posts/'+post_id)
  
    return data
  }
}

export default PostProvider