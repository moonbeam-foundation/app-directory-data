import { z, ZodTypeAny } from "zod";

type EnumArrayType = [string, ...string[]];

export const categories = [
  "defi",
  "dex",
  "bridges",
  "lending",
  "nfts",
  "gaming",
  "social",
  "nfts",
  "wallets",
  "dao",
  "other",
];

const safeImageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];

const safeImageMimeTypes = [
  "image/jpeg", // For both .jpg and .jpeg
  "image/png",
  "image/gif",
  "image/bmp",
  "image/webp",
];

const idSchema = z
  .string()
  .regex(/^[a-zA-Z0-9-_.]+$/)
  .min(2)
  .max(100);

const chainEnumSchema = z.enum(["moonriver", "moonbeam"]);

const defaultStringSChema = z.string().min(2).max(100);

const imageSchema = z.object({
  fileName: z.union(
    safeImageExtensions.map((ext) =>
      z.string().endsWith(ext)
    ) as any as readonly [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]
  ),
  width: z.number().min(1).max(10000),
  height: z.number().min(1).max(10000),
  mimeType: z.enum(safeImageMimeTypes as EnumArrayType),
});

const logoSchema = z.object({
  small: imageSchema.optional(),
  large: imageSchema.optional(),
  full: imageSchema.optional(),
});

const contractSchema = z.object({
  contract: z.string(),
  chain: chainEnumSchema,
  name: z.string().optional(),
});

const urlsSchema = z.object({
  website: z.string().url().optional(),
  try: z.string().url().optional(),
  twitter: z
    .union([
      z.string().url().startsWith("https://twitter.com/"),
      z.string().url().startsWith("https://x.com/"),
    ])
    .optional(),
  medium: z
    .string()
    .url()
    // ? for now we are allowing all medium links, has to be decided
    // .regex(/^https:\/\/.*\.medium\.com\//)
    .optional()
    .or(z.string().url().startsWith("https://medium.com/").optional()),
  telegram: z
    .union([
      z.string().url().startsWith("https://t.me/"),
      z.string().url().startsWith("https://telegram.me/"),
    ])
    .optional(),
  github: z.string().url().startsWith("https://github.com/").optional(),
  discord: z.string().url().optional(),
});

const projectSchema = z
  .object({
    id: idSchema,
    slug: idSchema,
    name: z.string().min(2).max(100),
    featured: z.boolean().optional(),
    status: z
      .enum(["active", "inactive", "review", "archived", "deleted"])
      .optional(),
    category: z.enum(categories as EnumArrayType).optional(),
    coinGeckoId: defaultStringSChema.optional(),
    chains: chainEnumSchema.array(),
    web3goIDs: z.string().array().optional(),
    logo: logoSchema,
    shortDescription: z.string().min(2).max(1000),
    description: z.string().min(0),
    tags: z.string().array().optional(),
    contracts: contractSchema.array().optional(),
    urls: urlsSchema,
    screenshots: logoSchema.array().optional(),
    projectCreationDate: z
      .number()
      .min(946684800000)
      .max(2524608000000)
      .optional(),
  })
  .strict();

export function validateProject(project: any) {
  const result = projectSchema.safeParse(project);

  return result;
}
