(() => {
  class Setting {
    /**
     * Store root path of git folder into browser local storage
     * @returns {String} path - User root git folder path
     */
    setGitFolderPath() {
      try {
        if (!document.URL.match(/recliquecore|core/)) {
          throw new Error("You're not in core!");
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
      } catch (err) {
        alert(err);
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
          if (currentUrl.match(/vscode:\/\//)) {
            if (!currentUrl.match(/reclique.core-utils/)) {
              throw new Error("Already fixed!");
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
