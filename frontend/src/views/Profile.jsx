import React from "react";
import {Redirect} from "react-router-dom";
import axiosclient from "../custom-axios-jwt";


// reactstrap components
import { Button, Card, Container, Row, Col } from "reactstrap";
let jwtDecode = require("jwt-decode");
// core components


class Profile extends React.Component {
  constructor(){
    super();
    this.state = {
      logged_in: localStorage.getItem('jwta') ? true : false,
      username: '',
      first_name:'',
      last_name:'',
      email:''
    }
    
  }
 
  componentDidMount(){
    if(this.state.logged_in){
      let payload_id = jwtDecode(localStorage.getItem('jwta')).user_id;
      axiosclient.get("/api/users/"+payload_id+"/")
      .then(json => {
          this.setState({
          username : json.data.username,
          first_name : json.data.first_name,
          last_name: json.data.last_name,
          email: json.data.email
         });
      })
      
      
    }
  }


  handle_logout = () => {
    localStorage.removeItem('jwta');
    localStorage.removeItem('jwtr');
    this.setState({ logged_in: false, username: '' });
  };

  render() {
    if(!this.state.logged_in) return <Redirect to='/login-page' />
    return (
      <>
        
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                      
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("../assets/img/theme/team-1-800x800.jpg")}
                          />
                        
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                      <div className="card-profile-actions py-4 mt-lg-0">
                        <Button
                          className="mr-4"
                          color="danger"
                          href="#pablo"
                          onClick={this.handle_logout}
                          size="sm"
                        >
                        Logout
                        </Button>
                       
                      </div>
                    </Col>
                 
                  </Row>
                  <div className="text-center mt-5">
                    <h3>
                      {this.state.username}{" "}
                    </h3>
                    <div className="h6 font-weight-300">
                    {this.state.first_name}{" "}{this.state.last_name}
                    </div>
                    <div className="h6 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {this.state.email}
                    </div>
                    
                  </div>
                 
                </div>
              </Card>
            </Container>
          </section>
        </main>
      
      </>
    );
  }
}

export default Profile;
