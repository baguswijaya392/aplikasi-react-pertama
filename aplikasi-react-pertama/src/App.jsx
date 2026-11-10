import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TeamPage from './pages/TeamPage';
import NewsPage from './pages/NewsPage';
import MemberDetailPage from './pages/MemberDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

export default function App() {
  // 1. STATE UTAMA (Pindahan dari TeamDirectory lama)
  const [members, setMembers] = useState([
    { id: 1, name: 'Bagus', role: 'Cyber Security', status: 'Online', stars: 6, avatar: 'https://th.bing.com/th/id/OIP.D94lYknxnk5LQKxtgqWIuQHaEx?w=238&h=180&c=7&r=0&o=7&pid=1.7&rm=3', bio: 'Specialist Offensive & Defensive' },
    { id: 2, name: 'Fahmy', role: 'UI/UX Designer', status: 'Offline', stars: 4, avatar: 'https://th.bing.com/th/id/OIP.vkigyJVRvCiFdsk7CkpW7AHaEI?w=288&h=180&c=7&r=0&o=7&pid=1.7&rm=3', bio: 'Product & UI/UX Designer' },
    { id: 3, name: 'Alsera', role: 'DevOps Engineer', status: 'Online', stars: 4, avatar: 'https://th.bing.com/th/id/OIP.VZN_DPRYkjm8mFtx_7wVpAHaE8?w=231&h=180&c=7&r=0&o=7&pid=1.7&rm=3', bio: 'Coud & DevOps Specialist' },
    { id: 4, name: 'Heru', role: 'IT Director', status: 'Offline', stars: 3, avatar: 'https://th.bing.com/th/id/OIP.Y4vhlw4h-YiLCFzUdFPTRgHaEK?w=308&h=180&c=7&r=0&o=7&pid=1.7&rm=3', bio: 'IT Strategy & Leadership' },
    { id: 5, name: 'Ghandi', role: 'Full-Stack Engineer', status: 'Online', stars: 5, avatar: 'https://th.bing.com/th/id/OIP.sdjfBqKmuszBt4VYaAqoLwHaEL?w=288&h=180&c=7&r=0&o=7&pid=1.7&rm=3', bio: 'Node.js & React Specialist' },
    { id: 6, name: 'Putra', role: 'Project Manager', status: 'Online', stars: 5, avatar: 'https://th.bing.com/th/id/OIP.wXFx5WSFP6oVIaHPoOOgjAHaE6?w=251&h=180&c=7&r=0&o=7&pid=1.7&rm=3', bio: 'Agile Secrum Master' }
  ]);

  // 2. HANDLERS
  const handleAddMember = (newMemberData) => {
    const newEntry = {
      ...newMemberData,
      id: Date.now(),
      status: 'Online',
      stars: 0,
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
    };
    setMembers((prev) => [newEntry, ...prev]);
  };

  const handleToggleStatus = (id) => {
    setMembers((prev) => 
      prev.map((m) => m.id === id ? { ...m, status: m.status === 'Online' ? 'Offline' : 'Online' } : m)
    );
  };

  const handleGiveStar = (id) => {
    setMembers((prev) => 
      prev.map((m) => m.id === id ? { ...m, stars: m.stars + 1 } : m)
    );
  };

  return (
    <div className="app-layout">
      {/* 3. PERSISTENT HEADER (Selalu tampil di atas) */}
      <Navbar totalMembers={members.length} />

      {/* 4. AREA KONTEN DINAMIS */}
      <main className="content-area">
        <Routes>
          {/* Rute Utama (Direktori) */}
          <Route 
            path="/" 
            element={
              <TeamPage 
                members={members} 
                onAddMember={handleAddMember} 
                onToggle={handleToggleStatus} 
                onGiveStar={handleGiveStar} 
              />
            } 
          />
          
          {/* Rute Berita */}
          <Route path="/news" element={<NewsPage />} />
          
          {/* Rute Detail Dinamis */}
          <Route path="/member/:id" element={<MemberDetailPage members={members} />} />
          
          {/* Rute Penangkap 404 (Harus paling bawah) */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}