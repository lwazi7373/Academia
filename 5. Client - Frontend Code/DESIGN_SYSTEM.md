# Academia Design System

> **Modern Academic + Vibrant & Engaging**  
> A comprehensive design system for the Academia Student Risk Management Platform

---

## 🎨 Design Philosophy

This design system combines **Modern Academic professionalism** with **Vibrant & Engaging** energy, creating an interface that is:

- **Trustworthy & Professional** - Building confidence in educational technology
- **Energetic & Motivating** - Encouraging student success and engagement
- **Accessible & Readable** - Scientifically optimized typography for all users
- **Role-Aware** - Subtle visual distinctions for different user types

---

## 🌈 Color Palette

### Primary - Smart Blue (#2D68C4)
**Purpose:** Trust, intelligence, professionalism  
**Usage:** Primary CTAs, navigation, key UI elements  
**Accessibility:** Good contrast on white (5.40:1)

```css
primary-50:  #E8F1FC
primary-100: #D1E4F9
primary-500: #2D68C4 /* Main */
primary-700: #1E4482
primary-900: #0F2241
```

### Secondary - Yale Blue (#00416A)
**Purpose:** Academic prestige, depth, authority  
**Usage:** Coordinator features, secondary actions, headers  
**Accessibility:** Very good contrast (10.69:1)

```css
secondary-50:  #E0F2FF
secondary-100: #BAE6FF
secondary-600: #00416A /* Main */
secondary-800: #002C47
secondary-950: #001624
```

### Accent - Princeton Orange (#FF8200)
**Purpose:** Energy, motivation, action  
**Usage:** Important CTAs, achievements, highlights  
**Accessibility:** Very good on dark backgrounds (8.45:1)

```css
accent-50:  #FFF4E5
accent-100: #FFE9CC
accent-500: #FF8200 /* Main */
accent-700: #994E00
accent-900: #331A00
```

### Semantic Colors

#### Success (Achievement & Progress)
```css
success-500: #10B981
success-600: #059669
success-700: #047857
```

#### Warning (Caution & Attention)
```css
warning-500: #F59E0B
warning-600: #D97706
warning-700: #B45309
```

#### Danger (Risk & Critical)
```css
danger-500: #EF4444
danger-600: #DC2626
danger-700: #B91C1C
```

#### Info (Guidance & Information)
```css
info-500: #468FEA /* Blue Energy */
info-600: #2563EB
info-700: #1D4ED8
```

### Role-Specific Colors

```css
role-student:     #2D68C4 /* Primary Blue - Friendly & Encouraging */
role-lecturer:    #00416A /* Secondary Blue - Professional & Efficient */
role-coordinator: #6D28D9 /* Purple - Analytical & Data-focused */
role-admin:       #DC2626 /* Red - Authority & System-level */
```

---

## ✍️ Typography

### Font Families

**Display/Headings:** Lexend  
- Scientifically designed for reading proficiency
- Optimized for dyslexia-friendly design
- Modern, friendly, highly readable

**Body Text:** Source Sans 3  
- Professional and accessible
- Excellent for extended reading
- Clean and neutral

**Monospace:** JetBrains Mono  
- For code, technical data, student numbers
- Excellent legibility

### Font Sizes & Line Heights

```css
text-xs:   12px / 16px (tracking: 0.02em)
text-sm:   14px / 20px (tracking: 0.01em)
text-base: 16px / 24px (tracking: 0)
text-lg:   18px / 28px (tracking: -0.01em)
text-xl:   20px / 28px (tracking: -0.01em)
text-2xl:  24px / 32px (tracking: -0.02em)
text-3xl:  30px / 36px (tracking: -0.02em)
text-4xl:  36px / 40px (tracking: -0.03em)
text-5xl:  48px / 1   (tracking: -0.03em)
```

### Typography Guidelines

1. **Headings** - Use `font-display` (Lexend) with semibold weight
2. **Body Text** - Use `font-sans` (Source Sans 3) with regular weight
3. **Labels/Metadata** - Use uppercase with letter spacing for hierarchy
4. **Numbers/Data** - Consider using tabular figures for alignment
5. **Code/Technical** - Use `font-mono` (JetBrains Mono)

