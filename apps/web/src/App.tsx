import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { MediaProvider } from '@my-app/media-react';
import { GalleryPage } from './pages/GalleryPage';
import { ReelsPage } from './pages/ReelsPage';
import { DocsSdkPage } from './pages/DocsSdkPage';
import { DocsComponentsPage } from './pages/DocsComponentsPage';
import { API_CONFIG } from './config/apiConfig';
import { Aperture, Film, Image as ImageIcon } from 'lucide-react';

function Navigation() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
            <Aperture className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
            Vision<span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Hub</span>
          </span>
        </Link>
        <div className="flex gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-xs sm:text-sm">
          <Link
            to="/"
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${path === '/' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <ImageIcon className="w-4 h-4" />
            Gallery
          </Link>
          <Link
            to="/reels"
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${path === '/reels' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <Film className="w-4 h-4" />
            Reels
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <MediaProvider config={API_CONFIG}>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-950 text-white font-sans">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<GalleryPage />} />
              <Route path="/reels" element={<ReelsPage />} />
              <Route path="/docs/sdk" element={<DocsSdkPage />} />
              <Route path="/docs/components" element={<DocsComponentsPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </MediaProvider>
  );
}
