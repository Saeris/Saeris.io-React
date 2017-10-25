import { assemble } from "@components/containers"

const Categories = assemble({
  loader: () => import(`./categories`)
})

export default {
  path: `/blog/categories`,
  name: `categories`,
  title: `Categories`,
  component: Categories,
  exact: true,
  nav: true,
  external: false,
  icon: ``
}
