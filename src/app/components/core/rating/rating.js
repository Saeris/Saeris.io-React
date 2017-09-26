import "./rating.scss"

export default class Rating extends Component {
  render({ score, enabled }) {
    return (
      <form styleName="rating">
        {Array(5)
          .fill()
          .map((_, i) => (
            <button styleName={i < score ? `starred` : ``} disabled={!enabled}>
              <i className="fa fa-circle" />
            </button>
          ))}
      </form>
    )
  }
}
