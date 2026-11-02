import News from './news/news';
import Sources from './sources/sources';
import { IArticleItem, IArticlesResponse, ISourceItem, ISourcesResponse } from '../../types';

export class AppView {
    private news: News;
    private sources: Sources;

    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: IArticlesResponse | null | undefined): void {
        const values: IArticleItem[] = data?.articles ? data.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: ISourcesResponse | null | undefined): void {
        const values: ISourceItem[] = data?.sources ? data.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
