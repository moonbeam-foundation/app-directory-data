# Readme

## Project submission how to

To submit your project or changes successfully, please check [the complete submission guide](https://docs.moonbeam.network/learn/dapps-list/dapp-directory/)

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

It is very **important** to keep small images which are used in Project Info page the same size `429 x 200`!!!

Example:

```JSON
{
    "fileName": "moonwell-screenshot-small1.png",
    "width": 429,
    "height": 200,
    "mimeType": "image/png"
}
```

Size list:

- 429 x 200
- 858 x 400
- 1716 x 800

## Project Type

```typescript
export type ProjectCategory =
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

export type ProjectImage = {
  fileName: string;
  width: number;
  height: number;
  mimeType: string;
};

export type ProjectImagesSizes = {
  small?: ProjectImage;
  large?: ProjectImage;
  full?: ProjectImage;
};

export type ProjectValuesByChain = {
  moonbeam?: number;
  moonriver?: number;
};

export type MarketData = {
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

export enum ProjectStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  REVIEW = "review",
  ARCHIVED = "archived",
  DELETED = "deleted",
}

export interface AppDirProject {
  [idKey]: string;
  [slugKey]: string; // moonwell
  chains: string[];
  status: ProjectStatus;
  shortDescription: string;
  defiLLamaTvlExist?: boolean;
  defiLLamaId?: string;
  description: string;
  name: string;
  featured: boolean;
  [coinGeckoIdKey]?: string;
  currentTVL?: ProjectValuesByChain;
  tvlChange1d?: ProjectValuesByChain;
  tvlChange7d?: ProjectValuesByChain;
  currentTx?: ProjectValuesByChain;
  currentUsers?: ProjectValuesByChain;
  usersChange1d?: ProjectValuesByChain;
  usersChange7d?: ProjectValuesByChain;
  logo: ProjectImagesSizes;
  screenshots?: ProjectImagesSizes[];
  category: ProjectCategory;
  tags: string[];
  contracts: SmartContracts[];
  web3goContracts: SmartContracts[];
  urls: Urls;
  marketData?: MarketData;
  web3goIDs?: string[];
  projectCreationDate?: number;
}

export interface SmartContracts {
  contract: string;
  chain: string;
  name: string;
}

export interface Urls {
  website?: string;
  try?: string;
  twitter?: string;
  medium?: string;
  telegram?: string;
  github?: string;
  discord?: string;
  others?: Other[];
}

export interface Other {
  platform: string;
  link: string;
}
```
