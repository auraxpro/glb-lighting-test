'use client'

import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="scene-container">
          <div className="loading">
            <div style={{ textAlign: 'center', color: '#ff6b6b' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚠️ 3D Scene Error</div>
              <div style={{ fontSize: '16px', marginBottom: '20px' }}>
                Something went wrong with the 3D scene
              </div>
              <button 
                onClick={() => this.setState({ hasError: false })}
                style={{
                  padding: '10px 20px',
                  background: '#007acc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                🔄 Try Again
              </button>
              <div style={{ fontSize: '12px', marginTop: '15px', color: '#888' }}>
                Check browser console for details
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
