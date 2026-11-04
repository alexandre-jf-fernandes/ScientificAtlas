
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const datasets = [
  {
    id: 'oral-atlas',
    title: 'Single-Cell Atlas of the Oral Cavity',
    description: 'Single-cell transcriptomic atlas of oral tissues.',
    tissue: 'Buccal',
    technology: 'scRNA-seq',
    cells: '77,782',
    genes: '25,296',
    status: 'Local dataset',
  },
]

export default function Option1() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All datasets')

  const filteredDatasets = useMemo(
    () =>
      datasets.filter((dataset) => {
        const searchTerm = search.toLowerCase()

        const matchesSearch =
          dataset.title.toLowerCase().includes(searchTerm) ||
          dataset.description.toLowerCase().includes(searchTerm) ||
          dataset.tissue.toLowerCase().includes(searchTerm) ||
          dataset.technology.toLowerCase().includes(searchTerm)

        const matchesFilter =
          activeFilter === 'All datasets' ||
          (activeFilter === 'Single-cell' &&
            dataset.technology === 'scRNA-seq') ||
          (activeFilter === 'Spatial' &&
            dataset.technology.toLowerCase().includes('spatial'))

        return matchesSearch && matchesFilter
      }),
    [search, activeFilter],
  )

  return (
    <div className="app-content">
      <section className="datasets-section" id="datasets">
        <div className="section-heading">
          <div>
            <div className="eyebrow">DATA COLLECTION</div>
            <h2>Explore the datasets</h2>
            <p>Browse the available datasets and explore their cellular composition.</p>
          </div>

          <span className="dataset-count">
            NUMBER OF DATASETS: {filteredDatasets.length}
          </span>
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
            {['All datasets', 'Single-cell', 'Spatial'].map((filter) => (
              <button
                key={filter}
                className={
                  activeFilter === filter
                    ? 'filter active-filter'
                    : 'filter'
                }
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
                {/* Dataset preview image or visualisation */}
              </div>
            
              <div className="dataset-content">
                <div className="dataset-topline">
                  <span className="dataset-type">
                    {dataset.technology}
                  </span>
                  <span className="dataset-status">
                    <span className="status-dot" />
                    {dataset.status}
                  </span>
                </div>
            
                <div className="dataset-information">
                  <h3>{dataset.title}</h3>
                  <p>{dataset.description}</p>
                </div>
            
                <div className="dataset-actions">
                  <Link className="primary-button" to="/atlas">
                    Explore dataset <span>↗</span>
                  </Link>
                </div>
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

      <footer id="resources">
        <span>© 2026 Murine Cell Atlas</span>

<a
className="github-link"
href="https://github.com/alexandre-jf-fernandes/ScientificAtlas"
target="_blank"
rel="noreferrer"
aria-label="View project on GitHub"
title="View project on GitHub"
>
<svg
  viewBox="0 0 24 24"
  aria-hidden="true"
  width="22"
  height="22"
  fill="currentColor"
>
  <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.31-3.76-1.31-.51-1.29-1.25-1.63-1.25-1.63-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.76 1.8 3.17 1.36.1-.72.39-1.22.7-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.16-2.99-.12-.28-.5-1.42.11-2.95 0 0 .95-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.1-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.16 1.77 1.16 2.99 0 4.29-2.62 5.23-5.11 5.51.4.35.75 1.02.75 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
</svg>
</a>

        <span>Sequeira Lab</span>
      </footer>
    </div>
  )
}
