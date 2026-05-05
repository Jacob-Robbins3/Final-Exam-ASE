import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [games, setGames] = useState([]);
    const [username, setUsername] = useState('');
    const [formData, setFormData] = useState({ title: '', platform: 'PC', rank: '' });
    const [message, setMessage] = useState('');

    const API_BASE_URL = 'http://localhost:5000/api/profile';

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const token = localStorage.getItem('userToken');
                if (!token) return;

                const res = await axios.get(`${API_BASE_URL}/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setGames(res.data.games || []);
                setUsername(res.data.user.username);
            } catch (err) {
                console.error('Connection failed. Verify server is on port 5000.');
            }
        };
        fetchGames();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        window.location.href = '/login';
    };

    const handleAddGame = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('userToken');
            const res = await axios.post(`${API_BASE_URL}/games`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setGames([...games, res.data]);
            setFormData({ title: '', platform: 'PC', rank: '' });
            setMessage('Game added successfully!');
        } catch (err) {
            setMessage('Failed to add game.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Remove this game from your PlayerCard?')) return;
        try {
            const token = localStorage.getItem('userToken');
            await axios.delete(`${API_BASE_URL}/games/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setGames(games.filter(g => g._id !== id));
        } catch (err) {
            alert('Delete failed.');
        }
    };

    return (
        <div className="dashboard-container" style={{ padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>{username ? `${username}'s` : 'Your'} PlayerCard</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>

            <section className="add-game-form">
                <h3>Add a New Game</h3>
                <form onSubmit={handleAddGame}>
                    <input 
                        value={formData.title} 
                        onChange={e => setFormData({...formData, title: e.target.value})} 
                        placeholder="Game Title (e.g. Terraria)" 
                        required 
                    />
                    <select 
                        value={formData.platform} 
                        onChange={e => setFormData({...formData, platform: e.target.value})}
                    >
                        <option value="PC">PC</option>
                        <option value="Nintendo Switch">Nintendo Switch</option>
                        <option value="Steam">Steam</option>
                        <option value="PlayStation">PlayStation</option>
                    </select>
                    <input 
                        value={formData.rank} 
                        onChange={e => setFormData({...formData, rank: e.target.value})} 
                        placeholder="Your Rank" 
                    />
                    <button type="submit">Add Game</button>
                </form>
                {message && <p className="status-msg">{message}</p>}
            </section>

            <hr />

            <section className="game-display">
                <h2>Current Games</h2>
                {games.length === 0 ? (
                    <p>No games added yet.</p>
                ) : (
                    <div className="game-grid" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {games.map(game => (
                            <div key={game._id} className="game-card" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                                <h4>{game.title}</h4>
                                <p><strong>Platform:</strong> {game.platform}</p>
                                <p><strong>Rank:</strong> {game.rank || 'N/A'}</p>
                                <button onClick={() => handleDelete(game._id)} style={{ color: 'red' }}>Delete</button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Dashboard;
