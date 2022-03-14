import HttpRequest from './http_request'


//const token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM3NDc0NTE3LCJleHAiOjE2Mzc0NzgxMTd9.s6MGXug5OwyEDvW6J3xmbCZxGKrAIFllEWk2y0KuIyDHCW8UFL66HZxSBmZASsFuLi_jbrsVofqTeyVv01y7-Gacoq1bFlQnwiGGGVPksyc9_n6Y5VfkK3SgHnve6VyrMLdFA6-e2U24-9W9rzal0nTsQTN0ggt_zuSmVBLjW_kW0aXUfeero0krD08EQexPi9CwZlcJdswhYq1VmkHPExobl2gdLbF8AijfXd09V_jw_RvIZX-_RasAtVn6OY76pLAbOAL2QJwfzoTjhGNfMgvZiSbdEh8X3Ksde8DA7AIv180Gq9BiAY5GbHRv46NcnQvY7CGlZoeodY5Eku0M1g'

class DataPackageProvider extends HttpRequest {
    constructor() {
        // api api
        super()
    }
    async removeSimTypeOne({package_id,simTypeId}) {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({})
        console.log(package_id)
        console.log(simTypeId)
        const {data} = await this.delete("packages/"+package_id+"/simTypes/"+simTypeId)

        return data
    }

    async packageSimTypeOne({package_id}) {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({})

        // example path http://172.28.26.82:7001/this.get()
        const {data} = await this.get("packages-simTypes/"+package_id)

        return data
    }

    async fillSimType({package_id,simTypeId}) {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({})

        let args=[]

        for(let i=0;i<simTypeId.length;i++){
            args.push({
                'simTypeId':simTypeId[i]
            })
        }
        // example path http://172.28.26.82:7001/this.get()
        const {data} = await this.create("packages/"+package_id+"/simTypes",args)

        return data
    }

    async getDataPackageOne({package_id}) {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({})
        // example path http://172.28.26.82:7001/this.get()
        const {data} = await this.get('packages/' + package_id)

        return data
    }

    async getDataPackage() {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({})
        // example path http://172.28.26.82:7001/this.get()
        const {data} = await this.get('packages')

        return data
    }

    async createDataPackage({
                                 code, la_name, en_name, avatar,avatarEN,typePackage_Id,catePackage_Id,detail,detailEN

                            }) {


        const bodyFormData = new FormData();
        bodyFormData.append('code', code);
        bodyFormData.append('name', la_name);
        bodyFormData.append('typePackage_Id', typePackage_Id);
        bodyFormData.append('catePackage_Id', catePackage_Id);
        bodyFormData.append('detail', detail);
        bodyFormData.append('other_lang[0][name]', en_name);
        bodyFormData.append('other_lang[0][language_id]',2);
        bodyFormData.append('other_lang[0][detail]', detailEN);
        bodyFormData.append('avatar', avatar);
        bodyFormData.append('avatar_EN', avatarEN);
        this.setHeader({
            'Content-Type': 'multipart/form-data',
        })
        const {data} = await this.create('packages', bodyFormData)


        return data
    }

    async updateDataPackage({
                                package_id, code, la_name, en_name, avatar,avatarEN,typePackage_Id,catePackage_Id,detail,detailEN
                            }) {

        const bodyFormData = new FormData();
        bodyFormData.append('code', code);
        bodyFormData.append('name', la_name);
        bodyFormData.append('typePackage_Id', typePackage_Id);
        bodyFormData.append('catePackage_Id', catePackage_Id);
        bodyFormData.append('detail', detail);
        bodyFormData.append('other_lang[0][name]', en_name);
        bodyFormData.append('other_lang[0][language_id]',2);
        bodyFormData.append('other_lang[0][detail]', detailEN);
        bodyFormData.append('avatar', avatar);
        bodyFormData.append('avatar_EN', avatarEN);
        this.setHeader({
            'Content-Type': 'multipart/form-data',
        })

        const {data} = await this.update('packages/' + package_id, bodyFormData)


        return data
    }


    async deleteDataPackage({package_id}) {

        this.setHeader({})

        // example path http://172.28.26.82:7001/this.get()
        const {data} = await this.delete('packages/' + package_id)

        return data
    }
}

export default DataPackageProvider