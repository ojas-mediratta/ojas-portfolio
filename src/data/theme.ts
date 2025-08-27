export const THEME = {
    bg: '#1f2430',
    panel: '#232a36',
    border: '#2b3240',
    text: '#cbccc6',
    subtext: '#9da5b4',
    accents: ['#59c2ff', '#bae67e', '#ffcc66', '#f28779', '#d4bfff'],
}


// Helper shades for inline styles
export const styles = {
    panel: { backgroundColor: THEME.panel, border: `1px solid ${THEME.border}` },
    link: { color: THEME.accents[0] },
    sub: { color: THEME.subtext },
}