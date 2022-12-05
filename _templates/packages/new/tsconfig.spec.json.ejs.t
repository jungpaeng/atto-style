---
to: packages/<%= name %>/tsconfig.spec.json
---

{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "types": ["jest", "node"]
  },
  "include": ["**/*.spec.ts", "**/*.test.ts", "**/*.d.ts"],
  "files": []
}
