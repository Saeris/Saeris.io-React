import { assemble } from "@components/containers"

const Albums = assemble({
  loader: () => import(`./albums`)
})

export default {
  path: `/photography`,
  name: `albums`,
  title: `Albums`,
  component: Albums,
  exact: true,
  nav: false,
  external: false,
  icon: ``
}
