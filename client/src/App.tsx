import uploadIcon from './assets/upload.svg'
import './fonts/Crushider.ttf'
import './fonts/UbuntuMono-Regular.ttf'
import './App.css'
import { useRef, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    inputRef.current?.click();
  }
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if(files === null) return;

    setFile(files[0]);
    console.log(files[0]);
  }

  const displayFile = (file: File | undefined) : string => {
    if(file == undefined) return "";

    const size_kb = Math.round(file.size/1000);

    return `${file.name} (${size_kb} KB)`;
  }

  const send = async () => {

    const data = new FormData();

    if(file === undefined) return;

    data.append('file', file);

    setLoading(true);
    await axios.post("https://api.derekzhang.ca/upload", data, {}).then(() => {
      toast.success("File uploaded.");
      setLoading(false);
      setFile(undefined);
    }).catch(() => {
      toast.error("Error uploading file.");
    })
  }

  return (
    <div className="app">
      <div className="card">
        <div className="header">
          <h1 className="logo">dkzh</h1>
          <h1>Upload File</h1>
        </div>
        <div onClick={handleClick} className="upload-button">
          <img src={uploadIcon} className="icon" alt="upload icon" width="100" height="100"/>
          <form encType='multipart/form-data'>
          <input ref={inputRef} onChange={handleChange} style={{display: 'none'}} type="file"/>
          </form>
        </div>
        <button className="submitButton" onClick={send} disabled={loading}>Submit</button>
        <p>{displayFile(file)}</p>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
