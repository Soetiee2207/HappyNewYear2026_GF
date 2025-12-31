# 💕 Love Recap 2025 - Our Love Story

A beautiful, interactive website celebrating our love journey through 2025, featuring stunning animations, fireworks, countdown to 2026, and romantic timeline moments.

## ✨ Features

- 🎆 **Interactive Fireworks** - Tap to launch fireworks on the finale screen
- ⏰ **Real-time Countdown** - Countdown to New Year 2026
- 📸 **Photo Timeline** - Beautiful moments from our 2025 journey
- 🎵 **Background Music** - "Đâu đâu cũng là em" playing in the background
- 📱 **Mobile Optimized** - Perfect for iPhone 11 Pro and all devices
- 💜 **Pink & Purple Theme** - Romantic gradient design with glassmorphism
- 🎨 **Smooth Animations** - 60fps silky smooth transitions

## 📱 Optimized For

- **Primary:** iPhone 11 Pro (390x844px)
- **Supports:** All mobile and desktop devices
- **Browser:** Safari iOS, Chrome, Edge, Firefox

## 🚀 Local Development

### Prerequisites
No build tools required! This is a pure HTML/CSS/JS project.

### Running Locally

1. **Option A: Using Python**
   ```bash
   cd "E:/Studying Document/A_2026_Work/Happynewyear/HappyNewYearApp"
   python -m http.server 8000
   ```
   Open `http://localhost:8000`

2. **Option B: Using Node.js serve**
   ```bash
   npx serve -s . -l 3000
   ```
   Open `http://localhost:3000`

3. **Option C: VS Code Live Server**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

## 🎵 Adding Background Music

The website expects a music file at `music/bgm.mp3`. To add your music:

1. Get the song "Đâu đâu cũng là em" as an MP3 file
2. Save it to the `music/` folder as `bgm.mp3`
3. Refresh the website
4. Click the music icon (top right) to play/pause

**Note:** If the music file doesn't exist, the website will still work perfectly, just without background music.

## 📁 Project Structure

```
HappyNewYearApp/
├── index.html          # Main HTML structure
├── styles.css          # All styling (Pink & Purple theme)
├── script.js           # JavaScript functionality
├── vercel.json         # Vercel deployment config
├── README.md           # This file
├── images/             # Photo folder
│   ├── hero.jpg        # Main photo (finale screen)
│   ├── moment1.jpg     # Trip Tam Đảo
│   ├── moment2.jpg     # Chụp vô tình xinh
│   ├── moment3.jpg     # Sinh nhật
│   ├── moment4.jpg     # 30/4 - 1/5
│   └── moment5.jpg     # (Optional extra)
└── music/              # Music folder
    └── bgm.mp3         # Background music (to be added)
```

## 🌐 Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd "E:/Studying Document/A_2026_Work/Happynewyear/HappyNewYearApp"
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? → **Y**
   - Which scope? → Choose your account
   - Link to existing project? → **N**
   - Project name? → `love-recap-2025` (or your choice)
   - Directory? → `.`
   - Override settings? → **N**

5. **Your site is live!** 🎉
   - Vercel will give you a URL like: `https://love-recap-2025.vercel.app`
   - Share this URL with your girlfriend's iPhone 11 Pro!

### Method 2: Vercel Web Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your Git repository (or drag & drop folder)
4. Click "Deploy"
5. Done! Get your deployment URL

## 🔄 Updating Content

### Change Photos
Replace the files in the `images/` folder with your own photos. Keep the same filenames:
- `hero.jpg` - Main photo
- `moment1.jpg` - `moment4.jpg` - Timeline moments

### Change Text
Edit `index.html` to update:
- Stats numbers (lines with `data-target`)
- Timeline titles and descriptions
- Love message text

### Change Colors
Edit `styles.css` root variables:
```css
:root {
    --pink-primary: #FF6B9D;    /* Change these */
    --purple-primary: #6C5CE7;  /* to your colors */
}
```

### Change Countdown Target
Edit `script.js` line ~122:
```javascript
const targetDate = new Date('2026-01-01T00:00:00+07:00').getTime();
```

## 📱 Testing on iPhone 11 Pro

### Desktop Browser Testing:
1. Open Chrome/Edge DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select "iPhone 11 Pro" or set to 390 x 844
4. Test all features

### Real Device Testing:
1. Deploy to Vercel
2. Open the Vercel URL on iPhone 11 Pro Safari
3. Tap to start and enjoy! 💕

## 🎨 Design Features

- **Glassmorphism** - Frosted glass effect on cards
- **Particle Effects** - Hearts and stars floating
- **Gradient Animations** - Smooth color transitions
- **60fps Animations** - Buttery smooth performance
- **Touch-Friendly** - Large tap targets (44px minimum)
- **No Horizontal Scroll** - Perfect mobile experience

## 💡 Tips

- **Best experience:** View in portrait mode on mobile
- **Fireworks:** Tap anywhere on the finale screen to launch fireworks
- **Navigation:** Swipe left/right or use bottom navigation
- **Music:** May require user interaction to start (iOS policy)

## 🐛 Troubleshooting

**Music not playing?**
- Check if `music/bgm.mp3` exists
- Click the music icon (top right)
- iOS requires user interaction before audio plays

**Images not showing?**
- Verify image files exist in `images/` folder
- Check file names match exactly (case-sensitive)
- Clear browser cache and refresh

**Countdown wrong?**
- Check your timezone in `script.js`
- Current setting: GMT+7 (Vietnam)

## 📄 License

Made with 💕 for my love

---

**Created:** December 31, 2025  
**Countdown to:** January 1, 2026, 00:00:00 (GMT+7)  
**Theme:** Pink & Purple Romantic Love Story  
**Optimized for:** iPhone 11 Pro & All Devices
