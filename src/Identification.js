import './identification.css'
import React, {Component} from 'react';
import { Button } from '@material-ui/core';

class Identification extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '', id: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        let id = this.state.value;
       
        this.setState({id: id})
        this.props.clickAction(id);
        event.preventDefault();
      }
    
      render() {
        if (this.props.show == false){
          return null;
        }
        return (
          <div className="iden">
              <h1>הכנס מזהה נבדק</h1>
              <input className="box" type="text" value={this.state.value} onChange={this.handleChange} /><br></br>
            <Button variant="contained" color="primary" onClick={this.handleSubmit}>אישור</Button>
          
          </div>
        );
      }
}

export default Identification;