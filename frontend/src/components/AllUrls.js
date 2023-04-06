
import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const AllUrls =() => {
    const [urls,setUrls] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        // document.cookie = "user=John"; // update only cookie named 'user'
        // if(jsId != null) {
        //     if (jsId instanceof Array)
        //         jsId = jsId[0].substring(11);
        //     else
        //         jsId = jsId.substring(11);
        // }
       if(localStorage.getItem("JWT")!==null||localStorage.getItem('user')!==null){
        axios.get(`http://ec2-18-236-157-38.us-west-2.compute.amazonaws.com:8080/api/v1/urls/all-urls/${localStorage.getItem('user')}`,{
            'headers': {
                  'Authorization': 'Bearer ' + localStorage.getItem("JWT")
                }
        })
        .then(res=>{
            console.log(res.data)
            if (res.data.length>=0){
                setUrls(res.data)
                console.log(urls)
            }
            else{
                window.alert("Please login again, JWT token expired")
                localStorage.removeItem("JWT")
                localStorage.removeItem("user")
                navigate("/")
            }
            

        })
        .catch(err=>{
            
            console.log(err)
            // localStorage.removeItem("JWT")
            // localStorage.removeItem("user")
        })
    }
    else{
        axios.get("http://ec2-18-236-157-38.us-west-2.compute.amazonaws.com:8080/auth/get-authorized-user")
      .then(res=>{
        console.log(res)
      })
      .catch(err=>console.log(err))
        console.log("No JWT token found, login first!")
        navigate("/")
    }
        
    }, [])


    
    return(
        <>
        <div className="container">
            <h3 className="p-3 text-center">My URLS - A list of all shortened URLs</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Long Url</th>
                        <th>Short Url</th>
                    </tr>
                </thead>
                <tbody>
                    {urls && urls.map(url =>
                        <tr key={url.id}>
                            <td>{url.email}</td>
                            <td>{url.longUrl}</td>

                            <td><a id={url.id} href={url.shortUrl}>{url.shortUrl}</a></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        <button style={{float:"right",marginRight:"5rem",marginTop:"2rem",backgroundColor:"green"}} className="btn btn-secondary"><Link to="/urls" style={{textDecoration:"none",color:"whitesmoke"
    }}>Shorten Another URL</Link></button>
        </>
    )
}

export default AllUrls