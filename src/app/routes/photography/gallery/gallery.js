import { Main } from "@components/structural"
import { Pic } from "@components/core"
import getAlbumPhotos from "./getAlbumPhotos.gql"
import "./gallery.scss"

const setRatio = (
  width,
  height,
  ratios = {
    0.56: `photo-9by16`,
    0.6: `photo-3by5`,
    0.66: `photo-2by3`,
    0.75: `photo-3by4`,
    0.8: `photo-4by5`,
    1: `photo-1by1`,
    1.25: `photo-5by4`,
    1.33: `photo-4by3`,
    1.5: `photo-3by2`,
    1.66: `photo-5by3`,
    1.77: `photo-16by9`,
    3: `photo-3by1`
  }
) => {
  const round = (num, places = 2) => +`${Math.round(`${num}e+${places}`)}e-${places}`
  const closest = (num, values) =>
    values.reduce((prev, curr) => (Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev))
  return ratios[parseFloat(closest(round(width / height), Object.keys(ratios)))]
}

@graphql(getAlbumPhotos, {
  options: ({ match }) => ({
    variables: {
      user: `146688070@N05`,
      slug: match?.params?.slug || ``
    },
    fetchPolicy: `cache-and-network`
  }),
  props: ({ data: { loading, user } }, ownProps) => {
    const { userId, albums } = user || {}
    const { albumId: album, title, description, views, slug, primary, photos, created, updated } = albums?.[0] || {}
    return {
      loading,
      user: userId,
      album,
      title,
      description,
      views,
      slug,
      primary,
      photos,
      created,
      updated,
      ...ownProps
    }
  }
})
export default class Gallery extends Component {
  render({ loading, user, album, title, description, views, slug, primary, photos, created, updated }) {
    return (
      <Main id="gallery">
        {!loading && (
          <section>
            <div styleName="primary">
              <Pic
                src={primary.images.map(img => `${img.source} ${img.width}w`)}
                sizes={primary.images.map(
                  (img, i, arr) => (i < arr.length - 1 ? `(max-width: ${img.width}px) 100%` : `100%`)
                )}
              />
              <h1>{title}</h1>
              <h2>{description}</h2>
              <span>
                <h3>{views}</h3>
                <h3>{created}</h3>
                <h3>{updated}</h3>
              </span>
            </div>
            <div
              styleName={`photos`}
              ref={container => {
                this.photos = container
              }}
            >
              {photos.map(({ title: alt, caption, taken, images }) => (
                <Pic
                  className={setRatio(images[0].width, images[0].height)}
                  src={images.map(({ source, width }) => `${source} ${width}w`)}
                  sizes={images.map(
                    ({ width }, i, arr) => (i < arr.length - 1 ? `(max-width: ${width}px) 100%` : `100%`)
                  )}
                  alt={alt}
                />
              ))}
            </div>
          </section>
        )}
      </Main>
    )
  }
}
