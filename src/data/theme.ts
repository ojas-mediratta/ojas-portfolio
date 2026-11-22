// Dark theme: soft charcoal with warm white, orange, and green accents.
export const DARK_THEME = {
    bg: '#111512',
    panel: '#171c18',
    border: '#2d352f',
    text: '#f4f2ec',
    subtext: '#929a94',
    mouseGlow: 'rgba(146,154,148,0.12)',
    // Legacy token names map to the two-color accent system.
    blue: '#ff9d52',
    green: '#7bd6a0',
    yellow: '#ff9d52',
    red: '#ff9d52',
    purple: '#7bd6a0',
    cyan: '#ff9d52',
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
    yellow: '#b94f16',
    red: '#b94f16',
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
      color: DARK_THEME.green,
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
