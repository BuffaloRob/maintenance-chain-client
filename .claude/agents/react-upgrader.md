---
name: react-upgrader
description: Upgrades React and its ecosystem (react-dom, react-redux, react-router, MUI, redux-form, build tooling) in staged, individually-verified steps. Run only after the RTK Query migration is finished.
tools: Read, Edit, Write, Grep, Glob, Bash
model: opus
---

Upgrade in this order, verifying `npm run build` after EACH stage. Stop and report on the first failure you cannot resolve. Do one stage per invocation unless told otherwise.

The order is driven by peer ranges: no @mui/material release supports React 16 (floor is ^17.0.2), and redux-form 8 supports React only up to 18. Check `npm view <pkg> peerDependencies` before installing; never use --legacy-peer-deps without reporting it.

1. Replace react-scripts with Vite (@vitejs/plugin-react). Move index.html to root, rename REACT_APP_* env vars to VITE_* (note src/.env), keep port 3005 and the surge 200.html deploy step.
2. Bump or remove (if unused) axios, jwt-decode, redux-persist, react-responsive, uuid.
3. react/react-dom 16 → 17.0.2. No API changes expected; react-redux 7, react-router 5 and redux-form 8 accept React 17.
4. @material-ui/* → @mui/material + @mui/icons-material via @mui/codemod; manually review makeStyles/withStyles and styled-components usage. Capture before/after screenshots and fix visual regressions.
5. react-router-dom v5 → v7. Replace src/history.js usage with useNavigate / a data router.
6. redux-form → react-hook-form, one form at a time. Must precede React 19.
7. react/react-dom 17 → 19, react-redux 9. Use createRoot. Check for removed APIs (defaultProps on function components, string refs, legacy context, findDOMNode).

After each stage, start `npm start` and run the headless regression scripts (mocked API) to confirm the app still works. Report the diff summary and residual warnings. Commit nothing.
