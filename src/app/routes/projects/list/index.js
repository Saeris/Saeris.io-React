import { assemble } from "@components/containers"

const List = assemble({
  loader: () => import(`./list`)
})

export default {
  path: `/projects`,
  name: `list`,
  title: `Projects List`,
  component: List,
  exact: true,
  nav: false,
  external: false,
  icon: ``
}
