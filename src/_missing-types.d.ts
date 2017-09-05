declare var anyType: any;

type Dispatch = (a: { type: string; payload: any; }) => void;

declare module 'material-ui-search-bar' {
  export default anyType;
}
