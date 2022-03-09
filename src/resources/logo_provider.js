import HttpRequest from './http_request'


//const token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM3NDc0NTE3LCJleHAiOjE2Mzc0NzgxMTd9.s6MGXug5OwyEDvW6J3xmbCZxGKrAIFllEWk2y0KuIyDHCW8UFL66HZxSBmZASsFuLi_jbrsVofqTeyVv01y7-Gacoq1bFlQnwiGGGVPksyc9_n6Y5VfkK3SgHnve6VyrMLdFA6-e2U24-9W9rzal0nTsQTN0ggt_zuSmVBLjW_kW0aXUfeero0krD08EQexPi9CwZlcJdswhYq1VmkHPExobl2gdLbF8AijfXd09V_jw_RvIZX-_RasAtVn6OY76pLAbOAL2QJwfzoTjhGNfMgvZiSbdEh8X3Ksde8DA7AIv180Gq9BiAY5GbHRv46NcnQvY7CGlZoeodY5Eku0M1g'

class LogoProvider extends HttpRequest {
    constructor () {
        // api api
        super()
    }

    async getLogoOne ({logo_id}) {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({})
        // example path http://172.28.26.82:7001/this.get()
        const {data} = await this.get('siteInfo/'+logo_id)

        return data
    }

    async getLogo () {

        //Call setHeader on class HttpRequest and write common header
        //If write Header on class HttpRequest Should call like under method
        this.setHeader({})
        // example path http://172.28.26.82:7001/this.get()
        const {data} = await this.get('siteInfo')

        return data
    }


    async updateLogo(
        {
            logo_id,
            siteName,
            siteNameEn,
            address,
            addressEn,
            phone,
            email,
            facebook,
            description,
            descriptionEn,
            imageFile,
            imageFileEn
        }
    ){
        console.log(email)
        const formData = new FormData();
        formData.append('siteName', siteName);
        formData.append("address", address);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append("facebook", facebook);
        formData.append("description", description);
       formData.append("avatar", imageFile);

            formData.append("avatar_EN", imageFileEn);


            formData.append("other_lang[0][siteName]", siteNameEn);
            formData.append("other_lang[0][description]", descriptionEn)
            formData.append("other_lang[0][address]", addressEn)
            formData.append("other_lang[0][language_id]", 2)


        this.setHeader({
            'Content-Type': 'multipart/form-data',
        })

        const {data} = await this.update('siteInfo/'+logo_id,formData)


        return data
    }



}

export default LogoProvider