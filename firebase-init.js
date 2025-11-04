// Firebase initializer for website-podbanske
// --- IMPORTANT: Fill the FIREBASE_CONFIG object with your Firebase project settings.
// How to get them: In Firebase Console -> Project Settings -> SDK setup and config.
// Then deploy the site (or serve locally) and your admin UI will sync with Firestore.

// This file does two things:
// 1) On load it reads a set of well-known keys from Firestore and writes them into localStorage
//    so the existing `app.js` (which reads localStorage) can keep working unchanged.
// 2) It patches Storage.prototype.setItem so when your admin UI writes to localStorage
//    (the admin in app.js uses localStorage), those changes are saved to Firestore.

// ----- FIREBASE CONFIG -----
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDhyFdDyZwz7ZGVCRhiwQiIFH-8wrr9IKY",
  authDomain: "podbanske-c09cc.firebaseapp.com",
  projectId: "podbanske-c09cc",
  // IMPORTANT: Firebase Storage bucket should use appspot.com domain
  storageBucket: "podbanske-c09cc.appspot.com",
  messagingSenderId: "719230424399",
  appId: "1:719230424399:web:13c2195825508dee79e13a",
  measurementId: "G-YY4TW2VJQC"
};
// --------------------------

// If you haven't filled the config, the script won't attempt to connect.
const IS_CONFIG_FILLED = FIREBASE_CONFIG.apiKey !== "YOUR_API_KEY" && FIREBASE_CONFIG.projectId !== "YOUR_PROJECT_ID";

if (!IS_CONFIG_FILLED) {
  console.warn('firebase-init.js: Firebase config not filled. Fill FIREBASE_CONFIG in firebase-init.js to enable Firestore sync.');
} else {
  // Use ESM CDN imports for the modular SDK
  import('https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js').then(({ initializeApp }) => {
    const app = initializeApp(FIREBASE_CONFIG);
    return Promise.all([
      Promise.resolve(app),
      import('https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js'),
      import('https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js'),
      import('https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js')
    ]);
  }).then(([app, firestoreModule, analyticsModule, storageModule]) => {
    const { getFirestore, doc, getDoc, setDoc, onSnapshot } = firestoreModule;
  const { getAnalytics } = analyticsModule;
  const { getStorage, ref, uploadBytes, getDownloadURL } = storageModule;
  const analytics = getAnalytics(app);
  const storage = getStorage(app);

    // Expose Firebase Storage functions globally
    window.firebaseStorage = {
      uploadImage: async (file, path) => {
        const storageRef = ref(storage, path);
        // Ensure a content-type is set so images are served correctly
        const snapshot = await uploadBytes(storageRef, file, { contentType: file.type || 'application/octet-stream' });
        return getDownloadURL(snapshot.ref);
      }
    };
    const db = getFirestore();

    // Map of localStorage keys to Firestore document paths
    const KEY_DOC_MAP = {
      heroSection: ['site', 'hero'],
      aboutSection: ['site', 'about'],
      adminActivities: ['site', 'activities'],
      historySection: ['site', 'history'],
      natureSection: ['site', 'nature'],
      rulesSection: ['site', 'rules'],
      magicSection: ['site', 'magic'],
      contactInfo: ['site', 'contact'],
      footerText: ['site', 'footer']
    };

    // Helper to get doc ref
    const docRefForKey = (key) => {
      const path = KEY_DOC_MAP[key];
      if (!path) return null;
      return doc(db, path[0], path[1]);
    };

    // Read Firestore docs and populate localStorage
    const fetchAllToLocalStorage = async () => {
      for (const key of Object.keys(KEY_DOC_MAP)) {
        try {
          const ref = docRefForKey(key);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const data = snap.data();
            // If the doc contains a single { value: ... } field, use it; otherwise use whole doc
            let toStore;
            if (Object.keys(data).length === 1 && Object.prototype.hasOwnProperty.call(data, 'value')) {
              toStore = data.value;
            } else {
              toStore = data;
            }
            // store JSON string for objects/arrays; for plain strings ensure string
            if (typeof toStore === 'string') {
              localStorage.setItem(key, toStore);
            } else {
              localStorage.setItem(key, JSON.stringify(toStore));
            }
          }
        } catch (err) {
          console.error('firebase-init: failed fetching', key, err);
        }
      }
    };

    // Listen for remote updates and mirror to localStorage
    const setupRealtimeListeners = () => {
      for (const key of Object.keys(KEY_DOC_MAP)) {
        const ref = docRefForKey(key);
        onSnapshot(ref, (snap) => {
          if (!snap.exists()) return;
          const data = snap.data();
          let toStore = (Object.keys(data).length === 1 && Object.prototype.hasOwnProperty.call(data, 'value')) ? data.value : data;
          if (typeof toStore === 'string') {
            localStorage.setItem(key, toStore);
          } else {
            localStorage.setItem(key, JSON.stringify(toStore));
          }
        }, (err) => console.error('firebase-init snapshot error for', key, err));
      }
    };

    // Save a key's value to Firestore (called when localStorage is updated by admin)
    const saveKeyToFirestore = async (key, rawValue) => {
      const ref = docRefForKey(key);
      if (!ref) return;
      try {
        let parsed;
        // Try parsing JSON, otherwise treat as string
        try { parsed = JSON.parse(rawValue); } catch { parsed = rawValue; }
        if (typeof parsed === 'string') {
          await setDoc(ref, { value: parsed }, { merge: true });
        } else {
          // parsed is object/array - write as the doc content
          await setDoc(ref, parsed);
        }
      } catch (err) {
        console.error('firebase-init save failed for', key, err);
      }
    };

    // Monkey-patch localStorage.setItem so admin UI that writes localStorage also saves to Firestore
    (function patchLocalStorage() {
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = function(key, value) {
        originalSetItem.apply(this, [key, value]);
        // Only sync keys we know about
        if (Object.prototype.hasOwnProperty.call(KEY_DOC_MAP, key)) {
          // Fire-and-forget
          saveKeyToFirestore(key, value).catch((e) => console.error(e));
        }
      };
    })();

    // Start initial fetch + realtime listeners
    fetchAllToLocalStorage().then(() => {
      setupRealtimeListeners();
      console.info('firebase-init: Firestore sync enabled for known keys.');
    }).catch(err => console.error('firebase-init init error', err));

    // Expose a small helper API in case you want to use it from console
    window.firebaseSync = {
      saveKeyToFirestore,
      fetchAllToLocalStorage
    };
  }).catch((err) => {
    console.error('firebase-init: failed to import Firebase SDK or initialize', err);
  });
}

// End of firebase-init.js
