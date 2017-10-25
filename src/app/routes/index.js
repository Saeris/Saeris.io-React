import { ApolloProvider } from "react-apollo"
import { PersistGate } from "redux-persist/es/integration/react"
import { ConnectedRouter } from "react-router-redux"
import { apollo, store } from "@services"
import { Layout } from "@components/structural"
import { Directory } from "@routes/directory"
import routes from "@routes/routes"

export const Root = () => (
  <ApolloProvider store={store.state} client={apollo}>
    <PersistGate persistor={store.persistor}>
      <ConnectedRouter history={store.history}>
        <Layout>
          <Directory paths={routes} />
        </Layout>
      </ConnectedRouter>
    </PersistGate>
  </ApolloProvider>
)
