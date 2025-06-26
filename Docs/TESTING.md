# Testing Docs

## Summary

The custom Babel config for Jest is incompatible with Next.js 15’s preference for SWC and strict Babel rules, causing Vercel build failures. Initially, issues arose from conflicts between CommonJS and ES modules. The `npm run build` command fails when `babel.config.json` is present. To resolve this, I converted the file to `babel.config.json.bak` and added the following scripts to my package.json:

```json
{
  "build": "rm -f babel.config.json && next build",
  "test": "cp babel.config.json.bak babel.config.json && jest"
},
```

- Testing works by creating `babel.config.json` from the backup file before running `jest`.
- Building works by removing `babel.config.json` before running `next build`.
