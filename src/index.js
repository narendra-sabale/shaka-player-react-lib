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
    const {src, srcKey, authToken, seekTime=0, streamingConfig, abrConfig, restrictions={}, drmConfig, uiConfig, onVideoEnd, onPlayFailed, getCurrentSeekTime, removeRightClick, disableControls, disableConsoleControls} = this.props
    
    const video = this.videoRef.current;
		const videoContainer = this.videoContainer.current;

    let player = new shaka.Player(video);

    player.configure({ 
      streaming : {...streamingConfig}, 
      abr: {...abrConfig}, 
      drm: {...drmConfig},
      restrictions: {...restrictions}
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

    document.getElementsByClassName('shaka-video-container')[0].setAttribute("shaka-controls", "true")
    if(!document.getElementsByClassName("shaka-skim-container")[0]){
      let ele = document.createElement("div");
      ele.setAttribute("class", "shaka-skim-container");
      let parentEle = document.getElementsByClassName('shaka-controls-container')[0]
      parentEle.insertBefore(ele, document.getElementsByClassName('shaka-bottom-controls')[0])
    }
    let controlEle = document.getElementsByClassName('shaka-settings-menu')
    if(!controlEle[0].classList.contains("shaka-hidden")){
      controlEle[0].classList.add("shaka-hidden")
    }
    if(!controlEle[1].classList.contains("shaka-hidden")){
      controlEle[1].classList.add("shaka-hidden")
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