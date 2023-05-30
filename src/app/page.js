"use client";
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import "./lessons.css";

const MyComponent = () => {
  const editorRef = useRef(null);
  const [outputData, setOutputData] = useState('');

  useEffect(() => {
    let editor = null;
    const initializeAceEditor = () => {
      const ace = require('ace-builds/src-noconflict/ace');
      require('ace-builds/src-noconflict/theme-monokai');
      require('ace-builds/src-noconflict/mode-java');
      editorRef.current.editor = ace.edit(editorRef.current);
      editorRef.current.editor.setTheme('ace/theme/monokai');
      editorRef.current.editor.session.setMode('ace/mode/java');
      editorRef.current.editor.setValue(`
public class Main {
  public static void main(String[] args) {
    
  }
}`);
      editorRef.current.editor.clearSelection();
    };
    
    initializeAceEditor();
    
    return () => {
      if (editorRef.current.editor) {
        editorRef.current.editor.destroy();
      }
    };
  }, []);

  const executeCode = async () => {
    try {
      if (editorRef.current.editor) {
        const code = editorRef.current.editor.getValue();
  
        const requestData = {
          code,
        };
  
        const response = await axios.post('http://localhost:4000/execute', requestData);
  
        if (response.status === 200) {
          setOutputData(response.data.output);
        } else {
          console.error('Execution failed. Response:', response);
        }
      }
    } catch (error) {
      console.error('Execution failed. Error:', error);
    }
  };
  

  return (
    <div>
      <div class="header">
        <h3>Project Code</h3>
        <h3>Unit 1: Introduction to Java</h3>
      </div>

      <div class="next">
        <h3>Next</h3>
      </div>

      <div class="title">
        <h1>Lesson 1</h1> 
        <h2>Printing Hello World</h2>
      </div> 

      <div class="video">
        <h1>How Does Java Work?</h1>
        <video width="600" height="450" controls>
            <source src="./Sample.mp4" type="video/mp4"></source>
        </video>
      </div>

      <div>
        <button onClick={executeCode}>Run</button> 
      </div>
      <div class="compiler">
        <h1>Run Your Code</h1>
       <br></br>

        <div ref={editorRef} class="box">
           
        </div>
        <div class="console">
                <div class="consoleHeader">
                  
                    Console
                </div>
                {outputData && <pre>{outputData}</pre>}
            </div>
    
      </div>
    </div>
  );
};

export default MyComponent;
