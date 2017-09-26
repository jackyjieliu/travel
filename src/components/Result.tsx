import { SearchResult, ResultDetail } from '../actions/search-action';
import * as React from 'react';
import { Card, CardText, CardTitle,
  CardActions
} from 'material-ui/Card';
import * as _ from 'lodash';
import FlatButton from 'material-ui/FlatButton';
import * as H from 'history';
import { withRouter } from 'react-router-dom';
import Carousel from './Carousel';

interface RouterProps {
  history: H.History;
}

interface OwnProps {
  result: SearchResult;
  detail: ResultDetail;
}

class Result extends React.Component<OwnProps & RouterProps> {

  constructor() {
    super();
    this.seeDetails = this.seeDetails.bind(this);
  }

  seeDetails(id: string, name: string) {
    return () => {
      this.props.history.push({
        pathname: '/place/' + id + '/' + name
      });
    };
  }

  render() {
    const props = this.props;
    const { name } = props.result;

    // const { photos } = props.detail || { photos: undefined };
    const formattedName = name.split(',').slice(0, 2).join(', ');
    const photos = _.get(props.detail, 'photos', []);
    const photoEl = _.map(photos, (photo) => {
      return <img src={photo} key={photo}/>;
    });

    return (
      <Card style={{ width: 760 }} containerStyle={{ paddingBottom: 0 }}>
        <CardTitle
          title={formattedName}
        />
        <CardText>
          <Carousel>
            {photoEl}
          </Carousel>
        </CardText>
        <CardActions>
          <FlatButton label="See Details" onClick={this.seeDetails(this.props.result.id, this.props.result.name)}/>
        </CardActions>
      </Card>
    );
  }
}

{/*<CardActions>
  <FlatButton label="Plan My Trip" />
  <FlatButton label="Not Interested" />
</CardActions>*/}
export default withRouter(Result) as React.ComponentType<OwnProps>;