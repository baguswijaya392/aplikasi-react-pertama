import React, { useState } from 'react';
import TeamCard from './TeamCard';
import AddMemberForm from './AddMemberForm'; // 1. Import Form dari Modul 1.5

const initialMembers = [
  // Saya tambahkan properti "bio" sesuai tugas tambahan di Modul 1.5
  { id: 1, name: 'Bagus', role: 'EXP Lane', status: 'Online', stars: 6, bio: 'Exp lane terkuat se-Indonesia', avatar: 'https://i.pinimg.com/736x/fd/37/98/fd3798eecf5a117d52ab59631d5651a2.jpg' },
  { id: 2, name: 'Fahmy', role: 'Gold Lane', status: 'Offline', stars: 5, bio: 'Gold lane yang sabar', avatar: 'https://i.pinimg.com/736x/33/c7/ea/33c7ea45c555dff700cecdb3b94b1d11.jpg' },
  { id: 3, name: 'Alsera', role: 'Mid Lane', status: 'Online', stars: 4, bio: 'Mage user sejati', avatar: 'https://i.pinimg.com/736x/1b/65/25/1b6525ce650a61454a3f9320e0266054.jpg' },
  { id: 4, name: 'Heru', role: 'Jungler', status: 'Offline', stars: 4, bio: 'Rotasi cepat seperti kilat', avatar: 'https://i.pinimg.com/736x/fe/90/e2/fe90e264758d1438ccb675174fd9a3ad.jpg' },
  { id: 5, name: 'Putra', role: 'Roam', status: 'Online', stars: 3, bio: 'Tank setia kawan', avatar: 'https://i.pinimg.com/736x/7b/a5/65/7ba5651338e3006814d0f45062c2fc61.jpg' },
  
  // 2. FIX BUG: ID Ghandi saya ubah jadi 6 (sebelumnya 5)
  { id: 6, name: 'Ghandi', role: 'Roam (2)', status: 'Online', stars: 5, bio: 'Roamer kedua andalan tim', avatar: 'https://i.pinimg.com/736x/7b/a5/65/7ba5651338e3006814d0f45062c2fc61.jpg' },
];

export default function TeamDirectory() {
  const [members, setMembers] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState('');

  const totalMembers = members.length;
  const onlineMembers = members.filter((m) => m.status === 'Online').length;
  const offlineMembers = totalMembers - onlineMembers;

  const handleToggleStatus = (id) => {
    setMembers((prevMembers) => 
      prevMembers.map((member) => 
        member.id === id 
          ? { ...member, status: member.status === 'Online' ? 'Offline' : 'Online' } 
          : member
      )
    );
  };

  const handleAddStar = (id) => {
    setMembers((prevMembers) => 
      prevMembers.map((member) => 
        member.id === id 
          ? { ...member, stars: member.stars + 1 } 
          : member
      )
    );
  };

  // 3. FUNGSI BARU: Menerima data dari AddMemberForm (Modul 1.5)
  const handleAddMember = (newMemberData) => {
    const newEntry = {
      ...newMemberData,
      id: Date.now(), // Bikin ID unik otomatis
      status: 'Online', // Default status baru
      stars: 0,         // Default bintang baru
      // Avatar default pakai pravatar karena user tidak input link gambar
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}` 
    };
    
    // Tambahkan data baru ke urutan paling depan array
    setMembers((prev) => [newEntry, ...prev]);
  };

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="directory-container">
      <h2 className="directory-title">Daftar Anggota Tim ISG Mobile Legends</h2>

      <div className="stats-bar">
        <div className="stat-box">
          <div className="stat-num">{totalMembers}</div>
          <div className="stat-label">Total Members</div>
        </div>
        <div className="stat-box">
          <div className="stat-num online">{onlineMembers}</div>
          <div className="stat-label">Online</div>
        </div>
        <div className="stat-box">
          <div className="stat-num offline">{offlineMembers}</div>
          <div className="stat-label">Offline</div>
        </div>
      </div>

      {/* 4. PASANG FORM DI SINI (Di atas kotak pencarian) */}
      <AddMemberForm onAddMember={handleAddMember} />

      <input 
        type="text" 
        placeholder="Cari nama anggota..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input" 
      />

      <div className="team-grid">
        {filteredMembers.length === 0 ? (
          <div className="empty-state">
            Tidak ada anggota tim yang cocok dengan kata kunci "{searchTerm}".
          </div>
        ) : (
          filteredMembers.map((member) => (
            <TeamCard 
              key={member.id} 
              {...member} 
              onToggleStatus={handleToggleStatus} 
              onAddStar={handleAddStar}
            />
          ))
        )}
      </div>
    </div>
  );
}