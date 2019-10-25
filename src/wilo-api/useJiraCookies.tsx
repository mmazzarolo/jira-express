import { useEffect, useState } from "react";
import { useRef } from "react";
import { uniq } from "lodash";

const mockCookie = {
  domain: "ciao.atlassian.net"
};

const getChromeCookies = function(options: chrome.cookies.GetAllDetails) {
  if (process.env.REACT_APP_RUNTIME_ENV === "browser") {
    const cookies = [mockCookie] as chrome.cookies.Cookie[];
    return cookies;
  } else {
    return new Promise<chrome.cookies.Cookie[]>(response => {
      return chrome.cookies.getAll(options, response);
    });
  }
};

export const useCookies = function(domain: string) {
  const [cookies, setCookies] = useState<chrome.cookies.Cookie[]>([]);
  const [areCookiesLoaded, setAreCookiesLoaded] = useState(false);
  const isMounted = useRef(false);
  const retrieveCookies = async function() {
    const cookies = await getChromeCookies({ domain: ".atlassian.net" });
    setCookies(cookies);
    setAreCookiesLoaded(true);
  };
  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;
    retrieveCookies();
  });
  return [cookies, areCookiesLoaded] as const;
};

const domainsBlacklist = [
  ".atlassian.net",
  "developer.atlassian.net",
  "ecosystem.atlassian.net"
];

export const useJiraDomains = function() {
  const [cookies, areCookiesLoaded] = useCookies("domain");
  const cookieDomains = cookies.map(cookie => cookie.domain);
  const domains = uniq(cookieDomains)
    .filter(domain => !domainsBlacklist.includes(domain))
    .map(domain => domain.replace(".atlassian.net", ""));
  return [domains, areCookiesLoaded] as const;
};
