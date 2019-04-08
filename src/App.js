import React, { Component } from 'react';
import * as faceapi from 'face-api.js';
import Webcam from "react-webcam";
import orderBy from 'lodash.orderby'
import './App.css';

class App extends Component {
  setRef = webcam => {
    this.webcam = webcam;
  };
  constructor(){
    super();
    this.state = {
      expresion: ""
    }
    this.webcam = React.createRef();
  }
  async componentDidMount(){
    await faceapi.loadFaceDetectionModel("/models")
    await faceapi.loadFaceExpressionModel("/models")
    await faceapi.loadSsdMobilenetv1Model('/models')
  }
  analyse = async () => {
    this.setState({expresion: ""});
    var image = new Image();
    image.src = this.webcam.getScreenshot();
    const detectionsWithExpressions = await faceapi.detectAllFaces(image).withFaceExpressions();
    this.setState({expresion: orderBy(detectionsWithExpressions[0].expressions, ['probability'], ['desc'])[0]['expression']});
    console.log(detectionsWithExpressions)
  }
  render() {
    const videoConstraints = {
      width: 350,
      height: 350,
      facingMode: 'user',
    };
    return (
      <div className="App">
        <header className="App-header">
          <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
          />
          <div className="expression">{this.state.expresion ? this.state.expresion : ""}</div>
          <button onClick={() => {this.analyse()}} >Detect</button>
        </header>
      </div>
    );
  }
}

export default App;
