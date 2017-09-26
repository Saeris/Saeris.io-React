import { Layout } from "@components/structural"
import { Link } from "@components/core"
import "./albums.scss"

const selectors = (state, ownProps) => ({})

const actions = dispatch => ({})

@connect(selectors, actions)
export default class Albums extends Component {
  render({ albums }) {
    return (
      <Layout id="albums">
        <section id="galleries">
          <h1>Woo I'm a list of Albums!</h1>
          <ul>
            {!!albums &&
              albums.map(({ slug, primary, title, description }) => (
                <li className="album">
                  <Link href={`/photography/${slug}`}>
                    <div className="preview">
                      <img src={primary.large} />
                      <h2>{title}</h2>
                    </div>
                  </Link>
                  {!!description && (
                    <div className="description">
                      <p>{description}</p>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </section>
      </Layout>
    )
  }
}
