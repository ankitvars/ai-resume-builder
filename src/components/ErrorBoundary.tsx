'use client';

import React from 'react';

type FallbackProps = {
  error: Error;
  reset: () => void;
};

type Props = {
  children: React.ReactNode;
  fallback?: (props: FallbackProps) => React.ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: null
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Dev-only logging (no external service)
    if (process.env.NODE_ENV !== 'production') {
      console.group('🚨 ErrorBoundary caught an error');
      console.error(error);
      console.info(errorInfo.componentStack);
      console.groupEnd();
    }
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;

    if (hasError && error) {
      if (this.props.fallback) {
        return this.props.fallback({
          error,
          reset: this.reset
        });
      }

      return (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            padding: 32,
            maxWidth: 720,
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          <h2>Something went wrong</h2>
          <p>Try refreshing the page or resetting this view.</p>

          {process.env.NODE_ENV !== 'production' && (
            <pre
              style={{
                marginTop: 16,
                padding: 16,
                textAlign: 'left',
                background: '#111',
                color: '#eee',
                borderRadius: 6,
                overflowX: 'auto'
              }}
            >
              {error.message}
            </pre>
          )}

          <button
            onClick={this.reset}
            style={{
              marginTop: 24,
              padding: '8px 16px',
              cursor: 'pointer'
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
