import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../reducers/state';
import { withRouter } from 'react-router-dom';
import { SearchResult, ResultDetail, fetchPlaceWithId } from '../actions/search-action';
import MapWithList from '../components/MapWithList';
import * as _ from 'lodash';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import Carousel from '../components/Carousel';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import * as H from 'history';

interface RouterProps {
  history: H.History;
  match: {
    params: {
      id: string;
    }
  };
}

interface StateProps {
  error: boolean;
  result?: SearchResult;
  detail?: ResultDetail;
  placeAround?: SearchResult[];
}

interface DispatchProps {
  fetchPlaceWithId: (id: string) => void;
}

class DestinationDetailScreen extends React.Component<RouterProps & StateProps & DispatchProps, {}> {
  constructor(props: StateProps & DispatchProps & RouterProps) {
    super(props);
    this.props.fetchPlaceWithId(this.props.match.params.id);
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

    let pointsOfInterestMap;
    let photoEl;
    if (this.props.detail) {
      const { pointsOfInterest } = this.props.detail;

      const interests = _.map(pointsOfInterest, (pointOfInterest, i) => {
        const photoReference = _.get<string>(pointOfInterest, 'photos[0].photo_reference');
        return {
          lat: pointOfInterest.geometry.location.lat,
          lng: pointOfInterest.geometry.location.lng,
          name: pointOfInterest.name,
          photoReference
        };
      });
      pointsOfInterestMap = (
        <Card style={{ marginBottom: 14 }} containerStyle={{ paddingBottom: 0 }}>
          <CardTitle
            title="Things to do"
          />
          <CardText>
            <MapWithList
              defaultCenter={{
                lat: this.props.detail.details.geometry.location.lat,
                lng: this.props.detail.details.geometry.location.lng
              }}
              list={interests}
            />
          </CardText>
        </Card>
      );

      const photos = _.get(this.props.detail, 'photos', []);
      photoEl = _.map(photos, (photo) => {
        return <img src={photo} key={photo}/>;
      });
    }

    let title;

    if (this.props.result && this.props.result.name) {
      const titleArr = this.props.result.name.split(',');
      titleArr.pop();
      title = titleArr.join(', ');
    }
    if (this.props.error) {
      title = 'Sorry. An error occurred. Please try again later';
    }

    return (
      <div>
        <Card style={{ marginBottom: 14 }} containerStyle={{ paddingBottom: 0 }}>
          <CardTitle
            title={title}
          />
          <CardText>
            <Carousel>
              {photoEl}
            </Carousel>
          </CardText>
        </Card>
        {pointsOfInterestMap}
        {
          this.props.error ?
            undefined :
            (
              <Card style={{ marginBottom: 14 }} containerStyle={{ paddingBottom: 0 }}>
                <CardTitle
                  title={'Around ' + title}
                />
                <List style={{ padding: 0 }}>

                {
                  this.props.placeAround && this.props.placeAround.slice(0, 10).map((place) => {
                    const dispName = place.name.split(',');
                    dispName.pop();
                    return (
                      <div key={place.id}>
                        <Divider/>
                        <ListItem
                          primaryText={dispName.join(', ')}
                          onClick={this.seeDetails(place.id, place.name)}
                        />
                      </div>
                    );
                  })
                }
                </List>
              </Card>
            )
        }
      </div>
    );
  }
}

function mapStateToProps(store: State, ownProps: RouterProps): StateProps {
  const id = ownProps.match.params.id;
  let result;
  if (id) {
    result = store.searchResults.results[id];
  }

  let detail;
  let placeAround;
  let error = false;

  if (result === false) {
    error = true;
  } else if (result) {
    result = result as SearchResult;
    detail = store.searchResults.resultDetail[result.name];
    placeAround = store.searchResults.placeAround[result.name];
  }

  return {
    error,
    result: (result as SearchResult),
    detail,
    placeAround
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchPlaceWithId: (id: string) => dispatch(fetchPlaceWithId(id))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DestinationDetailScreen));
