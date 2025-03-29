# frontmatter-tools

Utility library for parsing and manipulating YAML frontmatter, designed for use with Obsidian Templater scripts.

## 📁 Project Structure

- `src/` – TypeScript source files
- `dist/` – Compiled JavaScript output (ignored from version control)
- `.idea/` – JetBrains IDE configuration
- `.gitignore` – Manages tracked/untracked files
- `jest.config.js` – Unit testing configuration
- `tsconfig.json` – TypeScript compiler configuration

## 🧠 IDE Configuration (JetBrains/WebStorm)

We use a selective versioning strategy for `.idea/`:

✅ **Shared/project-level configs** that are versioned:
- `.idea/runConfigurations/` – Shared test/build tasks
- `.idea/codeStyles/` – Code formatting rules
- `.idea/inspectionProfiles/` – Code inspection/linting settings
- `.idea/modules.xml` – Project/module structure

❌ **Personal/user-specific settings** that are excluded:
- `.idea/workspace.xml`
- `.idea/tasks.xml`
- `.idea/shelf/`
- `.idea/sonarlint/`

This helps ensure consistency across developer setups while preserving local flexibility.

## ⚙️ Obsidian Templater Integration

To use this library with [Obsidian Templater](https://silentvoid13.github.io/Templater/), follow these steps:

1. **Build the project** using:

    ```bash
    npm run build
    ```

   This will compile the code and copy `frontmatter-tools.js` into your Obsidian vault’s Templater script folder (as defined in the `build` script).

2. **Call from Templater** in your template like so:

    ```javascript
    <%* 
    const fm = tp.user.frontmatter_tools;
    const rawYaml = tp.frontmatter;
    const parsed = fm.parse(rawYaml);
    tR = parsed.title;
    %>
    ```

3. You can also use specific helpers:

    ```javascript
    <%* 
    const { getPerformers, getVideoImage } = tp.user.frontmatter_tools;
    const performers = getPerformers(tp.frontmatter);
    const image = getVideoImage(tp.frontmatter);
    %>
    ```

✅ All exported functions are sandbox-compatible and can be called from Templater scripts.

## 🛠 Tooling

| Tool        | Purpose                            |
|-------------|------------------------------------|
| TypeScript  | Strongly typed scripting            |
| Jest        | Unit testing framework              |
| ts-mockito  | Type-safe mocking for interfaces    |
| Obsidian    | Final execution environment         |

## 🔐 Local Environment

- Environment files like `.env` are ignored by default.
- If needed, create a `.env.local` for custom paths, auth, etc.

## 🧪 Running Tests

To run tests:

```bash
npm test

This uses Jest + ts-mockito and includes full test coverage for YAML parsing and formatting utilities.

⚙️ Building

To compile and deploy for Obsidian:

npm run build

This outputs to the appropriate Templater scripts/ folder for use in your vault.