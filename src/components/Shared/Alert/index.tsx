import { BsInfoCircleFill } from 'react-icons/bs'

type AlertProps = {
  message: string
  title?: string
  type?: 'info' | 'error' | 'warning' | 'success'
  timeOnScreen?: number
}

export default function Alert({message, title = "", type = "info", timeOnScreen = 1000}: AlertProps) {
  return (
    <div>
      <BsInfoCircleFill/>
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  )
}