import { connect } from "react-redux"
import { addDrawer, removeDrawer, toggleDrawer } from "./actions"
import DrawerReducer from "./reducer" // eslint-disable-line

const selectors = (state, ownProps) => ({})

const actions = dispatch => ({
  add: () => dispatch(addDrawer()),
  remove: () => dispatch(removeDrawer()),
  toggle: () => dispatch(toggleDrawer())
})

@connect(selectors, actions)
export default class Drawer extends Component {
  componentDidMount() {
    this.props.add(this.props.id)
  }

  componentWillUnmount() {
    this.props.remove(this.props.id)
  }

  render({ children, id, toggle }) {
    return (
      <div id={id} className={`drawer ${open ? `open` : ``}`}>
        {children}
      </div>
    )
  }
}
