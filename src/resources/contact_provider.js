import HttpRequest from './http_request'


//const token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM3NDc0NTE3LCJleHAiOjE2Mzc0NzgxMTd9.s6MGXug5OwyEDvW6J3xmbCZxGKrAIFllEWk2y0KuIyDHCW8UFL66HZxSBmZASsFuLi_jbrsVofqTeyVv01y7-Gacoq1bFlQnwiGGGVPksyc9_n6Y5VfkK3SgHnve6VyrMLdFA6-e2U24-9W9rzal0nTsQTN0ggt_zuSmVBLjW_kW0aXUfeero0krD08EQexPi9CwZlcJdswhYq1VmkHPExobl2gdLbF8AijfXd09V_jw_RvIZX-_RasAtVn6OY76pLAbOAL2QJwfzoTjhGNfMgvZiSbdEh8X3Ksde8DA7AIv180Gq9BiAY5GbHRv46NcnQvY7CGlZoeodY5Eku0M1g'

class ContactProvider extends HttpRequest {
  constructor () {
    // api api
    super('http://172.28.26.82:7001')
  }

  async getContactOne ({contact_id}) {

    //Call setHeader on class HttpRequest and write common header
    //If write Header on class HttpRequest Should call like under method
     this.setHeader({})
   // example path http://172.28.26.82:7001/this.get()
     const {data} = await this.get('/api/v1/contact/'+contact_id)

     return data
  }
 
  async getContact () {

    //Call setHeader on class HttpRequest and write common header
    //If write Header on class HttpRequest Should call like under method
     this.setHeader({})
   // example path http://172.28.26.82:7001/this.get()
     const {data} = await this.get('/api/v1/contact')

     return data
  }

  async createContact({

    name,
    email,
    title,
    description,
 
   
  
  })
  {
   let arg={
       'name':name,
       'email':email,
       'title':title,
       
       'description':description
   }
 
    this.setHeader({
      'Content-Type': 'application/x-www-form-urlencoded',
    })
    const {data} = await this.create('/api/v1/contact',arg)
    

    return data
  }

  async updateContact(
    {
        contact_id,
        name,
        email,
        title,
        description,
      
    }
    ){
        let arg={
            'name':name,
            'email':email,
            'title':title,
            
            'description':description
        }
 
    this.setHeader({
      'Content-Type': 'application/x-www-form-urlencoded',
    })

    const {data} = await this.update('/api/v1/contact/'+contact_id,arg)
  
  
    return data
  }


  async deleteContact ({contact_id}) {
 
    this.setHeader({})

   // example path http://172.28.26.82:7001/this.get()
    const {data} = await this.delete('/api/v1/contact/'+contact_id)
  
    return data
  }
}

export default ContactProvider