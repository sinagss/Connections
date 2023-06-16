import PropTypes from "prop-types";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

function RTLProvider({ direction, children }) {
  const cache = createCache({
    key: `muirtl-${direction}`,
    stylisPlugins: direction === "rtl" ? [prefixer, rtlPlugin] : [],
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}

RTLProvider.propTypes = {
  direction: PropTypes.oneOf(["rtl", "ltr"]).isRequired,
  children: PropTypes.node.isRequired,
};

export default RTLProvider;
