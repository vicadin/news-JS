import './sources.css';
import { ISourceItem } from '../../../types';

class Sources {
    public draw(data: ReadonlyArray<ISourceItem>): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        if (!sourceItemTemp) {
            console.error('Template #sourceItemTemp not found');
            return;
        }

        data.forEach((item: ISourceItem): void => {
            const sourceClone: DocumentFragment = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const nameElem: HTMLElement | null = sourceClone.querySelector('.source__item-name');
            if (nameElem) {
                nameElem.textContent = item.name;
            }

            const itemElem: HTMLElement | null = sourceClone.querySelector('.source__item');
            if (itemElem) {
                itemElem.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        const sourcesContainer: HTMLElement | null = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.innerHTML = '';
            sourcesContainer.append(fragment);
        }
    }
}

export default Sources;
