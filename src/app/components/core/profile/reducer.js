import GitHub from "github-api"
import config from "../../../../config/app.config"
import { Reducer } from "../../../services"
import { actions } from "./actions"

@Reducer
class ProfileReducer {
  initialState = {
    visible: false,
    name: ``,
    location: ``,
    picture: ``,
    bio: ``
  }

  reducer = (state = this.initialState, action) => {
    switch (action.type) {
      case actions.FETCH_PROFILE:
        return { ...state, ...action.payload }
      default:
        return state
    }
  }
}

export default new ProfileReducer()
