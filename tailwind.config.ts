import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['DM Sans', 'sans-serif'],
				space: ['Space Grotesk', 'sans-serif'],
				display: ['Inter', 'sans-serif'],
				body: ['DM Sans', 'sans-serif'],
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-background': 'var(--gradient-background)',
				'gradient-brand': 'var(--gradient-brand)',
				'gradient-soft': 'var(--gradient-soft)',
				'gradient-dark': 'var(--gradient-dark)',
				'gradient-hero': 'var(--gradient-hero-pastel)',
				'gradient-section': 'var(--gradient-section-soft)',
				'gradient-footer': 'var(--gradient-footer-pastel)',
			},
			boxShadow: {
				'glow': 'var(--shadow-glow)',
				'elegant': 'var(--shadow-elegant)',
				'pink': 'var(--shadow-pink)',
				'card': 'var(--shadow-card)',
				'glow-pink': 'var(--glow-pink)',
				'shell': 'var(--shadow-shell)',
			},
			transitionProperty: {
				'smooth': 'var(--transition-smooth)',
			},
			colors: {
				rose: {
					50: '#fff1f2',
					100: '#ffe4e6',
					200: '#fecdd3',
					300: '#fda4af',
					400: '#fb7185',
					500: '#f43f5e',
					600: '#e11d48',
					700: '#be123c',
					800: '#9f1239',
					900: '#881337',
				},
				'french-rose': {
					DEFAULT: '#F4497A',
					tint1:  '#FDE8EF',
					tint2:  '#FAC9D9',
					tint3:  '#F7AABF',
					tint4:  '#F58BA9',
					tint5:  '#F46C93',
					shade1: '#D93D68',
					shade2: '#BF3158',
					shade3: '#A42647',
					shade4: '#881A37',
					shade5: '#6D0F26',
					tone1:  '#E8537F',
					tone2:  '#D96080',
					tone3:  '#C96D80',
				},
				moonstone: {
					DEFAULT: '#69C4C0',
					tint1:  '#EAF8F7',
					tint2:  '#C3ECEB',
					shade1: '#54A8A5',
					shade2: '#3F8C8A',
				},
				folly: {
					DEFAULT: '#FF1744',
					tint1:  '#FFE8EC',
					tint2:  '#FFC1CC',
				},
				mulberry: {
					DEFAULT: '#9B4F96',
					tint1:  '#F4EAF4',
					tint2:  '#E0C4DF',
				},
				'warm-white': '#FAFAF8',
				'pale-gray':  '#E8E8E6',
				'deep-slate': '#2D3142',
				'near-black': '#0F0F0F',
				'peach-blossom': '#FFDAB9',
				'lavender-mist': '#E6E6FA',
				'pastel-rose': '#FFE4EC',
				'ink-warm': '#3D3548',
				blush: '#fdf2f4',
				cream: '#fefaf9',
				mauve: '#c084a0',
				plum: '#7c3f5e',
				pearl: '#f9e8ec',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				fadeUp: {
					'0%': { opacity: '0', transform: 'translateY(28px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				floatY: {
					'0%,100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-14px)' },
				},
				pulseGlow: {
					'0%,100%': { boxShadow: '0 0 16px rgba(244,73,122,0.2)' },
					'50%': { boxShadow: '0 0 36px rgba(244,73,122,0.35)' },
				},
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
				slideInLeft: {
					'0%': { opacity: '0', transform: 'translateX(-32px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				scaleIn: {
					'0%': { opacity: '0', transform: 'scale(0.92)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				fadeUp: 'fadeUp 0.7s ease forwards',
				fadeIn: 'fadeIn 0.6s ease forwards',
				floatY: 'floatY 4s ease-in-out infinite',
				pulseGlow: 'pulseGlow 3s ease-in-out infinite',
				shimmer: 'shimmer 2.5s linear infinite',
				slideInLeft: 'slideInLeft 0.7s ease forwards',
				scaleIn: 'scaleIn 0.6s ease forwards',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
