import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './12-catalogV2.jsx';
import './style.css';

class AppErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error, info) { console.error('Sahayak screen failed:', error, info); }
  render() {
    if (this.state.failed) return <main className="fatal-error" role="alert"><h1>This page could not load</h1><p>Your answers have not been sent as a government application. Reload the page to try again. If the problem continues, check that the frontend setup completed and open the browser console.</p><button onClick={() => window.location.reload()}>Reload Sahayak</button></main>;
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(<AppErrorBoundary><App /></AppErrorBoundary>);
