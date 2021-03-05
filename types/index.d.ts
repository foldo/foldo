export declare type FileInfo = {
  contents: Buffer,
  p: string,
  module: any
}

type Content = Buffer|string|undefined|null

type SingleOutput = {
  [key:string]: string | ((info:FileInfo)=>Promise<Content>|Content)
}
type AggregateOutput = {
  [key:string]: string | ((targets:[FileInfo])=>Promise<Content>|Content)
}

export declare type FoldoBuilder = {
  single?(id:string):SingleOutput,
  aggregate?:AggregateOutput
}