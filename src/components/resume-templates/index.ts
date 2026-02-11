export { ClassicTemplate } from "./ClassicTemplate";
export { ModernTemplate } from "./ModernTemplate";
export { MinimalTemplate } from "./MinimalTemplate";
export { CreativeTemplate } from "./CreativeTemplate";

export const templateNames = {
  classic: "Classic",
  modern: "Modern",
  minimal: "Minimal",
  creative: "Creative",
} as const;

export type TemplateName = keyof typeof templateNames;
