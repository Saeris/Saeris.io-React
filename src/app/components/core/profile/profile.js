import { Link } from ".."
import { Modal, toggleModal } from "@components/containers"
// import Reducer from "./reducer"
import "./profile.scss"

const selectors = (state, ownProps) => ({})

const actions = dispatch => ({
  closeProfile: () => dispatch(toggleModal(`profile`))
})

@connect(selectors, actions)
export default class Profile extends Component {
  render({ closeProfile, profile, services }) {
    const { picture, name, title, location, job, bio } = profile
    return (
      <Modal id="profile">
        <section>
          <button click={closeProfile()}>
            <span>
              <i className="fa fa-remove" />
            </span>
          </button>
          <span className="avatar-wrapper">
            <img className={picture ? `` : `hidden`} src={picture} alt="Author's Picture" />
          </span>
          {!!name && <h1>{name}</h1>}
          {!!title && (
            <h2>
              <i className="fa fa-briefcase" />
              {job}
            </h2>
          )}
          {!!location && (
            <h2>
              <i className="fa fa-map-marker" />
              {location}
            </h2>
          )}
          {!!bio && <p>{bio}</p>}
          <ul>
            {services.map(({ url, accName, icon }) => (
              <li>
                <Link href={url} title={accName} target="_blank">
                  <i className={`fa fa-${icon}`} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Modal>
    )
  }
}
