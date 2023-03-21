
import axios from "axios";
import React, { useState } from "react";
import { Card,ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";


const MainPage = () =>  {
    const [shortUrl,setShortUrl] = useState("");
    const [longUrl,setLongUrl] = useState("");


   async function LongToShortURL(e) {
                
        e.preventDefault();
        const data = {
            longUrl : longUrl,
            email: "pdabre12@gmail.com",
            
        }
        console.log(data);
        const response = await axios.post("http://localhost:5050/api/v1/urls/",{
            ...data
    });
        if (response.status === 200 || response.status === 201){
            console.log(response)
            setShortUrl(response.data.shortUrl);

        }
        else{
            console.log(response);
        }
    }
  
    return (
    <>
    <button style={{marginLeft:"75%",marginTop:"5rem",backgroundColor:"green"}} className="btn btn-secondary"><Link to="/myurls" style={{textDecoration:"none",color:"whitesmoke"
    }}>My URLs</Link></button>
    <Card style={{marginLeft:"27.5rem",marginTop:"3rem",width:"35rem",height:"100%"}}>
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={LongToShortURL}>
        <Card.Header style={{height:"3rem",textAlign:'center'}}>Shorten URL</Card.Header>
        
          <div className="form-group mt-3" style={{margin:"1.5rem",marginTop:"3rem"}}>
            <label>Enter Long url</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter Long url"
              style={{height:"3rem"}}
              onChange={e => setLongUrl(e.target.value)}
            />
<br></br>
<label>Shortened url</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Shortened URL"
              style={{height:"3rem"}}
value={shortUrl               }
               disabled
            />
          
          </div>
          <div className="d-grid gap-2 mt-3" style={{margin:"1.5rem",height:"3rem"}}>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          

       
                   </form>
                   
      </div>
    </Card>
    
    {/* <Card style={{marginLeft:"27.5rem",marginTop:"5rem",width:"35rem",height:"2rem"}}>
       <p><b>Your shortened URL</b>: {shortUrl}</p>
    </Card> */}
    </>
    )
}
export default MainPage