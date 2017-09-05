import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import * as _ from 'lodash';

class DaysInput extends React.Component<{
    onChange: (val?: number) => void;
    onRequestSearch: () => void;
    value: string;
    style?: React.CSSProperties;
    hintText?: string;
  }> {

  constructor() {
    super();
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
  }

  handleOnChange(e: any, val: string) {
    const num = Number(val);
    if (val === '') {
      this.props.onChange(undefined);
    } else if (!_.isNaN(num)) {
      this.props.onChange(num);
    }
  }

  handleKeyPressed (e: React.KeyboardEvent<{}>) {
    if (e.charCode === 13) {
      this.props.onRequestSearch();
    }
  }

  render() {
    let style = _.defaults(this.props.style, {
      height: 48,
      display: 'flex',
      justifyContent: 'space-between'
    });
    return (
      <Paper
        style={style}
      >
        <div style={{ margin: 'auto 16px', width: '100%' }}>
          <TextField
            onKeyPress={(e) => this.handleKeyPressed(e)}
            fullWidth={true}
            style={{ width: '100%' }}
            underlineShow={false}
            hintText={this.props.hintText}
            onChange={this.handleOnChange}
            value={this.props.value}
          />
        </div>
      </Paper>
    );
  }
}

export default DaysInput;