import { Modal } from ".."
import "./layout.scss"

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render({ id, children }) {
    return (
      <main id={id} styleName="layout">
        <Modal />
        {children}
      </main>
    )
  }
}
