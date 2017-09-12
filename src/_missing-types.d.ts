declare var anyType: any;

type Dispatch = (a: { type: string; payload: any; }) => void;

declare module 'name' {
  export default anyType;
}
