"use client";

import axios from "axios";
import { NextPage } from "next";
import { FormEventHandler, useState } from "react";
import { personal } from "./lib/client";
import { v4 as uuidv4 } from "uuid"

const Home: NextPage = () => {
  const [email, setEmail] = useState<string>("");

  const onSubmitMetamask: FormEventHandler = async(e) => {
    try {
      e.preventDefault();

      if(!email) return;
      
      const account = await window.ethereum?.request({
        method: "eth_requestAccounts",
      });

      if(account) {
        const signedToken = await personal.sign(`Welcome Bro\n\n\n${uuidv4()}`, account[0], "Pass");
        
        // const recoverAccount = await personal.ecRecover("Hello", signedToken);

        const response = await axios.post("http://localhost:3000/api/user", {
          account : account[0],
          email, 
          signedToken,
        });

        localStorage.setItem('signedToken', signedToken);

        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className="bg-red-100 min-h-screen p-24">
      <div>
        <form onSubmit={onSubmitMetamask}>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input className = "ml-2 px-2 py-1 border-2 border-black rounded-md" type="submit" value="메타마스크로그인" />
        </form>
      </div>
    </div>
  );
};

export default Home;
/*
더미데이터 사용 (dummydata.json파일 만들어야함 )
import { NextPage } from "next";
import Dummy from "@/dummyData.json";

const Home: NextPage = () => {
  return (               
    <div>
      {Dummy.map((v, i) => {
        return (
          <div key={i}>
            {v.name}
            {v.age}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
*/