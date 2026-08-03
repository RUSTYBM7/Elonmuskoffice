import { Component, type ReactNode, type ErrorInfo } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary]", error, info);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div
          style={{
            minHeight: "100dvh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            fontFamily: "system-ui, sans-serif",
            background: "#0d0d0d",
            color: "#fff",
          }}
        >
          <div style={{ maxWidth: 600 }}>
            <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>
              Something went wrong.
            </h1>
            <p style={{ opacity: 0.7, marginBottom: 16, lineHeight: 1.5 }}>
              The page hit a runtime error. Refresh to try again, or hard-refresh (Cmd+Shift+R) to bypass cache.
            </p>
            <pre
              style={{
                fontSize: 11,
                background: "rgba(255,255,255,0.05)",
                padding: 12,
                border: "1px solid rgba(255,255,255,0.1)",
                overflow: "auto",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {this.state.error.message}
              {"\n\n"}
              {this.state.error.stack?.split("\n").slice(0, 6).join("\n")}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
