import { Main } from "@components/structural"
import { NavLink } from "react-router-dom"
import { Pic } from "@components/core"
import getAlbums from "./getAlbums.gql"
import "./albums.scss"

@graphql(getAlbums, {
  options: props => ({
    variables: { user: `146688070@N05` },
    fetchPolicy: `cache-and-network`
  }),
  props: ({ data: { loading, user } }) => ({
    loading,
    user
  })
})
export default class Albums extends Component {
  render({ user, loading }) {
    return (
      <Main id="albums">
        <section styleName="galleries">
          <ul>
            {!loading &&
              !!user.albums &&
              user.albums.map(({ slug, title, primary, description }) => (
                <li styleName="album">
                  <NavLink to={`/photography/${slug}`}>
                    <div styleName="preview">
                      <Pic
                        src={primary.images.map(img => `${img.source} ${img.width}w`)}
                        sizes={primary.images.map(
                          (img, i, arr) => (i < arr.length - 1 ? `(max-width: ${img.width}px) 100%` : `100%`)
                        )}
                      />
                      <h2>{title}</h2>
                    </div>
                  </NavLink>
                  {!!description && (
                    <div className="description">
                      <p>{description}</p>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </section>
      </Main>
    )
  }
}
