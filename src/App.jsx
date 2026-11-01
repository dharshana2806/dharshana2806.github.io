import { useEffect, useState } from 'react'
import { Github, Linkedin, Mail, Menu, X, Download, ArrowUpRight } from 'lucide-react'
import { links, projects, internships, education, hackathons, certs, skills } from './data.js'

const nav = [['about', 'About'], ['experience', 'Experience'], ['projects', 'Projects'], ['skills', 'Skills'], ['education', 'Education'], ['hackathons', 'Hackathons'], ['contact', 'Contact']]

function Social({ size = 20 }) {
  return (
    <ul className="social">
      <li><a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><Github size={size} /></a></li>
      <li><a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><Linkedin size={size} /></a></li>
      <li><a href={`mailto:${links.email}`} aria-label="Send an email"><Mail size={size} /></a></li>
    </ul>
  )
}

function ContactForm() {
  const [f, setF] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const body = `${f.message}\n\nFrom: ${f.name} (${f.email})`
    window.location.href = `mailto:${links.email}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }
  return (
    <form className="form" onSubmit={submit}>
      <label>Name<input required value={f.name} onChange={set('name')} autoComplete="name" /></label>
      <label>Email<input required type="email" value={f.email} onChange={set('email')} autoComplete="email" /></label>
      <label>Subject<input required value={f.subject} onChange={set('subject')} /></label>
      <label>Message<textarea required rows={5} value={f.message} onChange={set('message')} /></label>
      <button className="btn" type="submit">Send message</button>
      {sent && <p className="note" role="status">Your email app should open with this message ready. Press send there to deliver it. If nothing opened, write to {links.email}.</p>}
    </form>
  )
}

export default function App() {
  const [active, setActive] = useState('about')
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' }
    )
    nav.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => io.disconnect()
  }, [])

  const go = (id) => (e) => {
    e.preventDefault()
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(id)?.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' })
    setActive(id)
    setMenu(false)
  }

  return (
    <div className="shell">
      <header className="side">
        <div className="side-top">
          <div>
            <h1><a href="#about" onClick={go('about')}>Dharshana S.</a></h1>
            <p className="title">Computer Science &amp; Engineering Student | AI &amp; ML</p>
          </div>
          <div className="mob-tools">
            <Social size={18} />
            <button className="burger" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="menu" aria-label={menu ? 'Close menu' : 'Open menu'}>{menu ? <X /> : <Menu />}</button>
          </div>
        </div>
        <p className="intro">I enjoy building meaningful digital experiences and intelligent solutions through software development, frontend technologies, and data-driven problem-solving.</p>
        <nav id="menu" className={menu ? 'open' : ''} aria-label="Sections">
          <ul>
            {nav.map(([id, l]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={go(id)} className={active === id ? 'on' : ''} aria-current={active === id ? 'true' : undefined}><i />{l}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="side-social"><Social /></div>
      </header>

      <main className="content">
        <section id="about">
          <h2 className="hero">Computer Science Student &amp; Aspiring Software Developer</h2>
          <p>I'm a Computer Science and Engineering undergraduate specializing in Artificial Intelligence and Machine Learning. I enjoy creating practical software applications, exploring AI technologies, and building solutions that solve real-world problems.</p>
          <p className="cgpa"><strong>CGPA: 8.9</strong></p>
          <a className="btn" href={links.resume} download><Download size={17} /> Download resume</a>
        </section>

        <section id="experience">
          <h2>Experience</h2>
          <ol className="list">
            {internships.map((x) => (
              <li key={x.role}>
                <p className="when">{x.meta}</p>
                <div>
                  <h3>{x.role}</h3>
                  <p className="org">{x.org}</p>
                  <ul>{x.points.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="projects">
          <h2>Projects</h2>
          <ol className="list">
            {projects.map((p) => (
              <li key={p.id}>
                <div className="when" aria-hidden="true" />
                <div>
                  <h3><a href={p.repo} target="_blank" rel="noopener noreferrer">{p.title} – {p.subtitle}<ArrowUpRight size={16} /></a></h3>
                  <p>{p.short}</p>
                  <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
                  <ul className="tags">{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
                  <a className="repo" href={p.repo} target="_blank" rel="noopener noreferrer">GitHub repository</a>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="skills">
          <h2>Skills</h2>
          <dl className="skills">
            {Object.entries(skills).map(([c, l]) => (<div key={c}><dt>{c}</dt><dd>{l.join(', ')}</dd></div>))}
          </dl>
        </section>

        <section id="education">
          <h2>Education</h2>
          <ol className="list">
            {education.map((x) => (
              <li key={x.title}>
                <p className="when">{x.meta}</p>
                <div><h3>{x.title}</h3><p className="org">{x.org}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section id="hackathons">
          <h2>Hackathons</h2>
          <ol className="list">
            {hackathons.map((h) => (
              <li key={h.name}><div className="when" aria-hidden="true" /><div><h3>{h.name}</h3><ul>{h.lines.map((l) => <li key={l}>{l}</li>)}</ul></div></li>
            ))}
          </ol>
          <h3 className="sub">Certifications</h3>
          <ul className="certs">{certs.map(([n, o]) => <li key={n}><strong>{n}</strong> – {o}</li>)}</ul>
        </section>

        <section id="contact">
          <h2>Contact</h2>
          <ul className="contact">
            <li><a href={`mailto:${links.email}`}>{links.email}</a></li>
            <li><a href={`tel:${links.phone.replace(/\s/g, '')}`}>{links.phone}</a></li>
            <li><a href={links.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/dharshana-s-3a5b94328</a></li>
            <li><a href={links.github} target="_blank" rel="noopener noreferrer">github.com/dharshana2806</a></li>
            <li><a href={links.resume} download>Download resume (PDF)</a></li>
          </ul>
          <ContactForm />
          <p className="foot">© {new Date().getFullYear()} Dharshana S.</p>
        </section>
      </main>
    </div>
  )
}
