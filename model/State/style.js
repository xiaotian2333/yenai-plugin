import { Config } from "../../components/index.js"
import { createAbortCont } from "./utils.js"
import fs from "fs"
import _ from "lodash"

export default async function getStyle() {
  return {
    backdrop: await getBackground()
  }
}
export async function getBackground() {
  const { backdrop, backdropDefault } = Config.state
  let { clearTimeout } = await createAbortCont(5000)
  const bg = getDefaultBackdrop(backdropDefault)
  backdrop
  clearTimeout()
  return bg
}

function getDefaultBackdrop(backdropDefault) {
  const Plugin_Path = "../../../../../plugins/yenai-plugin"
  const Bg_Path = "./plugins/yenai-plugin/resources/state/img/bg"
  if (backdropDefault === "random") {
    backdropDefault = _.sample(fs.readdirSync(Bg_Path))
    logger.debug(`[Yenai-Plugin][状态]使用随机背景图 “${backdropDefault}”`)
  }
  return `${Plugin_Path}/resources/state/img/bg/${backdropDefault}`
}
