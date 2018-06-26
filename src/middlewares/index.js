const API_HOST = "https://api.github.com";

const b64DecodeUnicode = str => {
  return decodeURIComponent(atob(str).split("").map(c => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

export const getPath = async repo => {
  const res = await fetch(`${API_HOST}/repos/${repo}/git/trees/master`);
  const { tree } = await res.json();
  return await tree.filter(obj => obj.path.endsWith(".csv"));
};

export const getCSV = async path => {
  const res = await fetch(path);
  let { content } = await res.json();
  content = await b64DecodeUnicode(content);
  return await content.split("\n")
    .map(row => row.split(","))
    .slice(1, -1);
}
