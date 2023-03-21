
import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const AllUrls =() => {
    const [urls,setUrls] = useState([]);
    useEffect(() => {
       let  email = 'pdabre12@gmail.com'
        axios.get(`http://localhost:5050/api/v1/urls/${email}`)
        .then(res=>{
            setUrls(res.data)
            console.log(res.data)
            console.log(urls)

        })
        .catch(err=>{
            console.log(err)
        })
        
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