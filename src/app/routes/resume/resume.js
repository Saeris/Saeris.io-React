//import Markdown from "preact-markdown"
import { Layout } from "@components/structural"
import { Email, Link, Markdown, Rating } from "@components/core"
import "./resume.scss"
import defaultResume from "@public/content/resume.json"

export default class Resume extends Component {
  static defaultProps = {
    resume: defaultResume
  }

  renderHighlights(highlights) {
    return (
      !!highlights &&
      highlights.length > 0 && (
        <ul styleName="highlights">
          {highlights.map(highlight => (
            <li>
              <Markdown src={highlight} />
            </li>
          ))}
        </ul>
      )
    )
  }

  renderTags(tags) {
    return (
      !!tags &&
      tags.length > 0 && (
        <span>
          Technologies: <ul styleName="tags">{tags.map(tag => <li>{tag}</li>)}</ul>
        </span>
      )
    )
  }

  renderAssignments({ name, description, start, end, tags, summary, highlights }) {
    return (
      <li>
        <div styleName="header">
          <h4>
            {name}
            {!!description && <strong>|</strong>}
          </h4>
          <h5>{description}</h5>
          <span>
            <h6>
              {start} – {end}
            </h6>
          </span>
        </div>
        <div styleName="details">{this.renderTags(tags)}</div>
        {!!summary && <Markdown src={summary} />}
        {this.renderHighlights(highlights)}
      </li>
    )
  }

  render({ resume }) {
    const { fullname, headline, contact, skills, jobs, projects, schools } = resume
    return (
      <Layout id="resume">
        <section id="title" styleName="title">
          <h1>{fullname}</h1>
          <h2>{headline}</h2>
          {!!contact && (
            <ul>
              {!!contact.email && (
                <li>
                  <Email address={contact.email} obfuscate>
                    <i className="fa fa-paper-plane" />
                    {contact.email}
                  </Email>
                </li>
              )}
              {!!contact.links &&
                contact.links.map(link => (
                  <li>
                    <Link external href={link.url}>
                      <i className={`fa fa-${link.icon}`} />
                      {link.title}
                    </Link>
                  </li>
                ))}
            </ul>
          )}
        </section>

        {!!skills &&
          skills.length > 0 && (
            <section id="expertise" styleName="expertise content_block">
              <h3>Expertise:</h3>
              <hr />
              <ul styleName="legend">
                <li>
                  <Rating score={1} />
                  <span>Some Exposure To</span>
                </li>
                <li>
                  <Rating score={2} />
                  <span>Basic Experience With</span>
                </li>
                <li>
                  <Rating score={3} />
                  <span>Comfortable Working With</span>
                </li>
                <li>
                  <Rating score={4} />
                  <span>Advanced Usage Of</span>
                </li>
                <li>
                  <Rating score={5} />
                  <span>Deep Understanding Of</span>
                </li>
              </ul>
              <ul>
                {skills.map(({ name, rating, years }) => (
                  <li>
                    <span styleName="skill">
                      <Markdown src={name} />
                    </span>
                    <div styleName="skill_details">
                      <Rating score={rating} />
                      <span>{years} year(s)</span>
                    </div>
                  </li>
                ))}
                {[...Array(5)].map((_, i) => skills.map(skill => <li styleName="placeholder" />))}
              </ul>
            </section>
          )}

        {!!jobs &&
          jobs.length > 0 && (
            <section id="experience" styleName="experience content_block">
              <h3>Experience:</h3>
              <hr />
              <ul>
                {jobs.map(
                  ({ company, title, location, start, end, industry, tags, summary, highlights, assignments }) => (
                    <li>
                      <div styleName="header">
                        <h4>
                          {company}
                          {!!title && <strong>|</strong>}
                        </h4>
                        <h5>{title}</h5>
                        <span>
                          <h6>
                            {start} – {end}
                            {!!location && <strong>|</strong>}
                            {location}
                          </h6>
                        </span>
                      </div>
                      <div styleName="details">
                        {!!industry && (
                          <span>
                            Industry: <em>{industry}</em>
                          </span>
                        )}
                        {this.renderTags(tags)}
                      </div>
                      {!!summary && <Markdown src={summary} />}
                      {this.renderHighlights(highlights)}
                      {!!assignments && (
                        <ul styleName="assignments">
                          {assignments.map(assignment => this.renderAssignments(assignment))}
                        </ul>
                      )}
                    </li>
                  )
                )}
              </ul>
            </section>
          )}

        {!!projects &&
          projects.length > 0 && (
            <section id="projects" styleName="content_block">
              <h3>Projects:</h3>
              <hr />
              <ul>
                {projects.map(({ name, description, links, start, end, tags, summary, highlights }) => (
                  <li>
                    <div styleName="header">
                      <h4>
                        {name}
                        {!!description && <strong>|</strong>}
                      </h4>
                      <h5>{description}</h5>
                      <span>
                        {!!links &&
                          links.length > 0 && (
                            <ul>
                              {links.map((link, i) => (
                                <li>
                                  <Link external href={link.url}>
                                    {link.title}
                                  </Link>
                                  {links.length > 1 && links.length > i + 1 && <strong>|</strong>}
                                </li>
                              ))}
                            </ul>
                          )}
                      </span>
                    </div>
                    <div styleName="details">{this.renderTags(tags)}</div>
                    {!!summary && <Markdown src={summary} />}
                    {this.renderHighlights(highlights)}
                  </li>
                ))}
              </ul>
            </section>
          )}

        {!!schools &&
          schools.length > 0 && (
            <section id="education" styleName="education content_block">
              <h3>Education:</h3>
              <hr />
              <ul>
                {schools.map(({ name, location, status, focus, tags, summary, highlights }) => (
                  <li>
                    <div styleName="header">
                      <h4>{name}</h4>
                      <span>
                        <h6>
                          {status}
                          {!!location && <strong>|</strong>}
                          {location}
                        </h6>
                      </span>
                    </div>
                    <div styleName="focus">
                      <h4>{focus}</h4>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
      </Layout>
    )
  }
}
