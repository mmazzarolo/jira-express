import { useEffect, useState } from "react";
import { useRef } from "react";

// React hook that retrieves the cookies on mount.
export function useCookies(domain: string) {
  const [cookies, setCookies] = useState<browser.cookies.Cookie[]>([]);
  const [areCookiesLoaded, setAreCookiesLoaded] = useState(false);
  const isMounted = useRef(false);
  const retrieveCookies = async function () {
    const cookies = await browser.cookies.getAll({ domain });
    setCookies(cookies);
    setAreCookiesLoaded(true);
  };
  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;
    retrieveCookies();
  });
  return [cookies, areCookiesLoaded] as const;
}
