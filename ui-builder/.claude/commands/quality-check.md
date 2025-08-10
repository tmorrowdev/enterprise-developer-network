
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
