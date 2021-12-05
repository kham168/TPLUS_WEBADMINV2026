import HttpRequest from './http_request'


//const token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM3NDc0NTE3LCJleHAiOjE2Mzc0NzgxMTd9.s6MGXug5OwyEDvW6J3xmbCZxGKrAIFllEWk2y0KuIyDHCW8UFL66HZxSBmZASsFuLi_jbrsVofqTeyVv01y7-Gacoq1bFlQnwiGGGVPksyc9_n6Y5VfkK3SgHnve6VyrMLdFA6-e2U24-9W9rzal0nTsQTN0ggt_zuSmVBLjW_kW0aXUfeero0krD08EQexPi9CwZlcJdswhYq1VmkHPExobl2gdLbF8AijfXd09V_jw_RvIZX-_RasAtVn6OY76pLAbOAL2QJwfzoTjhGNfMgvZiSbdEh8X3Ksde8DA7AIv180Gq9BiAY5GbHRv46NcnQvY7CGlZoeodY5Eku0M1g'

class BannerProvider extends HttpRequest {
  constructor () {
    // api api
    super('http://128.199.104.34:7000')
  }


  async getBannerOne ({banner_id}) {

    //Call setHeader on class HttpRequest and write common header
    //If write Header on class HttpRequest Should call like under method
     this.setHeader({})
   // example path http://128.199.104.34:7000/this.get()
     const {data} = await this.get('/api/v1/banner/'+banner_id)
 
     return data
  }

  async getBanner () {

    //Call setHeader on class HttpRequest and write common header
    //If write Header on class HttpRequest Should call like under method
     this.setHeader({})
   // example path http://128.199.104.34:7000/this.get()
     const {data} = await this.get('/api/v1/banner')
 
     return data
  }

  async createBanner({
    ban_name,
    link,
    description,

    other_lang_ban_name,
    other_lang_link,
    other_lang_description,

    avatar,
    avatar_EN
  })
  {
    console.log(avatar)
    console.log(avatar_EN)
      var bodyFormData = new FormData();
      bodyFormData.append('banName',ban_name);
      bodyFormData.append('link',link);
      bodyFormData.append('description',description);
      bodyFormData.append('other_lang[0][banName]',other_lang_ban_name);
      bodyFormData.append('other_lang[0][link]',other_lang_link);
      bodyFormData.append('other_lang[0][description]',other_lang_description);
      bodyFormData.append('other_lang[0][language_id]',2);

      for(let i =0;i<avatar.length;i++){
        bodyFormData.append('avatar[]',avatar[i]);
      }

      for(let i =0;i<avatar_EN.length;i++){
        bodyFormData.append('avatar_EN[]',avatar_EN[i]);
      }
    
     
 
    this.setHeader({
      'Content-Type': 'multipart/form-data',
    })
    const {data} = await this.create('/api/v1/banner',bodyFormData)
    

    return data
  }

  async updateBanner(
    {
    ban_id,
    ban_name,
    link,
    description,

    other_lang_ban_name,
    other_lang_link,
    other_lang_description,

    avatar,
    avatar_EN}
    ){
      console.log(avatar)
      console.log(avatar_EN)
        var bodyFormData = new FormData();
        bodyFormData.append('banName',ban_name);
        bodyFormData.append('link',link);
        bodyFormData.append('description',description);
        bodyFormData.append('other_lang[0][banName]',other_lang_ban_name);
        bodyFormData.append('other_lang[0][link]',other_lang_link);
        bodyFormData.append('other_lang[0][description]',other_lang_description);
        bodyFormData.append('other_lang[0][language_id]',2);
        for(let i =0;i<avatar.length;i++){
          bodyFormData.append('avatar[]',avatar[i]);
        }
  
        for(let i =0;i<avatar_EN.length;i++){
          bodyFormData.append('avatar_EN[]',avatar_EN[i]);
        }
 
    this.setHeader({
      'Content-Type': 'multipart/form-data',
    })

    const {data} = await this.update('/api/v1/banner/'+ban_id,bodyFormData)
  
  
    return data
  }


  async deleteBanner ({ban_id}) {
    console.log('ban_id:')
 
    this.setHeader({})

   // example path http://128.199.104.34:7000/this.get()
    const {data} = await this.delete('/api/v1/banner/'+ban_id)
  
    return data
  }
}

export default BannerProvider