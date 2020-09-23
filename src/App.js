import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Search from "./components/Search";
import CardGrid from "./components/CardGrid";

const url = "https://www.reddit.com/r/";
const corsproxy = "https://cors-anywhere.herokuapp.com/";

function App() {
  const [reddit, setReddit] = useState({
    currentSubreddit: "",
    files: [],
    after: null,
    before: null,
    page: 1,
  });

  async function searchSubreddit(subreddit) {
    const response = await axios.get(
      `${corsproxy}${url}${subreddit}.json?raw_json=1`
    );
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
    console.log(
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
  }

  return (
    <div className="App">
      <Search onSubmit={searchSubreddit} />
      <h1>There are {reddit.files.length} no of posts.</h1>
      <button onClick={prevPage}>Prev</button>
      <button onClick={nextPage}>Next</button>
      <CardGrid />
    </div>
  );
}

export default App;
