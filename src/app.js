// NOTE: This project is using Webpack's providePlugin feature to make frequently used
// libraries such as React available without the need to explicitly import them in every file
import { render } from "preact"
import { AppContainer } from "react-hot-loader" //eslint-disable-line
import { Root } from "@routes"
import "./style/global.scss"

export const renderApp = (Component) => {
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.querySelector(`#app`)
  )
}

renderApp(Root)

if (module.hot) module.hot.accept(`./app/routes`, () => renderApp(Root))
