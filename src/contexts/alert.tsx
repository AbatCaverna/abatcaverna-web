import Alert from "domain/Shared/Alert";
import { createContext, ReactNode, useReducer, useState } from "react";

type AlertContextType = {
  setAlert: (alert: Alert) => void
}

type Alert = {
  message: string
  title?: string
  type?: 'info' | 'error' | 'warning' | 'success' | 'dark'
  timeOnScreen?: number
}

export const AlertContext = createContext({} as AlertContextType)

export default function AlertProvider({ children }: { children: ReactNode }) {
  const [alertData, setAlertData] = useState<Alert | undefined>()

  function setAlert(alert: Alert) {
    setAlertData(alert)

    setTimeout(() => {
      setAlertData(undefined)
    }, alert.timeOnScreen ?? 1500)
  }

  return (
    <AlertContext.Provider value={{ setAlert }}>

      {children}

      {alertData && (
        <Alert
          message={alertData.message}
          title={alertData.title}
          type={alertData.type}
        />
      )}

    </AlertContext.Provider>
  )
}
