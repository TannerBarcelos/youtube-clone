import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import '../App.css';
import youtube from '../api/youtube';
import envVars from '../config';

const App = (props) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    onFormSubmit('');
  }, []);

  const onFormSubmit = async (term) => {
    const { data } = await youtube.get('/search', {
      params: {
        q: term,
        part: 'snippet',
        type: 'video',
        maxResults: 30,
        key: envVars.key,
      },
    });
    setVideos(data.items);
    setSelectedVideo(data.items[0]);
  };

  const onVideoSelect = (video) => {
    setSelectedVideo(video);
  };
  return (
    <div className='ui container'>
      <SearchBar onFormSubmit={onFormSubmit} />
      <div className='ui grid'>
        <div className='ui row'>
          <div className='eleven wide column'>
            <VideoDetail video={selectedVideo} />
          </div>
          <div className='five wide column'>
            <VideoList videos={videos} onVideoSelect={onVideoSelect} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
