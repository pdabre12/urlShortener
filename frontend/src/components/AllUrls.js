
import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import getLocalStorageItemWithExpiry from "../util/getLocalStorage";



const AllUrls =() => {
    const [urls,setUrls] = useState([]);
    const navigate = useNavigate();
    const [cookies,setCookie,removeCookie] = useCookies(['token','user'])

    useEffect(() => {
            if(!getLocalStorageItemWithExpiry("user")||!getLocalStorageItemWithExpiry("token")){
                navigate("/")
              }
        // }
       console.log(getLocalStorageItemWithExpiry("user"))
        axios.get(`${process.env.REACT_APP_SERVER}/api/v1/urls/all-urls/${getLocalStorageItemWithExpiry("user")}`,{
            'headers': {
                  'Authorization': 'Bearer ' + getLocalStorageItemWithExpiry("token")
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
            
                navigate("/")
            }
            

        })
        .catch(err=>{
            console.log(err)
        
        })
    
    
        
    }, [])


    
    return(
        <>
        <div className="container">
            <h3 className="p-3 text-center">My URLS - A list of all shortened URLs</h3>
            {urls &&
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
}
        </div>
                    
        <button style={{float:"right",marginRight:"5rem",marginTop:"2rem",backgroundColor:"green"}} className="btn btn-secondary"><Link to="/urls" style={{textDecoration:"none",color:"whitesmoke"
    }}>Shorten Another URL</Link></button>
        </>
    )
}

export default AllUrls