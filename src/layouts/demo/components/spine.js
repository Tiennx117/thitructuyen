  /**
   * Get an item from the spine
   * @param  {string|number} [target]
   * @return {Section} section
   * @example spine.get();
   * @example spine.get(1);
   * @example spine.get("chap1.html");
   * @example spine.get("#id1234");
   */


  function get(target) {
    var index = 0;

    if (typeof target === "undefined") {
      while (index < this.spineItems.length) {
        let next = this.spineItems[index];

        if (next && next.linear) {
          break;
        }

        index += 1;
      }
    } else if (this.epubcfi.isCfiString(target)) {
      let cfi = new _epubcfi.default(target);
      index = cfi.spinePos;
    } else if (typeof target === "number" || isNaN(target) === false) {
      index = target;
    } else if (typeof target === "string" && target.indexOf("#") === 0) {
      index = this.spineById[target.substring(1)];
    } else if (typeof target === "string") {
      // Remove fragments
      target = target.split("#")[0];
      index = this.spineByHref[target] || this.spineByHref[encodeURI(target)];
    }

    return this.spineItems[index] || null;
  }
