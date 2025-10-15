const posts = [
  { title: "Exploring JavaScript ES6 Features", category: "tech", image: "imgs/img1.jpeg", description: "Learn modern JavaScript concepts with ES6 and beyond.", date: "Oct 10, 2025" },
  { title: "My Trip to the Alps", category: "travel", image: "imgs/img2.jpeg", description: "An unforgettable hiking adventure in the Alps.", date: "Sep 20, 2025" },
  { title: "10 Best Coding Practices", category: "tech", image: "imgs/img3.png", description: "Improve your coding habits with these best practices.", date: "Aug 30, 2025" },
  { title: "Street Food Diaries", category: "food", image: "imgs/img4.jpeg", description: "Exploring the best local cuisines around the world.", date: "Jul 18, 2025" },
  { title: "React vs Vue: Which to Choose?", category: "tech", image: "imgs/img5.jpeg", description: "Comparing the two most popular front-end frameworks.", date: "Jun 02, 2025" },
  { title: "My Thailand Experience", category: "travel", image: "imgs/img6.jpeg", description: "A memorable trip to Thailand’s beaches and temples.", date: "May 15, 2025" },
  { title: "Top 5 Healthy Smoothie Recipes", category: "food", image: "imgs/img7.jpeg", description: "Delicious and healthy smoothies to kickstart your day.", date: "Apr 05, 2025" },
  { title: "Building a Portfolio Website", category: "tech", image: "imgs/img8.jpeg", description: "How to create a stunning portfolio website.", date: "Mar 30, 2025" },
  { title: "Discovering Bali", category: "travel", image: "imgs/img9.jpeg", description: "My favorite spots and memories from Bali.", date: "Feb 22, 2025" },
  { title: "Tasting Italy", category: "food", image: "imgs/img10.jpeg", description: "A food lover’s guide through Italy’s best dishes.", date: "Jan 12, 2025" },
  { title: "AI in Everyday Life", category: "tech", image: "imgs/img11.png", description: "Understanding how AI impacts our day-to-day lives.", date: "Dec 05, 2024" },
  { title: "Road Trip Across Europe", category: "travel", image: "imgs/img12.jpeg", description: "Driving through scenic routes across Europe.", date: "Nov 28, 2024" },
  { title: "Vegan Delights", category: "food", image: "imgs/img13.png", description: "Tasty vegan recipes you’ll fall in love with.", date: "Oct 10, 2024" },
  { title: "Becoming a Better Programmer", category: "tech", image: "imgs/img14.jpeg", description: "Tips to improve your coding efficiency and mindset.", date: "Sep 15, 2024" },
  { title: "Wonders of Japan", category: "travel", image: "imgs/img15.jpeg", description: "Exploring Japan’s culture, temples, and food.", date: "Aug 12, 2024" }
];


const postsPerPage = 6;
let currentPage = 1;
let currentCategory = "all";

const blogContainer = document.getElementById("blogContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");

function renderPosts() {
  const filteredPosts = posts.filter(
    p => currentCategory === "all" || p.category === currentCategory
  );

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const visiblePosts = filteredPosts.slice(start, end);

  blogContainer.innerHTML = visiblePosts
    .map(post => `
      <div class="blog-card">
        <img src="${post.image}" alt="${post.title}">
        <div class="blog-card-content">
          <h3>${post.title}</h3>
          <p>${post.description}</p>
          <div class="blog-date">${post.date}</div>
        </div>
      </div>
    `)
    .join("");
}

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    currentPage = 1;
    renderPosts();
  });
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPosts();
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(posts.length / postsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPosts();
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.innerHTML = document.body.classList.contains("dark-mode")
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});

searchInput.addEventListener("input", e => {
  const searchText = e.target.value.toLowerCase();
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchText) ||
    post.description.toLowerCase().includes(searchText)
  );
  blogContainer.innerHTML = filteredPosts
    .slice(0, postsPerPage)
    .map(post => `
      <div class="blog-card">
        <img src="${post.image}" alt="${post.title}">
        <div class="blog-card-content">
          <h3>${post.title}</h3>
          <p>${post.description}</p>
          <div class="blog-date">${post.date}</div>
        </div>
      </div>
    `)
    .join("");
});

renderPosts();
