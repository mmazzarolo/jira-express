import { getJiraDomain } from "./jiraDomainManager";

export function openJiraIssue(issueKey: string) {
  const domain = getJiraDomain();
  if (!domain) {
    throw new Error("Invalid domain");
  }
  const url = `https://${domain}.atlassian.net/browse/${issueKey}`;
  chrome.tabs.create({ url });
}
