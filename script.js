// === TARGET HASHES (Never expose real credentials) ===
    const TARGET_USER_HASH = "b9cac69a0ab2667ab592c2d5980e4b2c519f4f2d39c3b3f64cff303aaf2a74b9";
    const TARGET_PASS_HASH = "98edea3d69de147666b0410ca3acd38c1c9297bb9b1ca6bb444219677284ce2b";

    // === SHA-256 HASHER (Web Crypto API) ===
    async function sha256(text) {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // === LOGIN ATTEMPT ===
    async function attemptLogin() {
      const user = document.getElementById('username').value.trim();
      const pass = document.getElementById('password').value.trim();
      const status = document.getElementById('loginStatus');

      if (!user || !pass) {
        status.innerHTML = `<span style="color:${'var(--red)'}">Empty fields.</span>`;
        return;
      }

      try {
        const userHash = await sha256(user);
        const passHash = await sha256(pass);

        if (userHash === TARGET_USER_HASH && passHash === TARGET_PASS_HASH) {
          status.innerHTML = `<span style="color:lime">HASH MATCH! ACCESS GRANTED</span>`;
          triggerVictory();
        } else {
          status.innerHTML = `<span style="color:${'var(--red)'}">HASH MISMATCH. ACCESS DENIED.</span>`;
          console.warn(`Failed: user=${userHash}, pass=${passHash}`);
          setTimeout(() => status.textContent = '', 2000);
        }
      } catch (err) {
        console.error("Hash error:", err);
      }
    }

    function clickMe(){
      alert('Decoy. Keep hunting.'); 
      document.cookie = "hint_cookie=password starts with 7k9..."
    }

    // === VICTORY CELEBRATION ===
    function triggerVictory() {
      const overlay = document.getElementById('victoryOverlay');
      overlay.style.display = 'flex';
      playVictorySound();
      startMatrixRain();
      createConfetti(100);
      document.getElementById('binary-doc').classList.add('active');
      console.log('%cSECURE ACCESS GRANTED: FLAG{vault_breaker_elite}', 'color: lime; font-size: 20px;');
    }

    // === SOUND ===
    function playVictorySound() {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const siren = audioCtx.createOscillator();
      siren.type = 'sawtooth';
      siren.frequency.setValueAtTime(200, audioCtx.currentTime);
      siren.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 1.5);
      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.5);
      siren.connect(gain).connect(audioCtx.destination);
      siren.start();
      siren.stop(audioCtx.currentTime + 1.5);

      setTimeout(() => {
        const notes = [880, 988, 1109, 1319, 1480];
        let time = audioCtx.currentTime;
        notes.forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const g = audioCtx.createGain();
          osc.frequency.value = freq;
          g.gain.setValueAtTime(0.4, time);
          g.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
          osc.connect(g).connect(audioCtx.destination);
          osc.start(time);
          osc.stop(time + 0.3);
          time += 0.2;
        });
      }, 1600);
    }

    // === MATRIX RAIN ===
    function startMatrixRain() {
      const canvas = document.getElementById('matrixRain');
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const chars = 'Brahim alhiane, a1f9c3e4b7d2, 27, Casablanca, 612345678, brahim.alhiane@gmail.com, 1, Active, 1730152320, 2025‑10‑28. abdelhakim ouichouani, 9b7e2d4c8f1a, 34, Rabat, 623456789, abdelhakim.ouichouani@gmail.com, 0, Active, 1730152320, 2025‑10‑28. tarik bahaz, c4d8e1f2a9b3, 29, Marrakech, 634567890, tarik.bahaz@gmail.com, 1, Active, 1730152320, 2025‑10‑28. imad el masoudy, f7a2b9c3d4e1, 31, Agadir, 645678901, imad.elmasoudy@gmail.com, 1, Active, 1730152320, 2025‑10‑28. abdelhadi elkabli, e2c9d1f4a7b8, 26, Fes, 656789012, abdelhadi.elkabli@gmail.com, 0, Active, 1730152320, 2025‑10‑28. abderrahmane elhadere, b3f1e9c2d7a4, 33, Tangier, 667890123, abderrahmane.elhadere@gmail.com, 1, Active, 1730152320, 2025‑10‑28. walid elmiloudi, d8a2c7f3b1e9, 28, Oujda, 678901234, walid.elmiloudi@gmail.com, 0, Active, 1730152320, 2025‑10‑28. ayoub amine, f1c3a9d7e2b4, 25, Meknes, 689012345, ayoub.amine@gmail.com, 1, Active, 1730152320, 2025‑10‑28. mohammed debbarh, a7d2f9c1e3b8, 30, Kenitra, 690123456, mohammed.debbarh@gmail.com, 1, Active, 1730152320, 2025‑10‑28. Omar El filali, c9e1a2b7f3d4, 32, Tetouan, 701234567, omar.elfilali@gmail.com, 0, Active, 1730152320, 2025‑10‑28. hanane taouili, e4b9c1f7a2d3, 27, Essaouira, 712345678, hanane.taouili@gmail.com, 1, Active, 1730152320, 2025‑10‑28. mohamed elkerymy, f2d8a1c3b7e9, 29, Nador, 723456789, mohamed.elkerymy@gmail.com, 0, Active, 1730152320, 2025‑10‑28. Oumaima eddahani, b1c7e2f9a4d3, 26, Safi, 734567890, oumaima.eddahani@gmail.com, 1, Active, 1730152320, 2025‑10‑28. aymane loussal, d3f9a2c1e7b4, 31, El Jadida, 745678901, aymane.loussal@gmail.com, 1, Active, 1730152320, 2025‑10‑28. fatima ezzahra baloune, e7a1c9d2f3b8, 28, Mohammedia, 756789012, fatima.baloune@gmail.com, 0, Active, 1730152320, 2025‑10‑28. el mehdi lahrach, c2d7f1a9b3e4, 30, Settat, 767890123, elmehdi.lahrach@gmail.com, 1, Active, 1730152320, 2025‑10‑28. mohammed ali cherraoui, f9b1c3a2d8e7, 33, Beni Mellal, 778901234, mohammed.cherraoui@gmail.com, 0, Active, 1730152320, 2025‑10‑28. salmane karroum, a4e2c9d7f1b3, 27, Khouribga, 789012345, salmane.karroum@gmail.com, 1, Active, 1730152320, 2025‑10‑28. fakhreddine largou, d1b7f9c2a3e8, 29, Ouarzazate, 790123456, fakhreddine.largou@gmail.com, 1, Active, 1730152320, 2025‑10‑28. abderrahim ghmouch, e3c1a9f2d7b4, 32, Taza, 801234567, abderrahim.ghmouch@gmail.com, 0, Active, 1730152320, 2025‑10‑28. mouad boumahdi, f8a2c1d9b7e3, 24, Casablanca, 812345678, mouad.boumahdi@gmail.com, 1, Active, 1730152320, 2025‑10‑28. razane wakhidi, b9d3f1a2c7e4, 26, Rabat, 823456789, razane.wakhidi@gmail.com, 0, Active, 1730152320, 2025‑10‑28. Khaoula Khaldi, c1f7a9d2b3e8, 25, Marrakech, 834567890, khaoula.khaldi@gmail.com, 1, Active, 1730152320, 2025‑10‑28.';
      const fontSize = 16;
      const columns = canvas.width / fontSize;
      const drops = Array(Math.floor(columns)).fill(1);

      function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';
        drops.forEach((y, x) => {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, x * fontSize, y * fontSize);
          if (y * fontSize > canvas.height && Math.random() > 0.975) drops[x] = 0;
          drops[x]++;
        });
      }
      setInterval(draw, 35);
    }

    // === CONFETTI ===
    function createConfetti(count) {
      for (let i = 0; i < count; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.background = ['#0f0', '#00f', '#f0f', '#ff0'][Math.floor(Math.random() * 4)];
        c.style.animationDuration = (Math.random() * 3 + 2) + 's';
        c.style.animationDelay = Math.random() * 2 + 's';
        document.getElementById('victoryOverlay').appendChild(c);
        setTimeout(() => c.remove(), 5000);
      }
    }

    // === BINARY DOWNLOAD ===
    function downloadBinary() {
      const binary = `
      01101100 01100001 01110011 01110100 00100000
      01110000 01100001 01110010 01110100 00100000
      01101111 01100110 00100000
      01110100 01101000 01100101 00100000
      01110000 01100001 01110011 01110011 01110111 01101111 01110010 01100100 00100000
      01101001 01110011 00100000
      01110010 00110101 00110011
      `;
      const blob = new Blob([binary], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'binary-victory.txt';
      a.click();
      URL.revokeObjectURL(url);
    }

    localStorage.setItem('clue?', '&#x73;&#x65;&#x63;&#x6f;&#x6e;&#x64;&#x5f;&#x70;&#x61;&#x72;&#x74;&#x20;&#x69;&#x73;&#x20;&#x2e;&#x2e;&#x2e;&#x24;&#x6d;&#x30;&#x2e;&#x2e;&#x2e;');
    sessionStorage.setItem("decoyUsername", "Abdeladim"); 
    document.cookie = "test_cookie=hello";


      
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js')
        .then(() => console.log('SW registered (silent)'))
        .catch(() => {});
    }

    function triggerRealRequest() {
      fetch('fake-api-hint.json?' + Date.now(), {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
          'X-CTF': 'true'
        }
      }).catch(() => {
      });
    }
    
    setTimeout(triggerRealRequest, 2500);