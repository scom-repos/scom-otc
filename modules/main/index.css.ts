import { Styles } from '@ijstech/components';
import Assets from '@modules/assets';
import { MAX_HEIGHT, MAX_WIDTH } from '@modules/store';

const colorVar = {
  primaryButton: 'transparent linear-gradient(90deg, #AC1D78 0%, #E04862 100%) 0% 0% no-repeat padding-box',
  primaryGradient: 'linear-gradient(255deg,#f15e61,#b52082)',
  darkBg: '#181E3E 0% 0% no-repeat padding-box',
  primaryDisabled: 'transparent linear-gradient(270deg,#351f52,#552a42) 0% 0% no-repeat padding-box !important'
}

Styles.fontFace({
  fontFamily: "Apple SD Gothic Neo",
  src: `url("${Assets.fullPath('fonts/FontsFree-Net-Apple-SD-Gothic-Neo-Bold.ttf')}") format("truetype")`,
  fontWeight: 'bold',
  fontStyle: 'normal'
})

Styles.fontFace({
  fontFamily: "Montserrat Regular",
  src: `url("${Assets.fullPath('fonts/montserrat/Montserrat-Regular.ttf')}") format("truetype")`,
  fontWeight: 'nomal',
  fontStyle: 'normal'
})

Styles.fontFace({
  fontFamily: "Montserrat Bold",
  src: `url("${Assets.fullPath('fonts/montserrat/Montserrat-Bold.ttf')}") format("truetype")`,
  fontWeight: 'bold',
  fontStyle: 'normal'
})

Styles.fontFace({
  fontFamily: "Montserrat Light",
  src: `url("${Assets.fullPath('fonts/montserrat/Montserrat-Light.ttf')}") format("truetype")`,
  fontStyle: 'normal'
})

Styles.fontFace({
  fontFamily: "Montserrat Medium",
  src: `url("${Assets.fullPath('fonts/montserrat/Montserrat-Medium.ttf')}") format("truetype")`,
  fontStyle: 'normal'
})

Styles.fontFace({
  fontFamily: "Montserrat SemiBold",
  src: `url("${Assets.fullPath('fonts/montserrat/Montserrat-SemiBold.ttf')}") format("truetype")`,
  fontStyle: 'normal'
})

Styles.fontFace({
  fontFamily: "Raleway Regular",
  src: `url("${Assets.fullPath('fonts/raleway/Raleway-Regular.ttf')}") format("truetype")`,
  fontWeight: 'nomal',
  fontStyle: 'normal'
})

Styles.fontFace({
  fontFamily: "Raleway Bold",
  src: `url("${Assets.fullPath('fonts/raleway/Raleway-Bold.ttf')}") format("truetype")`,
  fontWeight: 'bold',
  fontStyle: 'normal'
})

Styles.fontFace({
  fontFamily: "Raleway Light",
  src: `url("${Assets.fullPath('fonts/raleway/Raleway-Light.ttf')}") format("truetype")`,
  fontStyle: 'normal'
})

Styles.fontFace({
  fontFamily: "Raleway Medium",
  src: `url("${Assets.fullPath('fonts/raleway/Raleway-Medium.ttf')}") format("truetype")`,
  fontStyle: 'normal'
})

Styles.fontFace({
  fontFamily: "Raleway SemiBold",
  src: `url("${Assets.fullPath('fonts/raleway/Raleway-SemiBold.ttf')}") format("truetype")`,
  fontStyle: 'normal'
})

