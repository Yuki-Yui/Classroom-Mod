const message_dict = {
    "さんが新しい資料を投稿しました": "資料",
    "さんが新しい課題を投稿しました": "課題"
}
const name_length = 5;
const name_display = true;
const label_display = true;

const observer = new MutationObserver(() => {
    const spans = document.querySelectorAll('span');  
    spans.forEach((span) => {
        for (const [key, value] of Object.entries(message_dict)) {
            if (span.textContent.includes(key)) {
                span.textContent = span.textContent.replace(
                    new RegExp(`(.+?)${key}`),
                    (match, name) => {
                        if (name_display && label_display) {
                            const shortenedName = name.length > name_length ? name.slice(0, 5) + "…" : name;
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
});

observer.observe(document.body, { childList: true, subtree: true });
  