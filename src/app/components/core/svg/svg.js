import snap from "snapsvg-cjs"
import "./svg.scss"

export default class Svg extends Component {
  async svgRender() {
    let svg = snap(this.svg)
    if (this.props.src) {
      const fragment = await new Promise((resolve, reject) => {
        snap.load(this.props.src, loadedFragment => resolve(loadedFragment))
      })
      const contents = fragment.select(`svg`)
      let attributes = { preserveAspectRatio: `xMidYMid meet` }
      let attr = [].slice.call(contents.node.attributes)
      attr.forEach(({ name, value }) => {
        attributes[name] = value
      })
      let children = [].slice.call(contents.node.children)
      children.forEach(child => svg.append(child))
      svg.attr(attributes)
    }
  }

  componentDidMount() {
    this.svgRender()
  }

  componentDidUpdate() {
    this.svgRender()
  }

  render({ children, classes, ...props }) {
    return (
      <svg
        ref={el => {
          this.svg = el
        }}
        {...props}
      >
        {children}
      </svg>
    )
  }
}
