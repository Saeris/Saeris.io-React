import { assemble } from "@components/containers"

const Home = assemble({
  loader: () => import(`./home`)
})

export default {
  path: `/home`,
  name: `home`,
  title: `Home`,
  component: Home,
  exact: true,
  nav: false,
  external: false,
  icon: `home`
}
