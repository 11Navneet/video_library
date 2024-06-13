import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid"; 
import VideoPlayer from "./VideoPlayer";
import { FiBookmark } from "react-icons/fi";
import { GoBookmarkSlashFill } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); 
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [isBookmarkedFilter, setIsBookmarkedFilter] = useState(false);
  const videoInputRef = useRef(null);


  const handleVideoUpload = (e) => {
    const newVideo = e.target.files[0];
    if (newVideo) {
      const videoUrl = URL.createObjectURL(newVideo);
      setVideos((prevVideos) => [
        ...prevVideos,
        {
          id: uuidv4(),
          title: newVideo.name,
          src: videoUrl,
          bookmarked: false,
        },
      ]);
      videoInputRef.current.value = "";
    }
  };

  const handlePlayVideo = (video) => {
    setSelectedVideo(video);
    setIsVideoPlayerOpen(true);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    setIsVideoPlayerOpen(false);
  };

  const toggleBookmark = (video) => {
    setVideos((prevVideos) =>
      prevVideos.map((v) =>
        v.id === video.id ? { ...v, bookmarked: !v.bookmarked } : v
      )
    );
  };

  const handleDeleteVideo = (video) => {
    setVideos((prevVideos) => prevVideos.filter((v) => v.id !== video.id));
  };

  const handleFilterByBookmark = () => {
    setIsBookmarkedFilter(!isBookmarkedFilter);
  };

  const filteredVideos = isBookmarkedFilter
    ? videos.filter((video) => video.bookmarked)
    : videos;

  return (
    <div className="video-list">
      <h1>Video Library</h1>
      <div>
        <input type="file" ref={videoInputRef} onChange={handleVideoUpload} />
        <button onClick={handleFilterByBookmark}>
          {isBookmarkedFilter ? "Show All Videos" : "Bookmarked Videos"}
        </button>
      </div>
      <ol>
        {filteredVideos.map((video, index) => (
          <li key={video.id}>
            <span onClick={() => handlePlayVideo(video)}>
              {index+1}. {video.title}
            </span>
            <span
              className="bookmark-icon"
              onClick={() => toggleBookmark(video)}
              style={{ cursor: "pointer" }}
            >
              {video.bookmarked ? <GoBookmarkSlashFill /> : <FiBookmark />}
            </span>
            <span
              className="delete-icon"
              onClick={() => handleDeleteVideo(video)}
              style={{ cursor: "pointer" }}
            >
              <MdDeleteOutline />
            </span>
          </li>
        ))}
      </ol>

      {selectedVideo && (
        <VideoPlayer
          src={selectedVideo.src}
          isOpen={isVideoPlayerOpen}
          onClose={handleCloseVideo}
        />
      )}
    </div>
  );
}

export default VideoList;
