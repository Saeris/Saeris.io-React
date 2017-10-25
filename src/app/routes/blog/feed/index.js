import { assemble } from "@components/containers"

const Feed = assemble({
  loader: () => import(`./feed`)
})

export default {
  path: `/blog`,
  name: `feed`,
  title: `Feed`,
  component: Feed,
  exact: true,
  nav: true,
  external: false,
  icon: ``
}
