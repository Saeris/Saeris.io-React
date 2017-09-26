import Markup from "preact-markup"
import Showdown from "showdown"
import { externalLink } from "./extensions"

Showdown.setFlavor(`github`)
const converter = new Showdown.Converter({ extensions: [externalLink(Showdown)] })

export const Markdown = ({ src, markdownOpts, ...props }) => {
  if (typeof src === `string`) {
    if (!!markdownOpts) converter.setOptions(markdownOpts)
    return h(Markup, { markup: converter.makeHtml(src), trim: false, type: `html`, ...props })
  }
  throw new Error(`Invalid arguments. Markdown requires either a '<String> 'or object: '{markdown: <String>}'`)
}
