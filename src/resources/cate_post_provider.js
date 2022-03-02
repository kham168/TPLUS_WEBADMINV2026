import HttpRequest from './http_request'



class CatePostProvider extends HttpRequest {
  constructor () {
    // api api
    super()
  }


  async getCatePostOne ({cate_post_id}) {

    //Call setHeader on class HttpRequest and write common header
    //If write Header on class HttpRequest Should call like under method
     this.setHeader({})
   // example path http://172.28.26.82:7001/this.get()
     const {data} = await this.get('news-Category/'+cate_post_id)

     return data
  }

  async getCatePostAll () {

    //Call setHeader on class HttpRequest and write common header
    //If write Header on class HttpRequest Should call like under method
     this.setHeader({})
   // example path http://172.28.26.82:7001/this.get()
     const {data} = await this.get('news-Category')

     return data
  }

  async createCatePost({

    cate_post_name,
    priority,
    other_lang_cate_post_name,
 
   
  
  })
  {
   let arg={
       'name':cate_post_name,
      
       'other_lang':[{
        'name':other_lang_cate_post_name,
       
        'language_id':2
       }],
    
   }
 
    this.setHeader({
      'Content-Type': 'application/x-www-form-urlencoded',
    })
    const {data} = await this.create('news-Category',arg)
    

    return data
  }

  async updateCatePost(
    {
        cate_post_id,
        cate_post_name,
        is_active,
        other_lang_cate_post_name,
      
    }
    ){
      let arg={
        'name':cate_post_name,
        //'is_active':is_active,
        'other_lang':[{
         'name':other_lang_cate_post_name,
        
         'language_id':2
        }],

        
      }

    this.setHeader({
      'Content-Type': 'application/x-www-form-urlencoded',
    })

    const {data} = await this.update('news-Category/'+cate_post_id,arg)
  
  
    return data
  }


  async deleteCatePost ({cate_post_id}) {
 
    this.setHeader({})

   // example path http://172.28.26.82:7001/this.get()
    const {data} = await this.delete('news-Category/'+cate_post_id)
  
    return data
  }
}

export default CatePostProvider