---

## 📏 Spacing Scale

Following an 8px base unit for consistency:

```css
0:    0px
0.5:  2px
1:    4px
2:    8px
3:    12px
4:    16px
5:    20px
6:    24px
8:    32px
10:   40px
12:   48px
16:   64px
20:   80px
24:   96px
```

---

## 🔘 Border Radius

Modern and subtle curves:

```css
sm:      4px  - Small elements (badges, inputs)
DEFAULT: 8px  - Standard (buttons, cards)
lg:      12px - Larger components
xl:      16px - Containers, modals
2xl:     20px - Hero sections, feature cards
3xl:     24px - Page-level containers
```

---

## 🌟 Shadows & Depth

Subtle elevation system:

```css
sm:  Light shadow for minimal elevation
md:  Standard card shadow
lg:  Elevated components (dropdowns, modals)
xl:  Floating panels
2xl: Maximum elevation

/* Special effects */
glow-primary: Subtle blue glow for focus
glow-accent:  Orange glow for important CTAs
```

---

## 🎭 Component Classes

### Buttons

```html
<!-- Primary action -->
<button class="btn-primary">Submit Assignment</button>

<!-- Secondary action -->
<button class="btn-secondary">View Details</button>

<!-- Accent/Important action -->
<button class="btn-accent">Start Intervention</button>

<!-- Success state -->
<button class="btn-success">Mark Complete</button>

<!-- Danger/Critical action -->
<button class="btn-danger">Delete Module</button>

<!-- Outlined -->
<button class="btn-outline">Cancel</button>

<!-- Ghost/Subtle -->
<button class="btn-ghost">Skip</button>
```

### Cards

```html
<!-- Standard card -->
<div class="card">
  <div class="card-header">
    <h3>Module Details</h3>
  </div>
  <div class="card-body">
    <!-- Content -->
  </div>
  <div class="card-footer">
    <!-- Actions -->
  </div>
</div>

<!-- Interactive card -->
<div class="card-hover">
  <!-- Card with hover effect -->
</div>
```

### Badges

```html
<span class="badge-primary">Primary</span>
<span class="badge-success">Completed</span>
<span class="badge-warning">Medium Risk</span>
<span class="badge-danger">High Risk</span>
<span class="badge-info">Information</span>
```

### Alerts

```html
<div class="alert-success">Success message</div>
<div class="alert-warning">Warning message</div>
<div class="alert-danger">Error message</div>
<div class="alert-info">Info message</div>
```

### Inputs

```html
<!-- Standard input -->
<input class="input" type="text" placeholder="Enter value" />

<!-- Error state -->
<input class="input-error" type="text" />
```

---

## 🎨 Role-Based Styling

### Background Gradients

```html
<!-- Student views -->
<div class="bg-role-student">
  <!-- Friendly blue gradient -->
</div>

<!-- Lecturer views -->
<div class="bg-role-lecturer">
  <!-- Professional slate gradient -->
</div>

<!-- Coordinator views -->
<div class="bg-role-coordinator">
  <!-- Analytical purple gradient -->
</div>
```

### Application Guidelines

1. **Students** - Use primary blues, encouraging accents, friendly cards
2. **Lecturers** - Use secondary blues, efficient layouts, action-oriented
3. **Coordinators** - Use deeper blues/purples, data-heavy, analytical focus
4. **Shared Components** - Use neutral grays, maintain consistency

---

## ♿ Accessibility Guidelines

### Color Contrast
- All text meets WCAG AA standards (4.5:1 minimum)
- Primary blue: 5.40:1 on white ✅
- Secondary blue: 10.69:1 on white ✅
- Interactive elements have sufficient contrast

### Focus States
- All interactive elements have visible focus rings
- Focus ring: `ring-2 ring-primary-500 ring-offset-2`
- Keyboard navigation fully supported

### Typography
- Lexend designed for dyslexia-friendly reading
- Minimum body text size: 16px
- Clear hierarchy with proper heading levels
- Adequate line height for readability

