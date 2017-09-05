import * as React from 'react';
import { IconButton, Paper } from 'material-ui';
import SearchIcon from 'material-ui/svg-icons/action/search';
import { grey500 } from 'material-ui/styles/colors';
import * as _ from 'lodash';

/**
 * Material design search bar
 * @see [Search patterns](https://material.io/guidelines/patterns/search.html)
 */
export default class SearchButton extends React.Component<PropTypes, {}> {
  public static defaultProps: Partial<PropTypes> = {
    disabled: false,
    searchIcon: <SearchIcon color={grey500} />,
  };

  render () {
    let {
      disabled,
      onRequestSearch,
      searchIcon,
      style
    } = this.props;

    disabled = this.props.disabled || false;

    style = _.defaults(style, { height: 48, display: 'flex', justifyContent: 'space-between' });
    return (
      <Paper
        style={style}
      >
        <IconButton
          onClick={onRequestSearch}
          style={{
            opacity: !disabled ? 0.54 : 0.38,
          }}
          disabled={disabled}
        >
          {searchIcon}
        </IconButton>
      </Paper>
    );
  }
}

interface PropTypes {
  /** Disables text field. */
  disabled?: boolean;
  /** Fired when the search icon is clicked. */
  onRequestSearch: () => void;
  /** Override the search icon. */
  searchIcon?: JSX.Element;
  /** Override the inline-styles of the root element. */
  style?: React.CSSProperties;
}