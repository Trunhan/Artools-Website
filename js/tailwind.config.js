tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                display: ['Space Grotesk', 'sans-serif'],
            },
            colors: {
                stone: {
                    50: '#fafaf9',
                    100: '#f5f5f4',
                    200: '#e7e5e4',
                    300: '#d6d3d1',
                    400: '#a8a29e',
                    500: '#78716c',
                    600: '#57534e',
                    700: '#44403c',
                    800: '#292524',
                    900: '#1c1917',
                },
                'surface-light': '#EAEAE5',
            },
            animation: {
                'spin-slow': 'spin 15s linear infinite',
                'shimmer': 'shimmer 1.5s infinite',
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 3s infinite',
                'marquee-reverse': 'marquee-reverse 40s linear infinite',
            },
            keyframes: {
                shimmer: {
                    from: { transform: 'translate3d(-100%, 0, 0) skewX(-15deg)' },
                    to: { transform: 'translate3d(200%, 0, 0) skewX(-15deg)' }
                },
                float: {
                    '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
                    '50%': { transform: 'translate3d(0, -10px, 0)' },
                },
                'marquee-reverse': {
                    '0%': { transform: 'translate3d(-50%, 0, 0)' },
                    '100%': { transform: 'translate3d(0%, 0, 0)' },
                }
            }
        }
    }
}
