import moment from "moment"
import { Layout } from "components/containers"
import { Link, Rating } from "components/core"
import "./resume.scss"

export default class Resume extends Component {
  getDuration = (start, end) =>
    moment((end === `Present`) ? moment() : end, `MMMM YYYY`)
      .add(1, `M`)
      .from(moment(start, `MMMM YYYY`), true)


  render({ resume }) {
    return (
      <Layout id="resume">
        <section id="title">
          <h1>{resume.name}</h1>
          <h2>{resume.headline}</h2>
          <ul>
            {resume.contact.links.map(link =>
              <li>
                <Link external href={link.url}>
                  <i className={`fa fa-${link.icon}`}></i>
                  {link.title}
                </Link>
              </li>
            )}
          </ul>
        </section>

        <section id="expertise" className="content_block">
          <h3>Expertise:</h3>
          <ul>
            {resume.skills.map(({ name, rating, level, years }) =>
              <li>
                <div className="skill_rating">
                  <span>{name}</span>
                  <Rating score={rating}></Rating>
                </div>
                <div className="skill_details">
                  <span>{level}</span>
                  <span>{years} year(s)</span>
                </div>
              </li>
            )}
            {[...Array(5)].map((_, i) => resume.skills.map(skill => <li className="placeholder"></li>))}
          </ul>
        </section>

        <section id="experience" className="content_block">
          <h3>Experience:</h3>
          <ul>
            {resume.jobs.map(({company, title, location, start, end, tags, summary, highlights, assignments}) =>
              <li>
                <div className="header">
                  <h4>{company}<strong> | </strong></h4>
                  <h5>{title}</h5>
                  <span>
                    <h6>
                      {location}
                      {!!location && <strong> | </strong>}
                      {start} – {end}
                      {(start && end) && <em> ({this.getDuration(start, end)})</em>}
                    </h6>
                  </span>
                </div>
                <hr></hr>
                {(!!tags && tags.length > 0) &&
                  <ul className="tags">
                    {tags.map(tag => <li>{tag}</li>)}
                  </ul>
                }
                {!!summary && <p>{summary}</p>}
                {(!!highlights && highlights.length > 0) &&
                  <ul className="highlights">
                    {highlights.map(highlight => <li>{highlight}</li>)}
                  </ul>
                }
                {!!assignments &&
                  <ul className="assignments">
                    {assignments.map(({name, description, aStart, aEnd, aTags, aSummary, aHighlights}) =>
                      <li>
                        <div className="header">
                          <h4>{name}{!!description && <strong> | </strong>}</h4>
                          <h5>{description}</h5>
                          <span>
                            <h6>
                              {aStart} – {aEnd}
                              {(aStart && aEnd) && <em> (~{this.getDuration(aStart, aEnd)})</em>}
                            </h6>
                          </span>
                        </div>
                        <hr></hr>
                        {(!!aTags && aTags.length > 0) &&
                          <ul className="tags">
                            {aTags.map(tag => <li>{tag}</li>)}
                          </ul>
                        }
                        {!!aSummary && <p>{aSummary}</p>}
                        {(!!aHighlights && aHighlights.length > 0) &&
                          <ul className="highlights">
                            {aHighlights.map(highlight => <li>{highlight}</li>)}
                          </ul>
                        }
                      </li>
                    )}
                  </ul>
                }
              </li>
            )}
          </ul>
        </section>

        <section id="projects" className="content_block">
          <h3>Projects:</h3>
          <ul>
            {resume.projects.map(({ name, url, start, end, tags, summary, highlights }) =>
              <li>
                <div className="header">
                  <h4>{name}{!!url && <strong> | </strong>}</h4>
                  <h5><Link external href={url}>{url}</Link></h5>
                  <span>
                    <h6>{start} – {end}{(start && end) && <em> (~{this.getDuration(start, end)})</em>}</h6>
                  </span>
                </div>
                <hr></hr>
                {(!!tags && tags.length > 0) &&
                  <ul className="tags">
                    {tags.map(tag => <li>{tag}</li>)}
                  </ul>
                }
                {!!summary && <p>{summary}</p>}
                {(!!highlights && highlights.length > 0) &&
                  <ul className="highlights">
                    {highlights.map(highlight => <li>{highlight}</li>)}
                  </ul>
                }
              </li>
            )}
          </ul>
        </section>

        <section id="education" class="content_block">
          <h3>Education:</h3>
          <ul>
            {resume.schools.map(({ name, location, start, end, status, focus, tags, summary, highlights }) =>
              <li>
                <div className="header">
                  <h4>{name}</h4>
                  <span>
                    <h6>{location}{!!location && <strong> | </strong>}{start} – {end}</h6>
                  </span>
                </div>
                <hr></hr>
                <div className="subheader">
                  <h4>{status}</h4>
                  <span>
                    <h6>{focus}</h6>
                  </span>
                </div>
                {(!!tags && tags.length > 0) &&
                  <ul className="tags">
                    {tags.map(tag => <li>{tag}</li>)}
                  </ul>
                }
                {!!summary && <p>{summary}</p>}
                {(!!highlights && highlights.length > 0) &&
                  <ul className="highlights">
                    {highlights.map(highlight => <li>{highlight}</li>)}
                  </ul>
                }
              </li>
            )}
          </ul>
        </section>
      </Layout>
    )
  }
}
