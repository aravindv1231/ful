import { useState } from 'react';
import './App.css';
import viteLogo from '/vite.svg';

function App() {
  const [view, setView] = useState('login'); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (view === 'signup') {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (view === 'signup' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setMessage('');

    if (view === 'login') {
      // Demo credentials only (frontend check)
      if (formData.username === 'admin' && formData.password === 'jsg@1155') {
        setMessage('✅ Login successful! Welcome back.');
        // real app: set auth state or redirect here
      } else {
        setMessage('❌ Invalid credentials');
      }
      setIsLoading(false);
    } else {
      // Simulate signup API call
      setTimeout(() => {
        setMessage('✅ Account created! Please login.');
        setView('login');
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        setIsLoading(false);
      }, 1500);
    }
  };

  const fields =
    view === 'login'
      ? [
          { label: 'Username', name: 'username', type: 'text' },
          { label: 'Password', name: 'password', type: 'password' }
        ]
      : [
          { label: 'Username', name: 'username', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Password', name: 'password', type: 'password' },
          { label: 'Confirm Password', name: 'confirmPassword', type: 'password' }
        ];

  return (
    <div className="app">
      <div className="form-container">
        <div className="header">
          <img src={viteLogo} alt="Vite" className="w-16 h-16 mx-auto mb-4" />
          <h1>{view === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
          <p>Enter your details to get started</p>
        </div>

        <div className="form-tabs">
          <button
            type="button"
            className={`tab ${view === 'login' ? 'active' : ''}`}
            onClick={() => setView('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={`tab ${view === 'signup' ? 'active' : ''}`}
            onClick={() => setView('signup')}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="input-group">
              <label htmlFor={field.name}>{field.label} *</label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                required
              />
              {errors[field.name] && (
                <div className="error">{errors[field.name]}</div>
              )}
            </div>
          ))}

          <div className="form-actions">
            <label className="checkbox-group">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="switch-link">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading
              ? 'Processing...'
              : view === 'login'
              ? 'Sign In'
              : 'Create Account'}
          </button>
        </form>

        {message && (
          <div
            className={`demo-info ${
              message.startsWith('✅')
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {message}
          </div>
        )}

        <div className="demo-info">
          <strong>Demo Credentials:</strong>
          <br />
          <code>Username: admin</code>
          <br />
          <code>Password: jsg@1155</code>
        </div>
      </div>
    </div>
  );
}

export default App;
