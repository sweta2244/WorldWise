# 🗺️ WorldWise

**WorldWise** is a map-based React application that allows users to **select a city** and be **redirected to its location on an interactive map**. The app integrates several advanced React features and uses a third-party **map API** to display geographic data.

🌍 **Live Demo**: [world-wise-taupe.vercel.app](https://world-wise-taupe.vercel.app/)

---

## 📌 Features

- 📍 Displays real-time location using **Geolocation**
- 🗂️ Manages complex state with `useReducer`
- 🔁 Shares data globally with `useContext`
- 🔄 Navigation and URL sync via `useLocation`
- 🗺️ Interactive map with clickable city markers

---

## 🛠️ Tech Stack

- **Frontend**: ReactJS
- **React Hooks**: `useGeolocation`, `useLocation`, `useReducer`, `useContext`
- **Map Integration**: [Insert Map API name here — e.g., Leaflet, Mapbox, Google Maps]
- **Routing**: React Router
- **Deployment**: Vercel

---

## 🚧 How It Works

1. On load, user's geolocation is fetched (if permission is granted).
2. Users can search or select a city from the interface.
3. The app updates URL and state using `useReducer` and `useLocation`.
4. The selected city's coordinates are shown on the map.
5. State and logic are shared across components using `useContext`.


