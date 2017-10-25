import { assemble } from "@components/containers"

const Resume = assemble({
  loader: () => import(`./resume`)
})

export default {
  path: `/`,
  name: `resume`,
  title: `Resume`,
  component: Resume,
  exact: true,
  nav: true,
  external: false,
  icon: `id-card-o`
}
