import React from 'react';
import { Box, Code, LayoutGrid, Maximize2, Smartphone, ShieldCheck, Key, Paintbrush } from 'lucide-react';

export function DocsComponentsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-slate-100">
      {/* Header Banner */}
      <div className="mb-10 p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/20 shadow-2xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <Box className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase text-indigo-400">Documentation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          Headless Component Library Reference
        </h1>
        <p className="text-slate-300 text-lg max-w-3xl leading-relaxed">
          Comprehensive guide for <code className="text-indigo-400 font-semibold">@my-app/media-ui-react</code> and <code className="text-purple-400 font-semibold">@my-app/media-ui-native</code> using the Prop Getter pattern.
        </p>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-lg space-y-3 text-sm">
            <h3 className="font-bold text-slate-300 uppercase tracking-wider text-xs px-2 mb-2">On This Page</h3>
            <a href="#philosophy" className="block px-3 py-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800/60 transition-colors">1. Headless Philosophy</a>
            <a href="#prop-getters" className="block px-3 py-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800/60 transition-colors">2. Prop Getter Pattern</a>
            <a href="#grid" className="block px-3 py-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800/60 transition-colors">3. Grid Component</a>
            <a href="#lightbox" className="block px-3 py-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800/60 transition-colors">4. Lightbox Component</a>
            <a href="#reelswiper" className="block px-3 py-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800/60 transition-colors">5. ReelSwiper Component</a>
            <a href="#accessibility" className="block px-3 py-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800/60 transition-colors">6. WAI-ARIA Accessibility</a>
          </div>
        </div>

        {/* Sections */}
        <div className="lg:col-span-3 space-y-12">
          {/* 1. Philosophy */}
          <section id="philosophy" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Paintbrush className="w-6 h-6 text-indigo-400" /> 1. Headless Philosophy & Styling Contract
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm">
              <code className="text-indigo-400 font-semibold">@my-app/media-ui-react</code> manages state, keyboard navigation, focus trapping, and WAI-ARIA accessibility without emitting rigid HTML tags or CSS styles.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-indigo-400 text-sm">Zero Data / SDK Dependencies</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Headless components do NOT import <code className="text-slate-300">@my-app/media-core</code> or <code className="text-slate-300">@my-app/media-react</code>. They are strictly layout-agnostic.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-purple-400 text-sm">100% Styling Freedom</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Consumer applications (e.g. Tailwind CSS in <code className="text-slate-300">apps/web</code>) pass custom classes directly into prop getters.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Prop Getters */}
          <section id="prop-getters" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Code className="w-6 h-6 text-blue-400" /> 2. The Prop Getter Pattern
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Prop getters are helper functions (e.g., <code className="text-blue-400">getDialogProps(userProps)</code>) that merge internal state, event listeners, and accessibility attributes with props provided by the user.
            </p>
            <pre className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs text-blue-300 overflow-x-auto">
{`// Internal Prop Getter Mechanism Example
const getDialogProps = (userProps = {}) => ({
  role: 'dialog',
  'aria-modal': true,
  tabIndex: -1,
  ...userProps, // User props (e.g. className, onClick) take precedence
});`}
            </pre>
          </section>

          {/* 3. Grid Component */}
          <section id="grid" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <LayoutGrid className="w-6 h-6 text-emerald-400" /> 3. Grid Component (<code className="text-emerald-300">Grid</code> & <code className="text-emerald-300">useGrid</code>)
            </h2>
            <p className="text-slate-300 text-sm">Manages infinite scroll detection, cell focus, and grid layout accessibility.</p>
            
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Props Interface</h4>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
                <code>{`interface UseGridProps { onLoadMore?: () => void; hasNextPage?: boolean; isFetchingNextPage?: boolean; }`}</code>
              </div>
            </div>

            <pre className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
{`import { Grid } from '@my-app/media-ui-react';

<Grid onLoadMore={handleLoadMore} hasNextPage={hasNextPage}>
  {({ getGridProps, getItemProps, getLoadMoreProps }) => (
    <div {...getGridProps({ className: "grid grid-cols-3 gap-4" })}>
      {items.map((item, index) => (
        <div key={item.id} {...getItemProps({ index, className: "aspect-square" })}>
          <img src={item.thumbnailUrl} alt={item.title} />
        </div>
      ))}
      {hasNextPage && <div {...getLoadMoreProps()}>Loading...</div>}
    </div>
  )}
</Grid>`}
            </pre>
          </section>

          {/* 4. Lightbox */}
          <section id="lightbox" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Maximize2 className="w-6 h-6 text-indigo-400" /> 4. Lightbox Component (<code className="text-indigo-300">Lightbox</code> & <code className="text-indigo-300">useLightbox</code>)
            </h2>
            <p className="text-slate-300 text-sm">Full-screen media overlay with keyboard navigation and focus lock.</p>

            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Props & Prop Getters</h4>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
                <code>{`UseLightboxProps: { isOpen: boolean; onClose: () => void; itemCount: number; initialIndex?: number; }`}</code>
              </div>
            </div>

            <pre className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
{`import { Lightbox } from '@my-app/media-ui-react';

<Lightbox isOpen={isOpen} onClose={onClose} itemCount={items.length} initialIndex={index}>
  {({ currentIndex, getDialogProps, getCloseButtonProps, getNextButtonProps, getPreviousButtonProps, getImageProps }) => (
    <div {...getDialogProps({ className: "fixed inset-0 z-50 bg-black/90" })}>
      <button {...getCloseButtonProps({ className: "absolute top-4 right-4" })}>Close</button>
      <button {...getPreviousButtonProps({ className: "left-4" })}>Prev</button>
      <img {...getImageProps({ src: items[currentIndex].url, alt: items[currentIndex].title })} />
      <button {...getNextButtonProps({ className: "right-4" })}>Next</button>
    </div>
  )}
</Lightbox>`}
            </pre>
          </section>

          {/* 5. ReelSwiper */}
          <section id="reelswiper" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Smartphone className="w-6 h-6 text-purple-400" /> 5. ReelSwiper Component (<code className="text-purple-300">ReelSwiper</code> & <code className="text-purple-300">useReelSwiper</code>)
            </h2>
            <p className="text-slate-300 text-sm">Vertical snap-scrolling video feed with autoplay and active slide index tracking.</p>

            <pre className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs text-purple-300 overflow-x-auto">
{`import { ReelSwiper } from '@my-app/media-ui-react';

<ReelSwiper itemCount={items.length} onLoadMore={onLoadMore} hasNextPage={hasNextPage}>
  {({ getSwiperProps, getItemProps, currentIndex }) => (
    <div {...getSwiperProps({ className: "h-screen overflow-y-scroll snap-y snap-mandatory" })}>
      {items.map((item, index) => (
        <div key={item.id} {...getItemProps({ index, className: "h-screen snap-start" })}>
          <video src={item.url} autoPlay={currentIndex === index} muted loop />
        </div>
      ))}
    </div>
  )}
</ReelSwiper>`}
            </pre>
          </section>

          {/* 6. Accessibility */}
          <section id="accessibility" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <ShieldCheck className="w-6 h-6 text-rose-400" /> 6. WAI-ARIA & Keyboard Navigation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-rose-400 text-sm flex items-center gap-2">
                  <Key className="w-4 h-4" /> Keyboard Navigation
                </h4>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li><code className="text-amber-300 font-mono">Escape</code>: Instantly dismisses Lightbox dialogs.</li>
                  <li><code className="text-amber-300 font-mono">ArrowRight / ArrowLeft</code>: Navigates Lightbox item index.</li>
                  <li><code className="text-amber-300 font-mono">ArrowUp / ArrowDown</code>: Navigates active Reel index.</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-rose-400 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> ARIA Attributes
                </h4>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li><code className="text-rose-300 font-mono">role="dialog"</code> & <code className="text-rose-300 font-mono">aria-modal="true"</code> on Lightbox modal overlays.</li>
                  <li><code className="text-rose-300 font-mono">role="grid"</code> & <code className="text-rose-300 font-mono">role="gridcell"</code> on Grid elements.</li>
                  <li><code className="text-rose-300 font-mono">aria-label</code> on action buttons (Close, Next, Prev).</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
