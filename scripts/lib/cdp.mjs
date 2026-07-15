import WebSocket from "ws";

export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitForRouteReady(cdp, expectedPath, timeoutMs = 5000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const ready = await cdp.eval(`(() => ({
        path: location.pathname,
        state: document.readyState,
        hasMain: Boolean(document.querySelector('main')),
      }))()`);
      if (ready.path === expectedPath && ready.state === "complete" && ready.hasMain) {
        return;
      }
    } catch {
      // Navigation can briefly destroy the execution context; keep polling.
    }
    await wait(100);
  }
}

export class Cdp {
  constructor(ws, sessionId) {
    this.ws = ws;
    this.sessionId = sessionId;
    this.id = 0;
    this.pending = new Map();
    this.exceptions = [];

    ws.on("message", (raw) => {
      const msg = JSON.parse(raw);
      if (msg.method === "Runtime.exceptionThrown") {
        const details = msg.params.exceptionDetails;
        this.exceptions.push(
          details.exception?.description ||
            details.exception?.value ||
            details.text,
        );
      }
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result);
      }
    });
  }

  send(method, params = {}) {
    const msg = { id: ++this.id, method, params, sessionId: this.sessionId };
    this.ws.send(JSON.stringify(msg));
    return new Promise((resolve, reject) => {
      this.pending.set(msg.id, { resolve, reject });
    });
  }

  async eval(expression) {
    const result = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    return result.result.value;
  }
}

export async function openCdp(chrome) {
  const version = await fetch(`http://127.0.0.1:${chrome.port}/json/version`).then((r) =>
    r.json(),
  );
  const ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.once("open", resolve));

  let id = 0;
  const pending = new Map();
  ws.on("message", (raw) => {
    const msg = JSON.parse(raw);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(JSON.stringify(msg.error)));
      else resolve(msg.result);
    }
  });

  const sendRoot = (method, params = {}) => {
    const msg = { id: ++id, method, params };
    ws.send(JSON.stringify(msg));
    return new Promise((resolve, reject) => pending.set(msg.id, { resolve, reject }));
  };

  const { targetId } = await sendRoot("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await sendRoot("Target.attachToTarget", {
    targetId,
    flatten: true,
  });
  const cdp = new Cdp(ws, sessionId);
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  return { cdp, close: () => sendRoot("Target.closeTarget", { targetId }).finally(() => ws.close()) };
}
