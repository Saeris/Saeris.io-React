// Renders External Links (opens links in a new tab)
//
//           Text             URL          Title
// input: ^[GitHub](http://www.github.com "GitHub")
//
// output: <a href="http://www.github.com" target="_blank" rel="noopener" title="GitHub">GitHub</a>

export default showdown => [
  {
    type: `lang`,
    regex: /\^\[((?:\[[^\]]*]|[^[\]])*)]()[ \t]*\([ \t]?([\S]+?(?:\([\S]*?\)[\S]*?)?)(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
    replace: (wholeMatch, linkText, linkId, url, m5, m6, title) => {
      let linkTitle = title
      if (showdown.helper.isUndefined(title)) linkTitle = ``
      let src = url
      src = src.replace(showdown.helper.regexes.asteriskAndDash, showdown.helper.escapeCharactersCallback)

      let result = `<a href="${src}" target="¨E95Eblank" rel="noopener"`

      if (!!linkTitle && linkTitle !== ``) {
        linkTitle = linkTitle.replace(/"/g, `&quot;`)
        linkTitle = linkTitle.replace(showdown.helper.regexes.asteriskAndDash, showdown.helper.escapeCharactersCallback)
        result += ` title="${linkTitle}"`
      }

      result += `>${linkText}</a>`

      return result
    }
  }
]
