import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../../data";

const SearchResults = () => {
  const { searchQuery } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=${API_KEY}`
        );
        setVideos(response.data.items);
    } catch (error) {
        console.error("Error fetching videos", error);
      }
    };

    fetchVideos();
  }, [searchQuery]);

  return (
    <div>
      <h2>Search Results for "{searchQuery}"</h2>
      <div className="video-list">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-item">
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            <h3>{video.snippet.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
