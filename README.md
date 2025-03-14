# 🎵 Music Genre Classification & Song Identification  

## 📌 Project Overview  
This project is an AI-powered web application that performs **music genre classification** and **song identification** based on uploaded audio files. Users can upload an audio clip, and the system will either **predict its genre** or **identify the exact song** from a music database.  

### 🔹 Features  
✅ **Music Genre Classification** - Uses deep learning to classify songs into genres like Pop, Rock, Jazz, etc.  
✅ **Song Identification** - Matches the uploaded audio against a database to fetch song details.  
✅ **Real-Time Processing** - Displays intermediate processing steps for transparency.  
✅ **Interactive Chatbot** - Allows users to search for songs, artists, and trivia.  
✅ **Modern UI** - Built with React.js & Tailwind CSS for a seamless experience.  

---

## 🚀 Tech Stack  
### 🔹 Frontend  
- **React.js** - Component-based UI framework  
- **TypeScript** - Ensures type safety and scalability  
- **Tailwind CSS** - Utility-first styling for a responsive UI  
- **Fetch API** - For making async requests to the backend  
- **Heroicons** - Modern SVG icons for UI enhancement  

### 🔹 Backend  
- **Flask** - Lightweight Python framework for API development  
- **Librosa** - Audio processing & feature extraction  
- **Deep Learning (CNN/LSTM)** - For genre classification  
- **Music Recognition API** - For song identification  
  

---

## 📊 Dataset & Model  
- The model is trained on a diverse dataset of **10 music genres** with **MFCC & Mel Spectrogram** features.  
- We use **CNN (Convolutional Neural Networks)** for genre classification with an accuracy of **85-90%**.  
- Song identification is done using an external **music recognition API** that matches audio fingerprints.  

---

## 🛠 Installation & Setup  
### 🔹 Prerequisites  
- **Python 3.8+**  
- **Node.js & npm** (for frontend)  
- **Virtual Environment (venv)** for Python dependencies  

### 🔹 Backend Setup  
```sh
# Clone the repository
git clone https://github.com/your-username/music-genre-classification.git
cd music-genre-classification/backend

# Create virtual environment & install dependencies
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Run Flask server
python app.py
```

### 🔹 Frontend Setup  
```sh
cd ../frontend
npm install
npm run dev
```
Now, visit **`http://localhost:3000`** to access the web application.  

---

## 🔄 Workflow  

### **1️⃣ User Uploads Audio**  
- The user uploads a song file (**MP3, WAV, OGG**) via the web interface.  

### **2️⃣ Backend Processing**  
- The backend **preprocesses the audio** by converting it to mono and resampling.  
- **Feature extraction** is done using **MFCC, Chroma, and Spectral Contrast**.  
- For **genre classification**, the model predicts a genre with confidence.  
- For **song identification**, the system searches a music database for a match.  

### **3️⃣ Response & Display**  
- The frontend **displays the genre classification results**.  
- If a song is identified, it shows **song title, artist, album, release year, and a streaming link**.  
- The system also logs the processing **workflow** for user transparency.  

---

## 📜 API Endpoints  

| Method | Endpoint       | Description |
|--------|---------------|-------------|
| `POST` | `/predict`    | Classifies music genre & provides workflow steps |
| `POST` | `/identify`   | Identifies song from uploaded audio |
| `GET`  | `/search?song=<name>` | Fetches song metadata from database |
| `GET`  | `/genres`     | Returns available music genres |

---

## 📌 To-Do & Future Enhancements  
- ✅ Improve model accuracy by adding more diverse music data  
- ✅ Optimize song identification speed & efficiency  
- 🔄 Implement **real-time spectrogram visualization**  
- 🔄 Deploy as a **Progressive Web App (PWA)** for mobile accessibility  

---


---

## 🤝 Contributing  
We welcome contributions! Feel free to fork this repository, create a new branch, and submit a pull request.  

---

## 📜 License  
This project is licensed under the **MIT License**.  

---

## 💬 Contact  
📧 Email: your-email@example.com  
🌐 GitHub: [your-username](https://github.com/your-username)  

---

This README is **GitHub-friendly** and includes everything needed to explain and set up your project. Let me know if you'd like any changes! 🚀
