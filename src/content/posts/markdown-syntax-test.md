---
title: Markdown 语法全量测试
published: 2026-09-16
description: 单篇文章逐项跑通 Shirone 的全部自定义 Markdown 语法与 Expressive Code 元数据，用于验收渲染、降级与按需加载行为。
tags: [Markdown, Syntax, Test]
category: Guides
draft: false
---

本文是站点的语法验收页：每一节都在正文里**真实使用**一种语法，而不是把语法写进代码块里当文档。哪一项渲染不对，直接定位到对应小节即可。

*[SSR]: Server-Side Rendering
*[LCP]: Largest Contentful Paint
*[CLS]: Cumulative Layout Shift

## 1. 基础 Markdown 与 GFM

普通段落支持 *斜体*、**粗体**、***粗斜体***、~~删除线~~、`行内代码`，以及指向 [Astro 官方文档](https://docs.astro.build/) 的链接和自动链接 https://astro.build/。

### 列表

- 无序列表项
- 第二项
  - 嵌套子项
- 第三项

1. 有序列表项
2. 第二项
3. 第三项

### 任务列表

- [x] 已完成的事项
- [ ] 待办事项

### 引用与分隔线

> 引用可以跨段。
>
> 引用内部的 **Markdown** 依然生效。

---

### 表格

| 语法 | 入口类型 | 运行时成本 |
| --- | --- | --- |
| `admonition` | container | 原生，无 JS |
| `mermaid` | fence | 按需加载客户端模块 |
| `math` | inline-extension | 构建期生成，无 JS |

### 行内代码与围栏

反引号里的内容保持字面量：`==这不是高亮==`、`:spoiler[这不是剧透]`、`[+也不是标注]`。

## 2. 提示容器 Admonition

三种写法等价：带方括号标题、带空格标题、以及 GitHub Alert 引用语法。

:::note
`note`：即便读者只是快速扫读，也需要留意的信息。
:::

:::info[带方括号的自定义标题]
标题写在方括号里，正文支持完整 Markdown，例如列表与 `行内代码`。
:::

:::tip
`tip`：帮助读者更顺利完成操作的可选信息。
:::

:::important
`important`：读者必须知道才能成功的关键信息。
:::

::: warning 带空格的自定义标题
`warning`：需要立即关注、存在风险的内容。
:::

:::caution
`caution`：操作可能带来负面后果。
:::

:::details[折叠详情]
`details` 使用原生 `<details>`，无 hydration、无客户端模块、无网络请求。
:::

> [!NOTE]
> GitHub Alert 语法会汇入同一套 Admonition 渲染器。

## 3. 折叠面板 Collapse Panels

### 独立开合

每项默认独立开合。标题前加 `:+` 表示初始展开，`:-` 表示初始收起。

::: collapse
- **依赖要求**

  使用 Node.js 22 或更新版本，并在安装依赖前启用 Corepack。

- :+ 安装依赖

  在仓库根目录执行：

  ```powershell
  pnpm.cmd install
  ```

- 运行校验

  - `pnpm.cmd check:manifest`
  - `npx.cmd astro check`
:::

### 手风琴模式

加 `accordion` 后同一组内只保留一个展开项；`expand` 让首个面板默认展开。

::: collapse accordion expand
- 这个面板为什么默认展开？

  因为容器声明了 `expand`，且没有任何项带 `:+` 标记。

- 标题里能有 Markdown 吗？

  可以。标题支持 **强调** 与 `代码`，面板正文支持完整块级 Markdown。

- 窄屏表现如何？

  内边距收窄、长文本换行，内嵌代码保持自己的横向滚动区域。
:::

## 4. 选项组 Option Groups

同一个 `#id` 的多个选项组会跨页同步，选择结果也会被记住。

::: tabs#package-manager

@tab npm

使用 npm 安装：

```powershell
npm install astro
```

@tab:active **pnpm**#pnpm

使用 pnpm 安装：

```powershell
pnpm.cmd add astro
```

@tab Bun#bun

使用 Bun 安装：

```powershell
bun add astro
```

:::

下面这组共用 `package-manager`，选择上面任一选项会同步切换这里。

::: tabs#package-manager

@tab npm

```powershell
npm run dev
```

@tab pnpm

```powershell
pnpm.cmd dev
```

@tab Bun#bun

```powershell
bun run dev
```

:::

## 5. 步骤流 Steps

### 属性标题

容器内必须恰好包含一个有序列表，每个顶层列表项就是一个步骤。

:::steps{title="本地验收流程"}
1. **准备环境**

   克隆仓库并安装依赖。

   ```powershell
   pnpm.cmd install
   ```

2. **运行诊断**

   确认 Astro 诊断与清单校验全部通过。

   ```powershell
   npx.cmd astro check
   pnpm.cmd check:manifest
   ```

3. **构建产物**

   生成静态站点与搜索索引。

   ```powershell
   pnpm.cmd build
   ```
:::

### 方括号标题

:::steps[快速开始]
1. 安装依赖
2. 启动开发服务器
3. 打开 <http://localhost:4321>
:::

## 6. 代码树 Code Tree

### 容器写法

每个围栏用 `title="路径"` 声明自己在树中的位置。

:::code-tree{title="语法测试样例" height="380px" entry="src/greet.ts"}
```ts title="src/greet.ts"
export function greet(name: string): string {
	return `Hello, ${name}`;
}
```

```json title="package.json"
{
	"name": "greet-demo",
	"version": "1.0.0",
	"type": "module"
}
```

```ts title="src/greet.test.ts"
import { greet } from "./greet.ts";

console.log(greet("Shirone"));
```
:::

### 目录自动导入

指向仓库内目录即可在构建期扫描生成，无需手工复制文件内容。

@[code-tree title="音乐工具模块" entry="playlist.ts"](/src/utils/music)

## 7. 文件树 File Tree

### 嵌套列表写法

目录以结尾斜杠标记为默认收起，`++` / `--` 标记新增与删除，`#` 之后是行内注释，`**粗体**` 用于强调关键文件。

:::file-tree{title="站点内容结构"}
- src
  - components/
    - ++ SideBar.astro # 侧栏编排入口
    - -- OldWidget.svelte # 已下线组件
  - content
    - posts/
      - markdown-syntax-test.md
    - snippets/
      - include-example.md
  - plugins
    - markdown/
      - manifest.json
  - **content.config.ts** # 集合 schema 权威定义
- public/
  - favicon.svg
- package.json
:::

### 终端输出写法

把 `tree` 命令的输出直接粘进 `file-tree` 围栏即可，Unicode 与 ASCII 分支符号都能解析。

```file-tree title="构建产物" icon="simple"
dist
├── _astro/
│   ├── index.css
│   └── page.js
├── posts/
└── favicon.ico
```

## 8. 字段卡片 Field Cards

`field-group` 用来组织同一组 API 或组件参数；`field` 也可以单独使用。

:::: field-group

::: field title
@type string
@required

组件可见标题，会出现在页面标题与无障碍名称中，建议保持简短。
:::

::: field disabled
@type boolean
@default `false`
@optional

控件是否以禁用状态起始。
:::

::: field locale
@type `'zh-CN' | 'en' | 'ja-JP'`
@default `'zh-CN'`
@optional

用于格式化日期、数字与无障碍标签的语言。
:::

::: field legacyMode
@type boolean
@deprecated

仅为向后兼容保留，新集成请改用 `compatibility`。
:::

::::

单独使用一个字段：

::: field format
@type `'short' | 'long'`
@default `'short'`
@optional

控制结果的输出格式。
:::

## 9. 马克笔高亮 Marker

默认使用主题主色：==读者应该记住的那一个结论==。

标记内部可以嵌套行内 Markdown：==嵌套 **粗体强调**==。

语义变体一共五种：

- ==primary 连接当前主题=={.primary}
- ==secondary 保持安静的次级区分=={.secondary}
- ==tertiary 单独的编辑信号=={.tertiary}
- ==error 需要修正的条件=={.error}
- ==tip 实用建议=={.tip}

## 10. 缩写释义 Abbreviation

SSR 优先的输出让首屏文档在 JavaScript 执行前就可见；衡量阅读体验时，LCP 与 CLS 能说明首屏内容是否够快、够稳定。

缩写也可以出现在 **SSR** 这类强调文本旁边，但 `SSR` 这种行内代码与 [LCP 说明](https://web.dev/articles/lcp) 这类链接不会被改写。

## 11. 内容标注 Content Annotation

Astro 会提前渲染页面的大部分内容，只在需要交互时水合**交互孤岛** [+islands]，因此默认页面足够轻。

[+islands]:
  **什么是孤岛**

  孤岛是被静态 HTML 包围的交互组件。它让页面默认保持轻量，同时保留聚焦的交互能力。

  - 首句尽量自成一体。
  - 需要原始出处时再给链接。
  - 优先给出 `client:visible` 这样的具体示例。

  See the [Astro islands documentation](https://docs.astro.build/en/concepts/islands/) for the full model.

同一个标签可以对应多条说明 [+review]：

[+review]: 先给会改变读者下一步动作的结论。
[+review]: 把实现证据与背景信息分开写。
[+review]: 该放正文的细节不要塞进标注。

未定义的引用 `[+missing]` 会保持普通文本，不会生成空控件。

## 12. 行内剧透 Spoiler

答案是 :spoiler[**42**]，这句话本身仍是普通 Markdown。

剧透内容可以包含 `行内代码`，也可以包含 :spoiler[较长的一段带 **强调** 的细节]。

## 13. 数学公式 Math

行内公式：质能方程 $E = mc^2$，以及欧拉恒等式 $e^{i\pi} + 1 = 0$。

块级公式：

$$
\int_{-\infty}^{\infty} e^{-x^2} \, \mathrm{d}x = \sqrt{\pi}
$$

## 14. Mermaid 图

```mermaid
flowchart LR
	accTitle: Markdown 渲染管线
	accDescr: Markdown 源文件经 remark/rehype 管线转换为语义化 HTML，再按需增强为跟随主题的图表。
	A[Markdown 源文件] --> B[remark / rehype 管线]
	B --> C[语义化 HTML]
	C --> D[跟随主题的图表]
```

## 15. 图片画廊与图片尺寸

### 画廊容器

`columns` 取 1–6，`aspect` 为宽高比，`fit` 取 `cover` 或 `contain`。

:::grid{columns="3" aspect="16/9" fit="cover"}
![画廊示例一](/images/albums/AcgExample/01.webp)
![画廊示例二](/images/albums/AcgExample/02.webp)
![画廊示例三](/images/albums/AcgExample/03.webp)
:::

:::grid{columns="2" aspect="1/1" fit="contain"}
![画廊示例四](/images/albums/AcgExample/04.webp)
![画廊示例五](/images/albums/AcgExample/05.webp)
:::

### 宽度令牌与图注

独立图片的 alt 里可以带 `w-N%` 宽度令牌（1–100），Markdown title 会渲染为居中图注。

![带宽度与图注的示例 w-50%](/images/albums/AcgExample/07.webp "半宽图片并带图注")

![只有图注的示例](/images/albums/AcgExample/08.webp "没有宽度令牌时的图注")

越界或非法令牌会保留在 alt 原文中，不会静默丢弃。

## 16. 文件包含 Include

按 region 片段包含：

<!-- @include: src/content/snippets/include-example.md#public-api -->

整文件包含与行范围包含的写法如下（这里仅作展示，不重复展开）：

```markdown frame="none"
<!-- @include: src/content/snippets/include-example.md -->
<!-- @include: src/content/snippets/include-example.md{1-4} -->
<!-- @include: src/content/snippets/include-example.md{5-} -->
<!-- @include: src/content/snippets/include-example.md{-4} -->
```

围栏内的 include 注释保持字面量，不会被展开。这里显式写上 `frame="none"`：Expressive Code 默认会从代码块前 4 行里挑一条「路径形态的注释」当作文件名标题，并把那一行整行删掉；这四种写法里不带范围的 `<!-- @include: ... -->` 正好会被选中，只有加上 `frame="none"` 才会原样保留（该元数据的取值见 §20）。

## 17. 音频 Audio Reader

扬声器按钮在点击之前不会加载音频：

- **Ciallo** :audio-reader[Ciallo！！]{src="/assets/audio/Ciallo.wav"}
- **Ehe** :audio-reader[A joking sense]{src="/assets/audio/Ehe.wav"}
- **Zako** :audio-reader[雑魚じゃん、雑魚雑魚]{src="/assets/audio/Zako.wav"}

`src` 必须是站内根路径或显式 HTTPS 地址，指令标签不能为空。

## 18. 视频嵌入

下面四个指令都省略了 `preload`，因此首屏只输出标题、播放按钮与回退链接，第三方播放器在点击后才加载。

### YouTube

::youtube{id="5gIf0_xpFPI" title="YouTube video"}

### Bilibili

::bilibili{bvid="BV1fK4y1s7Qf" title="Bilibili video" p=1}

### AcFun

::acfun{acid="ac48649632" title="AcFun video"}

### ArtPlayer

::artplayer{src="https://www.pexels.com/download/video/38538991/" title="Sintel trailer"}

## 19. GitHub 仓库卡片

::github{repo="all-thoughts-are-broken/blog"}

卡片信息在浏览器端从 GitHub API 拉取，因此它是本页唯一的强制外部请求。

## 20. Expressive Code 元数据

### 标题、行号与行标记

```js title="app.js" showLineNumbers ins={2} del={4} collapse={6-8}
export const app = true;

export const added = true;

export const legacy = true;

export const removed = true;

function collapsed() {
	return "折叠区域";
}
```

### 文本标记与正则

```ts mark="client:visible" ins="hydrate"
const island = "client:visible";
const hydrate = false;
```

```ts /use[A-Z]\w+|hydrat\w+/
const useStore = () => {};
```

### 终端与代码框架

```sh frame="terminal" title="构建与校验"
pnpm.cmd build
npx.cmd astro check
```

```ts frame="none" startLineNumber=42 wrap
// frame="none" 去除外框，startLineNumber 改变起始行号，wrap 允许长行换行
export const value = "很长的行会在允许换行时折行显示";
```

## 21. 语法清单核对

以上小节覆盖了 `src/plugins/markdown/manifest.json` 登记的全部自定义语法。核对清单：

| # | 语法 | 本文对应小节 |
| --- | --- | --- |
| 1 | `abbreviation` | 10 |
| 2 | `acfun` | 18 |
| 3 | `admonition` | 2 |
| 4 | `artplayer` | 18 |
| 5 | `audio-reader` | 17 |
| 6 | `bilibili` | 18 |
| 7 | `code-tree` | 6 |
| 8 | `collapse-panels` | 3 |
| 9 | `content-annotation` | 11 |
| 10 | `expressive-code` | 20 |
| 11 | `fields` | 8 |
| 12 | `file-tree` | 7 |
| 13 | `github-card` | 19 |
| 14 | `image-grid` | 15 |
| 15 | `image-presentation` | 15 |
| 16 | `include` | 16 |
| 17 | `marker` | 9 |
| 18 | `math` | 13 |
| 19 | `mermaid` | 14 |
| 20 | `option-groups` | 4 |
| 21 | `spoiler` | 12 |
| 22 | `steps` | 5 |
| 23 | `youtube` | 18 |

若某项未生效，请先确认对应实现是否仍注册在 `src/utils/markdown-processor.mjs`，再检查 `pnpm.cmd check:markdown-manifest` 与样式包登记。
