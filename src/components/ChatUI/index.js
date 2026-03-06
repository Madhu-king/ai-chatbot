import React, { useState } from "react";
import { BeatLoader } from "react-spinners";


import "./index.css";


const textdata="the dog is a animal"
  const converttexttonumber=textdata.split("")
  .map(char => char.charCodeAt(0));
  //console.log(converttexttonumber)//
  
 

function ChatUI() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const[loader,setLoader]=useState("")
  const [sendbtnstatus,setsendbtn]=useState(false)
 
 
  
  /* const checkingandsisplay = (eachcar, userinput) => {

  userinput.map((char) => {
    const change = String.fromCharCode(char);

    if (char === eachcar) {
      setMessages(prev => [
        ...prev,
        { type: "bot", text:change }
      ]);
    }
  });

};

  
   const color="#ffffff";
   const handleSend=(value)=>{
    //console.log(value)
    // user text convert into number nd add data store in useraskdata//
    const userinput=value.split("").map(char=>char.charCodeAt(0));//[123.456]
    //console.log(userinput)//
    converttexttonumber.map(eachcar=>checkingandsisplay(eachcar,userinput))

//console.log(text);//

  


   }
*/

  const handleSend = async (value) => {
    setsendbtn(true)
    setLoader("Chat Bot Thinking .....")
    if (!value.trim()) return;

    // ✅ add user message
    setMessages((prev) => [
      ...prev,
      { type: "user", text: value }
    ]);
 

    setMessage("");

     setTimeout(async() => {
      
    

    try {
      const res = await fetch(
        `http://localhost:5000/search?q=${value}`
      );

      const data = await res.json();

       // ✅ CHANGE IS HERE
    let reply = "No result found";
   
    

   if (data.length > 0) { reply = data .map(item => Object.values(item)[0]) .join("\n\n"); }
      // ✅ add bot reply
      setLoader(false)
      
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: reply },
      ]);
      
      
    } catch (err) {
      console.log(err);
    }

  },1000);

   

  };
  
   const color="#ffffff";
  

  return (
   
    
    <div className="main-container ">
           <div className="chat-card">
        <h1 className="title">🤖 My AI Chat BOT</h1>
        <div className="loader"><BeatLoader color={color}/></div>
       

        {/* CHAT BOX */}
        <div className="chat-box">
          {sendbtnstatus&&(<p className="loader-style">{loader}</p>)}
          
           
          {messages.map((msg, i) => (
           
            <div key={i} className={`msg ${msg.type}`}>
               
              {msg.text}
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="input-area">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="ASK here..."
            onKeyDown={(e) =>
              e.key === "Enter" && handleSend(message)
            }
          />

          <button onClick={() => handleSend(message)}>
            Send
          </button>
        </div>
        
      </div>
      
     
     
    </div>
    
     
      
  );
}

export default ChatUI;