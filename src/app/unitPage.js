import "./unit.css";

function unitPage () {
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
    
}