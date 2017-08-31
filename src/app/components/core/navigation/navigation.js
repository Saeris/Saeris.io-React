import { Drawer, toggleModal } from "@components/containers"
import { Link } from "@components/core"
import "./navigation.scss"

const selectors = (state, ownProps) => ({})

const actions = dispatch => ({
  openProfile: () => dispatch(toggleModal(`profile`))
})

@connect(selectors, actions)
export default class Navigation extends Component {
  render({ openProfile, profile, services }) {
    const { picture, name, location } = profile
    return (
      <nav id="main-nav">
        <Drawer id="navigation">
          <section className="nav-wrapper">
            <div id="about">
              <button click={openProfile()} title="About Me">
                <img className={picture ? `` : `hidden`} src={picture} alt="Author's Picture" />
              </button>
              {!!name && <h1>{name}</h1>}
              {!!location && <h2>{location}</h2>}
            </div>

            <ul id="sitenav" class="nav-links">
              {router.navigation.map(({ isActive, href, title, icon }) => (
                <li className={`${isActive ? `active` : ``}`}>
                  <Link href={href} title={title}>
                    <i className={`fa fa-${icon}`} aria-hidden="true" />
                    <span>{title}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <ul id="socialnav" class="nav-links">
              {services.map(({ url, accName, icon }) => (
                <li>
                  <Link href={url} title={accName} target="_blank">
                    <i className={`fa fa-${icon}`} aria-hidden="true" />
                    <span>{accName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </Drawer>
      </nav>
    )
  }
}
