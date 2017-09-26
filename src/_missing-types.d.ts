declare var anyType: any;

type Dispatch = (a: { type: string; payload: any; }) => void;

declare module 'name' {
  export default anyType;
}

declare module 'material-auto-rotating-carousel' {
  var AutoRotatingCarousel: any;
  var Slide: any;
  export { AutoRotatingCarousel , Slide };
}
