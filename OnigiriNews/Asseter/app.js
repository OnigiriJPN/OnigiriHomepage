let newsData = [];
// ニュース取得
async function fetchNews() {
    try {
        const res = await fetch("../api/news");
        if (!res.ok) {
            alert(`ニュースの取得に失敗しました。
                ${res.status}
                理由
                ${res.statusText}`);
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        newsData = await res.json();
    } catch (error) {
        alert(`ニュースの取得に失敗しました。
            ${err.message}`);
    }
}
// ニュース描画
async function loadNews(){
    await fetchNews();

    const el = document.getElementById("news");
    el.innerHTML = "<h3>Onigiriニュース</h3>";

    newsData.forEach(item => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            🕒 ${item.DateNow}<br>
            🍙 ${item.message}<br>
            📊 ${item.shares || 0}

            <button class="x-btn" onclick="share(${item.id})">
                X(旧ツイッター)でつぶやく
            </button>
        `;

        el.appendChild(div);
    })
}

function share(id) {
    const item = newsData.find(n => n.id === id);
    if (!item) {
        alert("ニュースが見つかりませんでした。");
        return;
    }
    const btn = event.target;

    const original = btn.innerHTML;
    btn.innerHTML = `<span class="spinner"></span>送信中です。しばらくお待ちください。`;
    btn.disabled = true;
    
    setTimeout(() => {
        item.shares = (item.shares || 0) + 1;

        const text = encodeURIComponent(`Onigiriニュース\n${item.message}\n\n#OnigiriNews`);

        window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
        btn.innerHTML = original;
        btn.disabled = false;
        console.log("Shared:",item);
    }, 500);
}

// ランキング

async function loadRanking() {
    await fetchNews();

    const el = document.getElementById("ranking");
    if(!el) return;

    const sorted = [...newsData].sort((a,b) => (b.shares || 0) - (a.shares || 0));

    el.innerHTML = "";

    sorted.forEach((item, i) => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
        🏆 #${i+1}<br>
        🍙 ${item.message}<br>
        📊 ${item.shares || 0}
        `;

        el.appendChild(div);
    });
}