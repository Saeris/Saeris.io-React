import { connect } from "react-redux"
import { addDrawer, removeDrawer, toggleDrawer } from './actions'
import DrawerReducer from "./reducer"

const selectors = (state, ownProps) => ({
  id: DrawerReducer.getCurrent(state),
  visible: id => DrawerReducer.getVisibility(state, id),
  component: id => DrawerReducer.getComponent(state, id)
})

const actions = dispatch => ({
  add: () => dispatch(addDrawer()),
  remove: () => dispatch(removeDrawer()),
  toggle: () => dispatch(toggleDrawer())
})

@connect(selectors, actions)

export default class Drawer extends Component {
  componentDidMount() {
    this.props.add()
  }

  componentWillUnmount() {
    this.props.remove(this.props.id)
  }

  render({ children, id, toggle }) {
    return (
      <div id={id} className={`drawer ${open ? `open` : ``}`} onClick={toggle(id)}>
        {children}
      </div>
    )
  }
}
