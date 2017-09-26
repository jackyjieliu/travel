import * as React from 'react';
import GoogleMapReact, { ChangeEventValue, Coords } from 'google-map-react';
import * as _ from 'lodash';
import * as ReactTooltip from 'react-tooltip';
import * as geolib from 'geolib';

interface Props {
  markers: Array<{ name: string; lat: number; lng: number; }>;
  defaultZoom?: number;
  defaultCenter: { lat: number; lng: number; };
}

interface State {
  center: Coords;
  bounds?: { nw: Coords; ne: Coords; sw: Coords; se: Coords; };
}
class Marker extends React.Component<{ text: string; lat: number; lng: number; ref: any; }> {
  public tooltipRef: any;

  showTooltip() {
    if (this.tooltipRef) {
      setTimeout(
        () => {
          (ReactTooltip as any).show(this.tooltipRef);
        },
        300);
    }
  }

  hideTooltip() {
    if (this.tooltipRef) {
      (ReactTooltip as any).hide(this.tooltipRef);
    }
  }

  render() {
    return (
      <div style={{ cursor: 'point' }}>
        <i className="material-icons" data-tip={this.props.text} ref={(ref) => { this.tooltipRef = ref; }}>place</i>
        <ReactTooltip place="top" effect="solid" offset={{ top: -10 }}/>
      </div>
    );
  }
}

class Map extends React.Component<Props, State> {
  public markerRefs: Array<any>;
  constructor(props: Props) {
    super(props);

    this.state = {
      center: {
        lat: props.defaultCenter.lat,
        lng: props.defaultCenter.lng
      },
      bounds: undefined
    };

    this.markerRefs = [];
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.onMapChange = this.onMapChange.bind(this);
  }

  showTooltip(i: number, coord: Coords) {
    const bounds = this.state.bounds;
    if (bounds) {
      const inside = geolib.isPointInside(
        { latitude: coord.lat, longitude: coord.lng },
        [bounds.nw, bounds.ne, bounds.sw, bounds.se].map((c: Coords) => {
          return {
            latitude: c.lat,
            longitude: c.lng
          };
        })
      );

      if (!inside) {
        this.setState({
          ...this.state,
          center: coord
        });
      }
    }

    if (this.markerRefs[i]) {
      this.markerRefs[i].showTooltip();
    }
  }

  hideTooltip(i: number) {
    if (this.markerRefs[i]) {
      this.markerRefs[i].hideTooltip();
    }
  }

  onMapChange(e: ChangeEventValue) {
    this.setState({
      center: { ...e.center },
      bounds: {
        nw: (e.bounds.nw as any),
        ne: (e.bounds.ne as any),
        sw: (e.bounds.sw as any),
        se: (e.bounds.se as any),
      }
    });
  }

  render() {
    const interesMarkers = _.map(this.props.markers, (markers, i) => {

      return (
        <Marker
          key={i}
          ref={(ref: any) => {
            this.markerRefs[i] = ref || this.markerRefs[i];
          }}
          text={markers.name}
          lat={markers.lat}
          lng={markers.lng}
        />
      );
    });

    return (
      <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
        <GoogleMapReact
          onChange={this.onMapChange}
          defaultZoom={this.props.defaultZoom || 11}
          center={{
            lat: this.state.center.lat,
            lng: this.state.center.lng
          }}
        >
          {interesMarkers}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;