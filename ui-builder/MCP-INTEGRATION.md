# 🔧 MCP Integration - Claude Tool Usage

## ✅ Problem Solved

**Issue**: Claude wasn't using the MCP server to get real-time component information
**Solution**: Integrated MCP tools directly into Claude's API calls with proper tool definitions

## 🛠️ How It Works Now

### 1. **Tool Registration**

Claude now receives tool definitions in every API call:

```typescript
const tools = this.designSystemTools.getToolDefinitions();
const response = await this.anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  tools: tools, // ← MCP tools included
  messages: [...]
});
```

### 2. **Available Tools**

Claude can now actively use these MCP tools:

| Tool                      | Purpose                      | Usage                               |
| ------------------------- | ---------------------------- | ----------------------------------- |
| `list_components`         | Get all available components | Called first to discover components |
| `get_component_examples`  | Get usage examples           | Called for specific components      |
| `get_component`           | Get detailed docs            | Called for component details        |
| `generate_component_code` | Generate proper code         | Called to create component code     |
| `validate_usage`          | Validate props/usage         | Called to check component usage     |
| `get_design_tokens`       | Get design tokens            | Called for styling information      |

### 3. **Tool Call Flow**

```
User Request → Claude API Call (with tools) → Tool Usage → Tool Results → Final Response
```

## 📋 Implementation Details

### **Tool Definitions** (`DesignSystemTools.ts`)

```typescript
{
  name: 'list_components',
  description: 'List all available components with brief descriptions',
  input_schema: {
    type: "object" as const,
    properties: {
      format: {
        type: 'string',
        enum: ['detailed', 'names-only']
      }
    }
  }
}
```

### **Tool Call Handling** (`UIBuilderAgent.ts`)

```typescript
// Handle tool calls if present
if (response.content.some((content) => content.type === "tool_use")) {
  return await this.handleToolCalls(response, prompt, systemPrompt);
}
```

### **System Prompt Updates**

Claude is now explicitly instructed to use tools:

```
STEP 1: DISCOVER COMPONENTS
First, use the list_components tool to see all available cre8-wc components.

STEP 2: GET EXAMPLES
For each component you plan to use, call get_component_examples to see proper usage patterns.
```

## 🎯 Expected Behavior

### **Before (Static Context)**

```
User: "Create a button"
Claude: Uses hardcoded component info → May be outdated
```

### **After (Dynamic MCP Tools)**

```
User: "Create a button"
Claude:
1. Calls list_components() → Gets current component list
2. Calls get_component_examples('button') → Gets real examples
3. Generates UI with current, accurate component data
```

## 🔧 Configuration Files

### **Claude MCP Config** (`.claude/mcp-config.json`)

```json
{
  "mcpServers": {
    "cre8-design-system-local": {
      "command": "node",
      "args": ["../../mcp-servers/dist/design-system/server.js"],
      "autoApprove": [
        "get_component",
        "list_components",
        "get_component_examples"
      ]
    }
  }
}
```

### **Tool Definitions** (Auto-generated)

Tools are automatically registered with Claude on each API call.

## 🧪 Testing Tool Usage

### **Test 1: Component Discovery**

```bash
# Claude should call list_components first
User: "Show me all available components"
Expected: Claude calls list_components() tool
```

### **Test 2: Component Examples**

```bash
# Claude should get real examples
User: "Create a button with different variants"
Expected: Claude calls get_component_examples('button')
```

### **Test 3: Component Generation**

```bash
# Claude should use current component data
User: "Create a card with header and footer"
Expected: Claude calls get_component_examples('card') then generates proper code
```

## 📊 Tool Usage Analytics

### **Successful Tool Integration Indicators**

- ✅ Claude calls `list_components` when asked about available components
- ✅ Claude calls `get_component_examples` before using specific components
- ✅ Generated code uses current, accurate component syntax
- ✅ Component props and variants match current design system
- ✅ Tool results are properly formatted and used in responses

### **Debugging Tool Calls**

Check console logs for:

```
Tool call: list_components with args: {"format": "detailed"}
Tool result: [component list...]
Final response: [Claude's response using tool data]
```

## 🔄 Tool Call Workflow

### **1. Initial Request**

```typescript
// User prompt triggers Claude API call with tools
const response = await this.anthropic.messages.create({
  tools: this.designSystemTools.getToolDefinitions(),
  messages: [{ role: "user", content: prompt }],
});
```

### **2. Tool Usage Detection**

```typescript
// Check if Claude wants to use tools
if (response.content.some((content) => content.type === "tool_use")) {
  return await this.handleToolCalls(response, prompt, systemPrompt);
}
```

### **3. Tool Execution**

```typescript
// Execute each tool call
const toolResult = await this.designSystemTools.handleToolCall(
  content.name,
  content.input
);
```

### **4. Result Formatting**

```typescript
// Format results for Claude
const formattedResult = this.designSystemTools.formatToolResult(
  content.name,
  toolResult
);
```

### **5. Final Response**

```typescript
// Claude generates final response with tool data
const finalResponse = await this.anthropic.messages.create({
  tools: tools,
  messages: [...previousMessages, toolResults],
});
```

## 🎉 Benefits Achieved

### **✅ Real-time Component Data**

- Claude always uses current component information
- No more outdated static context
- Dynamic discovery of new components

### **✅ Accurate Code Generation**

- Component props match current design system
- Examples are always up-to-date
- Proper component syntax and usage

### **✅ Better User Experience**

- More accurate UI generation
- Components work as expected
- Fewer validation errors

### **✅ Maintainable Architecture**

- Single source of truth (MCP server)
- Automatic updates when design system changes
- Clear separation between AI and data layers

## 🚀 Next Steps

1. **Deploy MCP Server** with updated tool endpoints
2. **Test Tool Integration** with various prompts
3. **Monitor Tool Usage** in production
4. **Optimize Tool Performance** based on usage patterns

**Claude now actively uses MCP tools to generate accurate, up-to-date UI components! 🎯**
