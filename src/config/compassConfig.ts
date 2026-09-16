import type { CompassConfig } from "../types/compassConfig.ts";
import { withUserConfig } from "../utils/config-overlay.ts";

export const compassConfig: CompassConfig = withUserConfig("compass", {
	// false 时导航入口同步隐藏，访问 /compass/ 跳转 404。
	enable: false,
	title: "$t:compass",
	description: "$t:compassBanner",
});
