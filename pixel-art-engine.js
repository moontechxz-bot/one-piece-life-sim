// One Piece Pixel Art Battle Engine (Retro 16-Bit Pixel Graphics)
class PixelArtEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.currentScene = "eastblue";
        this.player = {
            x: 120,
            y: 200,
            animFrame: 0,
            state: "idle", // idle, attack, hit, victory
            attackType: "normal",
            fruitType: null,
            flashTime: 0
        };

        this.boss = {
            id: "arlong",
            x: 480,
            y: 190,
            animFrame: 0,
            state: "idle",
            flashTime: 0
        };

        this.particles = [];
        this.floatingTexts = [];
        this.tick = 0;
        this.isRunning = false;

        this.loop = this.loop.bind(this);
    }

    start(scene, bossId, playerFruit) {
        this.currentScene = scene || "eastblue";
        this.boss.id = bossId || "arlong";
        this.player.fruitType = playerFruit || null;
        this.player.state = "idle";
        this.boss.state = "idle";
        this.particles = [];
        this.floatingTexts = [];
        this.isRunning = true;
        requestAnimationFrame(this.loop);
    }

    stop() {
        this.isRunning = false;
    }

    triggerPlayerAttack(type = "normal") {
        this.player.state = "attack";
        this.player.attackType = type;
        this.player.animFrame = 0;

        // Spawn particles based on attack type
        setTimeout(() => {
            if (type === "special") {
                this.spawnFruitFx(this.player.fruitType);
            } else if (type === "haki") {
                this.spawnHakiLightning(this.boss.x, this.boss.y);
            } else {
                this.spawnSlash(this.boss.x, this.boss.y);
            }
            this.boss.state = "hit";
            this.boss.flashTime = 12;
        }, 150);

        setTimeout(() => {
            this.player.state = "idle";
            this.boss.state = "idle";
        }, 600);
    }

    triggerBossAttack(bossSkill) {
        this.boss.state = "attack";
        this.boss.animFrame = 0;

        setTimeout(() => {
            this.player.state = "hit";
            this.player.flashTime = 12;
            this.spawnSlash(this.player.x, this.player.y, "#ef4444");
        }, 150);

        setTimeout(() => {
            this.boss.state = "idle";
            this.player.state = "idle";
        }, 600);
    }

    showDamageText(x, y, text, color = "#ff4444") {
        this.floatingTexts.push({
            x: x + (Math.random() * 20 - 10),
            y: y - 10,
            text: text,
            color: color,
            alpha: 1.0,
            vy: -1.2
        });
    }

    spawnSlash(targetX, targetY, color = "#38bdf8") {
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x: targetX,
                y: targetY - 20,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                color: color,
                size: 4 + Math.random() * 4,
                life: 15
            });
        }
    }

    spawnHakiLightning(targetX, targetY) {
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: targetX + (Math.random() - 0.5) * 50,
                y: targetY - 30 + (Math.random() - 0.5) * 50,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                color: Math.random() > 0.4 ? "#dc2626" : "#18181b",
                size: 5 + Math.random() * 5,
                life: 22
            });
        }
    }

    spawnFruitFx(fruitType) {
        const color = fruitType?.color || "#f59e0b";
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: this.boss.x + (Math.random() - 0.5) * 60,
                y: this.boss.y - 25 + (Math.random() - 0.5) * 60,
                vx: (Math.random() - 0.5) * 12,
                vy: (Math.random() - 0.5) * 12,
                color: color,
                size: 6 + Math.random() * 6,
                life: 25
            });
        }
    }

    loop() {
        if (!this.isRunning) return;
        this.tick++;

        this.update();
        this.draw();

        requestAnimationFrame(this.loop);
    }

    update() {
        // Floating text update
        for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
            const ft = this.floatingTexts[i];
            ft.y += ft.vy;
            ft.alpha -= 0.025;
            if (ft.alpha <= 0) {
                this.floatingTexts.splice(i, 1);
            }
        }

        // Particle update
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }

        if (this.player.flashTime > 0) this.player.flashTime--;
        if (this.boss.flashTime > 0) this.boss.flashTime--;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // 1. Draw Pixel Background
        this.drawPixelBackground();

        // 2. Draw Ground Platform
        this.drawPixelPlatform();

        // 3. Draw Player Sprite
        this.drawPlayerSprite();

        // 4. Draw Boss Sprite
        this.drawBossSprite();

        // 5. Draw Particles
        this.drawParticles();

        // 6. Draw Floating Texts
        this.drawFloatingTexts();
    }

    drawPixelBackground() {
        const ctx = this.ctx;
        const w = this.width;
        const h = this.height;

        if (this.currentScene === "wano") {
            // Dark purple stormy night with Onigashima moon
            ctx.fillStyle = "#1e102d";
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = "#fef08a";
            ctx.beginPath();
            ctx.arc(w * 0.75, 70, 38, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#3b1e54";
            ctx.fillRect(0, 90, w, 40);
        } else if (this.currentScene === "marineford") {
            // Fiery lava red and navy smoke
            ctx.fillStyle = "#450a0a";
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(w * 0.45, 50, 70, 150);
            ctx.fillRect(w * 0.4, 100, 110, 100);
            ctx.fillStyle = "#ef4444";
            ctx.fillRect(0, 160, w, 20);
        } else if (this.currentScene === "skypiea") {
            // Blue sky and white cloud sea
            ctx.fillStyle = "#38bdf8";
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = "#fde047";
            ctx.beginPath();
            ctx.arc(w * 0.5, 50, 45, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#f8fafc";
            ctx.fillRect(0, 140, w, 100);
        } else if (this.currentScene === "alabasta") {
            // Desert yellow sky & sand dunes
            ctx.fillStyle = "#fdba74";
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = "#d97706";
            ctx.beginPath();
            ctx.moveTo(w * 0.2, 190); ctx.lineTo(w * 0.35, 90); ctx.lineTo(w * 0.5, 190);
            ctx.fill();
        } else if (this.currentScene === "thriller") {
            // Thriller Bark dark spooky purple fog & ghost ship
            ctx.fillStyle = "#180b26";
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = "#3e1c59";
            ctx.fillRect(0, 120, w, 60);
            ctx.fillStyle = "#a855f7";
            ctx.fillRect(w * 0.6, 60, 6, 6);
            ctx.fillRect(w * 0.4, 80, 8, 8);
        } else if (this.currentScene === "impel") {
            // Impel Down prison cells & boiling blood red
            ctx.fillStyle = "#3b0707";
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = "#1f2937";
            for (let i = 50; i < w; i += 60) {
                ctx.fillRect(i, 40, 8, 160);
            }
        } else if (this.currentScene === "mirror") {
            // Mirror World magenta checkered fantasy
            ctx.fillStyle = "#581c87";
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = "#7c3aed";
            ctx.fillRect(w * 0.3, 40, 80, 120);
            ctx.fillStyle = "#c084fc";
            ctx.fillRect(w * 0.35, 45, 70, 110);
        } else if (this.currentScene === "blackbeard") {
            // Pirate Island Hachinosu skull rock & pitch black
            ctx.fillStyle = "#09090b";
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = "#3f3f46";
            ctx.beginPath();
            ctx.arc(w * 0.5, 90, 45, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#000000";
            ctx.fillRect(w * 0.46, 80, 10, 12);
            ctx.fillRect(w * 0.52, 80, 10, 12);
            ctx.fillRect(w * 0.47, 105, 18, 10);
        } else {
            // Default East Blue Ocean & Island
            ctx.fillStyle = "#60a5fa";
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = "#1d4ed8";
            ctx.fillRect(0, 130, w, 70);
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(w * 0.2, 110, 12, 18);
            ctx.fillRect(w * 0.24, 115, 10, 13);
        }
    }

    drawPixelPlatform() {
        const ctx = this.ctx;
        const w = this.width;
        // Wooden pirate deck or stone arena
        ctx.fillStyle = "#78350f"; // Wood primary
        ctx.fillRect(0, 240, w, 80);

        // Planks
        ctx.fillStyle = "#451a03";
        for (let i = 0; i < w; i += 32) {
            ctx.fillRect(i, 240, 2, 80);
        }
        ctx.fillRect(0, 240, w, 4); // Edge
    }

    drawPlayerSprite() {
        const ctx = this.ctx;
        const bob = Math.sin(this.tick * 0.12) * 2;
        let px = this.player.x;
        let py = this.player.y + bob;

        if (this.player.state === "attack") {
            px += 30; // Dash forward
        }

        ctx.save();
        if (this.player.flashTime > 0) {
            ctx.filter = "brightness(2) contrast(1.5)";
        }

        // Draw Pixel Character Body (16-bit retro blocky art)
        // Legs
        ctx.fillStyle = "#1e3a8a"; // Blue pirate shorts
        ctx.fillRect(px - 10, py + 18, 9, 20);
        ctx.fillRect(px + 1, py + 18, 9, 20);
        // Feet
        ctx.fillStyle = "#78350f";
        ctx.fillRect(px - 12, py + 36, 12, 6);
        ctx.fillRect(px + 1, py + 36, 12, 6);

        // Torso / Vest
        if (this.player.fruitType?.id === "gomu" && this.player.state === "attack") {
            ctx.fillStyle = "#ffffff"; // Gear 5 Nika white
        } else {
            ctx.fillStyle = "#dc2626"; // Red pirate vest
        }
        ctx.fillRect(px - 14, py - 4, 28, 24);

        // Skin (Chest & Arms)
        ctx.fillStyle = "#fed7aa";
        ctx.fillRect(px - 6, py - 2, 12, 18); // Chest
        ctx.fillRect(px - 18, py - 2, 5, 20); // Left arm
        ctx.fillRect(px + 13, py - 2, 5, 20); // Right arm

        // Head
        ctx.fillStyle = "#fed7aa";
        ctx.fillRect(px - 12, py - 24, 24, 20);

        // Hair
        if (this.player.fruitType?.id === "gomu" && this.player.state === "attack") {
            ctx.fillStyle = "#f8fafc"; // Nika flame hair
        } else {
            ctx.fillStyle = "#18181b"; // Black hair
        }
        ctx.fillRect(px - 14, py - 26, 28, 8);
        ctx.fillRect(px - 15, py - 22, 5, 10);

        // Straw Hat
        ctx.fillStyle = "#facc15"; // Yellow hat
        ctx.fillRect(px - 22, py - 28, 44, 5); // Brim
        ctx.fillRect(px - 12, py - 36, 24, 8); // Top
        ctx.fillStyle = "#dc2626"; // Red ribbon
        ctx.fillRect(px - 12, py - 29, 24, 2);

        // Eyes & Smile
        ctx.fillStyle = "#000000";
        ctx.fillRect(px + 2, py - 16, 3, 4); // Eye
        ctx.fillRect(px + 1, py - 10, 6, 2); // Smile

        // Weapon or Fruit VFX in attack state
        if (this.player.state === "attack") {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(px + 18, py + 2, 35, 5); // Extended punch or blade
            ctx.fillStyle = "#38bdf8";
            ctx.fillRect(px + 50, py - 2, 12, 12);
        }

        ctx.restore();
    }

    drawBossSprite() {
        const ctx = this.ctx;
        const bob = Math.cos(this.tick * 0.12) * 2;
        let bx = this.boss.x;
        let by = this.boss.y + bob;

        if (this.boss.state === "attack") {
            bx -= 30; // Boss lunges forward
        }

        ctx.save();
        if (this.boss.flashTime > 0) {
            ctx.filter = "brightness(2) contrast(1.5)";
        }

        const bid = this.boss.id;

        if (bid === "kaido") {
            // Kaido: Massive Horned Beast with Spiked Club
            ctx.fillStyle = "#312e81"; // Indigo dragon cape
            ctx.fillRect(bx - 30, by - 40, 60, 65);
            ctx.fillStyle = "#fbcfe8"; // Muscular skin
            ctx.fillRect(bx - 20, by - 30, 40, 45);
            ctx.fillStyle = "#fbcfe8";
            ctx.fillRect(bx - 18, by - 55, 36, 25);
            ctx.fillStyle = "#ffffff"; // White Bull Horns
            ctx.fillRect(bx - 26, by - 70, 8, 20);
            ctx.fillRect(bx + 18, by - 70, 8, 20);
            ctx.fillStyle = "#0f172a";
            ctx.fillRect(bx - 22, by - 60, 44, 10);
            ctx.fillRect(bx - 16, by - 40, 32, 6); // Mustache
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(bx - 42, by - 50, 14, 75);
            ctx.fillStyle = "#dc2626"; // Red Haki sparks
            ctx.fillRect(bx - 45, by - 45, 6, 6);
            ctx.fillRect(bx - 32, by - 25, 6, 6);

        } else if (bid === "doflamingo") {
            // Doflamingo: Pink Feather Coat & Red Sunglasses
            ctx.fillStyle = "#f472b6"; // Pink coat
            ctx.fillRect(bx - 24, by - 35, 48, 55);
            ctx.fillStyle = "#fde047";
            ctx.fillRect(bx - 12, by - 45, 24, 12);
            ctx.fillStyle = "#fed7aa";
            ctx.fillRect(bx - 10, by - 34, 20, 15);
            ctx.fillStyle = "#ef4444"; // Red curved shades
            ctx.fillRect(bx - 8, by - 30, 16, 4);
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(bx - 6, by - 24, 12, 3);

        } else if (bid === "akainu") {
            // Akainu: Red Marine Coat, Marine Hat, Magma Fist
            ctx.fillStyle = "#ffffff"; // Marine White Coat
            ctx.fillRect(bx - 24, by - 35, 48, 55);
            ctx.fillStyle = "#991b1b"; // Red suit
            ctx.fillRect(bx - 14, by - 25, 28, 40);
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(bx - 14, by - 48, 28, 12);
            ctx.fillStyle = "#1e3a8a"; // Visor
            ctx.fillRect(bx - 18, by - 40, 12, 4);
            ctx.fillStyle = "#ea580c";
            ctx.fillRect(bx - 32, by - 10, 18, 18);
            ctx.fillStyle = "#facc15";
            ctx.fillRect(bx - 30, by - 8, 8, 8);

        } else if (bid === "enel") {
            // God Enel: Golden Drums on Back, Long Ears
            ctx.fillStyle = "#78350f";
            ctx.beginPath();
            ctx.arc(bx, by - 25, 30, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = "#ca8a04";
            ctx.fillRect(bx - 34, by - 45, 10, 10);
            ctx.fillRect(bx + 24, by - 45, 10, 10);
            ctx.fillStyle = "#fed7aa";
            ctx.fillRect(bx - 15, by - 25, 30, 35);
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(bx - 12, by - 42, 24, 10);
            ctx.fillStyle = "#fed7aa";
            ctx.fillRect(bx - 14, by - 32, 4, 22);
            ctx.fillRect(bx + 10, by - 32, 4, 22);

        } else if (bid === "crocodile") {
            // Crocodile: Fur Coat, Face Scar, Golden Hook
            ctx.fillStyle = "#1c1917"; // Black fur coat
            ctx.fillRect(bx - 25, by - 35, 50, 55);
            ctx.fillStyle = "#fed7aa";
            ctx.fillRect(bx - 12, by - 40, 24, 18);
            ctx.fillStyle = "#78350f"; // Scar line across face
            ctx.fillRect(bx - 12, by - 32, 24, 2);
            ctx.fillStyle = "#eab308";
            ctx.fillRect(bx - 28, by - 5, 12, 16);
            ctx.beginPath();
            ctx.arc(bx - 26, by + 12, 6, 0, Math.PI);
            ctx.stroke();

        } else if (bid === "moria") {
            // Gecko Moria: Giant Gothic Vampire silhouette
            ctx.fillStyle = "#180b26";
            ctx.fillRect(bx - 28, by - 50, 56, 75);
            ctx.fillStyle = "#e2e8f0"; // Pale white skin
            ctx.fillRect(bx - 16, by - 65, 32, 30);
            ctx.fillStyle = "#6b21a8"; // Stitch marks
            ctx.fillRect(bx - 14, by - 55, 28, 2);
            ctx.fillStyle = "#a855f7"; // Shadow bat aura
            ctx.fillRect(bx - 36, by - 30, 12, 12);
            ctx.fillRect(bx + 26, by - 30, 12, 12);

        } else if (bid === "magellan") {
            // Magellan: Giant Bull Horns, Poison Demon wings
            ctx.fillStyle = "#450a0a";
            ctx.fillRect(bx - 26, by - 45, 52, 70);
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(bx - 16, by - 65, 32, 25);
            ctx.fillStyle = "#ffffff"; // Horns
            ctx.fillRect(bx - 22, by - 75, 6, 15);
            ctx.fillRect(bx + 16, by - 75, 6, 15);
            ctx.fillStyle = "#a855f7"; // Purple Poison liquid
            ctx.fillRect(bx - 32, by - 10, 14, 25);
            ctx.fillRect(bx + 20, by - 10, 14, 25);

        } else if (bid === "katakuri") {
            // Katakuri: Fluffy Scarf, Spiked Arms, Crimson Hair
            ctx.fillStyle = "#1e1b4b"; // Leather vest
            ctx.fillRect(bx - 22, by - 35, 44, 55);
            ctx.fillStyle = "#ffffff"; // Fluffy white scarf
            ctx.fillRect(bx - 20, by - 35, 40, 20);
            ctx.fillStyle = "#be123c"; // Crimson spiky hair
            ctx.fillRect(bx - 16, by - 58, 32, 15);
            ctx.fillStyle = "#fed7aa"; // Sharp eyes
            ctx.fillRect(bx - 12, by - 45, 24, 12);
            ctx.fillStyle = "#f43f5e";
            ctx.fillRect(bx - 8, by - 42, 16, 3);
            ctx.fillStyle = "#94a3b8"; // Mogura Trident
            ctx.fillRect(bx + 22, by - 50, 8, 70);

        } else if (bid === "blackbeard") {
            // Blackbeard: Big Belly, Tricorne Hat, Black Beard
            ctx.fillStyle = "#18181b"; // Black Captain coat
            ctx.fillRect(bx - 32, by - 40, 64, 65);
            ctx.fillStyle = "#fed7aa"; // Face
            ctx.fillRect(bx - 16, by - 55, 32, 25);
            ctx.fillStyle = "#09090b"; // Big Black Beard
            ctx.fillRect(bx - 20, by - 40, 40, 25);
            ctx.fillStyle = "#facc15"; // Yellow Tricorne Hat
            ctx.fillRect(bx - 26, by - 65, 52, 10);
            ctx.fillRect(bx - 16, by - 75, 32, 12);
            ctx.fillStyle = "#475569"; // Dual Aura
            ctx.fillRect(bx - 40, by - 15, 14, 14); // Dark aura
            ctx.fillStyle = "#93c5fd";
            ctx.fillRect(bx + 28, by - 15, 14, 14); // Quake aura

        } else if (bid === "imu") {
            // Imu & Gorosei: Tall Crown, Red Piercing Ring Eyes, Pitch Black Shadow
            ctx.fillStyle = "#030712"; // Pitch black veil
            ctx.fillRect(bx - 24, by - 60, 48, 90);
            ctx.fillStyle = "#030712"; // Ultra tall royal crown
            ctx.fillRect(bx - 14, by - 90, 28, 32);
            ctx.fillStyle = "#ef4444"; // Red concentric ring eyes
            ctx.beginPath();
            ctx.arc(bx - 5, by - 45, 4, 0, Math.PI * 2);
            ctx.arc(bx + 5, by - 45, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#ffd700"; // Golden star sparks
            ctx.fillRect(bx - 2, by - 95, 4, 4);

        } else {
            // Arlong default: Blue Sawshark Fishman
            ctx.fillStyle = "#38bdf8";
            ctx.fillRect(bx - 15, by - 25, 30, 35);
            ctx.fillRect(bx - 12, by - 42, 24, 20);
            ctx.fillStyle = "#0284c7";
            ctx.fillRect(bx - 26, by - 32, 16, 6);
            ctx.fillRect(bx - 24, by - 35, 4, 3);
            ctx.fillRect(bx - 18, by - 35, 4, 3);
            ctx.fillStyle = "#0f172a";
            ctx.fillRect(bx - 14, by - 46, 28, 8);
            ctx.fillStyle = "#94a3b8";
            ctx.fillRect(bx + 18, by - 45, 10, 55);
            ctx.fillRect(bx + 26, by - 40, 6, 6);
            ctx.fillRect(bx + 26, by - 26, 6, 6);
        }

        ctx.restore();
    }

    drawParticles() {
        const ctx = this.ctx;
        this.particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
        });
    }

    drawFloatingTexts() {
        const ctx = this.ctx;
        this.floatingTexts.forEach(ft => {
            ctx.save();
            ctx.globalAlpha = Math.max(0, ft.alpha);
            ctx.font = "bold 16px 'Krub', sans-serif";
            ctx.fillStyle = "#000000";
            ctx.fillText(ft.text, ft.x + 1, ft.y + 1);
            ctx.fillStyle = ft.color;
            ctx.fillText(ft.text, ft.x, ft.y);
            ctx.restore();
        });
    }
}

window.PixelArtEngine = PixelArtEngine;
