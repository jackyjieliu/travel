import * as React from 'react';
import { AutoComplete, Paper } from 'material-ui';
import SearchIcon from 'material-ui/svg-icons/action/search';
import { grey500 } from 'material-ui/styles/colors';
import * as _ from 'lodash';

/**
 * Material design search bar
 * @see [Search patterns](https://material.io/guidelines/patterns/search.html)
 */
export default class SearchBar extends React.Component<PropTypes, {}> {
  public static defaultProps: Partial<PropTypes> = {
    dataSource: [],
    dataSourceConfig: {text: 'text', value: 'value'},
    disabled: false,
    hintText: 'Search',
    searchIcon: <SearchIcon color={grey500} />,
    value: ''
  };

  handleInput (e: string) {
    this.props.onChange(e);
  }

  handleKeyPressed (e: React.KeyboardEvent<{}>) {
    if (e.charCode === 13) {
      this.props.onRequestSearch();
    }
  }

  render () {
    let {
      value,
      disabled,
      dataSource,
      hintText,
      children,
      dataSourceConfig,
      style
    } = this.props;

    disabled = this.props.disabled || false;

    style = _.defaults(style, { height: 48, display: 'flex', justifyContent: 'space-between' });
    return (
      <Paper
        style={style}
      >
        <div style={{ margin: 'auto 16px', width: '100%' }}>
          <AutoComplete
            searchText={value}
            onUpdateInput={(e) => this.handleInput(e)}
            onKeyPress={(e) => this.handleKeyPressed(e)}
            fullWidth={true}
            style={{ width: '100%' }}
            underlineShow={false}
            disabled={disabled}
            dataSource={dataSource || []}
            children={children}
            dataSourceConfig={dataSourceConfig}
            hintText={hintText}
            value={value}
          />
        </div>
      </Paper>
    );
  }
}

interface PropTypes {
  /** Override the close icon. */
  closeIcon?: JSX.Element;
  /** Array of strings or nodes used to populate the list. */
  dataSource?: string[] | JSX.Element[];
  /** Config for objects list dataSource. */
  dataSourceConfig?: any;
  /** Disables text field. */
  disabled?: boolean;
  /** Sets hintText for the embedded text field. */
  hintText?: string;
  /** Fired when the text value changes. */
  onChange: (value: string) => void;
  /** Fired when the search icon is clicked. */
  onRequestSearch: () => void;
  /** Override the search icon. */
  searchIcon?: JSX.Element;
  /** Override the inline-styles of the root element. */
  style?: React.CSSProperties;
  /** The value of the text field. */
  value: string;
}