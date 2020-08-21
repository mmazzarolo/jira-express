import { getCurrentJiraDomain } from "./jiraDomainManager";

export async function openJiraIssue(issueKey: string) {
  const domain = getCurrentJiraDomain();
  if (!domain) {
    throw new Error("Invalid domain");
  }
  const url = `https://${domain}.atlassian.net/browse/${issueKey}`;
  return browser.tabs.create({ url });
}
