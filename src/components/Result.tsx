import { SearchResult, ResultDetail } from '../actions/search-action';
import * as React from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import * as _ from 'lodash';
import FlatButton from 'material-ui/FlatButton';
import { GridList, GridTile } from 'material-ui/GridList';

const Result = (props: {result: SearchResult, detail?: ResultDetail}) => {
  const { name } = props.result;

  const { pointsOfInterest } = props.detail || { pointsOfInterest: undefined };
  const formattedName = name.split(',').slice(0, 2).join(', ');

  const interestsEl = _.map(pointsOfInterest, (pointOfInterest, i) => {
    const photoReference = _.get(pointOfInterest, 'photos[0].photo_reference');
    return (
      <GridTile
        style={{ width: 300, minWidth: 300 }}
        key={i}
        title={pointOfInterest.name}
        titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
      >
        {photoReference ? <img src={'/api/images/' + photoReference} /> : undefined}
      </GridTile>
    );
  });

  return (
    <Card>
      <CardHeader
        titleStyle={{ fontSize: 18 }}
        title={formattedName}
      />
      <CardText>
        <GridList style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', }} cols={2.2}>
          {interestsEl}
        </GridList>
      </CardText>
      <CardActions>
        <FlatButton label="Plan My Trip" />
        <FlatButton label="Not Interested" />
      </CardActions>
    </Card>
  );
};

export default Result;