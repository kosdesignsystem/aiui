import { createServer } from "node:http";

const port = Number(process.env.PORT || 8787);
const host = process.env.HOST || "127.0.0.1";
const bridgeToken = process.env.BRIDGE_TOKEN;
const githubToken = process.env.GITHUB_TOKEN;
const repository = process.env.GITHUB_REPOSITORY;
const workflowId = process.env.GITHUB_WORKFLOW_ID || "codex-auto-pr.yml";
const defaultBaseBranch = process.env.GITHUB_BASE_BRANCH || "main";
const defaultModel = process.env.CODEX_MODEL || "gpt-5.2-codex";
const defaultEffort = process.env.CODEX_EFFORT || "medium";

if (!bridgeToken) {
  throw new Error("Missing BRIDGE_TOKEN");
}

if (!githubToken) {
  throw new Error("Missing GITHUB_TOKEN");
}

if (!repository || !repository.includes("/")) {
  throw new Error("Missing or invalid GITHUB_REPOSITORY, expected owner/repo");
}

const [owner, repo] = repository.split("/", 2);

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
  });
  res.end(body);
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");
  if (!rawBody) {
    return {};
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    throw new Error("Request body must be valid JSON");
  }
}

function getBearerToken(req) {
  const header = req.headers.authorization;
  if (!header) {
    return null;
  }

  const [scheme, token] = header.split(" ", 2);
  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
}

function normalizeEffort(value) {
  const allowed = new Set(["low", "medium", "high"]);
  return allowed.has(value) ? value : defaultEffort;
}

async function dispatchWorkflow({
  prompt,
  prTitle,
  baseBranch,
  model,
  effort,
}) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`,
    {
      method: "POST",
      headers: {
        accept: "application/vnd.github+json",
        authorization: `Bearer ${githubToken}`,
        "content-type": "application/json",
        "user-agent": "codex-dispatch-bridge",
        "x-github-api-version": "2022-11-28",
      },
      body: JSON.stringify({
        ref: baseBranch,
        inputs: {
          prompt,
          pr_title: prTitle,
          base_branch: baseBranch,
          model,
          effort,
        },
      }),
    }
  );

  if (response.ok) {
    return;
  }

  const errorText = await response.text();
  throw new Error(`GitHub dispatch failed (${response.status}): ${errorText}`);
}

const server = createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/healthz") {
    return sendJson(res, 200, {
      ok: true,
      repository,
      workflowId,
      defaultBaseBranch,
    });
  }

  if (req.method !== "POST" || req.url !== "/dispatch") {
    return sendJson(res, 404, {
      error: "Not found",
    });
  }

  if (getBearerToken(req) !== bridgeToken) {
    return sendJson(res, 401, {
      error: "Unauthorized",
    });
  }

  try {
    const body = await readJson(req);
    const prompt = String(body.prompt || "").trim();
    const prTitle = String(body.prTitle || "Codex: automated update").trim();
    const baseBranch = String(body.baseBranch || defaultBaseBranch).trim();
    const model = String(body.model || defaultModel).trim();
    const effort = normalizeEffort(String(body.effort || defaultEffort).trim());

    if (!prompt) {
      return sendJson(res, 400, {
        error: "Field 'prompt' is required",
      });
    }

    await dispatchWorkflow({
      prompt,
      prTitle,
      baseBranch,
      model,
      effort,
    });

    return sendJson(res, 202, {
      accepted: true,
      repository,
      workflowId,
      baseBranch,
      prTitle,
      model,
      effort,
      next: `Check GitHub Actions for workflow '${workflowId}' in ${repository}`,
    });
  } catch (error) {
    return sendJson(res, 500, {
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

server.listen(port, host, () => {
  console.log(`codex-dispatch-bridge listening on http://${host}:${port}`);
});
