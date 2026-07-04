import { useSyncExternalStore } from 'react'
import { subscribe, getState } from './store'

/** Stato globale reattivo: ogni mutazione dello store ri-renderizza chi lo usa. */
export function useStore() {
  return useSyncExternalStore(subscribe, getState)
}
