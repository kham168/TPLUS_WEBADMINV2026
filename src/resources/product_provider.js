import HttpRequest from './http_request'


//const token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM3NDc0NTE3LCJleHAiOjE2Mzc0NzgxMTd9.s6MGXug5OwyEDvW6J3xmbCZxGKrAIFllEWk2y0KuIyDHCW8UFL66HZxSBmZASsFuLi_jbrsVofqTeyVv01y7-Gacoq1bFlQnwiGGGVPksyc9_n6Y5VfkK3SgHnve6VyrMLdFA6-e2U24-9W9rzal0nTsQTN0ggt_zuSmVBLjW_kW0aXUfeero0krD08EQexPi9CwZlcJdswhYq1VmkHPExobl2gdLbF8AijfXd09V_jw_RvIZX-_RasAtVn6OY76pLAbOAL2QJwfzoTjhGNfMgvZiSbdEh8X3Ksde8DA7AIv180Gq9BiAY5GbHRv46NcnQvY7CGlZoeodY5Eku0M1g'

class ProductProvider extends HttpRequest {
  constructor () {
    // api api
    super()
  }


  async getProductOne ({product_id}) {

    //Call setHeader on class HttpRequest and write common header
    //If write Header on class HttpRequest Should call like under method
     this.setHeader({})
   // example path http://172.28.26.82:7001/this.get()
     const {data} = await this.get('/api/v1/products/'+product_id)
    
     return data
  }

  async getProduct () {

    //Call setHeader on class HttpRequest and write common header
    //If write Header on class HttpRequest Should call like under method
     this.setHeader({})
   // example path http://172.28.26.82:7001/this.get()
     const {data} = await this.get('/api/v1/products')
 
     return data
  }

  async createProduct({
    cate_product_id,
    product_name,
    description,
    other_lang_product_name,
    other_lang_description,
    avatar,
    avatar_EN
  })
  {
      var bodyFormData = new FormData();
  
      for(let i=0;i<cate_product_id.length;i++){
        bodyFormData.append('cateProductId[]',cate_product_id[i]);
      }

      for(let i=0;i<avatar.length;i++){
        bodyFormData.append('avatar[]',avatar[i]);
      }

      // for(let i=0;i<avatar_EN.length;i++){
      //   bodyFormData.append('avatar_EN[]',avatar_EN[i]);
      // }

      bodyFormData.append('productName',product_name);
      bodyFormData.append('description',description);
      bodyFormData.append('other_lang[0][productName]',other_lang_product_name);
      bodyFormData.append('other_lang[0][description]',other_lang_description);
      bodyFormData.append('other_lang[0][language_id]',2);
     

 
    this.setHeader({
      'Content-Type': 'multipart/form-data',
    })
    const {data} = await this.create('/api/v1/products',bodyFormData)
    

    return data
  }

  async updateProduct(
    {
    product_id,
    cate_product_id,
    product_name,
    description,
    other_lang_product_name,
    other_lang_description,
    avatar,
    avatar_EN}
    ){
        var bodyFormData = new FormData();
        for(let i=0;i<cate_product_id.length;i++){
          bodyFormData.append('cateProductId[]',cate_product_id[i]);
        }
  
        for(let i=0;i<cate_product_id.length;i++){
          bodyFormData.append('avatar[]',avatar[i]);
        }
  
        // for(let i=0;i<avatar_EN.length;i++){
        //   bodyFormData.append('avatar_EN[]',avatar_EN[i]);
        // }
  
        bodyFormData.append('productName',product_name);
        bodyFormData.append('description',description);
        bodyFormData.append('other_lang[0][productName]',other_lang_product_name);
        bodyFormData.append('other_lang[0][description]',other_lang_description);
        bodyFormData.append('other_lang[0][language_id]',2);

 
    this.setHeader({
      'Content-Type': 'multipart/form-data',
    })

    const {data} = await this.update('/api/v1/products/'+product_id,bodyFormData)
  
  
    return data
  }


  async deleteProduct ({product_id}) {
 
    this.setHeader({})

   // example path http://172.28.26.82:7001/this.get()
    const {data} = await this.delete('/api/v1/products/'+product_id)
  
    return data
  }
}

export default ProductProvider