import React, {
  createContext,
  useContext,
  ReactElement,
  ReactNode,
  useState,
  useEffect
} from 'react'
import { Logger } from '@oceanprotocol/lib'
import { LogLevel } from '@oceanprotocol/lib/dist/node/utils/Logger'

interface UserPreferencesValue {
  debug: boolean
  currency: string
  locale: string
  setDebug: (value: boolean) => void
  setCurrency: (value: string) => void
}

const UserPreferencesContext = createContext(null)

const localStorageKey = 'ocean-user-preferences'

function getLocalStorage(): UserPreferencesValue {
  const storageParsed =
    typeof window !== 'undefined' &&
    JSON.parse(window.localStorage.getItem(localStorageKey))
  return storageParsed
}

function setLocalStorage(values: Partial<UserPreferencesValue>) {
  return (
    typeof window !== 'undefined' &&
    window.localStorage.setItem(localStorageKey, JSON.stringify(values))
  )
}

function UserPreferencesProvider({
  children
}: {
  children: ReactNode
}): ReactElement {
  const localStorage = getLocalStorage()

  // Set default values from localStorage
  const [debug, setDebug] = useState<boolean>(localStorage?.debug || false)
  const [currency, setCurrency] = useState<string>(
    localStorage?.currency || 'EUR'
  )
  const [locale, setLocale] = useState<string>()

  // Write values to localStorage on change
  useEffect(() => {
    setLocalStorage({ debug, currency })
  }, [debug, currency])

  // Set ocean-lib-js log levels, default: Error
  useEffect(() => {
    debug === true
      ? Logger.setLevel(LogLevel.Verbose)
      : Logger.setLevel(LogLevel.Error)
  }, [debug])

  // Get locale always from user's browser
  useEffect(() => {
    if (!window) return
    setLocale(window.navigator.language)
  }, [])

  return (
    <UserPreferencesContext.Provider
      value={
        {
          debug,
          currency,
          locale,
          setDebug,
          setCurrency
        } as UserPreferencesValue
      }
    >
      {children}
    </UserPreferencesContext.Provider>
  )
}

// Helper hook to access the provider values
const useUserPreferences = (): UserPreferencesValue =>
  useContext(UserPreferencesContext)

export { UserPreferencesProvider, useUserPreferences, UserPreferencesValue }
