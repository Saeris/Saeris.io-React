import { toggleDrawer, toggleModal } from "@components/containers"
import "./header.scss"

const selectors = (state, ownProps) => ({})

const actions = dispatch => ({
  toggleNavigation: () => dispatch(toggleDrawer(`nav`)),
  openProfile: () => dispatch(toggleModal(`profile`))
})

@connect(selectors, actions)
export default class AppHeader extends Component {
  render({ openProfile, profile, title, toggleNavigation }) {
    return (
      <header id="appHeader">
        <button className="menu" click={toggleNavigation()} title="Navigation">
          <span>
            <i className="fa fa-bars" />
          </span>
        </button>
        <h1>{title}</h1>
        {!!profile &&
          !!profile.picture && (
            <button className="about" click={openProfile()} title="About Me">
              <img src={profile.picture} alt="Author's Picture" />
            </button>
          )}
      </header>
    )
  }
}
