import { assemble } from "@components/containers"

const Tags = assemble({
  loader: () => import(`./tags`)
})

export default {
  path: `/blog/tags`,
  name: `tags`,
  title: `Tags`,
  component: Tags,
  exact: true,
  nav: true,
  external: false,
  icon: ``
}
