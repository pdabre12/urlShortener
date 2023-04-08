
import axios from "axios";
import React, { useEffect, useState} from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import getLocalStorageItemWithExpiry from "../util/getLocalStorage";
import setLocalStorageItemWithExpiry from "../util/setlocalStorage";
import { useGoogleLogin } from "@react-oauth/google";

const RegistrationPage = () => {


  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [role,setRole] = useState("USER")
  const navigate = useNavigate();
  const [ user, setUser ] = useState([]);
    const [accessToken,setAccessToken] = useState("");
    const [errors,setErrors] = useState("");
    var uemail =""
  
    useEffect(() => {
      if(getLocalStorageItemWithExpiry("user")&&getLocalStorageItemWithExpiry("token")){
        navigate("/myurls")
      }
      console.log(user)
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    console.log(res)
                    uemail =  res.data.email;
                    const data = {
                      email:uemail,
                      password:"",
                      role:"USER"
                  }
                  return data
                    
                    
                })
                .then((res)=>{
                  axios.post(process.env.REACT_APP_SERVER+"/auth/get-jwt-token",{
                    ...res
                })
                .then(res=>{
                    console.log(res);
                    
                    setLocalStorageItemWithExpiry("token",res.data.token, 86400)
                    setLocalStorageItemWithExpiry("user",res.data.email, 86400)
                    
                    if(getLocalStorageItemWithExpiry("token")&&getLocalStorageItemWithExpiry('user')){
                      navigate("/myurls")}
  
                    
                    
                })
                .catch(err=>{
                    console.log(err);
                })

                })
                .catch((err) => console.log(err));

            
            
        }
    },
    [user]
);
  
    const checkLoginDetails = async (e) => {
      e.preventDefault();
      const data ={
        email:email,
        password:password,
        role:role
      }
      console.log(process.env.REACT_APP_SERVER)
      const response = await axios.post(`${process.env.REACT_APP_SERVER}/auth/register`, 
      { ...data,
        // 'headers': {
        //   'Authorization': 'Bearer ' + jwtStr
        // }
    });
      if (response.status === 200 || response.status === 201) {
        // TODO: Write code for successful login redirection
        console.log("Login Response", response.data);
        setLocalStorageItemWithExpiry("JWT",response.data,86400)
        setLocalStorageItemWithExpiry("user",email,86400)
        setRole("USER")
        if (getLocalStorageItemWithExpiry("user")&&getLocalStorageItemWithExpiry('token')){
          navigate("/myurls")
        }
      } else {
        console.log(response.data);
        setErrors(response.data)
  
      }
      
    };
    const oauth2login = useGoogleLogin({
      onSuccess: (codeResponse) => {
        console.log(codeResponse)
          setUser(codeResponse)
          console.log(user)
          setAccessToken(codeResponse.access_token)
      }
          ,
      onError: (error) => console.log('Login Failed:', error)
  });


    return (
      <div class="container" style={{width:"75%",marginTop:"5%"}}>
      <Card>
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={checkLoginDetails}>
        <Card.Header style={{height:"3rem",textAlign:'center'}}>Sign Up</Card.Header>
        <p style={{color:"red",marginLeft:"2rem"}}>{errors}</p>
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

            </form>
        <Card.Header style={{margin:"auto",border:"0.01rem solid black",marginBottom:"5%",borderRadius:"0.5rem",backgroundColor:"white",width:"75%"}}>
          <button onClick={()=>oauth2login()} 
          style={{border:"0px solid black",backgroundColor:"white",cursor:"pointer",width:"100%",height:"100%"}}>
                    <img src="https://raw.githubusercontent.com/callicoder/spring-boot-react-oauth2-social-login-demo/master/react-social/src/img/google-logo.png"
                    style={{height: "2rem"} } alt="Google" /> 
                    <p style={{marginLeft:"0.2%"}}>Log In with Google</p></button>
                   </Card.Header>
        

                   {/* <Card.Header style={{margin:"5rem",marginTop:"-3rem",border:"0.01rem solid black",borderRadius:"0.5rem",backgroundColor:"white"}}>
                   <a href={`${process.env.REACT_APP_SERVER}/oauth2/authorization/google`} style={{textDecoration:'none'}}>
                    <img src="https://raw.githubusercontent.com/callicoder/spring-boot-react-oauth2-social-login-demo/master/react-social/src/img/github-logo.png"
                    style={{height: "1.2rem",marginLeft: "1rem"}} alt="Github" /> 
                    <p style={{float:"right",marginRight:"6rem"}}>Sign up with Github</p></a>
                   </Card.Header>
                   </form> */}
      </div>
    </Card>
</div>    )
}

export default RegistrationPage