import { useEffect } from 'react'
import type { RefObject } from 'react'

// Calls onOutside when the user presses the mouse anywhere outside `ref`'s element.
// The listener is only attached while `enabled` is true.
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  onOutside: () => void,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return

    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onOutside()
      }
    }
    document.addEventListener('mousedown', handle)

    // Cleanup: remove the listener when the card closes or the component goes away,
    // otherwise old listeners would pile up and keep firing.
    return () => document.removeEventListener('mousedown', handle)
  }, [ref, onOutside, enabled])
}
