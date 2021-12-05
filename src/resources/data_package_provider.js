import HttpRequest from './http_request'


//const token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM3NDc0NTE3LCJleHAiOjE2Mzc0NzgxMTd9.s6MGXug5OwyEDvW6J3xmbCZxGKrAIFllEWk2y0KuIyDHCW8UFL66HZxSBmZASsFuLi_jbrsVofqTeyVv01y7-Gacoq1bFlQnwiGGGVPksyc9_n6Y5VfkK3SgHnve6VyrMLdFA6-e2U24-9W9rzal0nTsQTN0ggt_zuSmVBLjW_kW0aXUfeero0krD08EQexPi9CwZlcJdswhYq1VmkHPExobl2gdLbF8AijfXd09V_jw_RvIZX-_RasAtVn6OY76pLAbOAL2QJwfzoTjhGNfMgvZiSbdEh8X3Ksde8DA7AIv180Gq9BiAY5GbHRv46NcnQvY7CGlZoeodY5Eku0M1g'

class DataPackageProvider extends HttpRequest {
  constructor () {
    // api api
    super('http://128.199.104.34:7000')
  }



  async getDataPackageOne ({package_id}) {

    //Call setHeader on class HttpRequest and write common header
    //If write Header on class HttpRequest Should call like under method
     this.setHeader({})
   // example path http://128.199.104.34:7000/this.get()
     const {data} = await this.get('/api/v1/packages/'+package_id)
  
     return data
  }

  async getDataPackage () {

    //Call setHeader on class HttpRequest and write common header
    //If write Header on class HttpRequest Should call like under method
     this.setHeader({})
   // example path http://128.199.104.34:7000/this.get()
     const {data} = await this.get('/api/v1/packages')

     return data
  }

  async createDataPackage({
    cate_package_id,
    name,
    description,
    other_lang_name,
    other_lang_description,
    avatar,
    avatar_EN
  })
  {
      var bodyFormData = new FormData();
      bodyFormData.append('catePackageId',cate_package_id);
      bodyFormData.append('name',name);
      bodyFormData.append('description',description);


      bodyFormData.append('other_lang[0][name]',other_lang_name);
      bodyFormData.append('other_lang[0][description]',other_lang_description);
      bodyFormData.append('other_lang[0][language_id]',2);

      for(let i=0;i<avatar.length;i++){
        bodyFormData.append('avatar[]',avatar[i]);
      }
     
      for(let i=0;i<avatar_EN.length;i++){
        bodyFormData.append('avatar_EN[]',avatar_EN);
      }
   
 
    this.setHeader({
      'Content-Type': 'multipart/form-data',
    })
    const {data} = await this.create('/api/v1/packages',bodyFormData)
    

    return data
  }

  async updateDataPackage(
    {
        package_id,
        cate_package_id,
        name,
        description,
        other_lang_name,
        other_lang_description,
        avatar,
        avatar_EN}
    ){
        var bodyFormData = new FormData();
        bodyFormData.append('catePackageId',cate_package_id);
        bodyFormData.append('name',name);
        bodyFormData.append('description',description);
  
  
        bodyFormData.append('other_lang[0][name]',other_lang_name);
        bodyFormData.append('other_lang[0][description]',other_lang_description);
        bodyFormData.append('other_lang[0][language_id]',2);
        for(let i=0;i<avatar.length;i++){
          bodyFormData.append('avatar[]',avatar[i]);
        }
       
        for(let i=0;i<avatar_EN.length;i++){
          bodyFormData.append('avatar_EN[]',avatar_EN);
        }
 
    this.setHeader({
      'Content-Type': 'multipart/form-data',
    })

    const {data} = await this.update('/api/v1/packages/'+package_id,bodyFormData)
  
  
    return data
  }


  async deleteDataPackage ({package_id}) {
 
    this.setHeader({})

   // example path http://128.199.104.34:7000/this.get()
    const {data} = await this.delete('/api/v1/packages/'+package_id)
  
    return data
  }
}

export default DataPackageProvider