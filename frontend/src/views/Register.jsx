import React from "react";
import {Redirect} from "react-router-dom";

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


class Register extends React.Component {
  state={
    username:'',
    first_name:'',
    last_name:'',
    email:'',
    password:'',
    logged_in:false
  }
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    
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

  handle_signup = e => {
    e.preventDefault();
    let data = {
      username : this.state.username,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email:this.state.email,
      password : this.state.password,

  };
    fetch('http://localhost:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      
      if(!res.ok){
        alert("Registeration Unsuccessful!");
       
      }
      else{
     res.json().then((response)=>{
         localStorage.setItem('jwta', response.tokens.access);
       localStorage.setItem('jwtr', response.tokens.refresh);
       this.setState({
         logged_in: true
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
        <h3 className="display-3 text-white text-center">Register User </h3>
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
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-circle-08" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Username" type="text" name="username"  onChange={this.handle_change} required />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-circle-08" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Firstname" type="text" name="first_name"  onChange={this.handle_change} required />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-circle-08" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Lastname" type="text" name="last_name"  onChange={this.handle_change} required  />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Email" type="email" name="email"  onChange={this.handle_change} required/>
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
                              autoComplete="off"
                              name="password"
                              onChange={this.handle_change}
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      
                      
                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="primary"
                            type="submit"
                            onClick={this.handle_signup}
                          >
                            Create account
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
  
      </>
    );
  }
}

export default Register;
