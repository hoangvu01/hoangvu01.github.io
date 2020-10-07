import React from 'react';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faUniversity , faCoffee} from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import StarIcon from '@material-ui/icons/Star';
import 'react-vertical-timeline-component/style.min.css';
import '../Stylings/styles.css';

import timeline from './TimelineUtils/timeline.json';

library.add(faCheckSquare, faCoffee);

const palette = ['#05386B', '#61892F', '#57BA98', '#3B945E', '#F2F2F2'];

const getColour = (id : number) => {
  return palette[id % 4];
}


class Timeline extends React.Component {
    constructor(props : any) {
      super(props);
    }

    render() {
      const timelineitems = timeline.map( item => {
        var colour = getColour(item.id);
        return(
          <VerticalTimelineElement
            contentStyle={{border: `0px solid ${colour}`, background: colour, color: "#FFFFFF"}}
            contentArrowStyle={{ borderRight: `7px solid  ${colour}` }}
            date={item.timespan}
            iconStyle={{background: colour, color: '#FFFFFF' }}
            icon={<WorkIcon />}
          >
            <h2 style={{color: '#ffffff'}}> {item.title} </h2>
            <h4> {item.subtitle} </h4>
            <p> {item.text} </p>
          </VerticalTimelineElement>
        )
      })
      return(
        <VerticalTimeline>
          {timelineitems}
        </VerticalTimeline>
      );
    }


}

export default Timeline;
