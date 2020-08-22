import useFetch, { IncomingOptions } from "use-http";
import { getCurrentJiraDomain } from "./jiraDomainManager";

const jiraRestApiResultsStorageKeyPrefix = `jira-rest-api`;
let jiraRestApiResultsCache: Record<string, any> = {};

export async function initializeJiraRestApi() {
  const storage = await browser.storage.local.get();
  console.log("storage", storage);
  Object.entries(storage).forEach(([key, value]) => {
    if (key.startsWith(jiraRestApiResultsStorageKeyPrefix)) {
      jiraRestApiResultsCache[key] = value;
    }
  });
}

export async function clearJiraRestApi() {
  jiraRestApiResultsCache = {};
  await browser.storage.local.remove(Object.keys(jiraRestApiResultsCache));
}

function buildJiraApiUrl(
  domain: string,
  relativeUrl: string,
  queryParams: Record<string, string | number> = {}
) {
  let url = new URL(
    `https://${domain}.atlassian.net/rest/api/3/${relativeUrl}`
  );
  Object.keys(queryParams).forEach((key) =>
    url.searchParams.append(key, `${queryParams[key]}`)
  );
  return url.href;
}

async function persistApiResult(relativeUrl: string, data: any) {
  const key = `${jiraRestApiResultsStorageKeyPrefix}-${relativeUrl}`;
  jiraRestApiResultsCache[key] = data;
  return browser.storage.local.set({ [key]: data });
}

export interface ApiOptions extends IncomingOptions {
  queryParams?: Record<string, string | number>;
  shouldCache?: boolean;
  domain?: string;
}

export function useApi(
  relativeUrl: string,
  options: ApiOptions = {},
  deps?: any
) {
  const _persist = options.persist;
  if (_persist) {
    const cacheKey = `${jiraRestApiResultsStorageKeyPrefix}-${relativeUrl}`;
    options.data = jiraRestApiResultsCache[cacheKey];
    options.persist = undefined; // Override use-http's own persist mechanism
  }
  const domain = options.domain || getCurrentJiraDomain() || "invalid-domain";
  const queryParams = options.queryParams;
  const url = buildJiraApiUrl(domain, relativeUrl, queryParams);
  return useFetch(
    url,
    {
      ...options,
      data: options.data,
      interceptors: {
        response: async function ({ response }) {
          if (_persist) {
            persistApiResult(relativeUrl, response.data);
          }
          return response;
        },
      },
    },
    deps
  );
}

export function useJiraCurrentUser(options?: ApiOptions) {
  return useApi("myself", options);
}

export function useJiraRecentIssues(options?: ApiOptions, deps?: any[]) {
  const queryParams = {
    jql: "issuekey in issueHistory() order by lastViewed DESC",
    maxResult: 10, // TODO: why is this param not working?
  };
  return useApi("search", { ...options, queryParams }, deps);
}

export function useJiraSearch(
  query: string,
  options?: ApiOptions,
  deps?: any[]
) {
  const queryParams = {
    jql: `Summary ~ "${query.trim()}"`,
    maxResult: 10, // TODO: why is this param not working?
  };
  return useApi("search", { ...options, queryParams }, deps);
}
