import * as React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Spinner = (props: { type?: string, marginTop?: number | string }) => {

  let size = 80;
  let thickness = 5;
  if (props.type === 'small') {
    size = 30;
    thickness = 2;
  }

  return (
    <div style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <CircularProgress
        size={size}
        thickness={thickness}
        style={{
          marginTop: props.marginTop !== undefined ? props.marginTop : '20%',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      />
    </div>
  );
};

export default Spinner;