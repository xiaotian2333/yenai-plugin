import Ver from "./components/Version.js"
import chalk from "chalk"
import Data from "./components/Data.js"

logger.info(chalk.rgb(253, 235, 255)("----ヾ(￣▽￣)Bye~Bye~----"))
logger.info(chalk.rgb(134, 142, 204)(`椰奶插件${Ver.ver}初始化~`))
logger.info(chalk.rgb(253, 235, 255)("-------------------------"))

global.ReplyError = class ReplyError extends Error {
  constructor(message) {
    super(message)
    this.name = "ReplyError"
  }
}

const appsPath = "./plugins/yenai-plugin/apps"
const jsFiles = Data.readDirRecursive(appsPath, "js", "events")

let ret = jsFiles.map(file => {
  return import(`./apps/${file}`)
})

ret = await Promise.allSettled(ret)

let apps = {}
for (let i in jsFiles) {
  let name = jsFiles[i].replace(".js", "")

  if (ret[i].status != "fulfilled") {
    logger.error(`载入插件错误：${logger.red(name)}`)
    logger.error(ret[i].reason)
    continue
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}

export { apps }
