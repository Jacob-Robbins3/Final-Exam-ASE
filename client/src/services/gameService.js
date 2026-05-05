import axios from 'axios';

const API_URL = 'http://localhost:5000/api/profile/games';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

export const addGame = async (gameData) => {
    const response = await axios.post(API_URL, gameData, getAuthHeaders());
    return response.data;
};

export const deleteGame = async (gameId) => {
    const response = await axios.delete(`${API_URL}/${gameId}`, getAuthHeaders());
    return response.data;
};
