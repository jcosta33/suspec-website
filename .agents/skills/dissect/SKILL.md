---
name: dissect
description: Trace one unfamiliar or dangerous code path to closure. Use when its callers, flow, state, effects, failures, configuration, tests, or coupling remain unproven. Do not use as the owner of contained work or whole-area inventory.
---

# Dissect

Trace it to bedrock.

## Method

1. Freeze one question, symbol, workflow, or subsystem and repository state.
2. Find every entry: API, command, route, event, job, callback, registry, generated binding,
   and configuration key.
3. Trace inbound callers, including dynamic dispatch, string registration, reflection, and generated
   call sites.
4. Trace every branch to terminal effects, including retries, fallbacks, cleanup, cancellation,
   error translation, and asynchronous continuation.
5. Trace data, mutation, persistence, caches, shared state, and external effects.
6. Trace invalid input, partial state, concurrency, time, exhaustion, dependency failure, and
   recovery.
7. Inspect tests, types, schemas, configuration, documentation, generated files, and runtime wiring.
8. Close every edge with `file:line` evidence. Mark every gap `Unknown` and name missing proof.

## Output

Return the report as rendered Markdown.

**Question:** <one sentence>

**State:** <stable snapshot>

**Flow:** <entry -> decisive branches -> terminal effects>

| Path:line | Proven edge, state, effect, or boundary | Unknown |
| --- | --- | --- |

### Evidence

For each decisive run, give the command, working directory, state identifier, numeric exit, and
the smallest untouched decisive output excerpt. A brief plain-language summary may follow only when
the report cannot orient the reader by itself.

## Boundaries

Negative claims require the search command and result. Symbol search does not prove reachability.
Record exact boundary operators.
