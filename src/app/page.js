"use client";
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import "./lessons.css";
import unit from "./unit.css"; 

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
  "",
  "Introduction to Java",
  "Conditionals",
  "Methods and Constructors",
  "Classes and Objects",
  "Loops and Arrays"
];

const MyComponent = () => {
  const [currentUnit, setCurrentUnit] = useState(1);
  const [currentLesson, setCurrentLesson] = useState(1);
  const [outputData, setOutputData] = useState('');

  const editorRef = useRef(null);

  useEffect(() => {
    let editor = null;

    if (currentUnit !== 0) {
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
    }

    return () => {
      if (editorRef.current.editor) {
        editorRef.current.editor.destroy();
      }
    };
  }, [currentUnit]);

  const incrementUnit = () => {
    setCurrentUnit((prevUnit) => {
      const newUnit = prevUnit + 1;
      return newUnit;
    });
    setCurrentLesson(1);
    setOutputData('');

    // Reset code editor
    if (editorRef.current.editor) {
      editorRef.current.editor.setValue(`
public class Main {
  public static void main(String[] args) {
    // Write your code here

  }
}`);
      editorRef.current.editor.clearSelection();
    }
  };

  const incrementLesson = () => {
    setCurrentLesson((prevLesson) => {
      let newLesson;
      let newUnit = currentUnit;

      if (prevLesson === 3) {
        newLesson = 1;
        incrementUnit();
        if (currentUnit !== 5) {
          newUnit = currentUnit + 1;
        } else {
          newUnit = 1;
        }
      } else {
        newLesson = prevLesson + 1;
      }

      return newLesson;
    });

    setOutputData('');

    // Reset code editor
    if (editorRef.current.editor) {
      editorRef.current.editor.setValue(`
public class Main {
  public static void main(String[] args) {
    // Write your code here

  }
}`);
      editorRef.current.editor.clearSelection();
    }
  };
  const goToLesson = (unit, lesson) => {
    setCurrentLesson(lesson);
    setCurrentUnit(unit);
    setOutputData('');
  
    // Reset code editor
    if (editorRef.current.editor) {
      editorRef.current.editor.setValue(`
  public class Main {
    public static void main(String[] args) {
      // Write your code here
  
    }
  }`);
      editorRef.current.editor.clearSelection();
    }
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
      console.error('Execution failed. Error:', error.response.data);
    }
  };

  const lessonPage = () => {


    return (
      
      <>
      <div>

        <Helmet>
          <link rel="stylesheet" href="./lessons.css" />
          <meta charSet="utf-8" />
          <title>ProjectCode.edu</title>
        </Helmet>

        <body>
          <div className="header">
            <h3>Project Code</h3>
            <h3>Unit {currentUnit}: {unitTitle[currentUnit]}</h3>
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
        </body>
        </div>
      </>
    );
  };

  const unitPage = () => {
    const cssStyles = {
      body: {
        backgroundColor: "azure",
        margin: "0",
        padding: "0",
      },
      header: {
        marginBottom: "10px",
        width: "100%",
        height: "58px",
        backgroundColor: "#77c8a1",
      },
      main: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        textAlign: "center",
      },
      "h1.titlepage": {
        color: "#77c8a1",
        fontFamily: "'Jost', sans-serif",
        margin: "50px",
        fontSize: "60px",
      },
      "h4": {
        color: "#77c8a1",
        fontFamily: "'Jost', sans-serif",
      },
      "h2.home": {
        color: "#77c8a1",
        display: "inline",
        float: "left",
      },
      "h4.headerlink": {
        display: "inline",
        float: "right",
        backgroundColor: "none",
      },
      "a.home": {
        color: "#ffffff",
        marginLeft: "10px",
      },
      "a.login": {
        color: "#ffffff",
        backgroundColor: "none",
        marginRight: "10px",
      },
      "div.unitLink": {
        textDecoration: "none",
        color: "#77c8a1",
        display: "intline-block",
        position: "relative",
        marginLeft: "0px",
        float: "middle",
        textAlign: "center",
        justifyContent: "center",
        backgroundColor: "none",
        padding: "0px",
        borderWidth: "2px",
        borderColor: "#8f7d95",
        width: "90%",
        left: "5%",
        right: "5%",
      },
      "div.unitLink:after": {
        content: "''",
        position: "absolute",
        width: "100%",
        transform: "scaleX(0)",
        height: "2px",
        bottom: "0",
        left: "0",
        backgroundColor: "#8f7d95",
        transformOrigin: "bottom right",
        transition: "transform 0.5s ease-out",
      },
      "div.unitLink:hover": {
        backgroundColor: "#feffff",
      },
      "div.unitLink:hover:after": {
        transform: "scaleX(1)",
        transformOrigin: "bottom left",
        textDecoration: "underline #ca97da",
        textDecorationThickness: "15%",
        backgroundColor: "#b1b7bb",
      },
      "a": {
        height: "100%",
        width: "100%",
      },
      "button.lessonpage": {
        margin: "20px",
        height: "108px",
        width: "90%",
      },
      "h1": {
        color: "#77c8a1",
        fontSize: "30px",
        fontFamily: "'Jost', sans-serif",
      },
      };
    return (
      <>
  <div>
    <header style={cssStyles.header}>
      <h2 className="home">
        <a className="home" href="index.html" style={cssStyles.link}>
          ProjectCode
        </a>
      </h2>
      <h4 className="headerlink">
        <a className="login" href="login.html" style={cssStyles.link}>
          Login
        </a>
      </h4>
    </header>
    <div style={cssStyles.mainunit}>
      <div style={cssStyles.unitcontainer}>
        <h1 style={cssStyles.unit}>{unitTitle[currentUnit]}</h1>
        <div style={cssStyles.unitpic}>
          <img style={cssStyles.unitimg} src="https://via.placeholder.com/300" alt="unit" />
        </div>
        <p style={cssStyles.unitinfo}>
          Learn the fundamentals of programming using Java. Start from the basics and gradually
          work your way up to more advanced topics. Each unit consists of multiple lessons with
          video tutorials, coding exercises, and quizzes to test your knowledge.
        </p>
        <div style={cssStyles.unitnav}>
          <button style={cssStyles.navbtn} onClick={() => goToLesson(currentUnit + 1, 1)}>Lesson 1</button>
          <button style={cssStyles.navbtn} onClick={() => goToLesson(currentUnit + 1, 2)}>Lesson 2</button>
          <button style={cssStyles.navbtn} onClick={() => goToLesson(currentUnit + 1, 3)}>Lesson 3</button>
        </div>
      </div>
    </div>
  </div>
</>

    );
  };

  return (
    <>
      {currentUnit === 0 ? unitPage() : lessonPage()}
    </>
  );
};

export default MyComponent;
