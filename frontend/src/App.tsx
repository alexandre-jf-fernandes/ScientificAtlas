
import { Routes, Route, Navigate } from 'react-router-dom'
import AtlasHeader from './components/AtlasHeader'
import './App.css'

import Option1 from './pages/Option1'
import Atlas from './pages/Atlas'

export default function App() {
  return (
    <div className="app">
      <AtlasHeader />

      <main>
        <Routes>
          <Route path="/" element={<Option1 />} />
          <Route path="/datasets" element={<Option1 />} />
          <Route path="/atlas" element={<Atlas />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
