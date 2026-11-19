import './news.css';
import { IArticleItem } from '../../../types';

class News {
    private fallbackImage: string =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='100%25' height='100%25' fill='%2322252c'/%3E%3Ctext x='50%25' y='50%25' fill='%23667085' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18'%3ENews Image%3C/text%3E%3C/svg%3E";

    public draw(data: ReadonlyArray<IArticleItem>): void {
        const news: ReadonlyArray<IArticleItem> =
            data.length >= 10 ? data.filter((_item: IArticleItem, idx: number): boolean => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        if (!newsItemTemp) {
            console.error('Template #newsItemTemp not found');
            return;
        }

        news.forEach((item: IArticleItem, idx: number): void => {
            const newsClone: DocumentFragment = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            const itemElem: HTMLElement | null = newsClone.querySelector('.news__item');

            if (idx % 2 && itemElem) {
                itemElem.classList.add('alt');
            }

            const photoElem: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
            if (photoElem) {
                photoElem.style.backgroundImage = `url(${item.urlToImage || this.fallbackImage})`;
            }

            const authorElem: HTMLElement | null = newsClone.querySelector('.news__meta-author');
            if (authorElem) {
                authorElem.textContent = item.author || item.source.name || 'Anonymous';
            }

            const dateElem: HTMLElement | null = newsClone.querySelector('.news__meta-date');
            if (dateElem) {
                dateElem.textContent = item.publishedAt
                    ? item.publishedAt.slice(0, 10).split('-').reverse().join('-')
                    : '';
            }

            const titleElem: HTMLElement | null = newsClone.querySelector('.news__description-title');
            if (titleElem) {
                titleElem.textContent = item.title;
            }

            const sourceElem: HTMLElement | null = newsClone.querySelector('.news__description-source');
            if (sourceElem) {
                sourceElem.textContent = item.source.name;
            }

            const contentElem: HTMLElement | null = newsClone.querySelector('.news__description-content');
            if (contentElem) {
                contentElem.textContent = item.description || item.content || '';
            }

            const linkElem: HTMLAnchorElement | null = newsClone.querySelector('.news__read-more a');
            if (linkElem) {
                linkElem.setAttribute('href', item.url);
                linkElem.setAttribute('target', '_blank');
                linkElem.setAttribute('rel', 'noopener noreferrer');
            }

            fragment.append(newsClone);
        });

        const newsContainer: HTMLElement | null = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
