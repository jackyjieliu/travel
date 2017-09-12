import { SearchResult, ResultDetail } from '../actions/search-action';
import * as React from 'react';
import { Card, CardText,
  // CardActions
} from 'material-ui/Card';
import * as _ from 'lodash';
// import FlatButton from 'material-ui/FlatButton';
import { GridList, GridTile } from 'material-ui/GridList';
import Map from './Map';

class Result extends React.Component<{result: SearchResult, detail: ResultDetail}> {
  public mapRef: any;

  render() {
    const props = this.props;
    const { name } = props.result;

    const { pointsOfInterest } = props.detail || { pointsOfInterest: undefined };
    const formattedName = name.split(',').slice(0, 2).join(', ');

    // const self = this;
    const onMouseEnterTile = (i: number, coord: { lat: number; lng: number;}) => {
      return () => {
        console.log('enter ' + i);
        this.mapRef.showTooltip(i, coord);
      };
    };

    const onMouseLeaveTile = (i: number) => {
      return () => {
        console.log('leave ' + i);
        this.mapRef.hideTooltip(i);
      };
    };

    const interestsEl = _.map(pointsOfInterest, (pointOfInterest, i) => {
      const photoReference = _.get(pointOfInterest, 'photos[0].photo_reference');
      const coord = {
        lat: pointOfInterest.geometry.location.lat,
        lng: pointOfInterest.geometry.location.lng
      };
      return (
        <div
          key={i}
          onMouseEnter={onMouseEnterTile(i, coord)}
          onMouseLeave={onMouseLeaveTile(i)}
          style={{ width: 300, height: 180 }}
        >
          <GridTile
            key={i}
            style={{ width: 300, minWidth: 300 }}
            title={pointOfInterest.name}
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          >
            {photoReference ? <img src={'/api/images/' + photoReference} /> : undefined}
          </GridTile>
        </div>
      );
    });

    const interesMarkers = _.map(pointsOfInterest, (pointOfInterest, i) => {
      return {
        name: pointOfInterest.name,
        lat: pointOfInterest.geometry.location.lat,
        lng: pointOfInterest.geometry.location.lng
      };
    });

    return (
      <Card style={{ width: 760 }}>
        <CardText style={{ fontSize: 22, paddingBottom: 0 }}>
          {formattedName}
        </CardText>
        <CardText>
          <div style={{ width: 382, height: 412, display: 'inline-block' }}>
            <Map
              ref={(ref) => { this.mapRef = ref || this.mapRef; }}
              defaultZoom={11}
              defaultCenter={{
                lat: props.detail.details.geometry.location.lat,
                lng: props.detail.details.geometry.location.lng
              }}
              markers={interesMarkers}
            />
          </div>
          <GridList
            style={{ width: 300, height: 412, overflowY: 'auto', overflowX: 'hidden', display: 'inline-block' }}
            cols={1}
          >
            {interestsEl}
          </GridList>
        </CardText>
      </Card>
    );
  }
}

{/*<CardActions>
  <FlatButton label="Plan My Trip" />
  <FlatButton label="Not Interested" />
</CardActions>*/}
export default Result;