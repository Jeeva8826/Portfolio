import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("React Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', backgroundColor: '#222', color: '#ff5555', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h1 style={{ color: 'white', marginBottom: '20px' }}>Something went wrong.</h1>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{this.state.error && this.state.error.toString()}</p>
          <pre style={{ backgroundColor: '#111', padding: '20px', overflowX: 'auto', marginTop: '20px', color: '#ddd' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#ff5555', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
