const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".article-card");
const searchInput = document.querySelector("#search");
const clearSearch = document.querySelector("#clearSearch");
const resultCount = document.querySelector("#resultCount");
const newsletterForm = document.querySelector(".newsletter-form");

let activeFilter = "all";

function normalizedText(element) {
  return element.textContent.toLowerCase().trim();
}

function updateArticles() {
  const query = searchInput.value.toLowerCase().trim();
  let visibleCount = 0;

  cards.forEach((card) => {
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesSearch = !query || normalizedText(card).includes(query);
    const isVisible = matchesCategory && matchesSearch;

    card.hidden = !isVisible;
    if (isVisible && card.closest("#latest")) {
      visibleCount += 1;
    }
  });

  const noun = visibleCount === 1 ? "article" : "articles";
  resultCount.textContent = `${visibleCount} ${noun}`;
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");
    activeFilter = chip.dataset.filter;
    updateArticles();
  });
});

searchInput.addEventListener("input", updateArticles);

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  updateArticles();
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = newsletterForm.querySelector("input");
  const message = document.querySelector("#newsletterMessage");

  message.textContent = "Subscribing...";

  fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value }),
  })
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Subscription failed");
      }

      email.value = "";
      message.textContent = data.message;
    })
    .catch(() => {
      message.textContent = "Please run the site with the server to enable email subscription.";
    });
});

updateArticles();
