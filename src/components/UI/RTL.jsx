import React from "react";
import PropTypes from "prop-types";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin, prefixer],
});

function RTL(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}

RTL.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RTL;
