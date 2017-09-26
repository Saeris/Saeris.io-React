// Renders External Links (opens links in a new tab)
//
//           Text             URL          Title
// input: ^[GitHub](http://www.github.com "GitHub")
//
// output: <a href="http://www.github.com" target="_blank" rel="noopener" title="GitHub">GitHub</a>

export default showdown => [
  {
    type: `lang`,
    regex: /\^\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?([\S]+?(?:\([\S]*?\)[\S]*?)?)(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
    replace: (wholeMatch, linkText, linkId, url, m5, m6, title) => {
      if (showdown.helper.isUndefined(title)) title = ``

      url = url.replace(showdown.helper.regexes.asteriskAndDash, showdown.helper.escapeCharactersCallback)

      let result = `<a href="${url}" target="¨E95Eblank" rel="noopener"`

      if (!!title && title !== ``) {
        title = title.replace(/"/g, `&quot;`)
        title = title.replace(showdown.helper.regexes.asteriskAndDash, showdown.helper.escapeCharactersCallback)
        result += ` title="${title}"`
      }

      result += `>${linkText}</a>`

      return result
    }
  }
]
