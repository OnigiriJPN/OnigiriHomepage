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
        
    })
}