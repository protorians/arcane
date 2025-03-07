export interface IProjectAssets {
    "fonts": string;
    "icons": string;
    "css": string;
    "images": string;
    "sounds": string;
    "videos": string;
}

export interface IProjectConfig {
    source: string;
    assets?: Partial<IProjectAssets>;
    icons?: string[];
}
