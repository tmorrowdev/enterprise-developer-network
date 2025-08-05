# Learning Progress Tracker Component

A comprehensive web component for tracking developer learning progress, built with Lit and the @cre8-dev/cre8-wc design system.

## Features

- **Progress Visualization**: Visual progress bars and completion indicators
- **Learning Path Display**: Hierarchical display of learning paths with modules
- **Goal Setting**: Track and manage learning goals with target dates
- **Skill Level Tracking**: Monitor skill progression across different categories
- **Responsive Design**: Mobile-first responsive layout
- **Dark Mode Support**: Built-in dark theme using cre8-wc design tokens
- **Type Safety**: Full TypeScript support with comprehensive interfaces
- **Event-Driven**: Rich event system for integration with external systems
- **Accessible**: WCAG compliant with proper ARIA attributes
- **Customizable**: Flexible configuration options

## Installation

```bash
npm install @enterprise-dev-network/learning-progress-tracker
```

## Dependencies

This component requires the following peer dependencies:

```bash
npm install @cre8_dev/cre8-wc lit
```

## Basic Usage

### HTML

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Load cre8-wc design system -->
    <script type="module" src="https://esm.sh/@cre8_dev/cre8-wc"></script>
    <link href="https://esm.sh/@cre8_dev/cre8-design-tokens@1.0.3/lib/web/brands/cre8/css/tokens_cre8.css" rel="stylesheet"/>
    
    <!-- Load the component -->
    <script type="module" src="./learning-progress-tracker.js"></script>
</head>
<body>
    <learning-progress-tracker id="tracker"></learning-progress-tracker>
    
    <script>
        const tracker = document.getElementById('tracker');
        
        // Set data
        tracker.data = {
            learning_paths: [...],
            skills: [...],
            goals: [...],
            overall_progress: 65
        };
        
        // Configure options
        tracker.config = {
            showSkills: true,
            showGoals: true,
            showOverallProgress: true,
            maxPathsToShow: 6,
            enableGoalSetting: true
        };
    </script>
</body>
</html>
```

### JavaScript/TypeScript

```typescript
import './learning-progress-tracker.js';
import type { 
    LearningProgressData, 
    LearningProgressTrackerConfig,
    LearningPath,
    SkillLevel,
    LearningGoal
} from './learning-progress-tracker.js';

const tracker = document.querySelector('learning-progress-tracker');

// Load data
const data: LearningProgressData = await fetchLearningData();
tracker.data = data;

// Listen for events
tracker.addEventListener('add-learning-path', () => {
    // Handle add learning path request
});

tracker.addEventListener('progress-updated', (e) => {
    console.log('Progress updated:', e.detail);
});

// Update progress programmatically
tracker.updateProgress('path-id', 75);
```

## Data Structure

### LearningProgressData

```typescript
interface LearningProgressData {
    learning_paths: LearningPath[];
    skills: SkillLevel[];
    goals: LearningGoal[];
    overall_progress: number;
}
```

### LearningPath

```typescript
interface LearningPath {
    id: string;
    title: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimated_hours: number;
    modules: string[];
    progress?: number;
    completed_modules?: string[];
    status?: 'not_started' | 'in_progress' | 'completed';
}
```

### SkillLevel

```typescript
interface SkillLevel {
    id: string;
    name: string;
    category: string;
    level: 'novice' | 'intermediate' | 'advanced' | 'expert';
    progress: number;
    last_updated: string;
}
```

### LearningGoal

```typescript
interface LearningGoal {
    id: string;
    title: string;
    description: string;
    target_completion_date: string;
    progress: number;
    status: 'active' | 'completed' | 'paused';
    learning_path_id?: string;
}
```

## Configuration

```typescript
interface LearningProgressTrackerConfig {
    showSkills?: boolean;          // Default: true
    showGoals?: boolean;           // Default: true
    showOverallProgress?: boolean; // Default: true
    maxPathsToShow?: number;       // Default: 6
    enableGoalSetting?: boolean;   // Default: true
}
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `data` | `LearningProgressData \| null` | `null` | The learning progress data to display |
| `config` | `LearningProgressTrackerConfig` | `{}` | Configuration options |
| `loading` | `boolean` | `false` | Shows loading spinner when true |
| `errorMessage` | `string` | `''` | Shows error state with message |

## Methods

### updateProgress(pathId: string, progress: number)

Updates the progress for a specific learning path.

```typescript
tracker.updateProgress('react-fundamentals', 85);
```

### addLearningPath(path: LearningPath)

Adds a new learning path to the component.

```typescript
tracker.addLearningPath({
    id: 'new-path',
    title: 'New Learning Path',
    difficulty: 'intermediate',
    estimated_hours: 30,
    modules: ['Module 1', 'Module 2'],
    progress: 0,
    status: 'not_started'
});
```

### addLearningGoal(goal: LearningGoal)

Adds a new learning goal to the component.

```typescript
tracker.addLearningGoal({
    id: 'new-goal',
    title: 'New Goal',
    description: 'A new learning goal',
    target_completion_date: '2024-12-31',
    progress: 0,
    status: 'active'
});
```

## Events

### learning-progress-data-loaded

Fired when data is loaded into the component.

```typescript
tracker.addEventListener('learning-progress-data-loaded', (e) => {
    console.log('Data loaded:', e.detail.data);
});
```

### add-learning-path

Fired when the user clicks the "Add Path" button.

```typescript
tracker.addEventListener('add-learning-path', () => {
    // Show add learning path dialog
});
```

### add-learning-goal

Fired when the user clicks the "Add Goal" button.

```typescript
tracker.addEventListener('add-learning-goal', () => {
    // Show add learning goal dialog
});
```

### progress-updated

Fired when progress is updated programmatically.

```typescript
tracker.addEventListener('progress-updated', (e) => {
    const { pathId, progress } = e.detail;
    // Save progress to backend
});
```

### learning-path-added

Fired when a learning path is added programmatically.

```typescript
tracker.addEventListener('learning-path-added', (e) => {
    const { path } = e.detail;
    // Save new path to backend
});
```

### learning-goal-added

Fired when a learning goal is added programmatically.

```typescript
tracker.addEventListener('learning-goal-added', (e) => {
    const { goal } = e.detail;
    // Save new goal to backend
});
```

### retry-load

Fired when the user clicks the retry button in error state.

```typescript
tracker.addEventListener('retry-load', () => {
    // Retry loading data
});
```

## Styling

The component uses the cre8-wc design system and supports full theming through CSS custom properties:

```css
learning-progress-tracker {
    --cre8-color-primary: #your-primary-color;
    --cre8-color-surface: #your-surface-color;
    --cre8-spacing-lg: 32px;
    /* ... other design tokens */
}
```

## Responsive Design

The component is fully responsive with breakpoints at:
- Mobile: < 768px (single column layout)
- Tablet/Desktop: ≥ 768px (multi-column grid)

## Accessibility

- Full keyboard navigation support
- Screen reader compatible with proper ARIA labels
- High contrast support
- Focus management
- Semantic HTML structure

## Browser Support

- Chrome 89+
- Firefox 88+
- Safari 15+
- Edge 89+

## Examples

See the `example-usage.html` file for a complete interactive example demonstrating all features.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run `npm test`
6. Submit a pull request

## License

MIT License - see LICENSE file for details