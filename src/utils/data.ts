import {IUser} from '../core/context/DataContext'
import {LOCALSTORAGE} from '../configs/localstorage'
import {ModeLang, ModeTheme} from '../types/base.types'

export const defineStartTheme = (passedTheme: ModeTheme) => {
  const savedTheme = window.localStorage.getItem(LOCALSTORAGE.THEME) as ModeTheme

  return savedTheme ? savedTheme : passedTheme
}

export const defineStartLang = (PassedLang: ModeLang) => {
  const savedLang = window.localStorage.getItem(LOCALSTORAGE.LANG) as ModeLang

  return savedLang ? savedLang : PassedLang
}

export const searchUsers = (users: IUser[], searchString: string): IUser[] => {
  const lowerSearch = searchString.toLowerCase()

  return users.filter(user => {
    return (
      user.email.toLowerCase().includes(lowerSearch) ||
      user.first_name.toLowerCase().includes(lowerSearch) ||
      user.second_name.toLowerCase().includes(lowerSearch)
    )
  })
}

export const sortByUserUuid = (users: IUser[], userId: string): IUser[] => {
  // Создаём копию массива, чтобы не изменять исходный
  const result = [...users]
  // Находим индекс элемента с uuid === userId
  const targetIndex = result.findIndex(item => item.uuid === userId)

  // Если элемент найден и он не на первом месте, перемещаем его в начало
  if (targetIndex > 0) {
    const [targetItem] = result.splice(targetIndex, 1) // Удаляем элемент из его текущей позиции
    result.unshift(targetItem) // Добавляем его в начало
  }
  return result
}

// timestamp to locale 15:40
export const formatterDateMsg = (timestamp: Date): string => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // 24-часовой формат
  })
}

// Поиск переводов по словарю
export const getNestedValue = (obj: Record<string, any>, path: string): string => {
  const keys = path.split('.')
  let current: any = obj

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      return path
    }
  }

  return typeof current === 'string' ? current : path
}
