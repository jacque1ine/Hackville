import Head from "next/head";
import React, { useState, useEffect, useReducer, useRef } from "react";
import Webcam from "react-webcam";
import { useRouter } from "next/router";
import Header from "@/component/Header";

export default function Home() {
  const router = useRouter();
  const [parsedText, setParsedText] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  async function getParsedText(file: any) {
    const index = file.indexOf(",") + 1;
    const imgData = file.substring(index);
    const response = await fetch("/api/vision", {
      method: "POST",
      body: JSON.stringify(imgData),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    setParsedText(data.detections[0].description);
    localStorage.setItem("parsedText",data.detections[0].description);
    router.push({pathname: "/confirmation", query: {parsedText: data.detections[0].description}});
  }

  function saveFile(e: any) {
    e.preventDefault();
    const reader = new FileReader();
    const imgUrl = e.target.dataFile.files[0];
    reader.readAsDataURL(imgUrl);
    reader.onload = () => {
      const base64 = reader.result;

      if (base64) {
        getParsedText(base64);
      }
    };
  }
  function onChange(e: any) {
    const temp = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(temp);
    reader.onload = () => {
      const base64 = reader.result;
      if (base64) {
        setImgUrl(base64.toString());
      }
    };
  }
  return (
    <>
      <Head>
        <>
        <title>Upload Photo</title>
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
        <div className="header"><Link href={"/"}><img src="/logo.svg" className="header-logo"></img></Link></div>
        <div className="container">
          <form className="files" onSubmit={saveFile}>
            <input
              type="file"
              id="dataFile"
              name="dataFile"
              accept="image/png, image/jpg, image/jpeg"
              className="inputfile"
              onChange={onChange}
            />
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>
          <div className="load-div">
            <img src={imgUrl} className="loaded-img" />
          </div>
        </div>
      </main>
    </>
  );
}
