import type { AboutConfig } from "../types/aboutConfig.ts";
import { withUserConfig } from "../utils/config-overlay.ts";

export const aboutConfig: AboutConfig = withUserConfig("about", {
	// false 时导航入口同步隐藏，访问 /about/ 跳转 404；
	// 侧栏 Profile 卡片的头像同时退化为不可点击的展示块。
	enable: false,
	title: "$t:about",
	description: "$t:about",
});
