import React, { Component } from "react";
import firebase from "../../config/firebase";
import Calendar from "../Calendar/Calendar";
import dateFns from "date-fns";
import {
  Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Row,
  Col,
  Button,
  Input
} from "reactstrap";

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
    const milkDetail = {
      milk: this.state.milk,
      water: this.state.water,
      date: this.state.date
    };
    firebase
      .database()
      .ref(`milk/${firebase.auth().currentUser.uid}`)
      .push(milkDetail);
    this.setState(state => {
      const updatedDetails = state.allDetails;
      updatedDetails.push(milkDetail);
      return updatedDetails;
    });
  };

  render() {
    const { milk, water, browserDate } = this.state;
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Form onSubmit={this.save}>
                    <FormGroup row>
                      <Label for="milk" sm={2}>
                        Milk
                      </Label>
                      <Col sm={10}>
                        {" "}
                        <Input
                          type="number"
                          name="milk"
                          value={milk}
                          onChange={this.updateMilk}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="water" sm={2}>
                        Water
                      </Label>
                      <Col sm={10}>
                        {" "}
                        <Input
                          type="number"
                          name="milk"
                          value={water}
                          onChange={this.updateWater}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="date" sm={2}>
                        Date
                      </Label>
                      <Col sm={10}>
                        {" "}
                        <Input
                          type="date"
                          name="date"
                          value={browserDate}
                          onChange={this.updateDate}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup check row>
                      <Col sm={{ size: 10, offset: 2 }}>
                        <Button color="primary" onClick={this.save}>
                          Submit
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardBody>
                  <Calendar milkDetails={this.state.allDetails} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Milk;
