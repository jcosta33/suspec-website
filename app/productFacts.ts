export const CHECKS_CONTRACT_VERSION = "0.21.0";
export const SKILLS_REVISION = "de47f5b66e2b5d2bea6f567af3ea8110fd3b2c7e";
// Keep public installation vendor-neutral; users choose their own agent target.
export const SKILLS_INSTALL_COMMAND =
  "npx skills add jcosta33/suspec-skills -g";

export function skillInstallCommand(slug: string) {
  return `npx skills add jcosta33/suspec-skills --skill ${slug} -g`;
}
