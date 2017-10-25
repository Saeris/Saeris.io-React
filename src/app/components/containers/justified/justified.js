import { Pic } from "@components/core"

const round = (value, decimals) => Number(Math.round(`${value}e${decimals}e-${decimals}`))

const ratio = ({ width, height }) => width / height

const computeSizes = ({ photos, columns, width, margin }) => {
  if (!width) return []

  const rows = photos.reduce((acc, cell, i) => {
    const row = Math.floor(i / columns)
    acc[row] = acc[row] ? [...acc[row], cell] : [cell]
    return acc
  }, [])

  const rowsWithSizes = rows.map((row, rowIndex) => {
    const totalRatio = row.reduce((result, photo) => result + ratio(photo), 0)
    const rowWidth = width - row.length * (margin * 2)
    const height =
      rowIndex !== rows.length - 1 || row.length > 1 ? rowWidth / totalRatio : rowWidth / columns / totalRatio

    return row.map(photo => ({
      ...photo,
      height: round(height, 1),
      width: round(height * ratio(photo), 1)
    }))
  })
  return rowsWithSizes.reduce((acc, row) => [...acc, ...row], [])
}

export default class Justified extends React.Component {
  propTypes = {
    columns: PropTypes.number,
    margin: PropTypes.number
  }

  static defaultProps = {
    columns: 3,
    margin: 2
  }

  constructor() {
    super()
    this.state = {
      containerWidth: 0
    }
    this.handleResize = this.handleResize.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) })
    window.addEventListener(`resize`, this.handleResize)
  }

  componentDidUpdate() {
    if (this._gallery.clientWidth !== this.state.containerWidth) {
      this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) })
    }
  }

  shouldComponentUpdate() {
    return true
  }

  componentWillUnmount() {
    window.removeEventListener(`resize`, this.handleResize, false)
  }

  handleResize(e) {
    this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) })
  }

  handleClick(event, { index }) {
    const { photos, onClick } = this.props
    onClick(event, {
      index,
      photo: photos[index],
      previous: photos[index - 1] || null,
      next: photos[index + 1] || null
    })
  }

  render({ photos, columns, onClick }) {
    const width = this.state.containerWidth - 1
    const thumbs = computeSizes({ width, columns, photos })
    return (
      <div className="react-photo-gallery--gallery">
        <div>
          {thumbs.map(photo => (
            <Pic
              src={photo.images.map(img => `${img.source} ${img.width}w`)}
              sizes={photo.images.map(
                (img, i, arr) => (i < arr.length - 1 ? `(max-width: ${img.width}px) 100%` : `100%`)
              )}
            />
          ))}
        </div>
      </div>
    )
  }
}