### Screen Readers
- Semantic HTML structure
- Proper ARIA labels for icons
- Descriptive button text
- Alt text for images

---

## 🎬 Animation & Motion

### Transitions

```css
transition-all duration-200 - Quick interactions (buttons, links)
transition-all duration-300 - Standard animations (cards, modals)
transition-all duration-700 - Page transitions
```

### Animations

```html
<div class="animate-fade-in">Fade in content</div>
<div class="animate-slide-up">Slide up from bottom</div>
<div class="animate-scale-in">Scale in from center</div>
<div class="animate-pulse-subtle">Subtle pulse effect</div>
```

---

## 📱 Responsive Design

### Breakpoints

```css
sm:  640px  - Small tablets
md:  768px  - Tablets
lg:  1024px - Desktops
xl:  1280px - Large desktops
2xl: 1536px - Extra large screens
```

### Mobile-First Approach
- Design for mobile first
- Progressive enhancement for larger screens
- Touch-friendly targets (minimum 44x44px)
- Responsive typography scale

---

## 💡 Usage Examples

### Risk Level Indicators

```html
<!-- High Risk -->
<div class="badge-danger">
  <AlertCircle size={14} />
  HIGH RISK
</div>

<!-- Medium Risk -->
<div class="badge-warning">
  <AlertTriangle size={14} />
  MEDIUM RISK
</div>

<!-- Low Risk -->
<div class="badge-success">
  <CheckCircle size={14} />
  LOW RISK
</div>
```

### Module Cards

```html
<div class="card-hover cursor-pointer">
  <div class="card-body">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h4 class="font-display font-semibold text-lg">CS101</h4>
        <p class="text-sm text-neutral-600">Computer Science Fundamentals</p>
      </div>
      <span class="badge-primary">12 Credits</span>
    </div>
    <!-- Stats -->
  </div>
</div>
```

### Data Visualization

```html
<!-- Use info blue for data points -->
<div class="bg-info-50 border border-info-200 rounded-lg p-4">
  <div class="text-info-700 font-semibold">85%</div>
  <div class="text-sm text-neutral-600">Attendance Rate</div>
</div>
```

---

## 🚀 Best Practices

### DO ✅
- Use semantic color names (primary, success, danger)
- Maintain consistent spacing throughout
- Use display font (Lexend) for headings
- Apply role-specific styling subtly
- Ensure all interactive elements have hover/focus states
- Test color contrast for accessibility
- Use animation sparingly and purposefully

### DON'T ❌
- Don't use arbitrary colors outside the palette
- Don't mix spacing values inconsistently
- Don't create custom shadows (use defined scale)
- Don't apply role colors to shared components
- Don't use animation on critical actions
- Don't forget focus states
- Don't use color as the only indicator

---

## 📦 Implementation Checklist

- [x] Tailwind config with custom theme
- [x] Google Fonts import (Lexend, Source Sans 3)
- [x] Base styles and typography
- [x] Component utility classes
- [x] Role-specific utilities
- [x] Animation keyframes
- [x] Accessibility focus styles
- [ ] Update existing pages with new design system
- [ ] Create reusable component library
- [ ] Add dark mode support (future)
- [ ] Document component variants

---

## 🎓 For Developers

### Quick Start

1. Import fonts in `index.css` (already done)
2. Use Tailwind classes from the extended theme
3. Apply component classes for common patterns
4. Reference color tokens: `bg-primary-600`, `text-success-700`
5. Use display font for headings: `font-display`
6. Apply role styling: `bg-role-student`, `bg-role-lecturer`, etc.

### Examples

```tsx
// Button with proper styling
<button className="btn-primary">
  <Check className="w-4 h-4" />
  Submit
</button>

// Card with role-specific background
<div className="card-hover bg-role-student">
  <div className="card-body">
    <h3 className="font-display text-2xl mb-4">Welcome</h3>
    <p className="text-neutral-600">Content here</p>
  </div>
</div>

// Risk badge
<span className="badge-danger">
  <AlertCircle size={14} />
  High Risk
</span>
```

---

**Version:** 1.0.0  
**Last Updated:** January 2026  
**Maintained By:** Academia Development Team
