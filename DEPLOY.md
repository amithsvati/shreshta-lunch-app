# 🚀 How to Access & Deploy Shreshta's Lunch App

**🌟 Live App:** [https://shreshta-lunch-planner-app.netlify.app](https://shreshta-lunch-planner-app.netlify.app)

Here is how you can access the app on your mobile phone or share it with others.

## 📱 Option 1: Access on Mobile (Local Network)
Since the app is already running on your computer, you can check it on your phone **right now** if you are connected to the same Wi-Fi.

1.  **Find your Computer's Local IP**:
    *   **Mac**: Open `System Settings` > `Wi-Fi` > Click `Details` next to your network. Look for **IP Address** (e.g., `192.168.1.5`).
    *   **Or check your terminal**: The command `npm run dev -- --host` usually prints something like:
        ```
          ➜  Local:   http://localhost:5173/
          ➜  Network: http://192.168.1.5:5173/  <-- THIS ONE
        ```

2.  **Open on Phone**:
    *   Open Chrome or Safari on your phone.
    *   Type `http://YOUR_IP_ADDRESS:5173` (e.g., `http://192.168.1.5:5173`).
    *   The app should load instantly!

## 🌐 Option 2: Deploy Online (Accessible Anywhere)

The easiest way to put this app online for free is using **Netlify**.

### Method A: Netlify Drop (Easiest - No Account Required Initially)
1.  **Build the App**:
    *   Open your terminal in the project folder.
    *   Run: `npm run build`
    *   This creates a `dist` folder in your project directory.

2.  **Upload**:
    *   Go to [app.netlify.com/drop](https://app.netlify.com/drop).
    *   Open your file explorer (Finder) to your project folder.
    *   **Drag and drop the entire `dist` folder** onto the Netlify page.
    *   Wait a few seconds, and you will get a live URL (e.g., `https://shreshta-lunch.netlify.app`).

### Method B: Netlify CLI (For continuous updates)
If you want to update the app frequently, use the command line:

1.  **Install Netlify CLI**:
    ```bash
    npm install -g netlify-cli
    ```

2.  **Deploy**:
    ```bash
    netlify deploy --prod
    ```
    *   Follow the prompts.
    *   **Publish directory**: strictly verify it says `dist`.

## 🖼️ About the Photos
The app uses dynamic AI-generated images. If you want to use **real photos** (like a photo of Shreshta's actual lunchbox), replace the `image` URL in `src/data/recipes.js`.
