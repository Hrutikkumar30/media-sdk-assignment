import React from 'react';
import { BookOpen, Code, Layers, Terminal, Shield, Zap, RefreshCw, Activity } from 'lucide-react';

export function DocsSdkPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-slate-100">
      {/* Header Banner */}
      <div className="mb-10 p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950/60 to-slate-900 border border-blue-500/20 shadow-2xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase text-blue-400">Documentation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          Headless Media SDK Reference
        </h1>
        <p className="text-slate-300 text-lg max-w-3xl leading-relaxed">
          Comprehensive developer guide for <code className="text-blue-400 font-semibold">@my-app/media-core</code> and framework adapters (<code className="text-indigo-400 font-semibold">@my-app/media-react</code>, <code className="text-purple-400 font-semibold">@my-app/media-native</code>).
        </p>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sticky Table of Contents Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-lg space-y-3 text-sm">
            <h3 className="font-bold text-slate-300 uppercase tracking-wider text-xs px-2 mb-2">On This Page</h3>
            <a href="#overview" className="block px-3 py-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800/60 transition-colors">1. Overview & Packages</a>
            <a href="#installation" className="block px-3 py-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800/60 transition-colors">2. Installation & API Config</a>
            <a href="#provider" className="block px-3 py-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800/60 transition-colors">3. MediaProvider Setup</a>
            <a href="#hooks" className="block px-3 py-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800/60 transition-colors">4. React Data Hooks</a>
            <a href="#caching" className="block px-3 py-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800/60 transition-colors">5. Caching & Deduplication</a>
            <a href="#events" className="block px-3 py-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800/60 transition-colors">6. Telemetry & SDK Events</a>
            <a href="#errors" className="block px-3 py-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800/60 transition-colors">7. Error Handling</a>
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="lg:col-span-3 space-y-12">
          {/* 1. Overview */}
          <section id="overview" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Layers className="w-6 h-6 text-blue-400" /> 1. Package Architecture Overview
            </h2>
            <p className="text-slate-300 leading-relaxed">
              The SDK follows strict monorepo isolation. Data fetching logic is completely separated from framework adapters and UI rendering components.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-mono font-bold text-blue-400 mb-1">@my-app/media-core</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Pure TypeScript SDK with zero DOM or React dependencies. Contains API fetcher, memory cache, deduplicator, and pub/sub bus.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-mono font-bold text-indigo-400 mb-1">@my-app/media-react</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  React hooks adapter wrapping <code className="text-slate-300">media-core</code>. Provides context provider and unified state management.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-mono font-bold text-purple-400 mb-1">@my-app/media-native</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  React Native adapter offering identical data hook signatures for cross-platform iOS and Android apps.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Installation & Config */}
          <section id="installation" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Terminal className="w-6 h-6 text-emerald-400" /> 2. Installation & Configuration
            </h2>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-sm text-slate-300">
              <code>npm install @my-app/media-react @my-app/media-core</code>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm">
              Configure your API key in environment variables (<code className="text-emerald-400">VITE_PEXELS_API_KEY</code>). If set to <code className="text-amber-400">DEMO_KEY</code> or omitted, the client activates an automated high-fidelity mock provider with simulated network latency.
            </p>
          </section>

          {/* 3. Provider */}
          <section id="provider" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Code className="w-6 h-6 text-indigo-400" /> 3. SDK Provider Setup (<code className="text-indigo-300">MediaProvider</code>)
            </h2>
            <p className="text-slate-300 text-sm">
              Wrap your root application tree with <code className="text-indigo-400 font-semibold">MediaProvider</code>:
            </p>
            <pre className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm text-blue-300 overflow-x-auto">
{`import { MediaProvider } from '@my-app/media-react';

const API_CONFIG = {
  apiKey: import.meta.env.VITE_PEXELS_API_KEY || 'DEMO_KEY',
  baseUrl: 'https://api.pexels.com/v1',
  timeout: 10000, // 10 second timeout
};

export default function App() {
  return (
    <MediaProvider config={API_CONFIG}>
      <MainAppContent />
    </MediaProvider>
  );
}`}
            </pre>
          </section>

          {/* 4. Data Hooks */}
          <section id="hooks" className="scroll-mt-24 space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Zap className="w-6 h-6 text-amber-400" /> 4. React Data Hooks
            </h2>

            {/* Hook 1 */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-base font-bold text-blue-400">useMediaCurated(options?: CuratedOptions)</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">Curated Feed</span>
              </div>
              <p className="text-xs text-slate-300">Fetches paginated trending photos from Pexels API.</p>
              <pre className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-slate-300 overflow-x-auto">
{`const { data, loading, error } = useMediaCurated({ page: 1, perPage: 15 });
// Returns: AsyncState<PaginatedResponse<Media>>
// data: { data: Media[], page: 1, perPage: 15, totalItems: 1000, totalPages: 67 }`}
              </pre>
            </div>

            {/* Hook 2 */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-base font-bold text-indigo-400">useMediaSearch(options: SearchOptions)</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Search</span>
              </div>
              <p className="text-xs text-slate-300">Searches media given a query string with automatic re-fetching on query change.</p>
              <pre className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-slate-300 overflow-x-auto">
{`const { data, loading, error } = useMediaSearch({ query: 'nature', page: 1, perPage: 15 });`}
              </pre>
            </div>

            {/* Hook 3 */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-base font-bold text-purple-400">useMediaById(id?: string)</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">Single Item</span>
              </div>
              <p className="text-xs text-slate-300">Fetches details for a single media asset by its unique identifier.</p>
              <pre className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-slate-300 overflow-x-auto">
{`const { data: media, loading, error } = useMediaById('12345');`}
              </pre>
            </div>
          </section>

          {/* 5. Caching & Deduplication */}
          <section id="caching" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <RefreshCw className="w-6 h-6 text-cyan-400" /> 5. Caching & Request Deduplication
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-cyan-400 text-sm">MemoryCache (TTL 5 Minutes)</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  In-memory key-value cache that prevents repeated HTTP requests when navigating between views or repeat searches. Expired items are automatically evicted.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-cyan-400 text-sm">RequestDeduplicator</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Prevents duplicate concurrent network requests. If multiple UI widgets request the exact same media query simultaneously, only 1 network fetch is executed.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Events */}
          <section id="events" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Activity className="w-6 h-6 text-pink-400" /> 6. Telemetry & Event Subscription
            </h2>
            <p className="text-xs text-slate-300">
              Access the raw SDK client using <code className="text-pink-400 font-semibold">useMediaClient()</code> or subscribe to events using <code className="text-pink-400 font-semibold">useMediaEvent()</code>:
            </p>
            <pre className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs text-pink-300 overflow-x-auto">
{`import { useMediaClient, useMediaEvent } from '@my-app/media-react';

export function Component() {
  const client = useMediaClient();

  // Track telemetry events
  const handleView = (id: string, title: string) => {
    client.trackView(id, title); // Emits 'media:view'
  };

  const handleDownload = (id: string, url: string) => {
    client.trackDownload(id, url); // Emits 'media:download'
  };

  // Subscribe to SDK telemetry events
  useMediaEvent('media:view', (payload) => {
    console.log('[SDK View Event]', payload);
  });
}`}
            </pre>
          </section>

          {/* 7. Errors */}
          <section id="errors" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Shield className="w-6 h-6 text-rose-400" /> 7. Error Handling Hierarchy
            </h2>
            <p className="text-xs text-slate-300">Specialized error instances thrown by `@my-app/media-core`:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs">
                <span className="font-bold text-rose-400 block mb-1">AuthenticationError</span>
                <span className="text-slate-400">HTTP 401 / 403 invalid API Key.</span>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs">
                <span className="font-bold text-rose-400 block mb-1">NotFoundError</span>
                <span className="text-slate-400">HTTP 404 missing resource.</span>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs">
                <span className="font-bold text-rose-400 block mb-1">RateLimitError</span>
                <span className="text-slate-400">HTTP 429 rate limit exceeded.</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
