# Claude Code Agent Setup Script

# 1. Create directory structure
mkdir -p .claude/agents .claude/commands

# 2. Install the three specialized agents
# Save each agent configuration as .md files in .claude/agents/

# 3. Create orchestration commands for common workflows

# Product to Development Workflow
cat > .claude/commands/spec-to-dev.md << 'EOF'
# Spec to Development Workflow
Execute a complete workflow from product specification to development implementation:

$ARGUMENTS

**Workflow Steps:**
1. Use product-manager to analyze requirements and create comprehensive specification
2. Use component-developer to implement the features using component library best practices  
3. Use qa-automation-engineer to create tests and validate implementation
4. Perform final review and integration

Follow this sequence automatically, with each agent building on the previous agent's work.
EOF

# Testing and Quality Workflow  
cat > .claude/commands/quality-check.md << 'EOF'
# Quality Assurance Workflow
Perform comprehensive quality check on the current codebase:

$ARGUMENTS

**Quality Steps:**
1. Use qa-automation-engineer to run static analysis and identify issues
2. Use qa-automation-engineer to create missing tests for uncovered code
3. Use component-developer to fix any component-specific issues found
4. Use qa-automation-engineer to validate fixes and run full test suite
5. Generate quality report with recommendations

Execute proactively on code changes.
EOF

# Component Development Workflow
cat > .claude/commands/build-component.md << 'EOF'
# Component Development Workflow  
Build a new component following best practices:

$ARGUMENTS

**Development Steps:**
1. Use product-manager to define component requirements and API specification
2. Use component-developer to implement component with TypeScript and testing
3. Use qa-automation-engineer to create comprehensive test suite
4. Use component-developer to create Storybook documentation
5. Use qa-automation-engineer to validate accessibility and cross-browser compatibility

Ensure component follows design system principles and is fully documented.
EOF

# 4. Create CLAUDE.md with agent instructions
cat > CLAUDE.md << 'EOF'
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
EOF

echo "✅ Agent configuration complete!"
echo "📋 Available agents: product-manager, component-developer, qa-automation-engineer"
echo "🚀 Available workflows: /spec-to-dev, /quality-check, /build-component"
echo "📖 Configuration saved to CLAUDE.md"