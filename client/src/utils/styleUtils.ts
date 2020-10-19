import { CSSProperties } from "@material-ui/core/styles/withStyles"

export const flexStyles = ({
  display = 'flex',
  justifyContent = 'center',
  alignItems = 'center',
  flexDirection = 'row'
}: CSSProperties): CSSProperties => {
  return {
    display,
    justifyContent,
    alignItems,
    flexDirection
  }
}

export const backgroundImage = (url: string) => {
  return {
    '&::after': {
      backgroundImage: `url(${url})`,
      opacity: 0.6,
      backgroundPosition: 'center', 
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      content: '""',
      zIndex: -1
    }
  }
}