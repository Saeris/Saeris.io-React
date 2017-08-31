import { Route } from "react-router"
import { ApolloProvider } from "react-apollo"
import { ConnectedRouter } from "react-router-redux"
import { apollo, store } from "@services"
import Home from "./home/home"
import Resume from "./resume/resume"

export const Root = () => (
  <ApolloProvider store={store.state} client={apollo.client}>
    <ConnectedRouter history={store.history}>
      <Route path="/home" component={Home} />
      <Route exact path="/blog" component={Blog} />
      <Route exact path="/projects" component={Projects} />
      <Route exact path="/photography" component={Photography} />
      <Route exact path="/resume" component={Resume} />
      <Route exact path="/error" component={ErrPage} />
      <Route exact path="/test" component={Test} />
    </ConnectedRouter>
  </ApolloProvider>
)
