import { assemble } from "@components/containers"

const Post = assemble({
  loader: () => import(`./post`)
})

export default {
  path: `/blog/:post`,
  name: `post`,
  title: `Post`,
  component: Post,
  exact: false,
  nav: false,
  external: false,
  icon: ``
}
