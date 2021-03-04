export declare type FileInfo = {
  contents: string,
  p: string,
  module: any
}

type Content = Promise<string>|string|undefined|null

type SingleOutput = {
  [key:string]: string | ((info:FileInfo)=>Content)
}
type AggregateOutput = {
  [key:string]: string | ((targets:[FileInfo])=>Content)
}

export declare type FoldoBuilder = {
  single?(id:string):SingleOutput,
  aggregate?:AggregateOutput
}