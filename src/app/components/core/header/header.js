import { toggleDrawer, toggleModal } from "components/containers"
import './header.scss'

const selectors = (state, ownProps) => ({})

const actions = dispatch => ({
  toggleNavigation: () => dispatch(toggleDrawer(`nav`)),
  openProfile: () => dispatch(toggleModal(`profile`))
})

@connect(selectors, actions)
export default class AppHeader extends Component {
  render({ openProfile, profile, title, toggleNavigation }) {
    const { picture } = profile
    return (
      <header id="appHeader">
        <button className="menu" click={toggleNavigation()} title="Navigation">
          <span>
            <i className="fa fa-bars"></i>
          </span>
        </button>
        <h1>{title}</h1>
        {!!picture &&
          <button className="about" click={openProfile()} title="About Me">
            <img src={picture} alt="Author's Picture" />
          </button>
        }
      </header>
    )
  }
}
