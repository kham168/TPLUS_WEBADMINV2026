import HttpRequest from './http_request'


//const token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM3NDc0NTE3LCJleHAiOjE2Mzc0NzgxMTd9.s6MGXug5OwyEDvW6J3xmbCZxGKrAIFllEWk2y0KuIyDHCW8UFL66HZxSBmZASsFuLi_jbrsVofqTeyVv01y7-Gacoq1bFlQnwiGGGVPksyc9_n6Y5VfkK3SgHnve6VyrMLdFA6-e2U24-9W9rzal0nTsQTN0ggt_zuSmVBLjW_kW0aXUfeero0krD08EQexPi9CwZlcJdswhYq1VmkHPExobl2gdLbF8AijfXd09V_jw_RvIZX-_RasAtVn6OY76pLAbOAL2QJwfzoTjhGNfMgvZiSbdEh8X3Ksde8DA7AIv180Gq9BiAY5GbHRv46NcnQvY7CGlZoeodY5Eku0M1g'

class CateDataPackageProvider extends HttpRequest {
  constructor () {
    // api api
    super('http://128.199.104.34:7000')
  }


  async getCateDataPackageOne ({cate_package_id}) {

    //Call setHeader on class HttpRequest and write common header
    //If write Header on class HttpRequest Should call like under method
     this.setHeader({})
   // example path http://128.199.104.34:7000/this.get()
     const {data} = await this.get('/api/v1/categoryPackages/'+cate_package_id)
     console.log(data)
     return data
  }

  async getCateDataPackageAll () {

    //Call setHeader on class HttpRequest and write common header
    //If write Header on class HttpRequest Should call like under method
     this.setHeader({})
   // example path http://128.199.104.34:7000/this.get()
     const {data} = await this.get('/api/v1/categoryPackages')
     console.log(data)
     return data
  }

  async createCateDataPackage({

    cate_package_name,
    description,
    other_lang_cate_package_name,
    other_lang_description,
   
  
  })
  {
   let arg={
       'name':cate_package_name,
       'description':description,
       'other_lang':[
         {
        'name':other_lang_cate_package_name,
        'description':other_lang_description,
        'language_id':2,
         }
       ],
     
    
    
   }

   console.log(arg)
 
    this.setHeader({
      'Content-Type': 'application/x-www-form-urlencoded',
    })
    const {data} = await this.create('/api/v1/categoryPackages',arg)

 
   

    return data
  }

  async updateCateDataPackage(
    {
        cate_package_id,
        cate_package_name,
         description,
         other_lang_cate_package_name,
         other_lang_description,
      
    }
    ){
        let arg={

            'name':cate_package_name,
            'description':description,
            'other_lang':[{
             'name':other_lang_cate_package_name,
             'description':other_lang_description,
             'language_id':2,
            }],
  
      
           
           
        }
 
    this.setHeader({
      'Content-Type': 'application/x-www-form-urlencoded',
    })
    const {data} = await this.update('/api/v1/categoryPackages/'+cate_package_id,arg)
  
    return data
  }


  async deleteCateDataPackage ({cate_package_id}) {
 
    this.setHeader({})

   // example path http://128.199.104.34:7000/this.get()
    const {data} = await this.delete('/api/v1/categoryPackages/'+cate_package_id)
  
    return data
  }
}

export default CateDataPackageProvider