import kleur from 'kleur'
let { bold, dim } = kleur
let { log } = console

export let printer = {
  warn(message){
    log(`${kleur['yellow'](`◸!◿`)} ${message}`)
  },
  error(message, e){
    log(`${kleur['red'](`◸x◿`)} ${message}`)
  },
  success(message){
    log(`${kleur['green'](`◸✓◿`)} ${message}`)
  },
  info(message){
    log(`${kleur['blue'](`◸/◿`)} ${message}`)
  }
}