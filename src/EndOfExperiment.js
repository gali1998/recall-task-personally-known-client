import React, {Component} from 'react';
import { Button } from '@material-ui/core';
import './EndOfExperiment.css'

class EndOfExperiment extends Component {
    constructor(props) {
        super(props);
      }
    
      render() {
        if (this.props.show == false){
          return null;
        }

        if (this.props.closeWindow == true){
          return (
            <div className="endofexp">
            <h1>הניסוי הסתיים, ניתן לסגור את החלון</h1>
            </div>
          );
        }
        return (
          <div className="endofexp">
              <h1>לסיום לחצו על הכפתור</h1>
        <Button variant="contained" color="primary" onClick={this.props.sendToServer}>אישור</Button>
          </div>
        );
      }
}

export default EndOfExperiment;
