import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [advice, setAdvice] = useState("");
  const controller = new AbortController();
  const signal = controller.signal;
  const fetchAdvice = async () => {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.slip.advice);
        setAdvice(data.slip.advice);
      });
  };

  useEffect(() => {
    fetchAdvice();
    return () => {
      controller.abort();
    };
  }, []);

  const handleButton = () => {
    fetchAdvice();
  };

  return (
    <div className="app">
      <div className="card">
        <p className="card-text">{advice}</p>
      </div>

      <button
        type="button"
        className=" my-button btn btn-light"
        onClick={handleButton}
      >
        GIVE ME ADVICE!
      </button>
    </div>
  );
}

export default App;
