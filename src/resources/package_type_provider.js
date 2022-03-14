import HttpRequest from './http_request'



class PackageTypeProvider extends HttpRequest {
    constructor () {
        // api api
        super()
    }

    async updatePackageTypePriority(
        {
            package_type_id,
            package_id,

        }
    ){

        let object=[];
        for(let i=0 ;i<package_id.length;i++) {
            object.push({"id":package_id[i].package.id})

        }





        this.setHeader({
            'Content-Type': 'application/json'
        })
        const {data} = await this.update('packages-priority/'+package_type_id,object)

        return data
    }

    async getPackageTypePriority ({packageTypeId}) {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({})

        const {data} = await this.get('packages-priority/'+packageTypeId)

        return data
    }

    async getPackageType () {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({})

        const {data} = await this.get('typePackages')

        return data
    }

    async getPackageTypeOne ({packageTypeId}) {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({})
        // example path http://128.199.104.34:7000/this.get()
        const {data} = await this.get('typePackages/'+packageTypeId)

        return data
    }


    async updatePackageType(
        {
            package_type_id,
            avatar,
            avatar_EN
        }
    ){

        const bodyFormData = new FormData();
        bodyFormData.append('avatar',avatar);
        bodyFormData.append('avatar_EN',avatar_EN);
        bodyFormData.append('language_id',2);
        this.setHeader({
            'Content-Type': 'multipart/form-data',
        })
        const {data} = await this.update('typePackages/'+package_type_id,bodyFormData)

        return data
    }



}

export default PackageTypeProvider