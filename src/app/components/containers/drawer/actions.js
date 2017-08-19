export const actions = {
  DRAWER_ADD: `DRAWER_ADD`,
  DRAWER_REMOVE: `DRAWER_REMOVE`,
  DRAWER_TOGGLE: `DRAWER_TOGGLE`
}

export const addDrawer = (component, props, visible = false) => ({
  type: actions.DRAWER_OPEN,
  payload: { component, props, visible }
})

export const removeDrawer = id => ({
  type: actions.DRAWER_REMOVE,
  payload: { id }
})

export const toggleDrawer = id => ({
  type: actions.DRAWER_TOGGLE,
  payload: { id }
})
