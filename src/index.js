import React from 'react';
import './styles.css'
const shaka = require('shaka-player/dist/shaka-player.ui.js');

class VideoPlayer extends React.PureComponent{
  constructor(props){
    super(props);
    this.videoRef = React.createRef();
    this.videoContainer = React.createRef();
    this.onErrorEvent = this.onErrorEvent.bind(this);
		this.onError = this.onError.bind(this);
	}

	onErrorEvent(event) {
	  this.onError(event.detail);
	}

	onError(error) {
	  console.error('Error code', error.code, 'object', error);
	}

	componentDidMount() {
    const {src, srcKey, authToken, seekTime=0, streamingConfig, abrConfig, drmConfig, uiConfig, onVideoEnd, onPlayFailed, getCurrentSeekTime, removeRightClick, disableControls, disableConsoleControls} = this.props
    
    const video = this.videoRef.current;
		const videoContainer = this.videoContainer.current;

    let player = new shaka.Player(video);

    player.configure({ 
      streaming : {...streamingConfig}, 
      abr: {...abrConfig}, 
      drm: {...drmConfig}
    });

    player.getNetworkingEngine().registerRequestFilter(function (type, request) {
      if (type === 2) {
        request.uris[0] += `/${srcKey}`
        request.headers['Content-Type'] = 'application/octet-stream';
        request.headers['Authorization'] = `Bearer ${authToken}`;
      }
    });
     
		const ui = new shaka.ui.Overlay(player, videoContainer, video, uiConfig);
    ui.configure(uiConfig);

    if (disableControls) { 
      video.controls = false
      if (video.hasAttribute("controls")) {
        video.removeAttribute( 'controls')
      }
      video.style.pointerEvents = 'none'
    } else {
      video.controls = true
    }

    if (removeRightClick) {
      video.addEventListener('contextmenu', function (e) { e.preventDefault() }, false)
    }

    if (disableConsoleControls) {
      video.addEventListener('pause', () => {
        video.play();
      })
  
      video.addEventListener('timeupdate', (event) => {
        if (event.currentTarget.controls === true) {
          event.currentTarget.controls = false
        }
      });
    }
    
    video.onloadedmetadata = () => {
      if (!isNaN(seekTime) && (seekTime > video.duration)) {
        onVideoEnd && onVideoEnd()
      }
    }

    video.addEventListener('loadeddata', () => {
      getCurrentSeekTime && getCurrentSeekTime()
      if (!isNaN(seekTime)) {
        video.currentTime = seekTime
      }
      if(video.paused) {
        playVideo()
      }
    });

    player.addEventListener('error', this.onErrorEvent);

    player.load(src).then(function() {
      console.log('The video has now been loaded!');
    }).catch(this.onError);  // onError is executed if the asynchronous load fails.


    function playVideo() {
      let playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.then(_ => { // Automatic playback started!
        })
        .catch(() => { // Auto-play was prevented. Showing paused UI.
          onPlayFailed && onPlayFailed()
        });
      }
    } 
  }

  componentDidUpdate(prevProps) {
    if (prevProps.seekTime !== this.props.seekTime) {
      let video = this.videoRef.current;
      if(video.duration && !isNaN(seekTime)) { 
        const {seekTime, onVideoEnd} = this.props
        if (seekTime > video.duration) {
          onVideoEnd && onVideoEnd()
        } else {
          video.currentTime = seekTime
          video.play()
        }
      }
    }
  }
  
  render(){
    const {src} = this.props

		return(
			<div className="video-container" ref={this.videoContainer}>
				<video 
					className="shaka-video"
          ref={this.videoRef}
          src={src}
          autoPlay={true}
          style={{ maxWidth: '100%'}}
          playsInline
				/>
			</div>
		);
	}
}

export default VideoPlayer;