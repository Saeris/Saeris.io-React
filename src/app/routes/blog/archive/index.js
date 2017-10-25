import { assemble } from "@components/containers"

const Archive = assemble({
  loader: () => import(`./archive`)
})

export default {
  path: `/blog/archive`,
  name: `archive`,
  title: `Archive`,
  component: Archive,
  exact: true,
  nav: true,
  external: false,
  icon: ``
}
