import { Directory } from "@routes/directory"
import subpaths from "./projects"

export projects from "./projects"

export default {
  path: `/projects`,
  name: `projects`,
  title: `Projects`,
  component: () => <Directory paths={subpaths} />,
  exact: false,
  nav: true,
  external: false,
  icon: `code`
}
