import React, { Component } from 'react';
import { connect } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import randomMC from "random-material-color";
import { getSanzai } from "./actions";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repo: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const { target } = e;
    const { name, value } = target;
    this.setState({[name]: value});
  }

  handleSubmit(e) {
    this.props.dispatch(getSanzai(this.state.repo));
    e.preventDefault();
  }

  render() {
    const { data: doughnut_data, labels: doughnut_labels, length:doughnut_length } = this.props.doughnut;
    const calcBackground = () => {
      let arr = [];
      for(let i = 0; i < doughnut_length; i++)
        arr.push(randomMC.getColor({text: doughnut_labels[i]}));
      return arr;
    };
    return (
      <div className="App">
        <h1>Sanzai Viewer</h1>
        <a href="https://raw.githubusercontent.com/i544c/sanzai-viewer/master/README.md">README</a>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="repo" value={this.state.repo} onChange={this.handleInputChange} placeholder="i544c/sanzai" />
          <input type="submit" />
        </form>

        {/*<table>
          <thead>
            <tr>
              <th>決済日</th>
              <th>内容</th>
              <th>散財額</th>
              <th>支払い方法</th>
              <th>分類</th>
            </tr>
          </thead>
          <tbody>
            {this.props.sanzai.map((sanzai,id) => (
              <tr key={id}>
                <td>{sanzai[0]}</td>
                <td>{sanzai[1]}</td>
                <td>{sanzai[2]}</td>
                <td>{sanzai[3]}</td>
                <td>{sanzai[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>*/}

        <Doughnut data={{
          datasets: [{
            data: doughnut_data,
            backgroundColor: calcBackground()
          }],
          labels: doughnut_labels,
        }} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sanzai: state.sanzai || [],
  doughnut: state.doughnut || {},
});

export default connect(mapStateToProps)(App);
