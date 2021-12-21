import HttpRequest from './http_request'


//const token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM3NDc0NTE3LCJleHAiOjE2Mzc0NzgxMTd9.s6MGXug5OwyEDvW6J3xmbCZxGKrAIFllEWk2y0KuIyDHCW8UFL66HZxSBmZASsFuLi_jbrsVofqTeyVv01y7-Gacoq1bFlQnwiGGGVPksyc9_n6Y5VfkK3SgHnve6VyrMLdFA6-e2U24-9W9rzal0nTsQTN0ggt_zuSmVBLjW_kW0aXUfeero0krD08EQexPi9CwZlcJdswhYq1VmkHPExobl2gdLbF8AijfXd09V_jw_RvIZX-_RasAtVn6OY76pLAbOAL2QJwfzoTjhGNfMgvZiSbdEh8X3Ksde8DA7AIv180Gq9BiAY5GbHRv46NcnQvY7CGlZoeodY5Eku0M1g'

class DataPackageProvider extends HttpRequest {
    constructor() {
        // api api
        super('http://128.199.104.34:7000')
    }


    async getDataPackageOne({package_id}) {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({})
        // example path http://128.199.104.34:7000/this.get()
        const {data} = await this.get('/api/v1/packages/' + package_id)

        return data
    }

    async getDataPackage() {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({})
        // example path http://128.199.104.34:7000/this.get()
        const {data} = await this.get('/api/v1/packages')

        return data
    }

    async createDataPackage({
                                code, la_name, en_name, avatar,

                            }) {
        var bodyFormData = new FormData();
        bodyFormData.append('code', code);
        bodyFormData.append('la_name', la_name);
        bodyFormData.append('en_name', en_name);
        bodyFormData.append('avatar[]', avatar[0]);


        this.setHeader({
            'Content-Type': 'multipart/form-data',
        })
        const {data} = await this.create('/api/v1/packages', bodyFormData)


        return data
    }

    async updateDataPackage({
                                package_id, code, la_name, en_name, avatar,
                            }) {
        var bodyFormData = new FormData();
        bodyFormData.append('code', code);
        bodyFormData.append('la_name', la_name);
        bodyFormData.append('en_name', en_name);
        bodyFormData.append('avatar[]', avatar[0]);

        this.setHeader({
            'Content-Type': 'multipart/form-data',
        })

        const {data} = await this.update('/api/v1/packages/' + package_id, bodyFormData)


        return data
    }


    async deleteDataPackage({package_id}) {

        this.setHeader({})

        // example path http://128.199.104.34:7000/this.get()
        const {data} = await this.delete('/api/v1/packages/' + package_id)

        return data
    }
}

export default DataPackageProvider