import { assemble } from "@components/containers"

const Err = assemble({
  loader: () => import(`./error`)
})

export default {
  path: `/error`,
  name: `error`,
  title: `Error`,
  component: Err,
  exact: true,
  nav: false,
  external: false,
  icon: ``
}
