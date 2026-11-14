import { useState } from 'react';
import './ProfileCard.css'; 

function ProfileCard() {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="profile-card">
      <div className="profile-avatar">👤</div>

      <h2>Profile System</h2>
      <p className="profile-description">
        User identity verification module.
      </p>

      <div className="profile-info">
        <h3>Current Status</h3>
        
        <div className="status-box">
          <span>Nama: <strong>Wijaya</strong></span>
          
          <span className={`status-text ${isOnline ? 'status-online' : 'status-offline'}`}>
            ● {isOnline ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      <button 
        className="btn-toggle" 
        onClick={() => setIsOnline(!isOnline)}
      >
        Ganti Status
      </button>
    </div>
  );
}

export default ProfileCard;