import React, { useState, useEffect } from "react";
import { Plate } from "@udecode/plate";
import Head from "next/head";
import Header from "@/component/Header";
import { useRouter } from "next/router";
const Confirmation = () => {
  const router = useRouter();

  const [textEditor, setTextEditor] = useState("");
  const [subject, setSubject ] = useState(""); 
  async function getSubject (){
    const data :any= localStorage.getItem("parsedText") 
    const generatedSubject = await fetch("/api/subject", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const subjectLine = await generatedSubject.json();
    localStorage.setItem("subjectLine", subjectLine.data);
    setSubject(subjectLine);
  }
  const handleClick = ()=>{
    localStorage.setItem("parsedText", textEditor!);
    router.push("/form");
  }
useEffect(()=>{
  const local = localStorage.getItem("parsedText");
  if(local){
    setTextEditor(local.toString);
  }
getSubject();
},[])
  console.log(localStorage.getItem("parsedText"))
  const initialValue = [
    {
      type: 'p',
      children: [
        {
          text:
            `${textEditor}`,
        },
      ],
    } as any
  ];

  return (
    <>
      <Head>
        <>
        <title>Confirm</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
        ></link>
        <link rel="icon" href="/logo3.png" />
        </>
        
      </Head>
      <main>
        <Header />
        <div className="container">
          <Plate editableProps={{ placeholder: "Start typing here!" }} initialValue ={initialValue}
          onChange = {(e:any)=>setTextEditor(e)}
          />
          <div className="container-fluid buttons">
            <button type="button" className="btns btn-no">
              <i className="bi bi-x"></i>
            </button>
            <button type="button" className="btns btn-yes" onClick={handleClick}>
              <i className="bi bi-check-lg"></i>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Confirmation;
