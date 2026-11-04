
import { Link } from 'react-router-dom'
import AtlasViewer from '../components/AtlasViewer'

export default function Atlas() {
  return (
    <div className="atlas-page">
      <section className="datasets-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">INTERACTIVE EXPLORATION</div>
            <h2>Single-Cell Atlas of the Oral Cavity</h2>
            <p>
              Explore cellular embeddings, gene expression and
              annotated cell populations.
            </p>
          </div>
        </div>

        <AtlasViewer />

        <p className="atlas-back-link">
          <Link to="/datasets">← Back to datasets</Link>
        </p>
      </section>
    </div>
  )
}
