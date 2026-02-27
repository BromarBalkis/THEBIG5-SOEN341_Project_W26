import React from "react";

type State = { error?: Error };

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  state: State = {};

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: any) {
    console.error("App crashed:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, fontFamily: "Arial", color: "white" }}>
          <h2>App crashed</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error.message}
          </pre>
          <p>Open DevTools Console for the full stack trace.</p>
        </div>
      );
    }
    return this.props.children;
  }
}