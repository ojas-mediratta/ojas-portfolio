// Original Ayu Mirage dark theme.
export const DARK_THEME = {
    bg: '#1f2430',
    panel: '#232a36',
    border: '#2b3240',
    text: '#cbccc6',
    subtext: '#828997',
    mouseGlow: 'rgba(89,194,255,0.15)',
    blue: '#59c2ff',
    green: '#bae67e',
    yellow: '#ffcc66',
    red: '#f28779',
    purple: '#d4bfff',
    cyan: '#95e6cb',
    get accents() { return [this.blue, this.green, this.yellow, this.red, this.purple]; },
}

// Warm paper (Light Theme)
export const LIGHT_THEME = {
    bg: '#f7f5ef',
    panel: '#fffdf8',
    border: '#dcd8cf',
    text: '#242722',
    subtext: '#666d67',
    mouseGlow: 'rgba(102,109,103,0.09)',
    blue: '#b94f16',
    green: '#26734a',
    yellow: '#26734a',
    red: '#26734a',
    purple: '#26734a',
    cyan: '#b94f16',
    statusGreen: '#26734a',
    get accents() { return [this.blue, this.green, this.yellow, this.red, this.purple]; },
}

export const THEME = DARK_THEME; // Default export for compatibility

// Utility function to get status indicator colors
export const getStatusColors = (theme: 'dark' | 'light') => {
  if (theme === 'dark') {
    return {
      color: '#34d399',
    };
  } else {
    return {
      color: LIGHT_THEME.statusGreen,
    };
  }
};

// Helper shades for inline styles
export const styles = {
    panel: { backgroundColor: THEME.panel, border: `1px solid ${THEME.border}` },
    link: { color: THEME.accents[0] },
    sub: { color: THEME.subtext },
}
