module.exports = function (eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Collection: all guide sections (from JSON data files)
  eleventyConfig.addCollection("guideSections", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/pages/guide/*.njk")
      .filter(item => !item.url.endsWith("/guide/"))
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  // Collection: all reading sections
  eleventyConfig.addCollection("readingSections", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/pages/reading/*.njk")
      .filter(item => !item.url.endsWith("/reading/"))
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  // Filter: count resources in a section
  eleventyConfig.addFilter("resourceCount", function (tiers) {
    if (!tiers) return 0;
    return tiers.reduce((sum, tier) => sum + (tier.resources ? tier.resources.length : 0), 0);
  });

  // Filter: count resources in a single tier
  eleventyConfig.addFilter("tierCount", function (resources) {
    return resources ? resources.length : 0;
  });

  // Filter: format tag ID to display name (fallback)
  eleventyConfig.addFilter("tagLabel", function (tagId, tags) {
    if (!tags) return tagId;
    const tag = tags.find(t => t.id === tagId);
    return tag ? tag.label : tagId;
  });

  // Filter: get tag color
  eleventyConfig.addFilter("tagColor", function (tagId, tags) {
    if (!tags) return "teal";
    const tag = tags.find(t => t.id === tagId);
    return tag ? tag.color : "teal";
  });

  // Filter: slugify
  eleventyConfig.addFilter("slugify", function (str) {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
