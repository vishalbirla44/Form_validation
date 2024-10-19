import React, { useEffect, useState } from 'react'

const App = () => {
  const prevalue = {username:"",email:'',password:''}
  const [formvalue,setformvalue] = useState(prevalue)
  const [formerror,setformError] = useState({})
  const [isSubmit,setisSubmit] = useState(false)

  const handlechange = (e) => {
    const {name,value} = e.target
    setformvalue({...formvalue,[name]:value})
    // console.log(formvalue)
  }
  const handlesubmit = (e) => {
    e.preventDefault();
    setformError(validation(formvalue))
    setisSubmit(true)
  }

  useEffect(() => {
     console.log(formerror)
     if(Object.keys(formerror).length === 0 && isSubmit){
      console.log(formvalue)
     }
  },[formvalue])

  const validation = (value) => {
    const errors ={}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!value.username){
      errors.username = "username is requerd"
    }
    if(!value.email){
      errors.email = "email is requerd"
    }
    else if (!regex.test(value.email)){
      errors.email = "this si not valide email  "
    }
    if(!value.password){
      errors.password = "password is requerd"
    }
    else if (value.password.length > 10){
      errors.password = " value will be less than 10 cherecters"
    }
   else if (value.password.length < 4) {
    errors.password = " this is less thsn 4 charecters"
   }
    return errors
    
  }  

 
  return (
    <>

{Object.keys(formerror).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify(formvalue, undefined, 2)}</pre>
      )}

    <h1>from validation</h1>

    <form onSubmit={handlesubmit}>
      <input type="text"
      placeholder='enter your username' 
      name='username'
      value={formvalue.username}
      onChange={handlechange}/>
<p>{formerror.username}</p>
    <input type="text"
     placeholder='enter your username'
     name='email'
     value={formvalue.email}
     onChange={handlechange} />
<p>{formerror.email}</p>

     <input type="text"
      placeholder='enter your username'
      name='password'
      value={formvalue.password}
      onChange={handlechange} />
      <p>{formerror.password}</p>
      <button>submit</button>
    </form>
    </>
  )
}

export default App