export const Styles = {
  layout: {
    screenContainer: (theme) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: theme === "dark" ? "#151320" : "#ffffff",
      color: theme === "dark" ? "#fbeaff" : "#000000",
      transition: "background-color 0.3s, color 0.3s",
    }),
    contentContainer: (theme) => ({
      width: "100%",
      maxWidth: "30rem",
      borderRadius: "1rem",
      backdropFilter: theme === "dark" ? "blur(10px)" : "none",
      backgroundColor:
        theme === "dark"
          ? "rgba(42, 27, 56, 0.65)"
          : "rgba(249, 250, 251, 0.95)",
      boxShadow:
        theme === "dark"
          ? "0 8px 16px rgba(255, 175, 204, 0.08)"
          : "0 4px 12px rgba(0, 0, 0, 0.05)",
      padding: "2rem",
    }),
  },
  typography: {
    heading: (theme) => ({
      fontSize: "2rem",
      fontWeight: "900",
      color: theme === "dark" ? "#ffb6c1" : "#ffcad4",
      textShadow:
        theme === "dark" ? "0 0 8px rgba(255, 182, 193, 0.3)" : "none",
      textAlign: "center",
      marginBottom: "0.75rem",
    }),
    subheading: (theme) => ({
      fontStyle: "italic",
      fontSize: "1.125rem",
      color: theme === "dark" ? "#ffe4ec" : "#444",
      textAlign: "center",
      marginBottom: "1.5rem",
    }),
    loading: {
      color: "#d29abf",
      fontSize: "0.875rem",
      textAlign: "center",
      animation: "pulse 2s ease-in-out infinite",
    },
  },
  spacing: {
    section: {
      marginBottom: "1.5rem",
    },
  },
};

export const GlobalStyles = `
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
      transform: scale(0.95);
    }
    100% {
      opacity: 0;
      transform: scale(0.5);
    }
  }
`;