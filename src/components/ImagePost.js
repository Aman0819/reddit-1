import React from "react";

const ImagePost = ({ file }) => {
  if (file.data.preview) {
    if (file.data.preview.enabled) {
      console.log(file.data);
    }
    return (
      <>
        <div className="normal">
          <a href={file.data.url} target="_blank" rel="noopener noreferrer">
            <img
              src={
                file.data.preview.images[0].resolutions[
                  file.data.preview.images[0].resolutions.length - 1
                ].url
              }
              alt={file.data.title}
            />
          </a>
        </div>
        <div className="onhover">
          <p className="author">{}</p>
          <p classname="caption">{file.data.title}</p>
          <p className="subreddit">{`r/${file.data.subreddit}`}</p>
          <p className="upvotes">
            {file.data.score}
            <i class="fas fa-arrow-up"></i>
          </p>
          <a
            href={"https://reddit.com" + file.data.permalink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Post Link</button>
          </a>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default ImagePost;
