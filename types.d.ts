declare module '@protorians/cli/index' {
  /**
   * RoadMap
   * --component
   * --plugin
   * --hybrid-module
   * --package
   * --stack
   * --tests
   */
  const _default: {
      run(): void;
  };
  export default _default;

}
declare module '@protorians/cli' {
  import main = require('@protorians/cli/index');
  export = main;
}