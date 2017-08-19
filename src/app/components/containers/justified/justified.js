import justifiedLayout from "justified-layout"
import { take, zip } from "lodash"

const Style = { position: `relative` }

export default class JustifiedLayout extends Component {
  static propTypes = {
    boxSpacing: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        horizontal: PropTypes.number.isRequired,
        vertical: PropTypes.number.isRequired
      })
    ]),
    children: PropTypes.node,
    containerPadding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        bottom: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        right: PropTypes.number.isRequired,
        top: PropTypes.number.isRequired
      })
    ]),
    containerWidth: PropTypes.number,
    forceAspectRation: PropTypes.oneOfType([PropTypes.boolean, PropTypes.number]),
    fullWidthBreakoutRowCadence: PropTypes.oneOfType([PropTypes.boolean, PropTypes.number]),
    maxNumRows: PropTypes.number,
    showWidows: PropTypes.bool,
    targetRowHeight: PropTypes.number,
    targetRowHeightTolerance: PropTypes.number,
    widowLayoutStyle: PropTypes.string
  }

  static defaultProps = {
    boxSpacing: 10,
    containerPadding: 10,
    containerWidth: 1060,
    forceAspectRation: false,
    fullWidthBreakoutRowCadence: false,
    maxNumRows: Number.POSITIVE_INFINITY,
    showWidows: true,
    targetRowHeight: 320,
    targetRowHeightTolerance: 0.25,
    widowLayoutStyle: `left`
  }

  extractDimension({ props }) {
    if (!props) return 0

    if (props.aspectRatio) return props.aspectRatio

    return { height: props.style.height, width: props.style.width }
  }

  normalizeDimension = (dimension) => {
    if (isNumber(dimension)) return dimension
    if (dimension.height && dimension.width) return dimension.width / dimension.height
    return 0
  }

  render({ children, style, ...config }) {
    const childDims = React.Children.map(children, this.extractDimension).map(this.normalizeDimension)

    const { containerHeight, boxes } = justifiedLayout(childDims, config)
    const elementLayout = zip(take(children, boxes.length), boxes)

    return (
      <div style={{ ...Style, ...style, height: containerHeight, width: this.props.containerWidth }}>
        {elementLayout.map(([element, layout]) =>
          React.cloneElement(element, {
            ...element.props,
            style: { ...element.props.style, position: `absolute`, ...layout }
          })
        )}
      </div>
    )
  }
}
