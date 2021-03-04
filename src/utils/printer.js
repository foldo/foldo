import kleur from 'kleur'
let { bold, dim } = kleur
let { log } = console

export let printer = {
  warn(message){
    log(`${kleur['yellow'](`◸!◿`)} ${dim(':')} ${message}`)
  },
  error(message, e){
    log(`${kleur['red'](`◸x◿`)} ${dim(':')} ${message}`)
  },
  success(message){
    log(`${kleur['green'](`◸✓◿`)} ${dim(':')} ${message}`)
  },
  info(message){
    log(`${kleur['blue'](`◸/◿`)} ${dim(':')} ${message}`)
  }
}