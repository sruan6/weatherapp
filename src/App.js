import React, { Component } from 'react';
import axios from "axios";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";


const API_KEY = `${process.env.REACT_APP_API_KEY}`;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
    };
  };

  getWeather = (e) => {
    e.preventDefault();
    const city = document.getElementById("City").value;
    const country = document.getElementById("Country").value;
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`)
    .then((data) => {
      console.log(data);
          if (city && country) {
      if (data.data.name === undefined || data.data.sys.country === undefined || data.data.main.temp === undefined) {
        this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          error: 'Location does not EXIST'
       });
      }else {
        this.setState({
          temperature: data.data.main.temp,
          city: data.data.name,
          country: data.data.sys.country,
          humidity: data.data.main.humidity,
          description: data.data.weather[0].description,
          error: "",
       });
      };
    }else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the value"
      });
    }
    })

  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-md-5 title-container">
                  <Titles />
                </div>
                <div className="col-md-7 form-container">
                  <Form handleClick={this.getWeather}/>
                  <Weather 
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
        

export default App;
