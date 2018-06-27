const API_HOST = "https://api.github.com";

function UserException(message) {
  this.message = message;
  this.name = "API Exception";
}

const b64DecodeUnicode = str => {
  return decodeURIComponent(atob(str).split("").map(c => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
};

/**
 * Find CSV files in repo.
 * @param {String} repo repo name. You have to split with slash between username and reponame.
 * @return {Object} files.
 */
export const getPath = async repo => {
  const res = await fetch(`${API_HOST}/repos/${repo}/git/trees/master`);
  if (res.status === 404) throw new UserException("Repo not found");
  const { tree } = await res.json();
  const files = await tree.filter(obj => obj.path.endsWith(".csv"));
  if (files.length === 0) throw new UserException("No CSV file in repo");
  else return files;
};

/**
 * Get CSV.
 * @param {String} path GitHub API Endpoint.
 * @return {Array} Parsed CSV.
 */
export const getCSV = async path => {
  const res = await fetch(path);
  let { content } = await res.json();
  content = await b64DecodeUnicode(content);
  return await content.split("\n")
    .map(row => row.split(","))
    .slice(1, -1);
}
