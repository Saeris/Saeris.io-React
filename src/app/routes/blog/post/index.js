import Post from "./post"

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
