import React, { Component } from "react";
import firebase from "../../config/firebase";
import Calendar from "../Calendar/Calendar";
import dateFns from "date-fns";

class Milk extends Component {
  state = {
    milk: 1,
    water: 1,
    date: new Date().getTime(),
    browserDate: dateFns.format(new Date(), "YYYY-MM-D"),
    allDetails: []
  };

  componentDidMount = () => {
    firebase
      .database()
      .ref(`milk/${firebase.auth().currentUser.uid}`)
      .once("value")
      .then(snapshot => {
        const tempDetails = [];
        snapshot.forEach(i => {
          tempDetails.push(i.val());
        });
        this.setState({
          allDetails: tempDetails
        });
      });
  };

  updateMilk = event => {
    this.setState({
      milk: event.target.value
    });
  };

  updateWater = event => {
    this.setState({
      water: event.target.value
    });
  };

  updateDate = event => {
    console.log(event.target.value);
    const { value } = event.target;
    this.setState({
      browserDate: value,
      date: new Date(value).getTime()
    });
  };

  save = event => {
    event.preventDefault();
    firebase
      .database()
      .ref(`milk/${firebase.auth().currentUser.uid}`)
      .push({
        milk: this.state.milk,
        water: this.state.water,
        date: this.state.date
      });
  };

  render() {
    const { milk, water, browserDate } = this.state;
    return (
      <div>
        <form onSubmit={this.save}>
          <div>
            <label htmlFor="milk">Milk</label>
            <input
              type="number"
              name="milk"
              value={milk}
              onChange={this.updateMilk}
            />
          </div>
          <div>
            <label htmlFor="water">Water</label>
            <input
              type="number"
              name="milk"
              value={water}
              onChange={this.updateWater}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              value={browserDate}
              onChange={this.updateDate}
            />
          </div>
          <button type="submit" onClick={this.save}>
            Save
          </button>
        </form>
        <Calendar milkDetails={this.state.allDetails} />
      </div>
    );
  }
}

export default Milk;
