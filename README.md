# Readme

## Images

### screenshots

Screenshots are stored in screenshots property of the project object. The property is an array of objects with the following structure:

```typescript
[
    {
        fileName: string;
        width: number;
        height: number;
        mimeType: string;
    },
]
```

It is very **important** to keep small images which are used in Project Info page the same size `429 x 200`

Example:

```JSON
{
    "fileName": "moonwell-screenshot-small1.png",
    "width": 429,
    "height": 200,
    "mimeType": "image/png"
}
```

## Project Type

```typescript
type ProjectCategory =
  | "defi"
  | "dex"
  | "bridges"
  | "lending"
  | "nfts"
  | "gaming"
  | "social"
  | "wallets"
  | "dao"
  | "other";

type ProjectImage = {
  fileName: string;
  width: number;
  height: number;
  mimeType: string;
};

type ProjectImagesSizes = {
  small?: ProjectImage;
  large?: ProjectImage;
  full?: ProjectImage;
};

type ProjectTVL = {
  moonbeam?: number;
  moonriver?: number;
};

type MarketData = {
  contracts?: {
    moonbeam?: string;
    moonriver?: string;
  };
  symbol: string;
  currentPrice?: number;
  marketCapRank?: number;
  marketCap?: number;
  marketCapChangePercentage24h?: number;
  priceChange24h?: number;
  priceChangePercentage24h?: number;
  priceChangePercentage7d?: number;
  priceChangePercentage14d?: number;
  priceChangePercentage30d?: number;
  priceChangePercentage60d?: number;
  priceChangePercentage200d?: number;
  priceChangePercentage1y?: number;
  marketCapChange24h?: number;
};

interface AppDirProject {
  id: string;
  slug: string; // moonwell, sushi, etc
  chains: string[];
  shortDescription: string;
  defiLLamaTvlExist?: boolean;
  defiLLamaId?: string;
  description: string;
  name: string;
  [coinGeckoIdKey]?: string;
  currentTVL?: ProjectTVL;
  tvlChange1d?: ProjectTVL;
  tvlChange7d?: ProjectTVL;
  logo: ProjectImagesSizes;
  screenshots?: ProjectImagesSizes[];
  category: ProjectCategory;
  tags: string[];
  contracts: SmartContracts[];
  urls: Urls;
  marketData?: MarketData;
}

interface SmartContracts {
  contract: string;
  chain: string;
  name: string;
}

interface Urls {
  website?: string;
  try?: string;
  twitter?: string;
  medium?: string;
  telegram?: string;
  github?: string;
  discord?: string;
  others?: Other[];
}

interface Other {
  platform: string;
  link: string;
}
```
