import React from 'react';
import VideoPlayer from 'shaka-player-react-lib'
import 'shaka-player-react-lib/dist/bundle.css'

function App() {
  const [seekTime, setSeekTime] = React.useState(0)

  let src = 'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8'
  let srcKey = "sdfdsf"
  let authToken = "dsfsdfsd"
  let streamingConfig = {}
  let abrConfig = {}
  let drmConfig = {}
  let uiConfig = {
    overflowMenuButtons: [],
    addSeekBar: false,
    addBigPlayButton: false,
    castReceiverAppId: '',
    clearBufferOnQualityChange: true,
    controlPanelElements: []
  };

  const getCurrentSeekTime = () => {
    setTimeout(()=> {
      setSeekTime(50)
    }, 3000)
  }


  return (
    <div>
      <VideoPlayer 
        src={src}
        srcKey={srcKey}
        authToken={authToken}
        seekTime={seekTime}
        streamingConfig={streamingConfig}
        abrConfig={abrConfig}
        drmConfig={drmConfig}
        uiConfig={uiConfig}
        onVideoEnd={()=>{console.log("Video Ended...")}}
        onPlayFailed={()=>{console.log("Video Playing Failed...")}}
        getCurrentSeekTime={getCurrentSeekTime}
        removeRightClick={false}
        disableControls={false}
        disableConsoleControls={false}/>
    </div>
  );
}

export default App;
