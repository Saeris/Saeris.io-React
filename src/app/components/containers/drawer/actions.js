export const actions = {
  DRAWER_ADD: `DRAWER_ADD`,
  DRAWER_REMOVE: `DRAWER_REMOVE`,
  DRAWER_TOGGLE: `DRAWER_TOGGLE`
}

export const addDrawer = id => ({
  type: actions.DRAWER_ADD,
  payload: { id }
})

export const removeDrawer = id => ({
  type: actions.DRAWER_REMOVE,
  payload: { id }
})

export const toggleDrawer = id => ({
  type: actions.DRAWER_TOGGLE,
  payload: { id }
})
