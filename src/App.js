import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Search from "./components/Search";
import CardGrid from "./components/CardGrid";
import ImageGrid from "./components/ImageGrid";

const url = "https://www.reddit.com/r/";
// const corsproxy = "https://cors-anywhere.herokuapp.com/";

function App() {
  const [reddit, setReddit] = useState({
    currentSubreddit: "",
    files: [],
    after: null,
    before: null,
    page: 1,
  });

  async function searchSubreddit(subreddit) {
    const response = await axios.get(`${url}${subreddit}.json?raw_json=1`);
    setReddit({
      ...reddit,
      currentSubreddit: subreddit,
      files: response.data.data.children,
    });
  }
  useEffect(() => {
    reddit.files.forEach((element) => {
      if (element.data.preview) {
        console.log(element.data.preview.images[0].source.url);
      }
    });
  }, [reddit]);

  async function nextPage() {
    const response = await axios.get(
      `${url}${reddit.currentSubreddit}.json?count=${reddit.page * 25}&after=${
        reddit.after
      }&raw_json=1`
    );

    setReddit({
      ...reddit,
      files: response.data.data.children,
      after: response.data.data.after,
      before: response.data.data.before,
      page: reddit.page + 1,
    });
    window.scrollTo(0, 0);
  }

  async function prevPage() {
    const response = await axios.get(
      `${url}${reddit.currentSubreddit}.json?count=${
        (reddit.page - 1) * 25 - 1
      }&before=${reddit.before}&raw_json=1`
    );

    setReddit({
      ...reddit,
      files: response.data.data.children,
      after: response.data.data.after,
      before: response.data.data.before,
    });
    if (reddit.page > 1) {
      setReddit({ ...reddit, page: reddit.page - 1 });
    }
    window.scrollTo(0, 0);
  }
  let homepage =
    reddit.currentSubreddit === "" ? (
      <CardGrid />
    ) : (
      <ImageGrid files={reddit.files} />
    );
  const resetSubreddit = () => {
    setReddit({
      ...reddit,
      currentSubreddit: "",
    });
  };

  return (
    <div className="App">
      <Search onSubmit={searchSubreddit} />
      <button onClick={resetSubreddit}>RESET</button>
      {/* <CardGrid /> */}
      {/* <ImageGrid files={reddit.files} /> */}
      {homepage}
      <button onClick={prevPage}>Prev</button>
      <button onClick={nextPage}>Next</button>
    </div>
  );
}

export default App;
