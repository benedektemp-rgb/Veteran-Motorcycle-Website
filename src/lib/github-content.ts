import "server-only";

const GITHUB_OWNER = "benedektemp-rgb";
const GITHUB_REPO = "Veteran-Motorcycle-Website";
const GITHUB_BRANCH = "main";
const API_BASE = "https://api.github.com";

export function isGitHubTokenConfigured(): boolean {
  return Boolean(process.env.GITHUB_TOKEN);
}

function requireToken(): string {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN environment variable is not set.");
  return token;
}

function apiHeaders() {
  return {
    Authorization: `Bearer ${requireToken()}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function contentsUrl(path: string) {
  return `${API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;
}

async function getFileSha(path: string): Promise<string | null> {
  const res = await fetch(`${contentsUrl(path)}?ref=${GITHUB_BRANCH}`, {
    headers: apiHeaders(),
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`GitHub getFileSha(${path}) failed (${res.status}): ${await res.text()}`);
  }
  const data = (await res.json()) as { sha: string };
  return data.sha;
}

export async function putFile(
  path: string,
  content: Buffer | string,
  message: string
): Promise<void> {
  const sha = await getFileSha(path);
  const base64Content = Buffer.isBuffer(content)
    ? content.toString("base64")
    : Buffer.from(content, "utf8").toString("base64");

  const res = await fetch(contentsUrl(path), {
    method: "PUT",
    headers: { ...apiHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: base64Content,
      branch: GITHUB_BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!res.ok) {
    throw new Error(`GitHub putFile(${path}) failed (${res.status}): ${await res.text()}`);
  }
}

export async function deleteFile(path: string, message: string): Promise<void> {
  const sha = await getFileSha(path);
  if (!sha) return;

  const res = await fetch(contentsUrl(path), {
    method: "DELETE",
    headers: { ...apiHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ message, sha, branch: GITHUB_BRANCH }),
  });

  if (!res.ok) {
    throw new Error(`GitHub deleteFile(${path}) failed (${res.status}): ${await res.text()}`);
  }
}
