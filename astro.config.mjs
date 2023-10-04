import { defineConfig, squooshImageService } from "astro/config";

// https://docs.astro.build/en/guides/upgrade-to/v3/#what-should-i-do-22
export default defineConfig({
    image: {
        service: squooshImageService(),
    }
})
