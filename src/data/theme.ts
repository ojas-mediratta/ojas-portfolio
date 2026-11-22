// Ayu Mirage (Dark Theme)
export const DARK_THEME = {
    bg: '#1f2430',
    panel: '#232a36',
    border: '#2b3240',
    text: '#cbccc6',
    subtext: '#828997',
    mouseGlow: 'rgba(89,194,255,0.15)', // Blue glow for dark mode
    // Individual accent colors for easy reference
    blue: '#59c2ff',
    green: '#bae67e', 
    yellow: '#ffcc66',
    red: '#f28779',
    purple: '#d4bfff',
    cyan: '#95E6CB',
    // Accents array derived from individual colors
    get accents() { return [this.blue, this.green, this.yellow, this.red, this.purple]; },
}

// Warm paper (Light Theme)
export const LIGHT_THEME = {
    bg: '#f7f5f0',
    panel: '#fffdf9',
    border: '#ded9cf',
    text: '#30312f',
    subtext: '#68665f',
    mouseGlow: 'rgba(48, 49, 47, 0.08)',
    // Match the section header ink across light-mode accents.
    blue: '#30312f',
    green: '#30312f',
    yellow: '#30312f',
    red: '#30312f',
    purple: '#30312f',
    cyan: '#30312f',
    // Status indicator color
    statusBlue: '#52735d',
    // Accents array derived from individual colors
    get accents() { return [this.blue, this.green, this.yellow, this.red, this.purple]; },
}

export const THEME = DARK_THEME; // Default export for compatibility

// Utility function to get status indicator colors
export const getStatusColors = (theme: 'dark' | 'light') => {
  if (theme === 'dark') {
    return {
      color: '#34d399',
      shadowRgba: '16,185,129', // emerald-400 equivalent
      backgroundHex: '#34d399',
    };
  } else {
    return {
      color: LIGHT_THEME.statusBlue,
      shadowRgba: '82,115,93',
      backgroundHex: LIGHT_THEME.statusBlue,
    };
  }
};

// Helper shades for inline styles
export const styles = {
    panel: { backgroundColor: THEME.panel, border: `1px solid ${THEME.border}` },
    link: { color: THEME.accents[0] },
    sub: { color: THEME.subtext },
}
