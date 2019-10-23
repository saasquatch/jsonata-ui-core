import {
  setWorldConstructor
} from "cucumber";

declare interface World {
  state: Readonly<Partial<State>>;

  /**
   * Like React's setState method
   *
   * @param newState
   */
  setState(newState: Partial<State>): World;
}

declare interface State {
  expr: string;
  ast: any;
  ast2: any;
  serialized: string;
  serialized2: string;
}

class _CustomWorld implements World {
  state: Readonly<Partial<State>> = {};
  setState(newState: Partial<State>): World {
    this.state = {
      ...this.state,
      ...newState
    };
    return this;
  }
}

setWorldConstructor(_CustomWorld);

export { World, State };
