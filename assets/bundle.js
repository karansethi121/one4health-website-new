/* Cache-bust stub. The active app lives in bundle-v2.js (referenced by theme.liquid).
   Older cached HTML pages still load this file; this stub forces one reload so those
   browsers pick up the fresh HTML and the current bundle-v2.js. */
(function () {
  try {
    var KEY = "__o4h_bundle_busted_v2__";
    if (sessionStorage.getItem(KEY)) return;
    sessionStorage.setItem(KEY, "1");
    location.reload();
  } catch (e) {}
})();
