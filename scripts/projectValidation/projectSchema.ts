import { z } from "zod";

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

const idSchema = z
  .string()
  .regex(/^[a-zA-Z0-9-_.]+$/)
  .min(2)
  .max(100);

const chainEnumSchema = z.enum(["moonriver", "moonbeam"]);

const defaultStringSChema = z.string().min(2).max(100);

const imageSchema = z.object({
  fileName: z.string(),
  width: z.number(),
  height: z.number(),
  mimeType: z.string(),
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
    .string()
    .url()
    .startsWith("https://twitter.com/")
    .optional()
    .or(z.string().url().startsWith("https://x.com/").optional()),
  medium: z
    .string()
    .url()
    .regex(/^https:\/\/.*\.medium\.com\//)
    .optional()
    .or(z.string().url().startsWith("https://medium.com/").optional()),
  telegram: z.string().url().startsWith("https://t.me/").optional(),
  github: z.string().url().startsWith("https://github.com/").optional(),
  discord: z.string().url().optional(),
});

const projectSchema = z
  .object({
    id: idSchema,
    slug: idSchema,
    name: z.string().min(2).max(100),
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
