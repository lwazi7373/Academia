# Design System Quick Reference

## 🎨 Most Common Colors

```tsx
// Primary Actions
className="bg-primary-600 text-white"
className="btn-primary"

// Secondary Actions
className="bg-secondary-600 text-white"
className="btn-secondary"

// Accent/Important CTAs
className="bg-accent-500 text-white"
className="btn-accent"

// Text Colors
className="text-neutral-900"  // Headings
className="text-neutral-700"  // Body text
className="text-neutral-600"  // Secondary text
```

## 📝 Typography

```tsx
// Headings - Use display font
<h1 className="font-display font-bold text-4xl">
<h2 className="font-display font-semibold text-3xl">
<h3 className="font-display font-semibold text-2xl">

// Body text - Default sans font
<p className="text-base text-neutral-700">
<p className="text-sm text-neutral-600">
```

## 🃏 Cards

```tsx
// Standard card
<div className="card">
  <div className="card-body">Content</div>
</div>

// Clickable card with hover
<div className="card-hover cursor-pointer">
  <div className="card-body">Content</div>
</div>
```

## 🏷️ Badges

```tsx
<span className="badge-primary">Primary</span>
<span className="badge-success">✓ Success</span>
<span className="badge-warning">⚠ Warning</span>
<span className="badge-danger">✕ Danger</span>
```

## 🔘 Buttons

```tsx
<button className="btn-primary">Primary Action</button>
<button className="btn-secondary">Secondary Action</button>
<button className="btn-accent">Important Action</button>
<button className="btn-outline">Cancel</button>
<button className="btn-ghost">Subtle Action</button>
```

## 📋 Forms

```tsx
// Input
<input className="input" type="text" placeholder="..." />

// Input with error
<input className="input-error" type="text" />

// Label
<label className="block text-sm font-medium text-neutral-700 mb-2">
  Label Text
</label>
```

## 🚨 Alerts

```tsx
<div className="alert-success">Success message</div>
<div className="alert-warning">Warning message</div>
<div className="alert-danger">Error message</div>
<div className="alert-info">Info message</div>
```

## 🎭 Role-Based Backgrounds

```tsx
// Student pages
<div className="bg-role-student min-h-screen">

// Lecturer pages
<div className="bg-role-lecturer min-h-screen">

// Coordinator pages
<div className="bg-role-coordinator min-h-screen">
```

## 📊 Risk Level Indicators

```tsx
// High Risk
<span className="badge-danger">
  <AlertCircle size={14} />
  HIGH RISK
</span>

// Medium Risk
<span className="badge-warning">
  <AlertTriangle size={14} />
  MEDIUM RISK
</span>

// Low Risk
<span className="badge-success">
  <CheckCircle size={14} />
  LOW RISK
</span>
```

## 🎬 Common Animations

```tsx
<div className="animate-fade-in">Fade in</div>
<div className="animate-slide-up">Slide up</div>
<div className="animate-scale-in">Scale in</div>
```

## 📱 Responsive Layout

```tsx
// Container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Flex
<div className="flex items-center justify-between">
```

## 🎯 Common Patterns

### Module Card
```tsx
<div className="card-hover cursor-pointer" onClick={...}>
  <div className="card-body">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h4 className="font-display font-semibold text-lg">CS101</h4>
        <p className="text-sm text-neutral-600">Module Name</p>
      </div>
      <span className="badge-primary">12 Credits</span>
    </div>
    {/* Stats */}
  </div>
</div>
```

### Page Header
```tsx
<header className="page-header">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-display font-bold">Title</h1>
        <p className="text-sm text-neutral-600">Subtitle</p>
      </div>
      {/* Actions */}
    </div>
  </div>
</header>
```

### Section Title
```tsx
<div className="section-title">
  <BookOpen className="text-primary-600" size={24} />
  <h3>Section Title</h3>
</div>
```

### Stat Card
```tsx
<div className="flex items-center gap-3 p-4 bg-primary-50 rounded-lg">
  <BookOpen className="text-primary-600" size={24} />
  <div>
    <p className="text-sm text-neutral-600">Label</p>
    <p className="text-2xl font-bold text-neutral-800">42</p>
  </div>
</div>
```

## 💡 Pro Tips

1. **Use semantic color names** - `primary`, `secondary`, `accent`, not specific colors
2. **Display font for headings** - Always use `font-display` class
3. **Consistent spacing** - Use the spacing scale (4, 8, 12, 16, 24, etc.)
4. **Hover states** - Add `hover:` variants to interactive elements
5. **Focus states** - Automatic via `*:focus-visible` in base styles
6. **Role colors** - Use `bg-role-*` for page backgrounds only
7. **Animations** - Use sparingly, mostly for page/modal entry

## 🔍 Finding More

- Full documentation: `DESIGN_SYSTEM.md`
- All colors: `tailwind.config.js` → `theme.extend.colors`
- All utilities: `src/index.css` → `@layer components`
