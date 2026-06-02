---
name: Compassionate Care Framework
colors:
  surface: '#faf9f7'
  surface-dim: '#dadad8'
  surface-bright: '#faf9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeec'
  surface-container-high: '#e9e8e6'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#3f4a3c'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#6f7a6b'
  outline-variant: '#becab9'
  surface-tint: '#006e1c'
  primary: '#006e1c'
  on-primary: '#ffffff'
  primary-container: '#4caf50'
  on-primary-container: '#003c0b'
  inverse-primary: '#78dc77'
  secondary: '#0061a4'
  on-secondary: '#ffffff'
  secondary-container: '#33a0fd'
  on-secondary-container: '#00355c'
  tertiary: '#8b5000'
  on-tertiary: '#ffffff'
  tertiary-container: '#e18500'
  on-tertiary-container: '#4d2b00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#94f990'
  primary-fixed-dim: '#78dc77'
  on-primary-fixed: '#002204'
  on-primary-fixed-variant: '#005313'
  secondary-fixed: '#d1e4ff'
  secondary-fixed-dim: '#9ecaff'
  on-secondary-fixed: '#001d36'
  on-secondary-fixed-variant: '#00497d'
  tertiary-fixed: '#ffdcbe'
  tertiary-fixed-dim: '#ffb870'
  on-tertiary-fixed: '#2c1600'
  on-tertiary-fixed-variant: '#693c00'
  background: '#faf9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e3e2e0'
typography:
  headline-lg:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 20px
  stack-gap-sm: 12px
  stack-gap-md: 24px
  stack-gap-lg: 40px
  touch-target-min: 48px
---

## Brand & Style

The design system is centered on empathy, clarity, and psychological safety. Recognizing that users are often undergoing intensive chemotherapy, the UI prioritizes a **Stress-reducing Minimalism** that feels like a supportive companion rather than a clinical monitoring tool. 

The aesthetic blends **Modern Corporate** reliability with **Soft Minimalism**. By utilizing generous whitespace and a warm, low-glare background, the interface reduces cognitive load and visual fatigue. The emotional response should be one of "gentle guidance"—providing patients with a sense of control and hope during their recovery journey within the WeChat environment.

## Colors

The palette is designed to be life-affirming and stable. 
- **Primary (Hopeful Green):** Used for primary actions, progress indicators, and "healthy" states. It symbolizes growth and recovery.
- **Secondary (Ocean Blue):** Used for informational elements, medical resources, and professional guidance, evoking trust and calm.
- **Background (Warm Sand):** A slightly warm off-white (#F9F8F6) is used across all screens to reduce the "blue light" harshness of pure white, making long reading sessions more comfortable for symptomatic eyes.
- **Semantic Risks:** Risk levels use muted, desaturated versions of green, orange, and red to convey urgency without inducing panic.

## Typography

This design system utilizes **Atkinson Hyperlegible Next** to ensure maximum readability for patients who may experience blurred vision or "chemo-fog." 

The hierarchy is intentionally flat with larger-than-standard base sizes. 
- **Scale:** Body text starts at 16px (md) to accommodate elderly users. 
- **Contrast:** High contrast between text and background is maintained, but extreme blacks are avoided in favor of deep charcoal (#2C3E50) to keep the tone soft.
- **Line Height:** Generous leading (1.5x) is applied to all body text to prevent lines from blurring together during reading.

## Layout & Spacing

Designed specifically for the WeChat Official Account webview, the layout follows a **Fluid Card-based Grid**. 

- **Structure:** A single-column layout is preferred to maintain a clear linear path for symptom reporting. 
- **Margins:** 20px side margins ensure content does not feel cramped against the phone edges.
- **Touch Targets:** All interactive elements (buttons, checkboxes, navigation) must meet a minimum height of 48px, with 56px preferred for primary actions to accommodate users with reduced fine motor skills.
- **Rhythm:** Use a vertical 8px rhythm. Large gaps (40px) should separate distinct logical sections (e.g., separating "Daily Check-in" from "Educational Tips").

## Elevation & Depth

Depth is conveyed through **Tonal Layers** and **Soft Ambient Shadows** rather than sharp borders. 

- **Surface Strategy:** The primary background is the "Warm Sand" surface. Content is housed in white cards that use a very soft, diffused shadow (10% opacity of the Primary Green or Neutral Grey) to appear slightly lifted.
- **Active States:** When a card or button is pressed, it should "sink" slightly (shadow removal or subtle scale down) to provide tactile feedback.
- **Focus:** No heavy borders. Use subtle 1px inner strokes in a slightly darker shade of the background color to define boundaries without adding visual noise.

## Shapes

The shape language is **Rounded**, avoiding all sharp corners to maintain a friendly, non-threatening atmosphere.

- **Components:** Standard buttons and input fields use a 0.5rem (8px) radius. 
- **Cards:** Content containers use 1rem (16px) or 1.5rem (24px) for a "pillowy" and soft appearance.
- **Icons:** All iconography must feature rounded terminals and soft curves. Avoid thin, jagged lines.

## Components

### Buttons
- **Primary:** Solid #4CAF50 with white text. High-contrast, large, and rounded.
- **Secondary:** Outlined with a 2px stroke of #2196F3. Used for "Learn More" or "View History."
- **Ghost:** Minimal text-only buttons for "Skip" or "Cancel" to reduce visual priority.

### Cards
Cards are the primary vessel for information. Each card should have a 16px internal padding. Symptom reporting cards should use large, clear "Emoji-style" or "Soft Medical" icons to represent different health states.

### Input Fields
Inputs are large with visible labels. Radio buttons and checkboxes are replaced with "Selectable Cards"—large tappable areas that change color when selected—to make symptom logging easier for those with tremors or fatigue.

### Risk Indicators
- **Low Risk:** Soft Green banner with a checkmark.
- **Moderate Risk:** Muted Orange card with a suggestion to "Consult your nurse."
- **High Risk:** Calm Red card with a direct "Call Clinic" button. This should feel urgent but stay within the "Professional/Calm" aesthetic to avoid triggering patient anxiety.

### Progress Trackers
Horizontal step indicators using the "Ocean Blue" to show the journey through a chemotherapy cycle, providing a sense of milestone achievement and forward momentum.