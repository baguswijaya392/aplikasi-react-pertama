import { Link } from 'react-router-dom';

// Perhatikan: Menerima 1 objek 'member' dan fungsi 'onToggle', 'onGiveStar'
export default function TeamCard({ member, onToggle, onGiveStar }) {
  const { id, name, role, avatar, status, stars, bio } = member;
  const isOnline = status === 'Online';

  return (
    <div className="team-card">
      <img src={avatar} alt={name} className="card-avatar" />
      
      <div className="card-info">
        <h3 className="card-name">{name}</h3>
        <p className="card-role">{role}</p>
        <p className="card-bio">{bio}</p>

        <div className="card-badges">
          <span className={isOnline ? 'badge-online' : 'badge-offline'}>
            {isOnline ? '● Online' : '○ Offline'}
          </span>
          <span className="badge-stars">⭐ {stars} Bintang</span>
        </div>

        <div className="card-actions">
          <button className="btn-star" onClick={() => onGiveStar(id)}>
            ⭐ Beri Bintang
          </button>
          <button className="btn-status-toggle" onClick={() => onToggle(id)}>
            Ubah ke {isOnline ? 'Offline' : 'Online'}
          </button>
        </div>
        
        {/* Tautan Dinamis ke Halaman Detail */}
        <Link to={`/member/${id}`} className="btn-view-profile">
          Lihat Profil Detail →
        </Link>
      </div>
    </div>
  );
}