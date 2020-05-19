import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { FaCodeBranch, FaGraduationCap } from 'react-icons/fa';
import { DiJavascript1, DiHaskell, DiJava, DiPython } from 'react-icons/di';
import { BsController } from 'react-icons/bs';
import { IoIosFlask, IoIosFootball, IoIosBasketball } from 'react-icons/io';
import { GoCode } from 'react-icons/go';
import { GiMoonOrbit, GiPianoKeys, GiMusicalNotes } from 'react-icons/gi';
import { AiOutlineCalculator } from 'react-icons/ai';
import { RiHomeGearLine } from 'react-icons/ri';
import cardDetails from './cardDetails.json';
import Contact from './Contact';

interface IFace {
  "title" : string,
  "subtitle" : string,
  "body" : string
};

interface ICard {
  "id" : number,
  "front" : IFace,
  "back" : IFace,
  "categories" ?: string[]
}

export default class FlipCard extends React.Component<{}, {content : any}> {

  getIcon(kind : string){
    switch(kind) {
      case "edu" : return <FaGraduationCap size="25px" className="svg-icons"/>;
      case "code": return <GoCode size="28px" className="svg-icons"/>;
      case "branch": return <FaCodeBranch size="25px" className="svg-icons"/>;
      case "js" : return <DiJavascript1 size="25px" className="svg-icons"/>;
      case "chemistry" : return <IoIosFlask size="30px" className="svg-icons"/>;
      case "physics" : return <GiMoonOrbit size="30px" className="svg-icons"/>;
      case "maths" : return <AiOutlineCalculator size="30px" className="svg-icons"/>;
      case "haskell" : return <DiHaskell size="35px" className="svg-icons"/>;
      case "java" : return <DiJava size="35px" className="svg-icons"/>;
      case "python" : return <DiPython size="35px" className="svg-icons"/>;
      case "home" : return <RiHomeGearLine size="35px" className="svg-icons"/>;
      case "football" : return <IoIosFootball size="30px" className="svg-icons"/>;
      case "badminton" : return <IoIosBasketball size="30px" className="svg-icons"/>;
      case "piano" : return <GiPianoKeys size="27px" className="svg-icons"/>;
      case "music" : return <GiMusicalNotes size="27px" className="svg-icons"/>;
      case "games" : return <BsController size="30px"  className="svg-icons"/>
    }
  }

  render() {
    const flipCards = cardDetails.map( (card : ICard) => {
      return(
        <Col xs='12' md={{size: 10, offset:1}} lg={{size:8, offset : 2}} xl={{size : 6, offset : 0}} >
          <Flippy
            flipOnHover={true}
            flipOnClick={false}
            flipDirection="vertical"
            >
            <FrontSide style={{ backgroundColor: "rgba(255, 255, 255, 0.5)"}}>
              <Col xs='10' sm='10' md='10' lg='10' className='mt-3 ml-1'>
                <h2> {card.front.title} </h2>
                <h4> {card.front.subtitle} </h4>
                <p> {card.front.body} </p>
              </Col>
              <Col xs='10' sm='10' md='10' lg='10' className='ml-1'>
                { card.categories ? card.categories.map(item => this.getIcon(item))  : null }
              </Col>
            </FrontSide>
            <BackSide style={{backgroundColor: '#A3C6C4'}}>
            <Col xs='12' sm='12' md='10' lg='10' className='mt-3 ml-1'>
                <h2> {card.back.title} </h2>
                <h4> {card.back.subtitle} </h4>
                <p className='overflow-auto'> {card.back.body} </p>
              </Col>
            </BackSide>
          </Flippy>
        </Col>
    )})

    return (

      <Container id="about-me-wrapper" xs="fluid" md='10' className='flex-column d-flex h-100'>
        <Row xs={12} md={10} className='h-100 align-items-center'>
          <Col className='fixed' xs='12' md='4'>
            <Contact/>
          </Col>
          <Col className='h-85 overflow-auto shadow-lg rounded'>
            <Row>
              {flipCards}
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}
