import { Reducer } from "@services"
import { actions } from "./actions"

@Reducer
class DrawerReducer {
  initialState = {
    drawers: []
  }

  constructor() {
    this.name = `drawer`
  }

  reducer = (state = this.initialState, action) => {
    const { type, payload } = action
    switch (type) {
      case actions.DRAWER_ADD:
        return this.addDrawer(state, payload.id)
      case actions.DRAWER_REMOVE:
        return this.removeDrawer(state, payload.id)
      case actions.DRAWER_TOGGLE:
        return this.toggleDrawer(state, payload.id)
      default:
        return state
    }
  }

  addDrawer(state, id) {
    const drawers = this.getDrawers(state)
    if (drawers.some(drawer => drawer.id === id)) return drawers
    return [...drawers, { id, visible: true }]
  }

  removeDrawer(state, id) {
    this.getDrawers(state).filter(drawer => drawer.id !== id)
  }

  toggleDrawer = (state, id) => {
    const drawers = this.getDrawers(state)
    const target = drawers.find(drawer => drawer.id === id)
    if (target) target.visible = !target.visible
    return [...drawers]
  }

  getDrawers(state) {
    return state[this.name]?.drawers || []
  }

  getDrawerByID = (state, id) => {
    const drawer = this.getDrawers(state)[id]
    if (drawer) return drawer
    return null
  }

  getVisibility = (state, id) => {
    const drawer = this.getDrawerByID(state, id)
    if (drawer) return drawer.visibility
    return false
  }
}

export default new DrawerReducer()
