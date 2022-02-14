import HttpRequest from './http_request'



class PackageTypeProvider extends HttpRequest {
    constructor () {
        // api api
        super()
    }

    async getPackageType () {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({})
        // example path http://128.199.104.34:7000/this.get()
        const {data} = await this.get('/api/v1/typePackages')

        return data
    }

    async getPackageTypeOne ({packageTypeId}) {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({})
        // example path http://128.199.104.34:7000/this.get()
        const {data} = await this.get('/api/v1/typePackages/'+packageTypeId)

        return data
    }


    async updatePackageType(
        {
            typePackageId,
            avatar,
            avatar_EN}
    ){

        const bodyFormData = new FormData();
        bodyFormData.append('avatar[]',avatar);
        bodyFormData.append('avatar_EN[]',avatar_EN);
        bodyFormData.append('language_id',2);
        this.setHeader({
            'Content-Type': 'multipart/form-data',
        })
        const {data} = await this.update('/api/v1/typePackages/'+typePackageId,bodyFormData)

        return data
    }



}

export default PackageTypeProvider