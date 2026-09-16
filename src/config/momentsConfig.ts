import type { MomentsConfig } from "../types/momentsConfig.ts";
import { withUserConfig } from "../utils/config-overlay.ts";

export const momentsConfig: MomentsConfig = withUserConfig("moments", {
	// false 时导航入口同步隐藏，访问 /moments/ 跳转 404；
	// src/content/moments/ 保持为空目录即可。
	enable: false,
	title: "$t:moments",
	description: "$t:momentsBanner",
});
