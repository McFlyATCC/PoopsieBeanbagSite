// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages project site lives at https://mcflyatcc.github.io/PoopsieBeanbagSite/
// If you later attach a custom domain, set `site` to it and change `base` to '/'.
export default defineConfig({
  site: 'https://mcflyatcc.github.io',
  base: '/PoopsieBeanbagSite',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