Styles.cssRule('.pageblock-otc-queue', {
  $nest: {
    'i-label': {
      fontFamily: 'Montserrat Regular',
      color: '#fff',
    },
    'span': {
      letterSpacing: '0.15px',
    },
    '#otcQueueElm': {
      background: '#0c1234',
    },
    '.i-loading-overlay': {
      background: '#0c1234',
    },
    '.overflow-inherit': {
      overflow: 'inherit',
    },
    '::selection': {
      color: '#fff',
      background: '#1890ff'
    },
    '.btn-os': {
      background: colorVar.primaryButton,
      height: 'auto !important',
      color: '#fff',
      transition: 'background .3s ease',
      fontSize: '1rem',
      fontWeight: 'bold',
      fontFamily: 'Raleway Bold',
      $nest: {
        'i-icon.loading-icon': {
          marginInline: '0.25rem',
          width: '16px !important',
          height: '16px !important',
        },
      },
    },
    '.btn-os:not(.disabled):not(.is-spinning):hover, .btn-os:not(.disabled):not(.is-spinning):focus': {
      background: colorVar.primaryGradient,
      backgroundColor: 'transparent',
      boxShadow: 'none',
      opacity: .9
    },
    '.btn-os:not(.disabled):not(.is-spinning):focus': {
      boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)'
    },
    '.btn-os.disabled, .btn-os.is-spinning': {
      background: colorVar.primaryDisabled,
      opacity: 1
    },
    '.dark-bg, .dark-modal > div > div': {
      background: colorVar.darkBg,
      borderRadius: 5
    },
    '.btn-transparent, .btn-transparent:not(.disabled):focus, .btn-transparent:not(.disabled):hover': {
      background: 'transparent',
      boxShadow: 'none',
      backgroundColor: 'transparent'
    },
    '.mr-0-5': {
      marginRight: '.5rem'
    },
    '.ml-0-5': {
      marginLeft: '.5rem'
    },
    '.mb-0-5': {
      marginBottom: '.5rem'
    },
    '.hidden': {
      display: 'none !important'
    },
    '.no-wrap': {
      whiteSpace: 'nowrap'
    },
    '.flex-nowrap': {
      flexWrap: 'nowrap',
    },
    '.py-1': {
      paddingTop: '1rem',
      paddingBottom: '1rem'
    },
    '.px-1': {
      paddingLeft: '1rem',
      paddingRight: '1rem'
    },
    '.align-middle': {
      alignItems: 'center'
    },
    '.otc-queue-layout': {
      width: '100%',
      marginInline: 'auto',
      overflow: 'hidden',
    },
    'i-link': {
      display: 'flex',
      $nest: {
        '&:hover *': {
          color: '#fff',
          opacity: 0.9,
        },
      },
    },
    '.opacity-50': {
      opacity: 0.5
    },
    '.cursor-default': {
      cursor: 'default',
    },
    '.text-overflow': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '.line-clamp': {
      display: '-webkit-box',
      '-webkit-line-clamp': 5,
      // @ts-ignore
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden'
    },
    '.smart-contract--link span': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    'i-progress': {
      $nest: {
        '.i-progress_wrapbar': {
          borderRadius: 15,
        },
        '.i-progress_bar.has-bg': {
          background: '#232B5A',
        },
        '.i-progress--active': {
          $nest: {
            '.i-progress_wrapbar > .i-progress_overlay': {
              background: 'linear-gradient(255deg,#f15e61,#b52082) !important'
            }
          }
        }
      }
    },
    '.wrapper': {
      width: '100%',
      height: '100%',
      maxWidth: MAX_WIDTH,
      maxHeight: MAX_HEIGHT,
      $nest: {
        '.bg-color': {
          display: 'flex',
          flexDirection: 'column',
          color: '#fff',
          minHeight: '485px',
          height: '100%',
          borderRadius: '15px',
          paddingBottom: '1rem',
          position: 'relative',
        },
        '.btn-import, .btn-sell': {
          width: 370,
          maxWidth: '100%',
          padding: '0.625rem 0',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          borderRadius: 12,
        },
        '.btn-max': {
          height: '12px !important',
          marginBlock: 'auto',
        },
        '.no-campaign': {
          padding: '3rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          justifyContent: 'center',
          $nest: {
            'i-label > *': {
              fontSize: '1.5rem',
              marginTop: '1rem',
            }
          }
        },
        '.slider-arrow': {
          fill: '#f15e61',
        }
      },
    },
    '.custom-timer': {
      display: 'flex',
      $nest: {
        '.timer-value': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(255deg,#f15e61,#b52082)',
          borderRadius: 4,
          paddingInline: 4,
          minWidth: 20,
          height: 20,
          fontSize: 14,
          fontFamily: 'Montserrat Regular',
        },
        '.timer-unit': {
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
    '.input-amount > input': {
      border: 'none',
      width: '100% !important',
      height: '100% !important',
      backgroundColor: 'transparent',
      color: '#fff',
      fontSize: '1rem',
      textAlign: 'right',
    },
    '.highlight-box': {
      borderColor: '#E53780 !important'
    },
    '.ml-auto': {
      marginLeft: 'auto',
    },
    '.mr-025': {
      marginRight: '0.25rem',
    },
    '.input-disabled': {
      opacity: 0.4,
      cursor: 'default',
      $nest: {
        '*': {
          cursor: 'default',
        }
      }
    },
    '#importFileErrModal': {
      $nest: {
        '.modal': {
          borderRadius: 12,
        },
        '.i-modal_header': {
          marginBottom: '1.5rem',
          paddingBottom: '0.5rem',
          borderBottom: `2px solid #F15E61`,
          color: '#F15E61',
          fontSize: '1.25rem',
          fontWeight: 700,
        },
        '.i-modal_header > i-icon': {
          fill: `#F15E61 !important`
        },
        '#importFileErr span': {
          fontSize: '16px !important'
        }
      }
    },
    '#loadingElm.i-loading--active': {
      marginTop: '2rem',
      position: 'initial',
      $nest: {
        '#otcQueueElm': {
          display: 'none !important',
        },
        '.i-loading-spinner': {
          marginTop: '2rem',
        },
      },
    },
    '.connect-wallet': {
      display: 'block',
      textAlign: 'center',
      paddingTop: '1rem',
    },
  }
})
