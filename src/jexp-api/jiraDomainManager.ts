import { useCookies } from "jexp-utils/useCookies";
import { uniq } from "lodash";

const currentJiraDomainStorageKey = "jira-current-domain";

let currentJiraDomainCache: string | void;

export async function initializeJiraDomainManager() {
  if (currentJiraDomainCache) {
    return;
  }
  const jiraDomainFromStorage = await browser.storage.local.get(
    currentJiraDomainStorageKey
  );
  currentJiraDomainCache = jiraDomainFromStorage?.[currentJiraDomainStorageKey];
}

export async function clearJiraDomainManager() {
  currentJiraDomainCache = undefined;
  return browser.storage.local.remove(currentJiraDomainStorageKey);
}

export function getCurrentJiraDomain() {
  return currentJiraDomainCache;
}

export async function setCurrentJiraDomain(domain: string) {
  currentJiraDomainCache = domain;
  return browser.storage.local.set({ [currentJiraDomainStorageKey]: domain });
}

// React hook that retrieves the user's Jira domains by checking the cookies.
export const useJiraAvailableDomains = function () {
  const domainDenylist = [
    "atlassian.net",
    ".atlassian.net",
    "developer.atlassian.net",
    "ecosystem.atlassian.net",
  ];
  const [cookies, areCookiesLoaded] = useCookies(".atlassian.net");
  const cookieDomains = cookies.map((cookie) => cookie.domain);
  const domains = uniq(cookieDomains)
    .filter((domain) => !domainDenylist.includes(domain))
    .map((domain) => domain.replace(".atlassian.net", ""));
  return [domains, areCookiesLoaded] as const;
};
