import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gameId, setGameId] = useState('');
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  const api = axios.create({
    baseURL: 'https://wa-guessinggame-poc-001.azurewebsites.net',
  });

  const register = async () => {
    const res = await api.post('/register', { username, password });
    setToken(res.data.token);
  };

  const startGame = async () => {
    const res = await api.post('/game', {}, {
      headers: { 'Authorization': token }
    });
    setGameId(res.data.gameId);
  };

  const makeGuess = async () => {
    const res = await api.post('/guess', { gameId, guess });
    setMessage(res.data);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#BEBEBE',
    }}>
    <div>
      <div>
        <h2>1. Register yourself</h2>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button onClick={register}>Register</button>
        {token && <p>You have been register successfully!</p>}
      </div>

      <div>
        <h2>2. Start a game</h2>
        <button onClick={startGame}>Start Game</button>
        {gameId && <p>Your game ID: {gameId}, so now provide the your guess number down below please.</p>}
      </div>

      <div>
        <h2>3. Make a Guess</h2>
        <input value={guess} onChange={e => setGuess(e.target.value)} placeholder="Your Guess" />
        <button onClick={makeGuess}>Guess</button>
        {message && <p>{message}</p>}
      </div>
    </div>
    <div style={{
    position: 'fixed',
    left: '10px',
    bottom: '10px',
    backgroundColor: '#BEBEBE',
    color: '#000',
    padding: '5px',
    fontSize: '10px',
    }}>
    Version: 0.0.1
    </div>
    </div>

  );
};

export default App;
