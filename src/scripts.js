(() => {
    function makeTabs(node) {
        let selectedId = node.querySelector('.section__tab_active').dataset.id;
        const tabs = node.querySelectorAll('.section__tab');
        const select = node.querySelector('.section__select');
        const panels = node.querySelectorAll('.section__panel');
        
        const list = [];
        const tabMap = new Map();
        const panelMap = new Map();
        const indexes = new Map();

        let i = 0;
        for (let tab of tabs) {
            tabMap.set(tab.dataset.id, tab);
            indexes.set(tab.dataset.id, i++);
            list.push(tab.dataset.id);

            tab.addEventListener('click', event => {
                selectTab(event.target.dataset.id);
            });
            
            tab.addEventListener('keydown', switchWithArrows);
        }

        for (let panel of panels) {
            panelMap.set(panel.dataset.id, panel);
        }

        select.addEventListener('input', () => {
            selectTab(select.value);
        });

        function selectTab(newId) {
            const newTab = tabMap.get(newId);
            const newPanel = panelMap.get(newId);
            const oldTab = tabMap.get(selectedId);
            const oldPanel = panelMap.get(selectedId);
            
            selectedId = newId;

            oldTab.classList.remove('section__tab_active');
            oldTab.setAttribute('aria-selected', 'false');
            oldTab.removeAttribute('tabindex');
            newTab.classList.add('section__tab_active');
            newTab.setAttribute('aria-selected', 'true');
            newTab.setAttribute('tabindex', '0');
            newTab.focus({
                preventScroll: true
            });

            oldPanel.classList.add('section__panel_hidden');
            oldPanel.setAttribute('aria-hidden', 'true');
            newPanel.classList.remove('section__panel_hidden');
            newPanel.setAttribute('aria-hidden', 'false');

            select.value = newId;
        }

        function switchWithArrows(event) {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
                return;
            }

            let index = indexes.get(selectedId);
            switch (event.which) {
                case 37:
                    --index; //left
                    break;
                case 39:
                    ++index; //right
                    break;
                case 36:
                    index = 0; //home
                    break;
                case 35:
                    index = list.length - 1; //end
                    break;
                default:
                    return; 
            }
    
            if (index >= list.length) {
                index = 0;
            } else if (index < 0) {
                index = list.length - 1;
            }
    
            selectTab(list[index]);
            event.preventDefault();
        }
    }

    function makeMenu(node) {
        let expanded = false;
        const links = document.querySelector('.header__links');
        const text = node.querySelector('.header__menu-text');

        node.addEventListener('click', () => {
            expanded = !expanded;
            node.setAttribute('aria-expanded', expanded);
            text.innerHTML = expanded ? 'Закрыть меню' : 'Открыть меню';
            links.classList.toggle('header__links_opened', expanded);
            links.classList.add('header__links-toggled');
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        makeTabs(document.querySelector('.main__devices'));
        makeMenu(document.querySelector('.header__menu'));
    });
})();
