import { useState } from "react";

export function Inp(){
    const [imgurl,setImgurl] = useState('')
    async function sub(){
    const prompt = document.getElementById('desc').value
    const response = await fetch("http://192.168.156.181:3000/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"  
    },
    body: JSON.stringify({
      prompt
    })
    });
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob); 
    setImgurl(imageUrl)
    }

    return<div> 
    <div id="inp">
        <label htmlFor="desc">Describe</label>
        <input type="text" id="desc" placeholder="enter the textual description here......" ></input>
        <button type="submit" onClick={sub} id="submitbtn">Generate Image</button>
    </div>
    <div><Imagedisplay imgurl={imgurl}></Imagedisplay></div>
    
    </div> 
}


function Imagedisplay({imgurl}){
    if(imgurl){
        return <div id="dispimg">
            <img src={imgurl} alt="error occured"  />
        </div>
    }
    else{
        return<div></div>   
    }
}