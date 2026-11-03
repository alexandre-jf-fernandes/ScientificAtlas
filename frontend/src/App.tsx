
import { useMemo, useState } from 'react'
import AtlasViewer from './components/AtlasViewer'
import './App.css'

const datasets = [
  {
    id: 'oral-atlas',
    title: 'Oral Tissue Single-Cell Atlas',
    description:
      'Single-cell transcriptomic landscape of oral tissues, including epithelial, stromal, vascular and immune populations.',
    tissue: 'Oral tissues',
    technology: 'scRNA-seq',
    cells: '77,782',
    genes: '25,296',
    status: 'Local dataset',
  },
]

function App() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All datasets')
  const [showAtlas, setShowAtlas] = useState(false)

  const filteredDatasets = useMemo(
    () =>
      datasets.filter((dataset) => {
        const matchesSearch =
          dataset.title.toLowerCase().includes(search.toLowerCase()) ||
          dataset.description.toLowerCase().includes(search.toLowerCase()) ||
          dataset.tissue.toLowerCase().includes(search.toLowerCase())

        const matchesFilter =
          activeFilter === 'All datasets' ||
          (activeFilter === 'Single-cell' &&
            dataset.technology === 'scRNA-seq')

        return matchesSearch && matchesFilter
      }),
    [search, activeFilter],
  )

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#">
          <span className="brand-mark">S</span>
          <span>
            <strong>Scientific Atlas</strong>
            <small>EXPLORING CELLULAR SYSTEMS</small>
          </span>
        </a>
        <nav className="navigation">
          <a className="active" href="#datasets">Datasets</a>
          <a href="#about">About</a>
          <a href="#resources">Resources</a>
        </nav>
        <a className="github-link" href="https://github.com" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="status-dot" />
              AN INTERACTIVE SCIENTIFIC RESOURCE
            </div>
            <h1>
              Explore biology
              <br />
              <span>at cellular resolution.</span>
            </h1>
            <p className="hero-description">
              An interactive atlas for exploring cellular diversity,
              gene expression and tissue organisation through
              single-cell and spatial data.
            </p>
            <a className="primary-button" href="#datasets">
              Explore datasets <span>↓</span>
            </a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-circle circle-one" />
            <div className="art-circle circle-two" />
            <div className="art-circle circle-three" />
            <div className="art-center">S</div>
            <span className="art-label label-one">CELLULAR DIVERSITY</span>
            <span className="art-label label-two">GENE EXPRESSION</span>
            <span className="art-label label-three">TISSUE BIOLOGY</span>
          </div>
        </section>

        <section className="metrics">
          <div className="metric">
            <span className="metric-label">DATASETS</span>
            <strong>01</strong>
            <span className="metric-note">Available locally</span>
          </div>
          <div className="metric">
            <span className="metric-label">CELLS</span>
            <strong>77,782</strong>
            <span className="metric-note">Single-cell observations</span>
          </div>
          <div className="metric">
            <span className="metric-label">FEATURES</span>
            <strong>25,296</strong>
            <span className="metric-note">Gene-level measurements</span>
          </div>
          <div className="metric">
            <span className="metric-label">MODALITIES</span>
            <strong>01</strong>
            <span className="metric-note">Single-cell RNA sequencing</span>
          </div>
        </section>

        <section className="datasets-section" id="datasets">
          <div className="section-heading">
            <div>
              <div className="eyebrow">DATA COLLECTION</div>
              <h2>Explore the datasets</h2>
              <p>Browse available datasets and discover their cellular composition.</p>
            </div>
            <span className="dataset-count">01 DATASET</span>
          </div>

          <div className="catalogue-controls">
            <div className="search-box">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search datasets, tissues or technologies..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <div className="filters">
              {['All datasets', 'Single-cell'].map((filter) => (
                <button
                  key={filter}
                  className={activeFilter === filter ? 'filter active-filter' : 'filter'}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="dataset-list">
            {filteredDatasets.map((dataset) => (
              <article className="dataset-card" key={dataset.id}>
                <div className="dataset-visual">
                  <div className="visual-grid" />
                  <div className="visual-placeholder"><span>SC</span></div>
                  <span className="visual-caption">SINGLE-CELL DATA</span>
                </div>
                <div className="dataset-content">
                  <div className="dataset-topline">
                    <span className="dataset-type">{dataset.technology}</span>
                    <span className="dataset-status">
                      <span className="status-dot" />{dataset.status}
                    </span>
                  </div>
                  <h3>{dataset.title}</h3>
                  <p>{dataset.description}</p>
                  <div className="dataset-details">
                    <div><span>TISSUE</span><strong>{dataset.tissue}</strong></div>
                    <div><span>CELLS</span><strong>{dataset.cells}</strong></div>
                    <div><span>GENES</span><strong>{dataset.genes}</strong></div>
                  </div>
                  <button
                    className="explore-button"
                    onClick={() => setShowAtlas(!showAtlas)}
                  >
                    {showAtlas ? 'Close visualisation' : 'Explore dataset'} <span>↗</span>
                  </button>
                </div>
              </article>
            ))}
            {filteredDatasets.length === 0 && (
              <div className="empty-state">
                <strong>No datasets found</strong>
                <p>Try another search term or filter.</p>
              </div>
            )}
          </div>
        </section>

        {showAtlas && (
          <section className="visualisation-section" id="visualisation">
            <div className="section-heading">
              <div>
                <div className="eyebrow">INTERACTIVE EXPLORATION</div>
                <h2>Oral tissue cell atlas</h2>
                <p>Explore cellular embeddings and population annotations.</p>
              </div>
            </div>
            <AtlasViewer />
          </section>
        )}

        <section className="about-section" id="about">
          <div className="eyebrow">THE PROJECT</div>
          <h2>Connecting data, cells and biological discovery.</h2>
          <p>
            Scientific Atlas aims to make complex biological datasets
            accessible through interactive visualisation and exploration
            tools, bringing together single-cell and spatial biology.
          </p>
        </section>
      </main>

      <footer id="resources">
        <span>© 2026 Scientific Atlas</span>
        <span>Research · Data · Discovery</span>
      </footer>
    </div>
  )
}

export default App
