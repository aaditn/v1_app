"use client";

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import "./lessons.css";

let Title = [
  ["Printing Hello World", "Introduction to Variables", "Calculator!"],
  ["Introduction to Conditionals", "If-else Conditionals", "Logic and Conditionals"],
  ["Introduction to Methods", "Multiply Numbers", "Constructors"],
  ["Introduction to Classes", "Complete Classes", "Using Classes by Instantiating Objects"],
  ["Introduction to Loops", "Introduction to Arrays", "Final Problem"]
];
let vidTitle = [
  ["How Does Java Work?", "Primitive Variables", "Arithmetic Operations"],
  ["If Conditions", "If-else Conditionals", "Logical Operations"],
  ["Methods (functions)", "Utilizing Methods", "Constructors"],
  ["What are Classes?", "Coding a Full Class", "Objects"],
  ["Loops", "Arrays", "All Coming Together"]
];
let unitTitle = [
  "Introduction to Java",
  "Conditionals",
  "Methods and Constructors",
  "Classes and Objects",
  "Loops and Arrays"
];

const MyComponent = () => {
  const [currentUnit, setCurrentUnit] = useState(() => {
    const storedUnit = sessionStorage.getItem('currentUnit');
    return storedUnit ? parseInt(storedUnit) : 1;
  });
  const [currentLesson, setCurrentLesson] = useState(() => {
    const storedLesson = sessionStorage.getItem('currentLesson');
    return storedLesson ? parseInt(storedLesson) : 1;
  });
  const [outputData, setOutputData] = useState('');

  const editorRef = useRef(null);

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
    // Write your code here

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

  const incrementUnit = () => {
    setCurrentUnit((prevUnit) => {
      const newUnit = prevUnit + 1;
      sessionStorage.setItem('currentUnit', newUnit.toString());
      return newUnit;
    });
    setCurrentLesson(1);
    sessionStorage.setItem('currentLesson', '1');
    window.location.reload();
  };

  const incrementLesson = () => {
    setCurrentLesson((prevLesson) => {
      let newLesson;
      let newUnit = currentUnit;
  
      if (prevLesson === 3) {
        newLesson = 1;
        if (currentUnit !== 5) {
          newUnit = currentUnit + 1;
        } else {
          newUnit = 1;
        }
      } else {
        newLesson = prevLesson + 1;
      }
  
      sessionStorage.setItem('currentLesson', newLesson.toString());
      sessionStorage.setItem('currentUnit', newUnit.toString());
      return newLesson;
    });
  
    window.location.reload();
  };

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

  const lessonPage = () => {
    return (
      <div>
        <div className="header">
          <h3>Project Code</h3>
          <h3>Unit {currentUnit}: {unitTitle[currentUnit - 1]}</h3>
        </div>

        <div className="next">
          <button className="next" onClick={incrementLesson}>Next→</button>
        </div>

        <div className="title">
          <h1>Lesson {currentLesson}</h1>
          <h2>{Title[currentUnit - 1][currentLesson - 1]}</h2>
        </div>

        <div className="video">
          <h1>{vidTitle[currentUnit - 1][currentLesson - 1]}</h1>
        </div>

        <div>
          <button onClick={executeCode}>Run</button>
        </div>
        <div className="compiler">
          <h1>Run Your Code</h1>
          <br></br>
          <div ref={editorRef} className="box"></div>
          <div className="console">
            <div className="consoleHeader">
              Console
            </div>
            {outputData && <pre>{outputData}</pre>}
          </div>
        </div>
      </div>
    );
  };
  return lessonPage();
};

export default MyComponent;
