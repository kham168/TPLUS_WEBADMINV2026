import HttpRequest from './http_request'


class SimTypePackageProvider extends HttpRequest {
    constructor () {
        // api api
        super()
    }


    async getSimTypePackage () {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({})
        // example path http://172.28.26.82:7001/this.get()
        const {data} = await this.get('sim-Types')

        return data
    }

    async createSimTypePackage({

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
        const {data} = await this.create('sim-Types',arg)




        return data
    }

    async updateSimTypePackage(
        {
            sim_type_package_id,
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
        const {data} = await this.update('sim-Types/'+sim_type_package_id,arg)

        return data
    }


    async deleteSimTypePackage ({sim_type_package_id}) {

        this.setHeader({})

        // example path http://172.28.26.82:7001/this.get()
        const {data} = await this.delete('sim-Types/'+sim_type_package_id)

        return data
    }
}

export default SimTypePackageProvider