import './svg.scss'

export default class Svg extends Component {
  async loadSVG(url) {
    const fragment = await new Promise((resolve, reject) => {
      Snap.load(url, loadedFragment => resolve(loadedFragment))
    })
    return fragment
  }

  async componentWillMount() {
    let svg = this.svg
    if (this.src) {
      let fragment =  await this.loadSVG(this.src)
      let contents = fragment.select(`svg`)
      let attributes = { preserveAspectRatio: `xMidYMid meet` }
      let attr = [].slice.call(contents.node.attributes)
      attr.forEach(attribute => attributes[attribute.name] = attribute.value)
      let children = [].slice.call(contents.node.children)
      children.forEach(child => svg.append(child))
      svg.attr(attributes)
    }
  }

  render({ children, ...props }) {
    return <svg {...props}>{children}</svg>
  }
}
