export const CHECKS_CONTRACT_VERSION = "0.25.0";
export const SKILLS_REVISION = "1534e8670ea78238eb2050856ca5bef9f48ed2d7";
// Keep public installation vendor-neutral; users choose their own agent target.
export const SKILLS_INSTALL_COMMAND =
  "npx skills add jcosta33/suspec-skills -g";

export function skillInstallCommand(slug: string) {
  return `npx skills add jcosta33/suspec-skills --skill ${slug} -g`;
}
