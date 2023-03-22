
import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const AllUrls =() => {
    const [urls,setUrls] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
       
       if(localStorage.getItem("JWT")!==null||localStorage.getItem('user')!==null){
        axios.get(`http://localhost:5050/api/v1/urls/all-urls/${localStorage.getItem('user')}`,{
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
                            <td>{url.shortUrl}</td>
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