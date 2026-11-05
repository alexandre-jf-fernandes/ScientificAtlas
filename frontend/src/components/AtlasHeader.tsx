
import { NavLink } from 'react-router-dom'

export default function AtlasHeader() {
  return (
    <header className="topbar">
      <NavLink to="/" className="brand">
        <span className="brand-mark">S</span>
        <span className="brand-name">
          <strong>SEQUEIRA LAB</strong>
          <small>SCIENTIFIC ATLAS</small>
        </span>
      </NavLink>

      <nav className="navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/datasets">Datasets</NavLink>
        <NavLink to="/atlas">Explore Atlas</NavLink>
      </nav>
    </header>
  )
}
