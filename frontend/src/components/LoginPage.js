
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
      if (localStorage.getItem("JWT")!==null||localStorage.getItem("user")!==null){
        navigate("/myurls")
      }
    },[])

    const handleLogin = async (e) => {
      e.preventDefault();
      const data ={
        email:email,
        password:password,
      }
      const response = await axios.post("http://localhost:5050/api/v1/auth/login", 
      { ...data,
   
    });
      if (response.status === 200 || response.status === 201) {
        // TODO: Write code for successful login redirection
        console.log("Login Response", response.data);
        localStorage.setItem("JWT",response.data)
        localStorage.setItem("user",email)

        console.log(localStorage.getItem('user'))
        if (localStorage.getItem("JWT")!==null||localStorage.getItem("user")!==null){
            navigate("/myurls") 
        }
      } else {
        window.alert("Login Failed! Please try again..")
        console.log(response);
      }
      
    };


    return (
    <>
    <Card style={{marginLeft:"27.5rem",marginTop:"5rem",width:"35rem",height:"35rem"}}>
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleLogin}>
        <Card.Header style={{height:"3rem",textAlign:'center'}}>Log In</Card.Header>
        
          <div className="form-group mt-3" style={{margin:"1.5rem",marginTop:"3rem"}}>
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
              value={password}
              style={{height:"3rem"}}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3" style={{margin:"1.5rem",height:"3rem"}}>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
           <a href="/signup">
            <p className="forgot-password text-right mt-2" style={{textAlign:"center"}}> Not Registered yet?</p></a>

       
        <Card.Header style={{margin:"5rem",border:"0.01rem solid black",borderRadius:"0.5rem",backgroundColor:"white",marginTop:"2.5rem"}}>
          <a href="http://localhost:5050/oauth2/authorization/google" style={{textDecoration:'none'}}>
                    <img src="https://raw.githubusercontent.com/callicoder/spring-boot-react-oauth2-social-login-demo/master/react-social/src/img/google-logo.png"
                    style={{height: "1.5rem",marginLeft: "1rem"} } alt="Google" /> 
                    <p style={{float:"right", marginRight:"6rem"}}>Log In with Google</p></a>
                   </Card.Header>

                   <Card.Header style={{margin:"5rem",marginTop:"-3rem",border:"0.01rem solid black",borderRadius:"0.5rem",backgroundColor:"white"}}>
                    <a href="http://localhost:5050/oauth2/authorization/github" style={{textDecoration:'none'}}>
                    <img src="https://raw.githubusercontent.com/callicoder/spring-boot-react-oauth2-social-login-demo/master/react-social/src/img/github-logo.png"
                    style={{height: "1.2rem",marginLeft: "1rem"}} alt="Github" /> 
                    <p style={{float:"right",marginRight:"6rem"}}>Log In with Github</p></a>
                   </Card.Header>
                   </form>
      </div>
    </Card>
    </>
    )
}