import {ISignalStack} from "@protorians/core";

export type IDumperScheme = {
  meta: IDumperMeta;
  payload: IDumperPayloads
}

export type IDumperMeta = IDumperConfig & {
  timestamp: number;
}

export type IDumperContext = {
  instance: IDumper;
  data: IDumperPayload
}

export type IDumperPayload = {
  name: string;
  file: string;
}

export type ICapabilityConfig = {
  name: string;
  description?: string;
  command: string;
  options: string[][];
  files?: string[];
}

  export type IDumperPayloads = {
  [K: string]: ICapabilityConfig
}

export type IDumperConfig = {
  directory: string;
  prebuild: boolean;
  output: string;
  allow: (string | RegExp)[];
}

export interface IDumperSignalMap {
  commit: IDumperContext;
  commits: {
    name: string;
    instance: IDumper;
    files: string[]
  };
}

export interface IDumper {

  readonly signal: ISignalStack<IDumperSignalMap>

  readonly config: IDumperConfig;

  // commit(filename: string): this;
  //
  // commits(name: string, files: string[]): this;

  // onCommit(filename: string): boolean;
  //
  // onCommits(name: string, files: string[]): boolean;

  // push(): this;

  start(): this;

}