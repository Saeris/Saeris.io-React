import { Layout } from "@components/structural"
//import { Flickr } from "services"
import "./gallery.scss"

const selectors = (state, ownProps) => ({})

const actions = dispatch => ({})

@connect(selectors, actions)
export default class Gallery extends Component {
  render() {
    return (
      <Layout id="gallery">
        <section>
          <h1>Woo I'm a Gallery!</h1>
        </section>
      </Layout>
    )
  }
}
