
import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col
} from "reactstrap";

class Index extends React.Component {
  state = {};
  render() {
    return (
      <>
        <section className="section section-lg section-shaped">
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
          <Container className="py-md">
            <Row className="row-grid justify-content-between align-items-center">
              <Col lg="6">
                <h3 className="display-3 text-white">
                  Zigway Django React JWT Test
                  
                </h3>
               
                <div className="btn-wrapper">
                  <Button color="default" to="/login-page" tag={Link}>
                    Login Page
                  </Button>
                  <Button
                    className="btn-white"
                    color="default"
                    to="/register-page"
                    tag={Link}
                  >
                    Register Page
                  </Button>
                </div>
              </Col>
         
            </Row>
          </Container>
        
        </section>
      </>
    );
  }
}

export default Index;