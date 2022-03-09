import HttpRequest from './http_request'

//Sim Type is Real Name
//lazy to change class name

class CateDataPackageProvider extends HttpRequest {
  constructor () {
    // api api
    super()
  }

    async getCateDataPackageOne ({cate_package_id}) {

        this.setHeader({})

        const {data} = await this.get('category-Package/'+cate_package_id)

        return data
    }

    async getCateDataPackageAll () {


        this.setHeader({})

        const {data} = await this.get('category-Package')

        return data
    }

}

export default CateDataPackageProvider