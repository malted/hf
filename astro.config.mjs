import { defineConfig, squooshImageService } from "astro/config";

// https://docs.astro.build/en/guides/upgrade-to/v3/#what-should-i-do-22
import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  image: {
    service: squooshImageService()
  },
  integrations: [tailwind(), svelte()]
});