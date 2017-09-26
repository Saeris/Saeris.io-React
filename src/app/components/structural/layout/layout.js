import { Modal } from "@components/containers"
import { Header, Footer, Navigation } from "@components/structural"
import "./layout.scss"

export default class Layout extends Component {
  static propTypes = {
    id: PropTypes.string,
    children: PropTypes.node.isRequired
  }

  render({ id, children }) {
    return (
      <div styleName={`layout`}>
        <Modal />
        <Navigation />
        <main id={id}>
          <Header />
          {children}
          <Footer />
        </main>
      </div>
    )
  }
}
