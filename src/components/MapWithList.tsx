
import * as React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import * as _ from 'lodash';
import Map from './Map';

interface OwnProps {
  defaultCenter: { lat: number; lng: number; };
  list: Array<{ lat: number; lng: number; name: string; photoReference: string; }>;
}

export default class MapWithList extends React.Component<OwnProps> {
  public mapRef: any;

  public render() {
    const onMouseEnterTile = (i: number, coord: { lat: number; lng: number;}) => {
      return () => {
        this.mapRef.showTooltip(i, coord);
      };
    };

    const onMouseLeaveTile = (i: number) => {
      return () => {
        this.mapRef.hideTooltip(i);
      };
    };

    const listItems = _.map(this.props.list, (item, i) => {
      const photoReference = item.photoReference;
      const coord = {
        lat: item.lat,
        lng: item.lng
      };
      return (
        <div
          key={i}
          onMouseEnter={onMouseEnterTile(i, coord)}
          onMouseLeave={onMouseLeaveTile(i)}
          style={{ width: 300, height: 180, cursor: 'default' }}
        >
          <GridTile
            key={i}
            style={{ width: 100, minWidth: 300 }}
            title={item.name}
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          >
            {photoReference ? <img src={'/api/images/' + photoReference} /> : undefined}
          </GridTile>
        </div>
      );
    });

    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1, height: 412, display: 'inline-block' }}>
          <Map
            ref={(ref) => { this.mapRef = ref || this.mapRef; }}
            defaultZoom={11}
            defaultCenter={this.props.defaultCenter}
            markers={this.props.list}
          />
        </div>
        <GridList
          style={{ width: 300, height: 412, overflowY: 'auto', overflowX: 'hidden', display: 'inline-block' }}
          cols={1}
        >
          {listItems}
        </GridList>
      </div>
    );
  }
}
