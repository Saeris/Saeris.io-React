import { assemble } from "@components/containers"

const Page = assemble({
  loader: () => import(`./page`)
})

export default {
  path: `/projects/:id`,
  name: `page`,
  title: `Page`,
  component: Page,
  exact: false,
  nav: false,
  external: false,
  icon: ``
}
