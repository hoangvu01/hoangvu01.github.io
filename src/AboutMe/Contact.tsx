import React from 'react';
import { Row, Col, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faMapMarker, faBolt, faFilePdf, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faLink, faBolt, faGithub, faMapMarker, faLinkedin, faFilePdf, faMailBulk);


export default class Contact extends React.Component<{}, { isOpen : boolean }> {

    constructor(props : {}) {
        super(props);

        this.state = {
            isOpen : false
        }

        this._toggle = this._toggle.bind(this);
        this._updateDimensions = this._updateDimensions.bind(this);
    }

    _toggle() {
        const { isOpen } = this.state;
        this.setState({
            isOpen: !isOpen
        });
    }

    _updateDimensions() {
        this.setState({
            isOpen: window.innerWidth > 548
        });
    }

    componentDidMount() {
       this._updateDimensions();
       window.addEventListener('resize', this._updateDimensions);
    }

    render() {
        const {isOpen} = this.state;
        return(
            <Row className="d-flex justify-content-center">
                <Collapse isOpen={isOpen}>
                    <Col xs='12' className="d-flex justify-content-center p-3">
                        <FontAwesomeIcon icon="bolt" size="10x" color="white"/>
                    </Col>
                    <Col xs='12' className="d-flex justify-content-center">
                        <h2> hoang vu </h2>
                        <br/><br/>
                    </Col>
                    <Col xs='12'>
                        <a href="https://github.com/hoangvu01">
                            <h4> <FontAwesomeIcon icon={['fab', "github"]}/> hoangvu01 </h4>
                        </a>            
                    </Col>
                    <Col xs='12'>
                        <a href="/CV_Intern2020_HoangVu.pdf" download>
                            <h4> <FontAwesomeIcon icon="file-pdf"/> Download my CV </h4>
                        </a>
                    </Col>
                    <Col xs='12'>
                        <h4> <FontAwesomeIcon icon='map-marker'/>  London, United Kingdom </h4>
                    </Col>
                    <Col xs='12'className='p-3'>
                        <Row>
                            <Col>
                                <a href="https://hoangvu01.github.io">
                                    <FontAwesomeIcon color="#FFFFFF" size="lg" icon="link"/>
                                </a>
                            </Col>
                            <Col>
                                <a href="https://linkedin.com/in/vuhoang01">
                                    <FontAwesomeIcon color="#FFFFFF" size="lg" icon={['fab', "linkedin"]}/>
                                </a>                           
                            </Col>
                            <Col>
                                <a href="mailTo:cong.vu19@imperial.ac.uk">
                                    <FontAwesomeIcon color="#FFFFFF" size="lg" icon='mail-bulk'/>  
                                </a> 
                            </Col>
                        </Row>
                    </Col>
                </Collapse>
                <Collapse isOpen={!isOpen}>
                    <Col xs='12' className='d-flex justify-content-center'>
                        <h2 style={{fontSize:'30px'}}> hoang vu </h2>
                    </Col>
                    <Col xs='12'className='p-3'>
                        <Row>
                            <Col>
                                <a href="https://github.com/hoangvu01">
                                    <FontAwesomeIcon color="#FFFFFF" size="lg" icon={['fab', "github"]}/>
                                </a>            
                            </Col>
                            <Col>
                                <a href="https://hoangvu01.github.io">
                                    <FontAwesomeIcon color="#FFFFFF" size="lg" icon="link"/>
                                </a>
                            </Col>
                            <Col>
                                <FontAwesomeIcon color="#FFFFFF" size="lg" icon='map-marker'/>  
                            </Col>
                            <Col>
                                <a href="https://linkedin.com/in/vuhoang01">
                                    <FontAwesomeIcon color="#FFFFFF" size="lg" icon={['fab', "linkedin"]}/>
                                </a>           
                            </Col>
                        </Row>
                    </Col>
                </Collapse>
            </Row>
        )
    }
}