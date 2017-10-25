import { assemble } from "@components/containers"

const Gallery = assemble({
  loader: () => import(`./gallery`)
})

export default {
  path: `/photography/:slug`,
  name: `gallery`,
  title: `Gallery`,
  component: Gallery,
  exact: false,
  nav: false,
  external: false,
  icon: ``
}
