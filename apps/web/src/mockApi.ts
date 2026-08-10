import { Media } from '@my-app/media-core';

export interface ExtendedMedia extends Media {
  category?: string;
}

const CATEGORIES = ['Nature', 'Architecture', 'Technology', 'People', 'Abstract', 'Travel'];

const CATEGORY_TITLES: Record<string, string[]> = {
  Nature: [
    'Emerald Forest Canopy', 'Serene Mountain Vista', 'Cascading Alpine Waterfall', 
    'Sunset Over Dunes', 'Mist In Pine Valley', 'Autumn Lake Reflections'
  ],
  Architecture: [
    'Modern Glass Skyscraper', 'Futuristic Bridge Arch', 'Minimalist Concrete Facade',
    'Classic Spiral Staircase', 'Urban Geometric Tower', 'Illuminated City Skyline'
  ],
  Technology: [
    'Quantum Microchip Array', 'Cyberpunk Neon Circuit', 'Sleek Digital Workspace',
    'Robotic Automation Core', 'Fiber Optic Data Flow', 'Neural Computing Matrix'
  ],
  People: [
    'Portrait in Golden Light', 'Urban Street Photographer', 'Expressive Studio Model',
    'Creative Artist at Work', 'Musician Under Stage Lights', 'Candid Smile Moment'
  ],
  Abstract: [
    'Vibrant Fluid Gradient', 'Geometric Neon Prisms', 'Monochrome Smoke Swirls',
    'Prismatic Light Reflection', '3D Chromatic Waves', 'Minimalist Color Block'
  ],
  Travel: [
    'Coastal Cliff Horizon', 'Historic Old Town Alley', 'Tropical Palm Sanctuary',
    'Alpine Mountain Summit', 'Ancient Temple Ruins', 'Venice Canal Passage'
  ]
};

const MOCK_DATA: ExtendedMedia[] = Array.from({ length: 120 }).map((_, i) => {
  const categoryIndex = i % CATEGORIES.length;
  const category = CATEGORIES[categoryIndex];
  const titleList = CATEGORY_TITLES[category];
  const title = `${titleList[i % titleList.length]} #${Math.floor(i / CATEGORIES.length) + 1}`;
  
  return {
    id: String(i + 1),
    url: `https://picsum.photos/seed/visionhub_${i + 1}/1200/900`,
    thumbnailUrl: `https://picsum.photos/seed/visionhub_${i + 1}/500/500`,
    title,
    author: `Creator ${i % 12 + 1}`,
    category,
    width: 1200,
    height: 900,
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  };
});

export function setupMockApi() {
  const originalFetch = window.fetch;

  Object.defineProperty(window, 'fetch', {
    configurable: true,
    writable: true,
    value: async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = input.toString();

      if (url.includes('api.pexels.com') || url.includes('api.example.com')) {
        const authHeader = (init?.headers as Record<string, string>)?.[ 'Authorization' ] || '';
        
        // If a real Pexels API key is supplied (not DEMO_KEY), execute real fetch call to network
        if (authHeader && authHeader !== 'DEMO_KEY' && authHeader.length > 15) {
          return originalFetch(input, init);
        }

        await new Promise(resolve => setTimeout(resolve, 250)); // simulate latency

        const urlObj = new URL(url);
        const page = parseInt(urlObj.searchParams.get('page') || '1', 10);
        const perPage = parseInt(urlObj.searchParams.get('per_page') || '24', 10);
        const query = urlObj.searchParams.get('query');

        if (url.includes('/curated') || url.includes('/search')) {
          let items = [...MOCK_DATA];
          
          if (query && query.trim() !== '') {
            const q = query.trim().toLowerCase();
            items = items.filter(i => 
              i.title.toLowerCase().includes(q) || 
              i.author.toLowerCase().includes(q) ||
              (i.category && i.category.toLowerCase().includes(q))
            );
          }

          const totalItems = items.length;
          const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
          const start = (page - 1) * perPage;
          const end = start + perPage;
          const data = items.slice(start, end);

          const pexelsPayload = {
            page,
            per_page: perPage,
            total_results: totalItems,
            next_page: page < totalPages ? `${urlObj.origin}${urlObj.pathname}?page=${page + 1}&per_page=${perPage}` : null,
            photos: data.map(item => ({
              id: Number(item.id) || item.id,
              width: item.width,
              height: item.height,
              url: item.url,
              photographer: item.author,
              photographer_url: 'https://www.pexels.com',
              photographer_id: 1001,
              avg_color: '#1a1a1a',
              src: {
                original: item.url,
                large2x: item.url,
                large: item.url,
                medium: item.thumbnailUrl,
                small: item.thumbnailUrl,
                portrait: item.thumbnailUrl,
                landscape: item.url,
                tiny: item.thumbnailUrl,
              },
              alt: item.title,
            })),
          };

          return new Response(JSON.stringify(pexelsPayload), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (url.includes('/photos/') || url.includes('/media/')) {
          const id = url.split('/photos/')[1] || url.split('/media/')[1];
          const media = MOCK_DATA.find(m => m.id === id) || MOCK_DATA[0];
          
          const pexelsPhoto = {
            id: Number(media.id) || media.id,
            width: media.width,
            height: media.height,
            url: media.url,
            photographer: media.author,
            photographer_url: 'https://www.pexels.com',
            photographer_id: 1001,
            avg_color: '#1a1a1a',
            src: {
              original: media.url,
              large2x: media.url,
              large: media.url,
              medium: media.thumbnailUrl,
              small: media.thumbnailUrl,
              portrait: media.thumbnailUrl,
              landscape: media.url,
              tiny: media.thumbnailUrl,
            },
            alt: media.title,
          };

          return new Response(JSON.stringify(pexelsPhoto), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      return originalFetch(input, init);
    }
  });
}
