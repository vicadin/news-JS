import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IArticlesResponse, ISourcesResponse } from '../../types';

class App {
    private controller: AppController;
    private view: AppView;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesElement: HTMLElement | null = document.querySelector('.sources');
        if (sourcesElement) {
            sourcesElement.addEventListener('click', (e: MouseEvent): void => {
                this.controller.getNews(e, (data: IArticlesResponse): void => this.view.drawNews(data));
            });
        }

        this.controller.getSources((data: ISourcesResponse): void => {
            this.view.drawSources(data);
            const firstSourceItem: HTMLElement | null = document.querySelector('.source__item');
            if (firstSourceItem) {
                firstSourceItem.click();
            }
        });
    }
}

export default App;
