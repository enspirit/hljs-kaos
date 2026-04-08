/**
 * highlight.js grammar for KAOS specifications, functional dependencies,
 * and relational constraints.
 *
 * Language id: kaos
 *
 * Usage:
 *   import hljs from 'highlight.js/lib/core';
 *   import kaos from 'hljs-kaos';
 *   hljs.registerLanguage('kaos', kaos);
 */
function hljsKaos(hljs) {

  // Type names (capitalized identifiers): User, Board, Workspace, ...
  const TYPE = {
    scope: 'type',
    match: /\b[A-Z][a-zA-Z0-9]*\b/,
    relevance: 0
  };

  // Typed parameters: u:User, b:Board
  const TYPED_PARAM = {
    scope: 'params',
    match: /\b([a-z_]\w*)\s*:\s*([A-Z]\w*)\b/,
    contains: [
      {
        scope: 'variable',
        match: /^[a-z_]\w*/
      },
      {
        scope: 'type',
        match: /[A-Z]\w*$/
      }
    ]
  };

  // Predicate calls: isHome(u, b, w), isMember(u, w)
  const PREDICATE = {
    scope: 'title.function',
    match: /\b[a-z][a-zA-Z0-9]*(?=\s*\()/,
    relevance: 2
  };

  // Logic operators
  const LOGIC_OPERATOR = {
    scope: 'keyword',
    match: /\b(?:FORALL|EXISTS|IMPLIES|AND|OR|NOT|NEXT)\b/,
    relevance: 10
  };

  // KAOS goal types: Maintain[...], Achieve[...]
  const GOAL_REF = {
    scope: 'string',
    begin: /\b(?:Maintain|Achieve)\s*\[/,
    end: /\]/,
    beginScope: 'keyword',
    relevance: 10
  };

  // KAOS operation declaration: Operation SetUserHome(...)
  const OPERATION_DECL = {
    begin: [
      /\bOperation\b/,
      /\s+/,
      /[A-Za-z]\w*/
    ],
    beginScope: {
      1: 'keyword',
      3: 'title.function'
    },
    relevance: 10
  };

  // KAOS labels: Def:, FormalDef:, DOM PRE:, DOM POST:, REQ PRE for ...:, REQ POST for ...:, REQ TRIG for ...:

  // Def: label + rest of line as natural language (not parsed further)
  // Uses multi-match to highlight "Def:" as built_in and the rest as comment
  const LABEL_DEF = {
    begin: [
      /(?<![a-zA-Z])Def\s*:/,
      /.+/
    ],
    beginScope: {
      1: 'built_in',
      2: 'comment'
    },
    relevance: 5
  };

  // FormalDef: rest of line IS formal, so just highlight the label
  const LABEL_FORMALDEF = {
    scope: 'built_in',
    match: /\bFormalDef\s*:/,
    relevance: 5
  };

  const LABEL_DOM = {
    scope: 'built_in',
    match: /\bDOM\s+(?:PRE|POST)\s*:/,
    relevance: 10
  };

  const LABEL_REQ = {
    begin: /\bREQ\s+(?:PRE|POST|TRIG)\b/,
    beginScope: 'built_in',
    end: /:/,
    contains: [
      {
        scope: 'keyword',
        match: /\bfor\b/
      },
      GOAL_REF
    ],
    relevance: 10
  };

  // --- Functional dependencies ---
  // { UserID, WorkspaceID } -> { BoardID }
  const FD_SET = {
    scope: 'params',
    begin: /\{/,
    end: /\}/,
    contains: [
      {
        scope: 'attribute',
        match: /\b\w+\b/
      }
    ],
    relevance: 0
  };

  const FD_ARROW = {
    scope: 'operator',
    match: /->/,
    relevance: 5
  };

  // --- Relational constraints ---
  const RELATIONAL_KW = {
    scope: 'keyword',
    match: /\b(?:IS\s+SUBSET\s+OF|ON\s+DELETE\s+CASCADE|ON\s+UPDATE\s+CASCADE|PRIMARY\s+KEY|FOREIGN\s+KEY)\b/,
    relevance: 10
  };

  // Comment lines (# style)
  const COMMENT = hljs.COMMENT(/^\s*#/, /$/);

  // Inline comment (// style)
  const INLINE_COMMENT = hljs.COMMENT(/\/\//, /$/);

  // Variables (lowercase identifiers, fallback)
  const VARIABLE = {
    scope: 'variable',
    match: /\b[a-z_]\w*\b/,
    relevance: 0
  };

  return {
    name: 'kaos',
    aliases: ['kaos-spec'],
    case_insensitive: false,
    keywords: {
      keyword: [
        'Operation', 'Maintain', 'Achieve',
        'FORALL', 'EXISTS', 'IMPLIES', 'AND', 'OR', 'NOT', 'NEXT',
        'for'
      ],
      built_in: [
        'Def', 'FormalDef',
        'DOM PRE', 'DOM POST',
        'REQ PRE', 'REQ POST', 'REQ TRIG'
      ]
    },
    contains: [
      COMMENT,
      INLINE_COMMENT,
      OPERATION_DECL,
      LABEL_REQ,
      LABEL_DOM,
      LABEL_FORMALDEF,
      LABEL_DEF,
      GOAL_REF,
      LOGIC_OPERATOR,
      RELATIONAL_KW,
      FD_ARROW,
      FD_SET,
      TYPED_PARAM,
      PREDICATE,
      TYPE,
      VARIABLE
    ]
  };
}

// UMD export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = hljsKaos;
} else if (typeof window !== 'undefined') {
  window.hljsKaos = hljsKaos;
}
