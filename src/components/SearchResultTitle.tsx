import * as React from 'react';

const SearchResultTitle = (props: { place: string; days: number | undefined;
  query: string; error?: boolean; }) => {

  if (props.place) {
    const displayPlaceArr = props.place.split(',');
    displayPlaceArr.pop();
    const displayPlace = displayPlaceArr.join(', ');
    return (
      <h3 style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ paddingRight: 5 }}>Travelling from <b>{displayPlace}</b> for {props.days} days?</div>
        <div>How About:</div>
      </h3>
    );
  } else if (props.error) {
    return (<h3>Sorry. Something went wrong. Please try again later.</h3>);
  } else {
    return (<h3>Sorry. We counld not find the city {props.query}</h3>);
  }
};

export default SearchResultTitle;