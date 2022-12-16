import { useState } from "react";
import {writeTextFile, BaseDirectory} from "@tauri-apps/api/fs"
import {resourceDir} from "@tauri-apps/api/path"
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");

  async function handleButton(){
    let content = "This text is going to be written inside goosfraba.txt. \nIt's been edited inside the HTML layer of my tauri app.";
    await writeTextFile("goosfraba.txt", content, {dir: BaseDirectory.Desktop})
    setMessage("File created. Check your desktop folder to access goosfraba.txt")
  }
  async function showPath(){
    let directory = await resourceDir();
    setMessage2(directory);
  }

  return (
    <div className="container">
      <h1>Trying to manipulate files with Tauri</h1>
      <h3>Click on the button to create a text file called goosfraba.txt inside desktop folder</h3>
      <button onClick={handleButton}>Create Goosfraba!</button>
      <br />
      <span>{message}</span>
      <br />
      <h3>The problem so far:</h3>
      <p>When I try to get the path of this app, the Tauri Path API returns the path with weird \\?\ chars at the begining.</p>
      <p>I need to get rid of this chars without using string.slice techniques.</p>
      <p>The variable "__dirname" in Node.js works normally, without \\?\</p>
      <button onClick={showPath}>Show current path</button>
      <br />
      <span>{message2}</span>
      <br />

    </div>
  );
}

export default App;
