import React from 'react';
import ReactHowler from 'react-howler';
import Slider from '@material-ui/core/Slider';
import raf from 'raf'; // requestAnimationFrame polyfill
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import TimeFormat from 'hh-mm-ss';

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={TimeFormat.fromS(value)}
    >
      {children}
    </Tooltip>
  );
}

class MusicControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      loaded: false,
      loop: false,
      mute: false,
      volume: 1.0,
      seek: 0.0,
      isSeeking: false,
    };
    console.log(this.state);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleOnEnd = this.handleOnEnd.bind(this);
    this.handleOnPlay = this.handleOnPlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.renderSeekPos = this.renderSeekPos.bind(this);
    this.handleLoopToggle = this.handleLoopToggle.bind(this);
    this.handleMuteToggle = this.handleMuteToggle.bind(this);
    this.handleMouseDownSeek = this.handleMouseDownSeek.bind(this);
    this.handleMouseUpSeek = this.handleMouseUpSeek.bind(this);
    this.handleSeekingChange = this.handleSeekingChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleSliderCommit = this.handleSliderCommit.bind(this);
  }

  componentWillUnmount() {
    this.clearRAF();
  }

  handleToggle() {
    this.setState({
      playing: !this.state.playing,
    });
  }

  handleOnLoad() {
    this.setState({
      loaded: true,
      duration: this.player.duration(),
    });
    console.log('song loaded)');
  }

  handleOnPlay() {
    console.log('handleOnPlay');
    this.setState({
      playing: true,
    });
    this.renderSeekPos();
  }

  handleOnEnd() {
    this.setState({
      playing: false,
    });
    this.clearRAF();
  }

  handleStop() {
    this.player.stop();
    this.setState({
      playing: false, // Need to update our local state so we don't immediately invoke autoplay
    });
    this.renderSeekPos();
  }

  handleLoopToggle() {
    this.setState({
      loop: !this.state.loop,
    });
  }

  handleMuteToggle() {
    this.setState({
      mute: !this.state.mute,
    });
  }

  handleMouseDownSeek() {
    this.setState({
      isSeeking: true,
    });
  }

  handleMouseUpSeek(e) {
    this.setState({
      isSeeking: false,
    });

    this.player.seek(e.target.value);
  }

  handleSeekingChange(e) {
    console.log('setting new value', e.target.value);
    this.setState({
      seek: Math.floor(e.target.value),
    });
  }

  handleSliderChange(event, newValue) {
    console.log('setting new value', newValue);
    this.setState({
      isSeeking: true,
      seek: Math.floor(newValue),
    });
  }

  handleSliderCommit(event, newValue) {
    console.log('handle slider commit', newValue);
    this.setState({
      isSeeking: false,
    });

    this.player.seek(newValue);
  }

  renderSeekPos() {
    if (!this.state.isSeeking) {
      this.setState({
        seek: Math.floor(this.player.seek()),
      });
    }
    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos);
    }
  }

  clearRAF() {
    raf.cancel(this._raf);
  }

  render() {
    return (
      <div className="full-control">
        <ReactHowler
          src={[this.props.currTrack?.streamUrl]}
          playing={this.state.playing}
          onLoad={this.handleOnLoad}
          onPlay={this.handleOnPlay}
          onEnd={this.handleOnEnd}
          loop={this.state.loop}
          // mute={this.state.mute}
          // volume={this.state.volume}
          html5={true}
          ref={(ref) => (this.player = ref)}
        />

        <p>{this.state.loaded ? 'Loaded' : 'Loading'}</p>
        <p>{this.state.playing ? 'Playing' : 'Paused'}</p>

        {/* <div className="toggles">
          <label>
            Loop:
            <input
              type="checkbox"
              checked={this.state.loop}
              onChange={this.handleLoopToggle}
            />
          </label>
          <label>
            Mute:
            <input
              type="checkbox"
              checked={this.state.mute}
              onChange={this.handleMuteToggle}
            />
          </label>
        </div> */}

        <p>
          {'Status: '}
          {this.state.seek.toFixed(2)}
          {' / '}
          {this.state.duration ? this.state.duration.toFixed(2) : 'NaN'}
        </p>

        {/* <div className="volume">
          <label>
            Volume:
            <span className="slider-container">
              <input
                type="range"
                min="0"
                max="1"
                step=".05"
                value={this.state.volume}
                onChange={(e) =>
                  this.setState({ volume: parseFloat(e.target.value) })
                }
              />
            </span>
            {this.state.volume.toFixed(2)}
          </label>
        </div> */}

        <div className="seek">
          <label>
            Seek:
            <span className="slider-container">
              <input
                type="range"
                min="0"
                max={this.state.duration ? this.state.duration.toFixed(2) : 0}
                step=".01"
                value={this.state.seek}
                onChange={this.handleSeekingChange}
                onMouseDown={this.handleMouseDownSeek}
                onMouseUp={this.handleMouseUpSeek}
              />
              <Slider
                min={0}
                max={this.state.duration ? Math.floor(this.state.duration) : 0}
                value={this.state.seek}
                onChange={this.handleSliderChange}
                onChangeCommitted={this.handleSliderCommit}
                ValueLabelComponent={ValueLabelComponent}
              />
            </span>
          </label>
        </div>

        <Button color="primary" variant="contained" onClick={this.handleToggle}>
          {this.state.playing ? 'Pause' : 'Play'}
        </Button>
        <Button color="primary" variant="contained" onClick={this.handleStop}>
          Stop
        </Button>
      </div>
    );
  }
}

export default MusicControls;
