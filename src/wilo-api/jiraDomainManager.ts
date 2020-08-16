export function getJiraDomain() {
  const domain = localStorage.getItem("domain");
  return domain;
}

export function setJiraDomain(domain: string) {
  localStorage.setItem("domain", domain);
}

export function clearJiraDomain() {
  localStorage.removeItem("domain");
}
