import { Modal } from "@components/containers"
import { Navigation } from "@components/structural"
import "./layout.scss"

export const Layout = ({ children }) => (
  <div styleName={`layout`}>
    <Modal />
    <Navigation />
    {children}
  </div>
)
