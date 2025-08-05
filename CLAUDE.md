
# Project AI Configuration

## Agent Usage Guidelines

### Available Specialized Agents:
- **product-manager**: Use for specifications, requirements, user stories, and PRDs
- **component-developer**: Use for React/component development, design systems, and frontend architecture  
- **qa-automation-engineer**: Use PROACTIVELY for testing, code review, and quality assurance

### Automatic Agent Coordination:
- Agents will automatically coordinate for complex workflows
- Use slash commands for predefined workflows: `/spec-to-dev`, `/quality-check`, `/build-component`
- Each agent operates with its own context window for focused expertise

### Quality Standards:
- All code must be reviewed by qa-automation-engineer before completion
- Components must follow design system patterns established by component-developer  
- Features must have comprehensive specifications from product-manager

### Workflow Patterns:
1. **Feature Development**: product-manager → component-developer → qa-automation-engineer
2. **Bug Fixes**: qa-automation-engineer → component-developer → qa-automation-engineer  
3. **Code Review**: qa-automation-engineer (automatic on all code changes)
