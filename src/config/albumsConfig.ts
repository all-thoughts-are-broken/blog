import type { AlbumsConfig } from "../types/albumsConfig.ts";
import { withUserConfig } from "../utils/config-overlay.ts";

export const albumsConfig: AlbumsConfig = withUserConfig("albums", {
	// false 时导航入口同步隐藏，访问 /albums/ 跳转 404。
	enable: false,
	title: "$t:albums",
	description: "$t:albumsBanner",
});
