export const Styles = {
  layout: {
    screenContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh'
    },
    contentContainer: {
      width: '100%',
      maxWidth: '28rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      padding: '2rem',
      backgroundColor: '#f9fafb'
    }
  },
  typography: {
    heading: {
      fontSize: '1.875rem',
      fontWeight: '800',
      color: '#1d4ed8',
      textAlign: 'center',
      marginBottom: '0.5rem'
    },
    subheading: {
      fontStyle: 'italic',
      fontSize: '1rem',
      color: '#4b5563',
      textAlign: 'center',
      marginBottom: '1.5rem'
    },
    loading: {
      color: '#3b82f6',
      fontSize: '0.875rem',
      textAlign: 'center',
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    }
  },
  spacing: {
    section: {
      marginBottom: '1.5rem'
    }
  }
};

// For the pulse animation
export const GlobalStyles = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;