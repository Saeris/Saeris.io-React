//import { withRouter } from "react-router-dom"
import { Drawer, toggleDrawer } from "@components/containers"
import { Link } from "@components/core"
import routes from "@routes/routes"
import "./navigation.scss"

const selectors = (state, ownProps) => ({})

const actions = dispatch => ({
  openProfile: () => dispatch(toggleDrawer(`profile`))
})

@connect(selectors, actions)
export default class Navigation extends Component {
  render({ location, openProfile, profile, services }) {
    // console.log(location)
    //const { picture, name, location } = profile
    return (
      <nav styleName="navigation">
        <Drawer id="navigation" className="drawer">
          <section styleName="nav-wrapper">
            {!!profile && (
              <div styleName="about">
                <button click={openProfile()} title="About Me">
                  <img styleName={picture ? `` : `hidden`} src={picture} alt="Author's Picture" />
                </button>
                {!!name && <h1>{name}</h1>}
                {!!location && <h2>{location}</h2>}
              </div>
            )}

            {!!routes &&
              routes.length > 0 && (
                <ul styleName="nav-links">
                  {routes.map(
                    ({ path, title, nav, icon }) =>
                      nav && (
                        <li className={`${path ? `active` : ``}`}>
                          <Link href={path} title={title}>
                            <i className={`fa fa-${icon}`} aria-hidden="true" />
                            <span>{title}</span>
                          </Link>
                        </li>
                      )
                  )}
                </ul>
              )}

            {!!services &&
              services.length > 0 && (
                <ul styleName="socialnav nav-links">
                  {services.map(({ url, accName, icon }) => (
                    <li>
                      <Link href={url} title={accName} target="_blank">
                        <i className={`fa fa-${icon}`} aria-hidden="true" />
                        <span>{accName}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
          </section>
        </Drawer>
      </nav>
    )
  }
}
