import AppLoader from './appLoader';
import { IArticlesResponse, ISourcesResponse, NewsCallback, NewsEndpoint, SourceCallback } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: SourceCallback): void {
        super.getResp<ISourcesResponse>(
            {
                endpoint: NewsEndpoint.Sources,
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: NewsCallback): void {
        let target: HTMLElement | null = e.target as HTMLElement | null;
        const newsContainer: HTMLElement = e.currentTarget as HTMLElement;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);

                    const allSources: NodeListOf<Element> = newsContainer.querySelectorAll('.source__item');
                    allSources.forEach((btn: Element): void => btn.classList.remove('active'));
                    target.classList.add('active');

                    super.getResp<IArticlesResponse>(
                        {
                            endpoint: NewsEndpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;
