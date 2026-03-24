const fileInput = document.getElementById("fileInput");
const addBtn = document.getElementById("addBtn");
const storiesContainer = document.getElementById("stories");
const viewer = document.getElementById("viewer");
const storyImage = document.getElementById("storyImage");
const progressContainer = document.getElementById("progressContainer");

let stories = [];
let currentIndex = 0;
let interval;

// INIT
window.onload = () => {
  stories = loadStories();
  renderStories();
};

// ADD STORY
addBtn.onclick = () => fileInput.click();

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function () {
    const story = {
      id: Date.now(),
      image: reader.result,
      createdAt: Date.now(),
      viewed: false   // NEW FIELD
    };

    saveStory(story);
    stories = loadStories();
    renderStories();
  };

  reader.readAsDataURL(file);
});

// SAVE
function saveStory(story) {
  let existing = JSON.parse(localStorage.getItem("stories")) || [];
  existing.push(story);
  localStorage.setItem("stories", JSON.stringify(existing));
}

// LOAD + FILTER
function loadStories() {
  let existing = JSON.parse(localStorage.getItem("stories")) || [];
  let filtered = existing.filter(s => !isExpired(s));
  localStorage.setItem("stories", JSON.stringify(filtered));
  return filtered;
}

// EXPIRY
function isExpired(story) {
  return Date.now() - story.createdAt > 24 * 60 * 60 * 1000;
}

// UPDATE STORAGE
function updateStorage() {
  localStorage.setItem("stories", JSON.stringify(stories));
}

// RENDER LIST
function renderStories() {
  storiesContainer.innerHTML = "";

  stories.forEach((story, index) => {
    const div = document.createElement("div");
    div.className = "story";

    // VIEW STATE UI
    if (!story.viewed) {
      div.style.border = "3px solid limegreen";
    } else {
      div.style.border = "3px solid gray";
    }

    const img = document.createElement("img");
    img.src = story.image;

    div.appendChild(img);
    div.onclick = () => openViewer(index);

    storiesContainer.appendChild(div);
  });
}

// OPEN VIEWER
function openViewer(index) {
  currentIndex = index;

  viewer.style.display = "flex";
  startStory();
}

// START STORY
function startStory() {
  clearInterval(interval);

  // mark viewed here ALSO (auto-play support)
  stories[currentIndex].viewed = true;
  updateStorage();
  renderStories();

  storyImage.src = stories[currentIndex].image;
  renderProgressBars();

  const progressBars = document.querySelectorAll(".progress");
  let progress = 0;

  interval = setInterval(() => {
    progress += 2;
    progressBars[currentIndex].style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      nextStory();
    }
  }, 60);
}

// NEXT
function nextStory() {
  currentIndex++;

  if (currentIndex >= stories.length) {
    closeViewer();
    return;
  }

  startStory();
}

// PREVIOUS
function prevStory() {
  if (currentIndex === 0) return;
  currentIndex--;
  startStory();
}

// CLOSE
function closeViewer() {
  viewer.style.display = "none";
  clearInterval(interval);
}

// PROGRESS UI
function renderProgressBars() {
  progressContainer.innerHTML = "";

  stories.forEach(() => {
    const bar = document.createElement("div");
    bar.className = "progress-bar";

    const progress = document.createElement("div");
    progress.className = "progress";

    bar.appendChild(progress);
    progressContainer.appendChild(bar);
  });
}

// CLICK NAV
viewer.addEventListener("click", (e) => {
  const x = e.clientX;
  const width = window.innerWidth;

  if (x < width / 2) {
    prevStory();
  } else {
    nextStory();
  }
});

// SWIPE
let startX = 0;

viewer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

viewer.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    nextStory();
  } else if (endX - startX > 50) {
    prevStory();
  }
});