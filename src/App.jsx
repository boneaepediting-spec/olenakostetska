import { useState, useEffect, useRef } from 'react'
import { DATA, priceFor } from './content.js'

const IG = 'https://instagram.com/alyonochka_22'
const LANGS = ['uk', 'pl', 'en']
const STEP_ICONS = ['👋', '📋', '🎯', '📝', '📈', '⚙️']

// render content strings that may contain <b>/<i>/<br>
function Rich({ html, as = 'span', className, ...rest }) {
  const Tag = as
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} {...rest} />
}

const Check = ({ size = 20 }) => (
  <svg className="chk" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
)
const Star = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.4-6.3-4.6L5.7 21 8 13.8 2 9.4h7.6z" /></svg>
)
const IgIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
)

function nextDeadline() {
  const n = new Date()
  const day = n.getDay()
  const daysToMon = ((8 - day) % 7) || 7
  const t = new Date(n)
  t.setDate(n.getDate() + daysToMon)
  t.setHours(0, 0, 0, 0)
  return t
}

export default function App() {
  const [lang, setLang] = useState('uk')
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [fabShow, setFabShow] = useState(false)
  const [time, setTime] = useState({ d: '00', h: '00', m: '00', s: '00' })
  const deadline = useRef(nextDeadline())

  const d = DATA[lang]

  useEffect(() => {
    const nl = (navigator.language || 'uk').slice(0, 2)
    if (LANGS.includes(nl)) setLang(nl)
  }, [])

  useEffect(() => { document.documentElement.lang = lang }, [lang])

  useEffect(() => {
    const p = (x) => String(x).padStart(2, '0')
    const tick = () => {
      let diff = Math.max(0, deadline.current - new Date())
      const dd = Math.floor(diff / 86400000); diff -= dd * 86400000
      const hh = Math.floor(diff / 3600000); diff -= hh * 3600000
      const mm = Math.floor(diff / 60000); diff -= mm * 60000
      const ss = Math.floor(diff / 1000)
      setTime({ d: p(dd), h: p(hh), m: p(mm), s: p(ss) })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onScroll = () => setFabShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('section.block, .marquee')
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('reveal', 'in'))
      return
    }
    els.forEach((e) => e.classList.add('reveal'))
    const io = new IntersectionObserver((ents) => {
      ents.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) }
      })
    }, { threshold: 0.12 })
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [lang])

  const navLinks = [
    ['about', '#about'], ['ach', '#ach'], ['process', '#process'],
    ['services', '#services'], ['creds', '#creds'], ['faq', '#faq'],
  ]
  const mobileLinks = [
    ['about', '#about'], ['ach', '#ach'], ['process', '#process'], ['whom', '#whom'],
    ['values', '#values'], ['services', '#services'], ['creds', '#creds'], ['faq', '#faq'],
  ]

  return (
    <>
      <nav>
        <div className="logo">Olena <em>Kostetska</em></div>
        <div className="nav-menu">
          {navLinks.map(([k, href]) => (<a key={k} href={href}>{d.nav[k]}</a>))}
        </div>
        <div className="nav-right">
          <a href="#services" className="nav-cta">{d.nav.navcta}</a>
          <div className="langs">
            {LANGS.map((L) => (
              <button key={L} className={lang === L ? 'active' : ''} onClick={() => setLang(L)}>
                {L === 'uk' ? 'UA' : L.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="burger" aria-label="Menu" onClick={() => setMenuOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>
        </div>
      </nav>

      <div className={`mm-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="mm-close" onClick={() => setMenuOpen(false)}>&times;</button>
        {mobileLinks.map(([k, href]) => (
          <a key={k} href={href} onClick={() => setMenuOpen(false)}>{d.nav[k]}</a>
        ))}
      </div>

      <header className="hero">
        <div className="wrap">
          <div className="hero-text">
            <div className="eyebrow">{d.eyebrow}</div>
            <Rich as="h1" className="hero-title" html={d.h1.replace('<i>', '<i class="brush">')} />
            <p className="hero-sub">{d.herosub}</p>
            <div className="hero-cta">
              <a href="#services" className="btn btn-primary">{d.cta1}</a>
              <a href="#about" className="btn btn-ghost">{d.cta2}</a>
            </div>
          </div>
          <div className="hero-photo">
            <div className="frame"><img src="/hero.jpg" alt="Olena Kostetska on stage" /></div>
            <div className="medal-badge"><div className="n">2014</div><div className="l">{d.badge}</div></div>
          </div>
        </div>
      </header>

      <div className="marquee">
        <div className="marquee-track">
          {[...d.mq, ...d.mq].map((t, i) => (<span key={i}>{t}<b> ✦ </b></span>))}
        </div>
      </div>

      <section className="block wrap" id="about">
        <div className="about">
          <div className="frame"><img src="/about.jpg" alt="Olena Kostetska" /></div>
          <div>
            <div className="sec-eyebrow">{d.aboutEye}</div>
            <Rich as="h2" className="sec-title" html={d.aboutTitle} />
            <p>{d.aboutP1}</p>
            <p>{d.aboutP2}</p>
            <div className="quote">{d.aboutQuote}</div>
            <div className="stats">
              <div className="stat"><div className="n">20+</div><div className="l">{d.stat1}</div></div>
              <div className="stat"><div className="n">2014</div><div className="l">{d.stat2}</div></div>
              <div className="stat"><div className="n">2</div><div className="l">{d.stat3}</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="block ach" id="ach">
        <div className="wrap">
          <div className="sec-head"><div className="sec-eyebrow" style={{ margin: 0 }}>{d.achEye}</div></div>
          <Rich as="h2" className="sec-title" html={d.achTitle} />
          <p className="ach-intro">{d.achIntro}</p>
          <div className="titles">
            {d.titles.map((t, i) => (
              <div className="title-chip" key={i}><span className="ic">{t.i}</span><span>{t.t}</span></div>
            ))}
          </div>
          <div className="timeline">
            {d.timeline.map((row, i) => (
              <div className="tl-row" key={i}>
                <div className="tl-year">{row.y}</div>
                <div className="tl-events">
                  {row.ev.map((e, j) => (
                    <div className="tl-ev" key={j}><div className="dot" /><div><div className="place">{e.p}</div><div className="res">{e.r}</div></div></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block wrap" id="process">
        <div className="sec-head"><div className="sec-eyebrow" style={{ margin: 0 }}>{d.procEye}</div></div>
        <Rich as="h2" className="sec-title" html={d.procTitle} />
        <div className="steps">
          {d.steps.map((s, i) => (
            <div className="step" key={i}>
              <div className="sn"><div className="si">{STEP_ICONS[i] || '•'}</div><span className="snum">{String(i + 1).padStart(2, '0')}</span></div>
              <h4>{s.h}</h4><p>{s.p}</p>
            </div>
          ))}
        </div>
        <div className="results">
          <h4>{d.resTitle}</h4>
          <div className="res-grid">
            {d.results.map((r, i) => (<div className="res-pill" key={i}><Check size={18} /><span>{r}</span></div>))}
          </div>
        </div>
      </section>

      <section className="block wrap" id="whom">
        <div className="sec-head"><div className="sec-eyebrow" style={{ margin: 0 }}>{d.whoEye}</div></div>
        <Rich as="h2" className="sec-title" html={d.whoTitle} />
        <div className="goals">
          {d.goals.map((g, i) => (<div className="goal" key={i}><Check /><span>{g}</span></div>))}
        </div>
      </section>

      <section className="block wrap" id="values">
        <div className="sec-head"><div className="sec-eyebrow" style={{ margin: 0 }}>{d.valEye}</div></div>
        <Rich as="h2" className="sec-title" html={d.valTitle} />
        <div className="values">
          {d.values.map((v, i) => (
            <div className="value" key={i}><div className="vn">0{i + 1}</div><h4>{v.t}</h4><p>{v.p}</p></div>
          ))}
        </div>
      </section>

      <section className="block wrap" id="services" style={{ background: 'linear-gradient(180deg,var(--pearl2),transparent 55%)' }}>
        <div className="sec-head"><div className="sec-eyebrow" style={{ margin: 0 }}>{d.servEye}</div></div>
        <Rich as="h2" className="sec-title" html={d.servTitle} />
        <div className="offer">
          <Rich className="o-label" html={d.offerLabel} />
          <div className="timer">
            <div className="seg"><div className="tn">{time.d}</div><div className="tl">{d.tD}</div></div>
            <span className="colon">:</span>
            <div className="seg"><div className="tn">{time.h}</div><div className="tl">{d.tH}</div></div>
            <span className="colon">:</span>
            <div className="seg"><div className="tn">{time.m}</div><div className="tl">{d.tM}</div></div>
            <span className="colon">:</span>
            <div className="seg"><div className="tn">{time.s}</div><div className="tl">{d.tS}</div></div>
          </div>
        </div>
        <div className="cards">
          {d.services.map((s, i) => {
            const now = priceFor(s.eur, lang)
            const oldEur = Math.round(s.eur / (1 - s.disc))
            const oldP = priceFor(oldEur, lang)
            const pct = Math.round(s.disc * 100)
            const pctLeft = Math.round(s.spots / s.total * 100)
            return (
              <div className={`card ${s.feat ? 'featured' : ''}`} key={i}>
                <div className="card-top"><span className="card-tag">{s.tag}</span><span className="save-badge">−{pct}%</span></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="price-row">
                  <div className="price"><Rich html={now} /> <small>{s.per}</small></div>
                  <span className="price-old"><Rich html={oldP} /></span>
                </div>
                {lang !== 'en' && <div className="price-alt">≈ {priceFor(s.eur, 'en')}</div>}
                <div className="spots">
                  <span>{d.spotsLabel} {s.spots}/{s.total}</span>
                  <span className="bar"><i style={{ width: pctLeft + '%' }} /></span>
                </div>
                <a href={IG} className={`btn ${s.feat ? 'btn-primary' : 'btn-ghost'}`}>{d.cta1}</a>
              </div>
            )
          })}
        </div>
      </section>

      <section className="block wrap" id="includes">
        <div className="sec-head"><div className="sec-eyebrow" style={{ margin: 0 }}>{d.incEye}</div></div>
        <Rich as="h2" className="sec-title" html={d.incTitle} />
        <div className="includes">
          {d.includes.map((x, i) => (
            <div className={`inc ${x.feat ? 'featured' : ''}`} key={i}>
              <h4>{x.t}</h4>
              <ul>{x.items.map((it, j) => (<li key={j}><Check size={18} /><span>{it}</span></li>))}</ul>
            </div>
          ))}
        </div>
      </section>

      <section className="block wrap" id="creds">
        <div className="sec-head"><div className="sec-eyebrow" style={{ margin: 0 }}>{d.credEye}</div></div>
        <Rich as="h2" className="sec-title" html={d.credTitle} />
        <p style={{ color: 'var(--ink-2)', maxWidth: 650, lineHeight: 1.85, fontSize: '16.5px' }}>{d.credIntro}</p>
        <div className="creds">
          {d.creds.map((c, i) => (
            <div className="cred" key={i}>
              <div className="badge"><Star /></div>
              <div><h4>{c.t}</h4><p>{c.d}</p>{c.y && <span className="yr">{c.y}</span>}</div>
            </div>
          ))}
        </div>
        <div className="topics">
          {d.topics.map((t, i) => (<span className="topic" key={i}>{t}</span>))}
        </div>
      </section>

      <section className="block">
        <div className="cta-band">
          <Rich as="h2" html={d.ctaTitle} />
          <p>{d.ctaText}</p>
          <a href={IG} className="btn btn-primary">{d.ctaBtn}</a>
        </div>
      </section>

      <section className="block wrap" id="faq">
        <div className="sec-head"><div className="sec-eyebrow" style={{ margin: 0 }}>{d.faqEye}</div></div>
        <Rich as="h2" className="sec-title" html={d.faqTitle} />
        <div>
          {d.faq.map((f, i) => (
            <div className={`faq-item ${openFaq === i ? 'open' : ''}`} key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="faq-q"><h4>{f.q}</h4><div className="ic">+</div></div>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      <a href={IG} className={`fab ${fabShow ? 'show' : ''}`} target="_blank" rel="noopener">
        <IgIcon size={20} /><span>{d.fabText}</span>
      </a>

      <footer className="wrap">
        <div className="foot">
          <div className="logo">Olena <em>Kostetska</em></div>
          <a href={IG} className="ig" target="_blank" rel="noopener"><IgIcon /> @alyonochka_22</a>
        </div>
        <div className="copyright">{d.copy}</div>
      </footer>
    </>
  )
}
