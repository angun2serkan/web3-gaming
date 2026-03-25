import { Routes, Route } from 'react-router';

export function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<div>Lobby — Coming Soon</div>} />
        <Route path="/room/:id" element={<div>Room — Coming Soon</div>} />
        <Route path="/history" element={<div>History — Coming Soon</div>} />
      </Routes>
    </div>
  );
}
