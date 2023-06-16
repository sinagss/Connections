import PropTypes from "prop-types";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function RTLProvider(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}

RTLProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RTLProvider;
