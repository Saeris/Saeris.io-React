import { Layout } from "@components/containers"
import { Link } from "@components/core"
//import { Flickr } from "services"
import "./photography.scss"

const selectors = (state, ownProps) => ({})

const actions = dispatch => ({})

@connect(selectors, actions)
export class Photography extends Component {
  render({ albums }) {
    return (
      <Layout id="Photography">
        <section id="galleries">
          <ul>
            {albums.map(({ slug, primary, title, description }) => (
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
