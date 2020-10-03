export default function (url) {
  let d = ""
  if (url.includes('https://api.github.com/')) {
    d = url.replace('https://api.github.com/', '/gh_api');
  }
  else if (url.includes('https://raw.githubusercontent.com/')) {
    d = url.replace('https://raw.githubusercontent.com/', '/gh_resx');
  }
  return d.endsWith('/')
    ? d.slice(0, -1)
    : d;
}