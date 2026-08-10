import React, { useState } from 'react';
import { MediaProvider, useMediaCurated, useMediaSearch, useMediaById } from '../src';
import { MediaClient } from '@my-app/media-core';

// You can initialize the client outside the React tree
const client = new MediaClient({
  apiKey: 'DEMO_KEY',
  baseUrl: 'https://api.example.com/v1',
});

function CuratedGallery() {
  const { data, loading, error } = useMediaCurated({ page: 1, perPage: 10 });

  if (loading) return <div>Loading curated media...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Curated Media</h2>
      <ul>
        {data?.data.map((item) => (
          <li key={item.id}>{item.title} by {item.author}</li>
        ))}
      </ul>
    </div>
  );
}

function SearchGallery() {
  const [query, setQuery] = useState('nature');
  const { data, loading, error } = useMediaSearch({ query, page: 1 });

  return (
    <div>
      <h2>Search</h2>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {loading && <div>Searching...</div>}
      {error && <div>Error: {error.message}</div>}
      <ul>
        {data?.data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

function MediaDetail({ id }: { id: string }) {
  const { data, loading, error } = useMediaById(id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <div>
      <h2>{data.title}</h2>
      <img src={data.url} alt={data.title} />
    </div>
  );
}

export function App() {
  return (
    <MediaProvider client={client}>
      <CuratedGallery />
      <hr />
      <SearchGallery />
      <hr />
      <MediaDetail id="123" />
    </MediaProvider>
  );
}
