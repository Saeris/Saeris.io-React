import picturefill from "picturefill"

export default class Picture extends Component {
  static propTypes = {
    sources: PropTypes.array,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
    sizes: PropTypes.string
  }

  defaultProps = {
    src: `data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==`
  }

  componentDidMount() {
    picturefill()
  }

  renderSources(sources) {
    const ieVersion = document.documentMode ? document.documentMode : -1

    if (sources === null) return null

    const mappedSources = sources.map(
      ({ srcSet, media, type }, index) =>
        (srcSet === null ? null : <source key={index} srcSet={srcSet} media={media} type={type} />)
    )

    if (ieVersion === 9) return <video style={{ display: `none` }}>{mappedSources}</video>

    return mappedSources
  }

  renderImage({ alt, src, sizes, ...rest }, skipSizes = false) {
    const sizesProp = skipSizes ? null : { sizes }

    return <img alt={alt} srcSet={src} data-no-retina={true} {...sizesProp} {...rest} />
  }

  render({ sources, ...rest }) {
    return sources ? (
      <picture>
        {this.renderSources(sources)}
        {this.renderImage(rest, true)}
      </picture>
    ) : (
      this.renderImage(rest)
    )
  }
}
