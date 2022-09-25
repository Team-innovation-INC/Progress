 import React from 'react' 
 // ** Custom Hooks
 import { useSkin } from '@hooks/useSkin' // useSkin for theme change
 import { useRTL } from "@hooks/useRTL" // useRTL for direction change
 import { useTranslation } from 'react-i18next' // useTranslation for language change
 // ** icons and components import
 import { Sun, Moon, Monitor } from 'react-feather' // react fether icons
 import { Button, ButtonGroup } from 'reactstrap' // reactstrap components
 // react-icons import
 import { BsTranslate } from 'react-icons/bs' // react-icons
 import {RiEnglishInput} from 'react-icons/ri' // english icon
 import {TbCurrencyFrank} from 'react-icons/tb' // french icon
 import ReactCountryFlag from 'react-country-flag'

const ThemeButton = ({need}) => {
    // ** Hooks
  const { skin, setSkin } = useSkin() // useSkin for theme change
  const [isRtl, setIsRtl] = useRTL() // useRTL for rtl change
  const { t, i18n } = useTranslation() // useTranslation for language change
  // ** color array for theme change
  const color =  skin === "light" ? "primary" : 'dark'  
  // ** language change
  const [open, setOpen] = React.useState(true) // language change dropdown
  const [language, setLanguage] = React.useState('en') // active language change

  return (need && <> 
  <div className='auth-footer-btn d-flex justify-content-center'> 
  <Button color={ color } onClick={() => { skin === 'dark' ? setSkin('light') : setSkin('dark') }}>
    {skin === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
  </Button>
  <Button color={ color }  onClick={() => { setIsRtl(!isRtl) }}>
    <Monitor size={14} />
  </Button>
  <Button className='me-0' color={ color } onClick={() => setOpen(!open)}>
    <BsTranslate size={14} color="white" />
  </Button>
</div> 
<div hidden={open}>
  <div className='divider my-2'>
  <div className='divider-text'>👋 {t("choose your language")} 👋</div>
  </div>
<div className='auth-footer-btn d-flex justify-content-center' > 
<ButtonGroup>
  <Button color={language === "en" ? "success" : color } onClick={() => { i18n.changeLanguage("us"); setLanguage("en"); setOpen(true) }}>
    <RiEnglishInput size={14} />
    <ReactCountryFlag className='country-flag' countryCode='us' svg />
  </Button>
  <Button className='me-0' color={language !== "en" ? "success" : color } onClick={() => { i18n.changeLanguage("fr"); setLanguage("fr"); setOpen(true) }}>
    <TbCurrencyFrank size={14} />
    <ReactCountryFlag className='country-flag' countryCode='fr' svg />
  </Button>

  </ButtonGroup>
  </div>
  </div>
   </>
  )
}

export default ThemeButton