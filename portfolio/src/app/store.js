import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../features/ui/uiSlice'

/**
 * WHY REDUX HERE (and not just useState)?
 *
 * useState is perfect for state that lives and dies inside ONE component
 * (e.g. "is this dropdown open"). The moment two unrelated components need
 * to read or change the SAME piece of state, useState forces you into prop
 * drilling — passing values down through components that don't even use
 * them, just to relay them to a child three levels deep.
 *
 * In this portfolio, three unrelated things need the SAME state:
 *   - Navbar (theme toggle button, active section highlight)
 *   - Hero/Sections (need to know current theme to run different GSAP color tweens)
 *   - Loader (needs to tell the rest of the app "I'm done, start animating")
 *
 * Redux gives every component direct access to that shared state without
 * threading it through the tree. Overkill for a single toggle? Sure — but
 * you said you want to demonstrate the concept, so we use it where it's
 * actually justified (cross-cutting UI state) rather than everywhere.
 *
 * Rule of thumb going forward: local/component-only → useState.
 * Shared across distant components / needs to persist across route changes → Redux.
 */
export const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
})
