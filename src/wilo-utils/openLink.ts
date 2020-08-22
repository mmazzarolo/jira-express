export async function openLink(url: string) {
  return browser.tabs.create({ url });
}
