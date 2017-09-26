import { Directory } from "@routes/directory"
import subpaths from "./photography"

export photography from "./photography"

export default {
  path: `/photography`,
  name: `photography`,
  title: `Photography`,
  component: () => <Directory paths={subpaths} />,
  exact: false,
  nav: true,
  icon: `camera-retro`
}
