(() => {
  try {
    const links = document.links;
    for (const l of links) {
      const href = l.href;
      const regex = /reclique.core-utils/;
      const myPath = "vscode://file/Users/jaw/web_dev/core/core/";
      if (href.match(regex)) {
        const theRest = href.split("/").slice(4).join("/");
        l.href = myPath + theRest;
        l.innerText = myPath + theRest;
      }
    }
  } catch (err) {
    alert(err);
  }
})();

