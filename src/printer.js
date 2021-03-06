var events = require('events');
import kleur from 'kleur'
let { bold, dim } = kleur
let { log } = console

const em = new events.EventEmitter()

em.on("success", (message) => {
  log(`${kleur['green'](`◸✓◿`)} ${message}`)
})
em.on("info", (message) => {
  log(`${kleur['blue'](`◸/◿`)} ${message}`)
})
em.on("warn", (message) => {
  log(`${kleur['yellow'](`◸!◿`)} ${message}`)
})
em.on("error", (message) => {
  log(`${kleur['red'](`◸x◿`)} ${message}`)
})

export let printer = {
  warn(message){
    em.emit("warn", message)
  },
  error(message, e){
    em.emit("error", message)
  },
  success(message){
    em.emit("success", message)
  },
  info(message){
    em.emit("info", message)
  }
}