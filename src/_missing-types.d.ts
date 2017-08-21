
type Dispatch = (a: Action) => void;

interface Action {
  type: string;
  payload: any;
}