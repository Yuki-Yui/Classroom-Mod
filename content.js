const replace_label = true; // 文章の短縮
const direct_download = true; // 直ダウンロード

const name_length = 5;
const name_display = true;
const label_display = true;
const message_dict = {
    "さんが新しい資料を投稿しました": "資料",
    "さんが新しい課題を投稿しました": "課題"
}

const color = '#000000';
const downloadSvg = `<svg viewbox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <path d="M 100 10 L 100 160" stroke="black" stroke-width="20" fill="transparent" />
  <path d="M 40 100 L 100 160 L 160 100" stroke="black" stroke-width="20" fill="transparent" />
  <path d="M 10 140 L 10 190 L 190 190 L 190 140" stroke="black" stroke-width="20" fill="transparent"/>
</svg>`

const observer = new MutationObserver(() => {

    if (replace_label){
        replaceLabelText();
    }

    if (direct_download) {
       createDownloadButton();
    }

});

function replaceLabelText() {
    const spans = document.querySelectorAll('span');  
    spans.forEach((span) => {
        for (const [key, value] of Object.entries(message_dict)) {
            if (span.textContent.includes(key)) {
                span.textContent = span.textContent.replace(
                    new RegExp(`(.+?)${key}`),
                    (match, name) => {
                        if (name_display && label_display) {
                            const shortenedName = name.length > name_length ? name.slice(0, name_length) + "…" : name;
                            return `${shortenedName} ${value}`;
                        } else if (label_display) {
                            return value;
                        } else {
                            return '';
                        }
                    }
                );
            }
        }
    });
}

function createDownloadButton() {
    const pageURL = window.location.href;
    const loginID = pageURL.match(/\/u\/\d+\//) ? pageURL.match(/\/u\/(\d+)\//)[1] : 0;
    const driveLinks = document.querySelectorAll('a[href*="drive.google.com/file/d/"]');
    driveLinks.forEach((driveLink) => {
        const parentDiv = driveLink.closest('div');
        if (parentDiv.querySelector('.direct-download') || parentDiv.querySelectorAll('a').length > 1) {
            return;
        }
        const match = driveLink.href.match(/https:\/\/drive\.google\.com\/file\/d\/([^/]+)/);
        if (match) {
            const fileId = match[1];
            directURL = `https://drive.google.com/u/${loginID}/uc?id=${fileId}`;
            const directLink = document.createElement('a');
            directLink.href = directURL;
            directLink.style.color = "currentColor";
            directLink.classList.add('direct-download');
            const downloadIcon = document.createElement('div');
            downloadIcon.innerHTML = downloadSvg;
            downloadIcon.style.width = '1.5em';
            downloadIcon.style.height = '1.5em';
            directLink.appendChild(downloadIcon);
            parentDiv.appendChild(directLink);
        }
    });
}

observer.observe(document.body, { childList: true, subtree: true });