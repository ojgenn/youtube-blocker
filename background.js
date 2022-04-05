let list = [];

function searchContent() {
    const els = ['ytd-grid-video-renderer', 'ytd-rich-item-renderer', 'ytd-video-renderer', 'ytd-reel-item-renderer', 'ytd-compact-video-renderer'];
    els.forEach(elName => {
        checkByElName(elName, '#video-title');
    })

    const el = '#primary-inner'
    checkByElName(el, '.ytd-video-primary-info-renderer')
}

searchContent();

setInterval(() => {
    searchContent();
}, 1000)

chrome.storage.local.get('list', (data) => {
    if (data.list) {
        list = data.list;
        searchContent();
    }
});

function checkByElName(parent, descriptionSelector) {
    const ytdRichItemRendererList = document.querySelectorAll(parent);

    ytdRichItemRendererList.forEach(item => {
        const titleEl = item.querySelector(descriptionSelector);
        const label = titleEl?.getAttribute('aria-label')?.toLowerCase();
        const title = titleEl?.textContent?.toLowerCase();
        if (title || label) {
            list.forEach(key => {
                if (title?.includes(key.toLowerCase()) || label?.includes(key.toLowerCase())) {
                    item.remove();
                }
            });
        }
    })
}
