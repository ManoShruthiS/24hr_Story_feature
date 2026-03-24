# 📸 24hr Story Feature (Instagram Clone)

🔗 **Live Demo:**
👉 https://manoshruthis.github.io/24hr_Story_feature/

---

## 🚀 Project Overview

This project is a **client-side implementation of an Instagram-like Stories feature**.

Users can upload images as stories, view them in a fullscreen viewer, and each story automatically disappears after **24 hours** — all without using any backend.

---

## ✨ Features

| Feature             | Description                                           |
| ------------------- | ----------------------------------------------------- |
| 📤 Upload Story     | Users can upload images which are converted to Base64 |
| 💾 Local Storage    | Stories are stored in browser using `localStorage`    |
| ⏳ 24hr Expiry       | Stories automatically expire after 24 hours           |
| 👁️ View Tracking   | Stories change appearance after being viewed          |
| ▶️ Auto Play        | Stories automatically advance every 3 seconds         |
| 📊 Progress Bars    | Visual progress indicator for each story              |
| 👆 Click Navigation | Tap left/right to navigate stories                    |
| 📱 Swipe Support    | Swipe gestures for mobile navigation                  |
| 📐 Responsive UI    | Works across mobile, tablet, and desktop              |

---

## 🧠 Core Concepts Used

| Concept          | Why It Is Used                                |
| ---------------- | --------------------------------------------- |
| Base64 Encoding  | To store image data as string in localStorage |
| localStorage     | To persist data without backend               |
| Timestamp Logic  | To handle 24-hour expiry                      |
| setInterval      | For auto-playing stories                      |
| State Management | To track current story and UI behavior        |
| Event Handling   | For clicks and swipe gestures                 |

---

## 🏗️ Project Structure

```
24hr_Story_feature/
 ├── index.html
 ├── style.css
 └── script.js
```

---

## ⚙️ How It Works

### 1. Upload Flow

* User selects an image
* Image is converted to Base64
* Stored in `localStorage` with timestamp

### 2. Expiry Logic

* On page load, stories are filtered:

```
currentTime - createdAt > 24 hours → removed
```

### 3. Story Viewing

* Clicking a story opens fullscreen viewer
* Story auto-plays for 3 seconds
* Progress bar fills during playback

### 4. Viewed State

* Unseen → 🟢 Green border
* Seen → ⚫ Gray border

---

## 📱 UI Behavior

| Action      | Result           |
| ----------- | ---------------- |
| Click ➕     | Upload new story |
| Click story | Open viewer      |
| Click right | Next story       |
| Click left  | Previous story   |
| Swipe left  | Next story       |
| Swipe right | Previous story   |

---

## ⚠️ Limitations

* Images stored as Base64 (larger size)
* No backend or user authentication
* Limited storage (~5MB browser limit)

---

## 🔥 Future Improvements

* Image compression before storage
* Multiple stories per user
* Smooth animations (CSS transitions)
* Backend integration (Firebase / Node.js)
* React version for scalability

---

## 🛠️ Tech Stack

* HTML
* CSS
* JavaScript (Vanilla)

---

## 👩‍💻 Author

**Mano Shruthi S**

---

## 📌 Summary

This project demonstrates how to build a **real-world feature** using only frontend technologies, focusing on:

* Data persistence
* Time-based logic
* Interactive UI systems

---

💡 *Built to understand systems — not just UI.*
