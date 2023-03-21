
import axios from "axios";
import React, { useState} from "react";
import { Card } from "react-bootstrap";


const RegistrationPage = () => {


  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [role,setRole] = useState("USER")

  

    const checkLoginDetails = async (e) => {
      e.preventDefault();
      const data ={
        email:email,
        password:password,
        role:role
      }
      const response = await axios.post("http://localhost:5050/api/v1/accounts/auth/register", 
      { ...data
    });
      if (response.status === 200 || response.status === 201) {
        // TODO: Write code for successful login redirection
        console.log("Login Response", response);
      } else {
        console.log(response);
      }
    };

    return (
    <>
    <Card style={{marginLeft:"27.5rem",marginTop:"5rem",width:"35rem",height:"35rem"}}>
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={checkLoginDetails}>
        <Card.Header style={{height:"3rem",textAlign:'center'}}>Sign Up</Card.Header>
        
          <div className="form-group mt-3" style={{margin:"1.5rem"}}>
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              style={{height:"3rem"}}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3" style={{margin:"1.5rem"}}>
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              style={{height:"3rem"}}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3" style={{margin:"1.5rem",height:"3rem"}}>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
           <a href="/">
            <p className="forgot-password text-right mt-2" style={{textAlign:"center"}}> Already Registered?</p></a>

       
        <Card.Header style={{margin:"5rem",border:"0.01rem solid black",borderRadius:"0.5rem",backgroundColor:"white",marginTop:"2.5rem"}}>
          <a href="http://localhost:5050/oauth2/authorization/google" style={{textDecoration:'none'}}>
                    <img src="https://raw.githubusercontent.com/callicoder/spring-boot-react-oauth2-social-login-demo/master/react-social/src/img/google-logo.png"
                    style={{height: "1.2rem",marginLeft: "1rem"} } alt="Google" /> 
                    <p style={{float:"right", marginRight:"6rem"}}>Sign up with Google</p></a>
                   </Card.Header>

                   <Card.Header style={{margin:"5rem",marginTop:"-3rem",border:"0.01rem solid black",borderRadius:"0.5rem",backgroundColor:"white"}}>
                    <a href="http://localhost:5050/oauth2/authorization/github" style={{textDecoration:'none'}}>
                    <img src="https://raw.githubusercontent.com/callicoder/spring-boot-react-oauth2-social-login-demo/master/react-social/src/img/github-logo.png"
                    style={{height: "1.2rem",marginLeft: "1rem"}} alt="Github" /> 
                    <p style={{float:"right",marginRight:"6rem"}}>Sign up with Github</p></a>
                   </Card.Header>
                   </form>
      </div>
    </Card>
    </>
    )
}

export default RegistrationPage