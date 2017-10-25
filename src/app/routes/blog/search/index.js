import { assemble } from "@components/containers"

const Search = assemble({
  loader: () => import(`./search`)
})

export default {
  path: `/blog/search`,
  name: `search`,
  title: `Search`,
  component: Search,
  exact: true,
  nav: true,
  external: false,
  icon: ``
}
