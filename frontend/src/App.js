import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import BookList from './components/BookList';

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="App">
      {!token ? (
        <>
          <RegisterForm />
          <LoginForm setToken={setToken} />
        </>
      ) : (
        <BookList token={token} />
      )}
    </div>
  );
}

export default App;
