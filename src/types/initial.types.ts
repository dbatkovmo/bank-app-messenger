import {ModeLang, ModeSidebar, ModeTheme} from './base.types'

export type IMessengerProps = {
  token?: string
  theme?: ModeTheme
  fullScreen?: boolean
  sidebar?: ModeSidebar
  lang?: ModeLang
}
