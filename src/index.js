(() => {
  class Setting {
    /**
     * Store root path of git folder into browser local storage
     * @returns {String} path - User root git folder path
     */
    setGitFolderPath() {
      if (!document.URL.match(/recliquecore|core/)) {
        alert("You are not in Core!");
        return;
      }
      let pathInLocalStorage = localStorage.getItem("coreGitPath");
      if (pathInLocalStorage != null) {
        return pathInLocalStorage;
      } else {
        const userPath = prompt("What's your core git folder?");
        localStorage.setItem("coreGitPath", userPath);
        pathInLocalStorage = userPath;
        return pathInLocalStorage;
      }
    }

    /**
     * Fix all the links form current page to open in vs code
     * @param {String} userPath - User root git folder path
     * @returns {Void}
     */
    fixPath(userPath) {
      try {
        if (!userPath) return;
        const allTheLinkElementsInDOM = document.links;
        const vsCode = "vscode://file";
        for (const linkElement of allTheLinkElementsInDOM) {
          const currentUrl = linkElement.href;
          if (currentUrl.indexOf("vscode://") != -1) {
            if (!currentUrl.match(/reclique.core-utils/)) {
              alert("Already fixed!");
              return;
            }
            const indexToExtract = currentUrl.indexOf("/core");
            const extractedUrl = currentUrl.slice(indexToExtract);
            linkElement.href = vsCode + userPath + extractedUrl;
            linkElement.innerText = vsCode + userPath + extractedUrl;
          }
        }
      } catch (err) {
        alert(err);
      }
    }
  }

  (function main() {
    const mySetting = new Setting();
    const path = mySetting.setGitFolderPath();
    mySetting.fixPath(path);
  })();
})();
