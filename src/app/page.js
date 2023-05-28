"use client";
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import config from './config';
const MyComponent = () => {
  const editorRef = useRef(null);
  const [outputData, setOutputData] = useState('');
  const hackerEarthAuthId = '70d786f634c438ecddb8336b4b7816bbc76d141c00a6.api.hackerearth.com';
  const hackerEarthSecretKey = '7c93441173957850cdd7eb115aa1cda2254b6442';
  useEffect(() => {
    let editor = null;
    const initializeAceEditor = () => {
      const ace = require('ace-builds/src-noconflict/ace');
      require('ace-builds/src-noconflict/theme-monokai');
      require('ace-builds/src-noconflict/mode-java');
      editorRef.current.editor = ace.edit(editorRef.current);
      editorRef.current.editor.setTheme('ace/theme/monokai');
      editorRef.current.editor.session.setMode('ace/mode/java');
      editorRef.current.editor.setValue(`public class Main {
        public static void main(String[] args) {   
        }
      }`);
      editorRef.current.editor.clearSelection();
    };
    if (typeof window !== 'undefined') {
      initializeAceEditor();
    }
    return () => {
      if (editorRef.current.editor) {
        editorRef.current.editor.destroy();
      }
    };
  }, []);
  const executeCode = async () => {
    try {
      const serverUrl = 'https://api.hackerearth.com/v4/partner/code-evaluation/submissions/'; // HackerEarth API endpoin
      if (editorRef.current.editor) {
        const code = editorRef.current.editor.getValue();
        const requestData = {
          source: code,
          language: 'JAVA14',
          input: '', // Optional: Provide input if required by the code
        };
        console.log(5);
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Client-Id': hackerEarthAuthId,
            'Client-Secret': hackerEarthSecretKey,
          },
        };
        const executionResponse = await axios.post(serverUrl, requestData, config);
        const output = executionResponse.data.run_status.output;
        console.log(output);
        setOutputData(output);
      }
    } catch (error) {
      console.error('Execution failed. Error:', error);
    }
  };

  return (
    <div>
      <div ref={editorRef} style={{ width: '100%', height: '300px' }}></div>
      <button onClick={executeCode}>Execute</button>
      {outputData && <pre>{outputData}</pre>}
    </div>
  );
};

export default MyComponent;
