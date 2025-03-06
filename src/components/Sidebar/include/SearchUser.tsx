import React, {useState} from 'react'
import {useTranslate} from '../../../core/hooks/useTranslate'
import {useSettings} from '../../../core/hooks/useSettings'
import {useData} from '../../../core/hooks/useData'
import {useColors} from '../../../core/hooks/useColors'
import useDebounced from '../../../core/hooks/useDebounce'
import {Loader} from '../../ui/Loader/Loader'
import {ButtonIcon} from '../../ui/ButtonIcon/ButtonIcon'
import {replaceSvgFill} from '../../../utils/tools'
import {imagesUrl} from '../../../configs/images-url'

export const SearchUser = () => {
  const [loading, setLoading] = useState(false)
  const {searchText, setSearchText} = useData()
  const {sidebar, setSidebar} = useSettings()
  const {color} = useColors()
  const {t} = useTranslate()

  const handleOpenSearch = () => {
    if (sidebar === 'full') {
      return
    }
    setSidebar(sidebar !== 'mini' ? 'mini' : 'full')
  }

  const handleCloseSidebar = () => {
    setSidebar('none')
  }

  const debounceSearch = useDebounced((text: string) => {
    if (!text.trim().length) {
      if (searchText) {
        setSearchText('')
      }
    } else {
      setSearchText(text.trim())
    }
    setLoading(false)
  }, 800)

  return (
    <div className="msgr__search-user" onClick={handleOpenSearch}>
      {sidebar !== 'mini' ? (
        <>
          <ButtonIcon
            icon={<img src={replaceSvgFill(imagesUrl.close, color)} alt="close" />}
            onClick={handleCloseSidebar}
            tooltip={t('tooltips.close_sidebar')}
          />
          <div className="msgr__search-user_form">
            <input
              placeholder={t('placeholders.search')}
              type="text"
              defaultValue={searchText}
              onChange={e => {
                setLoading(true)
                debounceSearch(e.target.value)
              }}
            />
          </div>
        </>
      ) : null}

      <ButtonIcon
        icon={
          loading ? (
            <Loader size={16} />
          ) : (
            <img src={replaceSvgFill(imagesUrl.search, color)} alt="search" />
          )
        }
        width={sidebar === 'mini' ? '100%' : false}
      />
    </div>
  )
}
