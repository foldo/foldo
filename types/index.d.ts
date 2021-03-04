export type FileInfo = {
  contents: string,
  p: string,
  module: object
}

type SingleOutput = {
  [key:string]: string | ((info:FileInfo)=>Promise<string>|string)
}
type AggregateOutput = {
  [key:string]: string | ((targets:[FileInfo])=>Promise<string>|string)
}

export type FoldoBuilder = {
  single?(id:string):SingleOutput,
  aggregate?:AggregateOutput
}