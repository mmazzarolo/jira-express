import useFetch, { Options } from "use-http";

function buildJiraApiUrl(
  domain: string,
  relativeUrl: string,
  queryParams: Record<string, string | number> = {}
) {
  let url = new URL(
    `https://${domain}.atlassian.net/rest/api/3/${relativeUrl}`
  );
  Object.keys(queryParams).forEach(key =>
    url.searchParams.append(key, `${queryParams[key]}`)
  );
  return url.href;
}

function persistApiResult(relativeUrl: string, data: any) {
  const key = `api_${relativeUrl}`;
  localStorage.setItem(key, JSON.stringify(data));
}

function restoreApiResult(relativeUrl: string) {
  const key = `api_${relativeUrl}`;
  const storedApiResult = localStorage.getItem(key);
  return storedApiResult ? JSON.parse(storedApiResult) : {};
}

export interface ApiOptions extends Options {
  queryParams?: Record<string, string | number>;
  shouldCache?: boolean;
  domain?: string;
}

export function useApi(relativeUrl: string, options: ApiOptions = {}) {
  const data = options.shouldCache ? restoreApiResult(relativeUrl) : {};
  options.data = data;
  const domain =
    options.domain || localStorage.getItem("domain") || "invalid-domain";
  const queryParams = options.queryParams;
  const url = buildJiraApiUrl(domain, relativeUrl, queryParams);
  return useFetch(url, {
    ...options,
    data,
    interceptors: {
      response: function(response) {
        if (options.shouldCache) {
          persistApiResult(relativeUrl, response.data);
        }
        return response;
      }
    }
  });
}

export function useJiraCurrentUser(options?: ApiOptions) {
  return useApi("myself", options);
}

export function useJiraRecentIssues(options?: ApiOptions) {
  const queryParams = {
    jql: "issuekey in issueHistory() order by lastViewed DESC",
    maxResult: 10 // TODO: why is this param not working?
  };
  return useApi("search", { ...options, queryParams });
}
