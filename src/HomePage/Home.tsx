import React from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Deer from './Deer';

class Home extends React.Component {

  render() {

    return (
      <Row>
        <Deer/>
        <Col
          xs={{size : 8, offset: 2}}
          sm={{size : 4, offset: 6}}
          md={{size : 4, offset: 7}}
          lg={{size : 3, offser: 8}}
          style={{position:'absolute', top:'30%'}}
        >
          <Card style={{display:'flex',
                        justifyContent:'center',
                        backgroundColor:'rgba(255, 255, 255, 0.6)'}}>
            <CardBody>
              <h1>Hoang Vu</h1>
              <h3> Looking for a summer internship </h3>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Home;
