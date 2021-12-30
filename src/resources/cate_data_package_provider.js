import HttpRequest from './http_request'

//Sim Type is Real Name
//lazy to change class name

class CateDataPackageProvider extends HttpRequest {
  constructor () {
    // api api
    super('http://172.28.26.82:7001')
  }



    async getCateDataPackageOne () {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({})
        // example path http://172.28.26.82:7001/this.get()
        const {data} = await this.get('/api/v1/sim-Types')

        return data
    }

  async getCateDataPackageAll () {

    //Call setHeader on class HttpRequest and write common header
    //If write Header on class HttpRequest Should call like under method
     this.setHeader({})
   // example path http://172.28.26.82:7001/this.get()
     const {data} = await this.get('/api/v1/sim-Types')

     return data
  }

  async createCateDataPackage({

    mainProduct,
    description,
   
  
  })
  {
   let arg={
       'mainProduct':mainProduct,
       'detail':description,

   }


 
    this.setHeader({
      'Content-Type': 'application/x-www-form-urlencoded',
    })
    const {data} = await this.create('/api/v1/sim-Types',arg)

 
   

    return data
  }

  async updateCateDataPackage(
    {
        cate_package_id,
        mainProduct,
         description,

      
    }
    ){
        let arg={

            'mainProduct':mainProduct,
            'detail':description,

           
        }
 
    this.setHeader({
      'Content-Type': 'application/x-www-form-urlencoded',
    })
    const {data} = await this.update('/api/v1/sim-Types/'+cate_package_id,arg)
  
    return data
  }


  async deleteCateDataPackage ({cate_package_id}) {
 
    this.setHeader({})

   // example path http://172.28.26.82:7001/this.get()
    const {data} = await this.delete('/api/v1/sim-Types/'+cate_package_id)
  
    return data
  }
}

export default CateDataPackageProvider