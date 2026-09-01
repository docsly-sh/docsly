# docsly

Open-source documentation starter for Next.js. Beautiful, fast, and ready to ship.

**[docsly.sh](https://docsly.sh)** · **[Documentation](https://docsly.sh/docs)** · **[GitHub](https://github.com/docsly-sh/docsly)**

## Features

- Sidebar navigation with prev/next links
- Table of contents on every page
- Dark mode with system preference
- Full-text search (⌘K)
- LLM-friendly markdown exports
- MDX components: callouts, tabs, accordions, steps
- SEO-ready with Open Graph metadata

## Quick start

```bash
git clone https://github.com/docsly-sh/docsly.git
cd docsly
pnpm install
pnpm dev
```

Open [http://localhost:3000/docs](http://localhost:3000/docs).

## Tech stack

- [Next.js 16](https://nextjs.org) with App Router
- [Fumadocs](https://fumadocs.dev) for MDX content
- [Tailwind CSS 4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) + Radix UI
- [Shiki](https://shiki.style) for syntax highlighting

## Project structure

```text
content/docs/       # MDX documentation pages
src/app/            # Next.js routes
src/components/     # UI components
src/constants/      # Site config and navigation
src/mdx-components.tsx  # Global MDX component registry
source.config.ts    # Fumadocs MDX config
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm typecheck` | Run TypeScript checks |

## Documentation

Full documentation is available at [docsly.sh/docs](https://docsly.sh/docs), including guides for customization, deployment, and MDX components.

## Contributing

Contributions are welcome. See the [contributing guide](https://docsly.sh/docs/contributing) for details.

## License

[MIT](LICENSE)
