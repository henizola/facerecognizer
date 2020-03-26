import React, { Component } from 'react';
import './App.css';
import'tachyons';
import Navigation from './components/Navigation/Navigation';
import Input from './components/Navigation/Input';
import Logo from './components/Navigation/Logo/Logo';
import Rank from './components/Rank/Rank'
import  Particles from'react-particles-js'
import Clarifai from 'clarifai';
import FaceRecognation from './components/FaceRecognizer/FaceRecognation';
import Signin from './components/Registration/Signin'
import Register from './components/Register/Register'
// import {LocalizeProvider, localizeReducer} from 'react-localize-redux';
// const  store = createStore(combineReducers({icm: IcmWebReducer, localize: localizeReducer}));
const app = new Clarifai.App({
  apiKey: 'fc363e1978cd4cebaf9aa5238aba653a'
 });

const particlesOption={
      particles: {
         number:{
            value:30,
            density:{
              enable:true,
              value_area:100
            }
          }
         },
        onhover:{
           enable:true,
          }
        }
  class App extends Component {
    constructor(){
      super();
      this.state={
        input:'',
      imageURL:'',
      box:{},
      route:'Signin', 
      isSignedIn: false,
          }
    }
    calculateFaceLocation=(data)=>{
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      // console.log(width,height);
      return{
        leftClo : clarifaiFace.left_col*width,
        tpoRow : clarifaiFace.top_row*height,
        rightCol : width-(clarifaiFace.right_col*width),
        bottomRow : height-(clarifaiFace.bottom_row*height) 
      }
    };
   
     displayFaceBox =(box)=>
{
  console.log(box);
  this.setState({box:box});
}

      onInputChange=(event)=>{
          this.setState({input: event.target.value})
      }
      onButtonSubmit=()=>
      {
        this.setState({imageURL:  this.state.input});
        app.models.predict(Clarifai.FACE_DETECT_MODEL, 
          this.state.input)
          .then(response=> this.displayFaceBox(this.calculateFaceLocation(response)))
          .catch(err=>console.log(err));
      }
      onRouteChange=(page)=>{
        if(page==='Signin')
        {
          this.setState({isSignedIn: false})
        }
        else if(page==='home')
        {
          this.setState({isSignedIn: true})
        }
        this.setState({route:page})
      }
      
     

        render()
           {
             const { isSignedIn , route ,  box , imageURL} = this.state;
              return (
                <div className="App">
                    <Particles  className='Particles'
                    params={particlesOption} />
                    <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                    {
                   route==='home'?

                      <div>
                       <Logo />
                      <Rank/>
                       <Input onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                       <FaceRecognation box={box} imageURL={imageURL} /> 
                       </div>
                       :(route ==='Signin'
                       ?  <Signin onRouteChange={this.onRouteChange}/>
                       :<Register onRouteChange={this.onRouteChange}/>  )

                      
                                      }
                    </div>)
                }
}
export default App;
