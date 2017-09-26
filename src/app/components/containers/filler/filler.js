import "./filler.scss"

export const Filler = ({ type, children, Component }) => {
  switch (type) {
    case `text`:
      return <p>{children}</p>
    case `image`:
      return <img>{children}</img>
    case `component`:
      return <Component>{children}</Component>
    default:
      return <div>{children}</div>
  }
}
