import React, { Component } from "react";
import firebase from "../../config/firebase";
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
  Input,
  CustomInput
} from "reactstrap";
let todo;

class EditTodo extends Component {
  state = { title: "", completed: false };
  componentDidMount() {
    todo = firebase
      .database()
      .ref(`todos/${firebase.auth().currentUser.uid}`)
      .child(`${this.props.match.params.id}`);
    todo.once("value", snapshot => {
      this.setState(snapshot.val());
    });
  }

  updateTodoTitle = event => {
    this.setState({ title: event.target.value });
  };

  updateTodo = event => {
    event.preventDefault();
    todo.update(this.state);
    this.props.history.push("/");
    this.props.showSuccess({ message: "To do item saved." });
  };

  updateStatus = () => {
    this.setState(state => {
      return {
        completed: !state.completed
      };
    });
  };

  cancel = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6 }}>
              <Card>
                <CardBody>
                  <Form onSubmit={this.updateTodo}>
                    <FormGroup row>
                      <Label for="todo" sm={3}>
                        Title
                      </Label>
                      <Col sm={9}>
                        <Input
                          name="todo"
                          type="text"
                          value={this.state.title}
                          onChange={this.updateTodoTitle}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="completed" sm={3}>
                        Completed
                      </Label>
                      <Col sm={8} style={{ marginTop: -10 }}>
                        <CustomInput
                          id="completed"
                          name="completed"
                          type="checkbox"
                          checked={this.state.completed}
                          onChange={this.updateStatus}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup check row>
                      <Col sm={{ size: 10, offset: 3 }}>
                        <Button color="primary" onClick={this.updateTodo}>
                          Submit
                        </Button>
                        &nbsp;&nbsp;
                        <Button outline color="secondary" onClick={this.cancel}>
                          Cancel
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default EditTodo;
