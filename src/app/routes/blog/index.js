import { Directory } from "@routes/directory"
import subpaths from "./blog"

export blog from "./blog"

export default {
  path: `/blog`,
  name: `blog`,
  title: `Blog`,
  component: () => <Directory paths={subpaths} />,
  exact: false,
  nav: true,
  external: false,
  icon: `rss`
}
