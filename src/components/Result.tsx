import { SearchResult } from '../actions/search-action';
import * as React from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import * as _ from 'lodash';
import FlatButton from 'material-ui/FlatButton';
import { GridList, GridTile } from 'material-ui/GridList';

const Result = (props: {result: SearchResult}) => {
  const { name, intro, imageUrl, pointsOfInterest } = props.result;

  const interestsEl = _.map(pointsOfInterest, (pointOfInterest, i) => {
    return (
      <GridTile
        key={i}
        title={pointOfInterest.name}
        titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
      >
        <img src={pointOfInterest.imageUrl} />
      </GridTile>
    );
  });

  return (
    <Card>
      <CardHeader
        titleStyle={{ fontSize: 18 }}
        title={name}
        avatar={imageUrl}
      />
      <CardText
        style={{ fontSize: 15, lineHeight: 1.5 }}
      >
        {intro}
      </CardText>
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