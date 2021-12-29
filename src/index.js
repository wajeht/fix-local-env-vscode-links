(() => {
  class Setting {
    #CORE_DASHBOARD_PAGE = "/reclique.core-utils/";
    #MEMBERSHIP_PAGE = "/file/";
    #VSCODE = "vscode://file";

    /**
     * Store root path of git folder into browser local storage
     * @returns {String} path - User root git folder path
     */
    setGitFolderPath() {
      let pathInLocalStorage = null;
      pathInLocalStorage = localStorage.getItem("coreGitPath");

      if (!pathInLocalStorage) {
        const userPath = prompt("What's your core git folder?");
        localStorage.setItem("coreGitPath", userPath);
        pathInLocalStorage = userPath;
      }

      return pathInLocalStorage;
    }

    /**
     * Replace all the links with correct path
     * @param {String} userPath - User root git folder path
     * @returns {Void} null -
     */
    fixPath(userPath) {
      try {
        const allLinksInDOMs = document.links;
        for (const link of allLinksInDOMs) {
          const currentLink = link.href;
          if (currentLink.match(this.#CORE_DASHBOARD_PAGE)) {
            const theRest = currentLink.split("/").slice(4).join("/");
            link.href = this.#VSCODE + userPath + "/" + theRest;
            link.innerText = this.#VSCODE + userPath + "/" + theRest;
          }

          if (currentLink.match(this.#MEMBERSHIP_PAGE)) {
            const theRest = currentLink.split("/").slice(7).join("/");
            link.href = this.#VSCODE + userPath + "/" + theRest;
            link.innerText = this.#VSCODE + userPath + "/" + theRest;
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
