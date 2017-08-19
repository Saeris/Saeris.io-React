import { Reducer } from "../../../services"
import { actions } from "./actions"

@Reducer
class DrawerReducer {
  initialState = {
    current: null,
    modals: []
  }

  reducer = (state = this.initialState, action) => {
    const { type, payload } = action
    switch (type) {
      case actions.MODAL_ADD:
        return this.addModal(state, payload)
      case actions.MODAL_REMOVE:
        return this.removeModal(state, payload.id)
      case actions.MODAL_TOGGLE:
        return this.toggleModal(state, payload.id)
      default:
        return state
    }
  }

  reducer = (state = this.initialState, action) => {
    switch (action.type) {
      case this.actions.DRAWER_ADD:
        return this.addDrawer(state, action.payload)
      case this.actions.DRAWER_REMOVE:
        return this.removeDrawer(state, action.payload)
      case this.actions.DRAWER_TOGGLE:
        return this.toggleDrawer(state, action.payload)
      default:
        return state
    }
  }

  addDrawer(state, payload) {
    if (state.some(drawer => drawer.id === payload.id)) {
      return state
    }

    return [...state, payload]
  }

  removeDrawer(state, id) {
    const drawers = state.filter(drawer => drawer.id !== id)

    return [...drawers]
  }

  toggleDrawer(state, id) {
    const drawers = state.map((drawer) => {
      if (drawer.id === id) drawer.open = !drawer.open
      return drawer
    })

    return [...drawers]
  }
}

export default new DrawerReducer()
