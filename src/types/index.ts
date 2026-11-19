export enum ResponseStatus {
    Ok = 'ok',
    Error = 'error',
}

export enum HttpMethod {
    Get = 'GET',
    Post = 'POST',
}

export enum NewsEndpoint {
    Sources = 'sources',
    Everything = 'everything',
    TopHeadlines = 'top-headlines',
}

export interface IArticleSource {
    id: string | null;
    name: string;
}

export interface IArticleItem {
    source: IArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface ISourceItem {
    id: string;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface ISourcesResponse {
    status: ResponseStatus | 'ok' | 'error';
    sources: ISourceItem[];
}

export interface IArticlesResponse {
    status: ResponseStatus | 'ok' | 'error';
    totalResults: number;
    articles: IArticleItem[];
}

export type ApiResponseData = ISourcesResponse | IArticlesResponse;

export type EndpointType = NewsEndpoint | 'sources' | 'everything' | 'top-headlines';

export type RequestOptions = Record<string, string | number | boolean | undefined>;

export type Callback<T> = (data: T) => void;

export type SourceCallback = Callback<ISourcesResponse>;
export type NewsCallback = Callback<IArticlesResponse>;

export interface IRequestConfig {
    endpoint: EndpointType;
    options?: RequestOptions;
}

export interface ILoaderOptions {
    apiKey?: string;
    [key: string]: string | undefined;
}

export type ReadonlySourceItem = Readonly<ISourceItem>;
export type ReadonlyArticleItem = Readonly<IArticleItem>;
export type ArticlePreview = Pick<IArticleItem, 'title' | 'description' | 'url' | 'urlToImage'>;
export type PartialLoaderOptions = Partial<ILoaderOptions>;
