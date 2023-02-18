import React, { Component } from "react";
import "./Loader.css";

export default class Loader extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
  
    render() {
     
        return (
          
            <div className="loading" style={this.props.show?{"display":"block"}:{"display":"none"}}>
            <div className="loadingio-spinner-spinner-i2tz3ns254l">
              <div className="ldio-p150pq3wp2e">
                <div></div><div></div><div></div><div></div><div></div><div></div>
                <div></div><div></div><div></div><div></div><div></div><div></div>
              </div>
            </div>
          </div>
  
        );
      
    }
  }