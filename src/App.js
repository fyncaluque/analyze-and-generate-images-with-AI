import React from "react";
import analyzeImage from "./azure-image-analysis.js";
import generateImage from "./azure-image-generation.js";
import "./index.css";

function App() {
  const [entry, setEntry] = React.useState("");
  const [data, setData] = React.useState(null);
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const analyze = async () => {
    // Validate entry is a url and is not empty
    if (entry.trim() !== "" && entry.startsWith("http")) {
      setLoading(true);
      const result = await analyzeImage(entry);
      setData(result);
      setLoading(false);
      setMessage("");
    } else {
      setMessage("Please enter a valid url");
    }
  };

  const generate = async () => {
    // Validate entry is descriptive and is not url or empty
    if (entry.trim() !== "" && !entry.startsWith("http")) {
      setLoading(true);
      setUrl("");
      const result = await generateImage(entry);
      setData(null);
      setUrl(result);
      setLoading(false);
      setMessage("");
    } else {
      setMessage("Please enter a valid prompt");
    }
  };

  const clear = () => {
    setData(null);
    setUrl("");
    setEntry("");
    setMessage("");
  };

  // Validate URL or prompt is not empty and call analyzeImage or generateImage
  // ...

  return (
    <div className="container">
      <h1>Computer Vision</h1>
      <input
        type="text"
        id="box"
        name="box"
        placeholder="Enter URL to analyze or textual prompt to generate an image"
        value={entry}
        onChange={(event) => setEntry(event.target.value)}
      ></input>

      <br />
      <div className="options">
        <button type="button" onClick={analyze} disabled={loading}>
          Analyze
        </button>
        <button type="button" onClick={generate} disabled={loading}>
          Generate
        </button>
        <button
          type="button"
          onClick={clear}
          disabled={loading}
          className="btn-clear"
        >
          Clear
        </button>
      </div>
      <span className="message">{message}</span>
      {loading && <p>Processing...</p>}
      {data && (
        <div>
          <h2>Analysis result</h2>
          <div className="result">
            <img src={entry} alt="analyzed" className="imagePreview" />
            {data && (
              <textarea
                value={JSON.stringify(data, null, 2)}
                readOnly
              ></textarea>
            )}
          </div>
        </div>
      )}
      {url && (
        <div>
          <h2>Generation result</h2>
          <div className="result">
            <img src={url} alt="generated" className="imagePreview" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
