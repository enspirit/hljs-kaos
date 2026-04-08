# hljs-kaos

A [highlight.js](https://highlightjs.org/) grammar for [KAOS](https://en.wikipedia.org/wiki/KAOS_(software_development)) specifications, functional dependencies, and relational constraints.

## What it highlights

**KAOS goal specifications:**

```kaos
Maintain[Home légitime par utilisateur]
  Def: the user's home is a board shared in a workspace they belong to
  FormalDef: FORALL(u:User, b:Board, w:Workspace) isHome(u, b, w) IMPLIES (isMember(u, w) AND sharedIn(b, w))

Operation SetUserHome(u: User, b: Board, w: Workspace)
  DOM PRE: NOT isHome(u, b, w)
  DOM POST: isHome(u, b, w)
  REQ PRE for Maintain[Home légitime par utilisateur]: isMember(u, w) AND sharedIn(b, w)
```

**Functional dependencies:**

```kaos
# the homes table
{ UserID } -> { BoardID, WorkspaceID }
```

**Relational constraints:**

```kaos
isHome{ UserID, WorkspaceID } IS SUBSET OF isMember{ UserID, WorkspaceID } ON DELETE CASCADE
```

## Supported syntax

| Element | Examples |
|---------|----------|
| Goals | `Maintain[...]`, `Achieve[...]` |
| Operations | `Operation SetUserHome(u: User, ...)` |
| Labels | `Def:`, `FormalDef:`, `DOM PRE:`, `DOM POST:` |
| Requirements | `REQ PRE for ...:`, `REQ POST for ...:`, `REQ TRIG for ...:` |
| Logic | `FORALL`, `EXISTS`, `IMPLIES`, `AND`, `OR`, `NOT`, `NEXT` |
| Predicates | `isHome(...)`, `isMember(...)` |
| Typed params | `u:User`, `b:Board` |
| FDs | `{ A, B } -> { C }` |
| Relational | `IS SUBSET OF`, `ON DELETE CASCADE` |
| Comments | `# ...`, `// ...` |

## Install

```bash
npm install hljs-kaos
```

## Usage

### Node / bundler

```js
import hljs from 'highlight.js/lib/core';
import kaos from 'hljs-kaos';

hljs.registerLanguage('kaos', kaos);
hljs.highlightAll();
```

### Browser

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
<script src="path/to/hljs-kaos/src/kaos.js"></script>
<script>
  hljs.registerLanguage('kaos', hljsKaos);
  hljs.highlightAll();
</script>
```

Then use `kaos` (or the alias `kaos-spec`) as language in your fenced code blocks or `<code>` elements.

## Demo

Open `demo.html` in a browser to see all supported patterns highlighted.

## License

[MIT](LICENSE)
