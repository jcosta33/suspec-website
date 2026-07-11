# Reference: SOL structured-requirements grammar

Pull this up when a spec sets `format: sol` in its frontmatter (rule 10). SOL trades plain-prose
ACs for bare-header blocks a parser can read; use it for high-risk specs — plain form stays the
default. This is a working reference for authoring SOL blocks, not the full check contract; the
requirement record every block compiles to is `{ id, strength, statement, verify_refs[], kind,
edges[] }`, and review consumes the same Pass / Fail / Unverified / Blocked results either form
produces.

## Block rules

- Header is flush-left: `REQ AC-001:`.
- Body runs until the next block header or heading — a blank line does not end it.
- Keywords are uppercase and case-sensitive.
- Condition text is opaque (no expression syntax).
- Never leave a blank line inside a block — the parser folds whatever follows into the same body
  instead of stopping, so stray text gets absorbed silently.

## Block types

| Block | ID prefix | Use |
| --- | --- | --- |
| `REQ` | `AC-` | required behavior |
| `CONSTRAINT` | `C-` | solution boundary |
| `INVARIANT` | `I-` | always-held property |
| `INTERFACE` | `IF-` | declared boundary |
| `QUESTION` | `Q-` | unresolved ambiguity |

### REQ

```sol
REQ AC-001:
WHEN the user submits the signup form
AND the email field is empty
THE client MUST show "Email is required"
AND THE client MUST NOT send a signup request
VERIFY BY test:cmdTest:signup-empty-email
DEPENDS ON AC-000
WRITES src/signup/**
RISK medium
```

- Conditions use `WHERE`, `WHILE`, `WHEN`, or `IF`.
- `THE <actor> <STRENGTH> <response>` is required.
- `AND THE ...` adds another consequence under the same condition.
- `SHOULD` and `SHOULD NOT` need `BECAUSE` or `EXCEPT`.
- `VERIFY BY` is required.

### CONSTRAINT

```sol
CONSTRAINT C-001:
THE auth client MUST NOT import from `server/*`
BECAUSE the client bundle must not embed server-only secrets
VERIFY BY static:cmdLint:dependency-boundary-check
AFFECTS src/auth/**
```

Use constraints for how requirements may be satisfied.

### INVARIANT

```sol
INVARIANT I-001:
A user MUST NOT have more than one active refresh token family
VERIFY BY property:cmdTest:token-family-invariant
```

Use invariants for properties that must hold across states.

### INTERFACE

```sol
INTERFACE IF-001:
`refreshSession` RETURNS `Session | AuthExpired`
ACCEPTS:
  - `refreshToken: string`
ERRORS:
  - network-timeout
  - invalid-refresh-token
OWNED BY auth-client
VERIFY BY contract:cmdContract:refresh-session-contract
```

Interfaces use contract verification.

### QUESTION

```sol
QUESTION Q-001 [blocking]:
Should expired sessions redirect to `/login` or show inline re-auth?
AFFECTS AC-001
```

A spec with a blocking question stays `draft`.

## Strength (modal) words

| Word | Meaning |
| --- | --- |
| `MUST` | required |
| `MUST NOT` | forbidden |
| `SHOULD` | default; needs a reason or exception |
| `SHOULD NOT` | default prohibition; needs a reason or exception |
| `MAY` | optional |

Do not use `SHALL` as a strength word.

## VERIFY BY

```text
VERIFY BY <method>[:<scope>]:<adapter>:<artifact>[#<selector>]
```

Methods: `static`, `test`, `contract`, `property`, `model`, `perf`, `security`, `manual`,
`monitor`. For `test`, scope may be `unit`, `integration`, or `e2e`. Adapters name commands the
project itself defines (its own test, lint, or contract runner) — SOL resolves nothing; the
adapter label just tells the reader which project command proves the requirement.

## Metadata clauses

| Clause | Use |
| --- | --- |
| `DEPENDS ON` | ordering |
| `WRITES` | write surface |
| `READS` | read surface |
| `AFFECTS` | impacted IDs or paths |
| `RISK` | `low`, `medium`, `high`, or `critical` |

Metadata informs splitting and review — it does not add behavior.

## Cross-file references

- IDs are unique within a file; requirement IDs are spec-scoped.
- Cross-spec references use `SPEC-id#AC-NNN`.
- SOL is unversioned — `format: sol` is the parser hook, not a version marker.
