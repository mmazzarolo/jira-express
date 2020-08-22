import { getCurrentJiraDomain } from "./jiraDomainManager";
import { openLink } from "wilo-utils/openLink";

export async function openJiraIssue(issueKey: string) {
  const domain = getCurrentJiraDomain();
  if (!domain) {
    throw new Error("Invalid domain");
  }
  const url = `https://${domain}.atlassian.net/browse/${issueKey}`;
  return openLink(url);
}
