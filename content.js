const message_dict = {
    "さんが新しい資料を投稿しました:": "資料:",
    "さんが新しい課題を投稿しました:": "課題:"
}

const observer = new MutationObserver(() => {
    const spans = document.querySelectorAll('span');  
    spans.forEach((span) => {
        for (const [key, value] of Object.entries(message_dict)) {
            if (span.textContent.includes(key)) {
                span.textContent = span.textContent.replace(
                    new RegExp(`(.+?)${key}`),
                    (match, name) => {
                        const shortenedName = name.length > 5 ? name.slice(0, 5) + "…" : name;
                        return `${shortenedName} ${value}`;
                    }
                );
            }
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });
  