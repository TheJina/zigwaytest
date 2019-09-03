import React from "react";
import { Link, Redirect } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components

class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      logged_in: localStorage.getItem('jwta') ? true : false,
    };
  }
  
  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  handle_login = e => {
    e.preventDefault();
    let data = {
        username : this.state.username,
        password : this.state.password
    };
    fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify(data)
    })
     .then(res => {
       if(!res.ok){
         alert("Unauthorized access");
         
       }
       else{
      res.json().then((response)=>{
          localStorage.setItem('jwta', response.access);
        localStorage.setItem('jwtr', response.refresh);
        this.setState({
          logged_in: true,
        });
      });
      
      }
      });
  };


  render() {
    if(this.state.logged_in) return <Redirect to="/profile-page" />;
    return (
      <>
       
        <main ref="main">
        <section className="section section-lg section-shaped">
        <h3 className="display-3 text-white text-center">User Login </h3>
          <div className="shape shape-style-1 shape-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
            <Container className="pt-lg-md">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    
                    <CardBody className="px-lg-5 py-lg-5">
                     
                      <Form role="form">
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-circle-08" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Username" type="text" name="username"  onChange={this.handle_change} required />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              name="password"
                              autoComplete="off"
                              onChange={this.handle_change}
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                          
                            onClick={this.handle_login}
                          >
                            Sign in
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                   
                    <Col className="text-center" xs="12">
                      
                         <Button  to="/register-page" tag={Link}>
                    Create New Account
                  </Button>
                      
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
       
      </>
    );
  }
}

export default Login;
