import type { Config } from "tailwindcss";

/**
 * MambaHR Design System v3
 *
 * Unified Tailwind configuration with:
 * - CSS custom properties for dynamic theming
 * - Brand colors for integrations
 * - Consistent spacing scale
 * - Standard border radius tokens
 */

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ═══════════════════════════════════════════════════════════════════
      // COLORS
      // ═══════════════════════════════════════════════════════════════════
      colors: {
        // Core semantic colors (mapped to CSS variables)
        border: "var(--border-default)",
        input: "var(--border-subtle)",
        ring: "var(--accent-ring)",
        background: "var(--bg-base)",
        foreground: "var(--text-primary)",

        // Primary (accent color)
        primary: {
          DEFAULT: "var(--accent-primary)",
          foreground: "#FFFFFF",
          hover: "var(--accent-hover)",
          active: "var(--accent-active)",
          subtle: "var(--accent-subtle)",
          muted: "var(--accent-muted)",
        },

        // Secondary (neutral)
        secondary: {
          DEFAULT: "var(--bg-surface)",
          foreground: "var(--text-primary)",
        },

        // Destructive (danger)
        destructive: {
          DEFAULT: "var(--error)",
          foreground: "#FFFFFF",
          subtle: "var(--error-subtle)",
        },

        // Muted (subtle backgrounds)
        muted: {
          DEFAULT: "var(--bg-surface)",
          foreground: "var(--text-tertiary)",
        },

        // Accent (hover states)
        accent: {
          DEFAULT: "var(--bg-hover)",
          foreground: "var(--text-primary)",
        },

        // Popover (dropdowns, tooltips)
        popover: {
          DEFAULT: "var(--bg-elevated)",
          foreground: "var(--text-primary)",
        },

        // Card
        card: {
          DEFAULT: "var(--card-bg)",
          foreground: "var(--text-primary)",
        },

        // Semantic status colors
        success: {
          DEFAULT: "var(--success)",
          foreground: "#FFFFFF",
          subtle: "var(--success-subtle)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "#FFFFFF",
          subtle: "var(--warning-subtle)",
        },
        error: {
          DEFAULT: "var(--error)",
          foreground: "#FFFFFF",
          subtle: "var(--error-subtle)",
        },
        info: {
          DEFAULT: "var(--info)",
          foreground: "#FFFFFF",
          subtle: "var(--info-subtle)",
        },

        // ─────────────────────────────────────────────────────────────────
        // BRAND COLORS (for integrations)
        // Use these instead of hardcoded hex values
        // ─────────────────────────────────────────────────────────────────
        brand: {
          // Communication
          slack: {
            DEFAULT: "#4A154B",
            light: "#611f69",
          },
          teams: {
            DEFAULT: "#5558AF",
            light: "#7B83EB",
          },
          zoom: {
            DEFAULT: "#2D8CFF",
            light: "#0B5CFF",
          },
          intercom: {
            DEFAULT: "#1F8DED",
            light: "#45A3F1",
          },

          // Engineering
          github: {
            DEFAULT: "#24292e",
            light: "#1b1f23",
          },
          gitlab: {
            DEFAULT: "#FC6D26",
            light: "#E24329",
          },
          bitbucket: {
            DEFAULT: "#0052CC",
            light: "#0747A6",
          },
          datadog: {
            DEFAULT: "#632CA6",
            light: "#774BB8",
          },
          pagerduty: {
            DEFAULT: "#06AC38",
            light: "#1DB954",
          },

          // Project Management
          jira: {
            DEFAULT: "#0052CC",
            light: "#0747A6",
          },
          linear: {
            DEFAULT: "#5E6AD2",
            light: "#4752C4",
          },
          asana: {
            DEFAULT: "#F06A6A",
            light: "#F9A825",
          },
          monday: {
            DEFAULT: "#FF3D57",
            light: "#FF6270",
          },
          trello: {
            DEFAULT: "#0079BF",
            light: "#0091D5",
          },
          clickup: {
            DEFAULT: "#7B68EE",
            light: "#896EFF",
          },
          notion: {
            DEFAULT: "#000000",
            light: "#2F3437",
          },
          confluence: {
            DEFAULT: "#0052CC",
            light: "#0747A6",
          },

          // CRM & Sales
          salesforce: {
            DEFAULT: "#00A1E0",
            light: "#1798c1",
          },
          hubspot: {
            DEFAULT: "#FF7A59",
            light: "#ff5c35",
          },
          pipedrive: {
            DEFAULT: "#017737",
            light: "#028a3d",
          },
          outreach: {
            DEFAULT: "#5951FF",
            light: "#7169FF",
          },
          gong: {
            DEFAULT: "#6935D3",
            light: "#8255E3",
          },

          // Support
          zendesk: {
            DEFAULT: "#03363D",
            light: "#045E69",
          },
          freshdesk: {
            DEFAULT: "#25C16F",
            light: "#2DD881",
          },

          // Productivity
          google: {
            DEFAULT: "#4285F4",
            light: "#1967D2",
          },
          microsoft: {
            DEFAULT: "#0078D4",
            light: "#005A9E",
          },
          dropbox: {
            DEFAULT: "#0061FF",
            light: "#007EE5",
          },

          // Design
          figma: {
            DEFAULT: "#F24E1E",
            light: "#A259FF",
          },
          canva: {
            DEFAULT: "#00C4CC",
            light: "#7D2AE8",
          },

          // Finance
          quickbooks: {
            DEFAULT: "#2CA01C",
            light: "#219611",
          },
          expensify: {
            DEFAULT: "#0B5E3E",
            light: "#1E8B5E",
          },

          // Marketing
          mailchimp: {
            DEFAULT: "#FFE01B",
            light: "#F6DD1C",
          },

          // HRIS
          finch: {
            DEFAULT: "#7C3AED",
            light: "#8B5CF6",
          },
          workday: {
            DEFAULT: "#F99D1C",
            light: "#F7931E",
          },
          bamboohr: {
            DEFAULT: "#74C13A",
            light: "#5DAD2D",
          },
        },
      },

      // ═══════════════════════════════════════════════════════════════════
      // BACKGROUND COLORS
      // ═══════════════════════════════════════════════════════════════════
      backgroundColor: {
        base: "var(--bg-base)",
        elevated: "var(--bg-elevated)",
        surface: "var(--bg-surface)",
        hover: "var(--bg-hover)",
      },

      // ═══════════════════════════════════════════════════════════════════
      // TEXT COLORS
      // ═══════════════════════════════════════════════════════════════════
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        muted: "var(--text-muted)",
      },

      // ═══════════════════════════════════════════════════════════════════
      // BORDER COLORS
      // ═══════════════════════════════════════════════════════════════════
      borderColor: {
        subtle: "var(--border-subtle)",
        default: "var(--border-default)",
        selected: "var(--border-selected)",
      },

      // ═══════════════════════════════════════════════════════════════════
      // SHADOWS
      // ═══════════════════════════════════════════════════════════════════
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        // Glow effects for special elements
        "glow-sm": "0 0 15px -3px var(--accent-primary)",
        "glow-md": "0 0 25px -5px var(--accent-primary)",
        "glow-lg": "0 0 40px -10px var(--accent-primary)",
      },

      // ═══════════════════════════════════════════════════════════════════
      // BORDER RADIUS
      // Standard scale: sm, md, lg, xl, 2xl, full
      // ═══════════════════════════════════════════════════════════════════
      borderRadius: {
        sm: "0.375rem",  // 6px - Small elements (badges, chips)
        md: "0.5rem",    // 8px - Inputs, small cards
        lg: "0.75rem",   // 12px - Cards, buttons
        xl: "1rem",      // 16px - Large cards, modals
        "2xl": "1.5rem", // 24px - Hero elements
      },

      // ═══════════════════════════════════════════════════════════════════
      // SPACING SCALE
      // Consistent 4px grid system
      // ═══════════════════════════════════════════════════════════════════
      spacing: {
        "0.5": "0.125rem",  // 2px
        "1": "0.25rem",     // 4px
        "1.5": "0.375rem",  // 6px
        "2": "0.5rem",      // 8px
        "2.5": "0.625rem",  // 10px
        "3": "0.75rem",     // 12px
        "3.5": "0.875rem",  // 14px
        "4": "1rem",        // 16px
        "5": "1.25rem",     // 20px
        "6": "1.5rem",      // 24px
        "7": "1.75rem",     // 28px
        "8": "2rem",        // 32px
        "9": "2.25rem",     // 36px
        "10": "2.5rem",     // 40px
        "11": "2.75rem",    // 44px
        "12": "3rem",       // 48px
        "14": "3.5rem",     // 56px
        "16": "4rem",       // 64px
        "18": "4.5rem",     // 72px
        "20": "5rem",       // 80px
        "24": "6rem",       // 96px
        "28": "7rem",       // 112px
        "32": "8rem",       // 128px
        "36": "9rem",       // 144px
        "40": "10rem",      // 160px
        "44": "11rem",      // 176px
        "48": "12rem",      // 192px
        "52": "13rem",      // 208px
        "56": "14rem",      // 224px
        "60": "15rem",      // 240px
        "64": "16rem",      // 256px
        "72": "18rem",      // 288px
        "80": "20rem",      // 320px
        "96": "24rem",      // 384px
      },

      // ═══════════════════════════════════════════════════════════════════
      // FONT SIZE
      // ═══════════════════════════════════════════════════════════════════
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],   // 10px
        xs: ["0.75rem", { lineHeight: "1rem" }],          // 12px
        sm: ["0.875rem", { lineHeight: "1.25rem" }],      // 14px
        base: ["1rem", { lineHeight: "1.5rem" }],         // 16px
        lg: ["1.125rem", { lineHeight: "1.75rem" }],      // 18px
        xl: ["1.25rem", { lineHeight: "1.75rem" }],       // 20px
        "2xl": ["1.5rem", { lineHeight: "2rem" }],        // 24px
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],   // 30px
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],     // 36px
        "5xl": ["3rem", { lineHeight: "1" }],             // 48px
        "6xl": ["3.75rem", { lineHeight: "1" }],          // 60px
      },

      // ═══════════════════════════════════════════════════════════════════
      // ANIMATIONS
      // ═══════════════════════════════════════════════════════════════════
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-up": "fade-up 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
      },

      // ═══════════════════════════════════════════════════════════════════
      // TRANSITIONS
      // ═══════════════════════════════════════════════════════════════════
      transitionDuration: {
        fast: "150ms",
        base: "200ms",
        slow: "300ms",
      },
      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
