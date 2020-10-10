import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Spreadsheet from './spreadsheet';
import Identification from './Identification';
import EndOfExperiment from './EndOfExperiment';
import ReactTimeout from 'react-timeout'
import axios from 'axios';
import { getMinimizedGrid } from './gridGenerator';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {startTime: null, showId: true, showSpreadsheet: false, showEndOfExperiment: false, id: '', table: [], didGetTable: false, didSendToServer: false};
    
  }

  handleClick(id){
    let dur = 3600000 / (60)
    this.setState({showId: false, showSpreadsheet: true, id: id, startTime: new Date()});
    this.props.setTimeout(this.endExperiment,  dur);
    // one hour is 3600000 milliseconds
  }

  endExperiment = () => {
    this.setState({showSpreadsheet: false, showEndOfExperiment: true})
  }

  sendToServer = () => {
    let grid = getMinimizedGrid(this.state.table);
    let data = {
      "id": this.state.id,
      "results": grid,
      "startTime": this.state.startTime
    }

    console.log(grid);

    // http://personally-known-server.herokuapp.com/results
    axios.post(`http://personally-known-server.herokuapp.com/results`, { data })
    .then(res => {
      this.setState({didSendToServer: true});
    }).catch(err => {
      console.log(err)
    })
    
  }

  getData = async (grid)=> {
    await this.setState({table:grid, didGetTable: true})
  }

  render() {
   
    return (
      <div className="general">
        <Identification clickAction = {this.handleClick.bind(this)} show = {this.state.showId}/>
        <Spreadsheet getData={this.getData.bind(this)} ended={this.state.showEndOfExperiment} didGetTable={this.state.didGetTable} show = {this.state.showSpreadsheet}/>
        <EndOfExperiment sendToServer={this.sendToServer.bind(this)} closeWindow={this.state.didSendToServer} id={this.state.id} show = {this.state.didGetTable} />
      </div>
    );
  }
}
export default ReactTimeout(App);


  

