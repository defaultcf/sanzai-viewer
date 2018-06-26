import React, { Component } from 'react';
import { connect } from "react-redux";
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
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="repo" value={this.state.repo} onChange={this.handleInputChange} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sanzai: state.sanzai,
});

export default connect(mapStateToProps)(App);
