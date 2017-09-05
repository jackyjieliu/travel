import * as React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Spinner = () => (
  <div style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
    <CircularProgress
      size={80}
      thickness={5}
      style={{ marginTop: '20%', display: 'block',  marginLeft: 'auto', marginRight: 'auto' }}
    />
  </div>
);

export default Spinner;