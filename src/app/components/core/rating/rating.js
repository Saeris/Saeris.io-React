import { Svg } from ".."
import img from "@public/images/rating.svg"
import "./rating.scss"

export default class Rating extends Component {
  getRating(score = 0) {
    switch (score) {
      case 1:
        `one`
        break
      case 2:
        `two`
        break
      case 3:
        `three`
        break
      case 4:
        `four`
        break
      case 5:
        `five`
        break
      default:
        ``
    }
  }

  render({ src }) {
    return <Svg className={this.getRating} src={!!src ? src : img} />
  }
}
