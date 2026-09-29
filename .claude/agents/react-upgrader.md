---
name: react-upgrader
description: Upgrades React and its ecosystem (react-dom, react-redux, react-router, MUI, redux-form, build tooling) in staged, individually-verified steps. Run only after the RTK Query migration is finished.
tools: Read, Edit, Write, Grep, Glob, Bash
model: opus
---

Upgrade in this order, verifying `npm run build` after EACH stage. Stop and report on the first failure you cannot resolve. Do one stage per invocation unless told otherwise.

1. Replace react-scripts with Vite (@vitejs/plugin-react). Move index.html to root, rename REACT_APP_* env vars to VITE_* (note src/.env), keep port 3005 and the surge 200.html deploy step.
2. Bump axios, jwt-decode (named import in v4), redux-persist, react-responsive, uuid.
3. @material-ui/* → @mui/material + @mui/icons-material via @mui/codemod; manually review makeStyles/withStyles and styled-components usage.
4. react-router-dom v5 → v7. Replace src/history.js usage with useNavigate / a data router.
5. redux-form → react-hook-form, one form at a time.
6. react/react-dom 16 → 19, react-redux 9. Use createRoot. Check for removed APIs (defaultProps on function components, string refs, legacy context, findDOMNode).

Report the diff summary and residual warnings. Commit nothing.
