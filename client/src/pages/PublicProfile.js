import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PublicProfile = () => {
    const { username } = useParams(); 
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPublicProfile = async () => {
            try {
                const res = await axios.get(`/api/profile/${username}`);
                setProfile(res.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Player not found.'); 
                setLoading(false);
            }
        };
        fetchPublicProfile();
    }, [username]);

    if (loading) return <div className="loading">Loading PlayerCard...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!profile || !profile.user) return null;

    return (
        <div className="public-profile-container">
            <header className="profile-header">
                <h1>{profile.user.username}'s PlayerCard</h1>
                <p className="bio">
                    Member since {profile.user.createdAt ? new Date(profile.user.createdAt).getFullYear() : '2026'}
                </p>
            </header>

            <div className="stats-grid">
                {profile.games && profile.games.length > 0 ? (
                    profile.games.map(game => (
                        <div key={game._id} className="public-game-card">
                            <div className="card-accent" style={{ background: '#61dafb', height: '4px' }}></div>
                            <h3>{game.title}</h3>
                            <span className="platform-tag">{game.platform}</span>
                            <div className="rank-display">
                                <small>Current Rank</small>
                                <p>{game.rank || 'Casual Player'}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="empty-msg">This player hasn't added any games to their card yet.</p>
                )}
            </div>
        </div>
    );
};

export default PublicProfile;
