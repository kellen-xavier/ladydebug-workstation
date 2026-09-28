// Asset module types for Bun's bundler.

declare module "*.png" {
  const path: string;
  export default path;
}

declare module "*.css" {}
