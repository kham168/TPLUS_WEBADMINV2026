import HttpRequest from './http_request'


//const token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM3NDc0NTE3LCJleHAiOjE2Mzc0NzgxMTd9.s6MGXug5OwyEDvW6J3xmbCZxGKrAIFllEWk2y0KuIyDHCW8UFL66HZxSBmZASsFuLi_jbrsVofqTeyVv01y7-Gacoq1bFlQnwiGGGVPksyc9_n6Y5VfkK3SgHnve6VyrMLdFA6-e2U24-9W9rzal0nTsQTN0ggt_zuSmVBLjW_kW0aXUfeero0krD08EQexPi9CwZlcJdswhYq1VmkHPExobl2gdLbF8AijfXd09V_jw_RvIZX-_RasAtVn6OY76pLAbOAL2QJwfzoTjhGNfMgvZiSbdEh8X3Ksde8DA7AIv180Gq9BiAY5GbHRv46NcnQvY7CGlZoeodY5Eku0M1g'

class CateProductProvider extends HttpRequest {
  constructor () {
    // api api
    super('http://172.28.26.82:7001')
  }


  async getCateProductOne ({cate_product_id}) {

    //Call setHeader on class HttpRequest and write common header
    //If write Header on class HttpRequest Should call like under method
     this.setHeader({})
   // example path http://172.28.26.82:7001/this.get()
     const {data} = await this.get('/api/v1/categoryProducts/'+cate_product_id)

     return data
  }

  async getCateProduct () {

    //Call setHeader on class HttpRequest and write common header
    //If write Header on class HttpRequest Should call like under method
     this.setHeader({})
   // example path http://172.28.26.82:7001/this.get()
     const {data} = await this.get('/api/v1/categoryProducts')

     return data
  }

  async createCateProduct({

    cate_product_name,
    description,
    other_lang_cate_product_name,
    other_lang_description,
 
  })
  {
   let arg={
       'cateName':cate_product_name,
       'description':description,
       'other_lang':[{
        'cateName':other_lang_cate_product_name,
        'description':other_lang_description,
        'language_id':2
       }],
      
   }
 
    this.setHeader({
      'Content-Type': 'application/x-www-form-urlencoded',
    })
    const {data} = await this.create('/api/v1/categoryProducts',arg)
    

    return data
  }

  async updateCateProduct(
    {
        cate_product_id,
        cate_product_name,
        description,
        other_lang_cate_product_name,
        other_lang_description,
      
    }
    ){
      let arg={
        'cateName':cate_product_name,
        'description':description,
        'other_lang':[{
         'cateName':other_lang_cate_product_name,
         'description':other_lang_description,
         'language_id':2
        }],
       
    }
 
    this.setHeader({
      'Content-Type': 'application/x-www-form-urlencoded',
    })

    const {data} = await this.update('/api/v1/categoryProducts/'+cate_product_id,arg)
  
  
    return data
  }


  async deleteCateProduct ({cate_product_id}) {
 
    this.setHeader({})

   // example path http://172.28.26.82:7001/this.get()
    const {data} = await this.delete('/api/v1/categoryProducts/'+cate_product_id)
  
    return data
  }
}

export default CateProductProvider