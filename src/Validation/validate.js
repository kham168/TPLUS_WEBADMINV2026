 const SimpleValidate = (value)=>{
    // console.log("value:"+value);
    return (v) => (v && v.length > 0) || `${value}`;
 },
  EmailValidate = (value) =>{
     return v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || `${value}`
 },
  PassValidate = (value) =>{
   return v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || `${value}`
 },
   MaxlengthValidate = (value,amount) =>{
    return (v) => (v.length < amount) || `${value}${amount}`
  },
  MinlengthValidate =(value,amount) =>{
    return (v) => (v.length > amount) || `${value}${amount}`
  }

export default {
    SimpleValidate,
    EmailValidate,
    PassValidate,
    MaxlengthValidate,
    MinlengthValidate
}