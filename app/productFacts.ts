export const CHECKS_CONTRACT_VERSION = "0.27.0";

// Repository revisions the public source links resolve against. Pin to a commit for stability.
export const SKILLS_REVISION = "7939d3f0e693aa5989db6740e4e0d29bd247cf92";
export const CANON_REVISION = "d3f14fb41c060ada8b5991ed1e2ee94b7ba87654";

export const SKILLS_REPOSITORY = "https://github.com/jcosta33/skills";
export const CANON_REPOSITORY = "https://github.com/jcosta33/suspec";

// Keep public installation vendor-neutral; users choose their own agent target.
export const SKILLS_INSTALL_COMMAND = "npx skills add jcosta33/suspec -g";
export const METHODS_INSTALL_COMMAND = "npx skills add jcosta33/skills -g";

export function skillInstallCommand(slug: string) {
  const source = slug.startsWith("sus-") ? "jcosta33/suspec" : "jcosta33/skills";
  return `npx skills add ${source} --skill ${slug} -g`;
}
