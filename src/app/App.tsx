import "./App.css";

function App() {
  return (
    <div className="wrapper">
      <header data-testid="header" className="header">
        <a href="https://wafflestudio.com">
          <img
            className="logo"
            src="https://wafflestudio.com/images/icon_intro.svg"
            data-testid="waffle-logo"
            alt="와플스튜디오"
          />
          <h1 className="title">과자 리뷰</h1>
        </a>
      </header>
    </div>
  );
}

export default App;
