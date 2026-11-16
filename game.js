// One Piece Life Simulator Game Engine (Enhanced with Pixel Art & Devil Fruits)
(function() {
    // ROULETTE POOLS
    const ROULETTE_POOLS = {
        sea: [
            { id: "east", name: "East Blue (ทะเลตะวันออก)", sub: "ทะเลที่สงบที่สุด จุดเริ่มต้นของตำนาน", bonus: { J: 15, H: 10, S: 5, Beli: 1000 } },
            { id: "west", name: "West Blue (ทะเลตะวันตก)", sub: "ดินแดนมาเฟีย ท้องถิ่นโอฮารา", bonus: { S: 15, J: 5, C: 10, Beli: 5000 } },
            { id: "south", name: "South Blue (ทะเลทักษิณ)", sub: "ดินแดนแห่งเทคโนโลยีและนักประดิษฐ์", bonus: { S: 10, Beli: 15000, C: 10 } },
            { id: "north", name: "North Blue (ทะเลอุดร)", sub: "ทะเลแห่งความขัดแย้งและสงครามเจอร์ม่า", bonus: { S: 25, H: 10, J: -10, Beli: 8000 } },
            { id: "grandline", name: "Grand Line (แกรนด์ไลน์)", sub: "ทะเลอันตราย เต็มไปด้วยสัตว์ร้ายและยอดฝีมือ", bonus: { S: 30, H: 20, K: 20, Beli: 20000 } }
        ],
        race: [
            { id: "human", name: "มนุษย์ (Human)", sub: "สมดุล ปรับตัวง่าย มีเจตจำนงไม่ย่อท้อ", bonus: { H: 10, J: 10, S: 10 } },
            { id: "fishman", name: "มนุษย์เงือก (Fishman)", sub: "พลังกายเหนือมนุษย์ 10 เท่า เจ้าแห่งสายน้ำ", bonus: { H: 30, S: 20, J: 5 } },
            { id: "giant", name: "เผ่าคนยักษ์ (Giant)", sub: "ร่างกายมหึมา พลังทำลายล้างมหาศาล", bonus: { H: 50, S: 15, J: 10 } },
            { id: "mink", name: "เผ่ามิงค์ (Mink Tribe)", sub: "สัญชาตญาณสัตว์ป่า ปล่อยกระแสไฟฟ้าอิเล็กโทร", bonus: { S: 25, H: 20, J: 15 } },
            { id: "lunarian", name: "เผ่าลูนาเรีย (Lunarian)", sub: "เผ่าพันธุ์เทพไฟ อึดถึกบินได้ (แรร์มาก)", bonus: { H: 60, S: 40, K: 30 } },
            { id: "will_of_d", name: "ผู้สืบทอดเจตจำนงแห่ง D. (Will of D.)", sub: "ตระกูลศัตรูคู่อาฆาตของพระเจ้า พลิกประวัติศาสตร์!", bonus: { K: 60, S: 30, J: 20 } }
        ],
        family: [
            { id: "poor", name: "เด็กกำพร้าข้างถนน (Orphan)", sub: "ไร้เงินทองแต่จิตใจเข้มแข็งดุจเหล็กกล้า", bonus: { H: -10, S: 20, Beli: 500, K: 15 } },
            { id: "common", name: "ครอบครัวชาวบ้านธรรมดา (Commoner)", sub: "ชีวิตเรียบง่าย อบอุ่น มีความสุข", bonus: { H: 15, J: 20, Beli: 10000, C: 10 } },
            { id: "merchant", name: "ตระกูลพ่อค้าวาณิช (Merchant Guild)", sub: "มีเส้นสายการค้าและทุนรอนมหาศาล", bonus: { Beli: 150000, C: 25, J: 10 } },
            { id: "noble", name: "ราชวงศ์ / ขุนนางในอาณาจักร (Noble)", sub: "เกิดในวัง มียศฐาบรรดาศักดิ์", bonus: { Beli: 800000, C: 40, J: -5 } },
            { id: "celestial", name: "เผ่ามังกรฟ้าตกยาก (Exiled Celestial)", sub: "อดีตชนชั้นสูง มีชาติกำเนิดลึกลับ", bonus: { Beli: 300000, K: 40, S: 15 } }
        ],
        talent: [
            { id: "dormant", name: "พรสวรรค์ยังไม่ตื่น (Dormant)", sub: "ต้องอาศัยการฝึกฝนอย่างหนักเพื่อก้าวสู่ยอดคน", bonus: { S: 5, H: 5 } },
            { id: "kenbunshoku", name: "พรสวรรค์ฮาคิสังเกต (Kenbunshoku)", sub: "ประสาทสัมผัสไว หลบหลีกและอ่านการเคลื่อนไหว", bonus: { S: 35, J: 10 } },
            { id: "busoshoku", name: "พรสวรรค์ฮาคิเกราะ (Busoshoku)", sub: "หมัดเหล็กกล้า ต่อยผู้มีพลังผลปีศาจได้", bonus: { S: 40, H: 15 } },
            { id: "haoshoku", name: "พรสวรรค์ฮาคิราชันย์ (Haoshoku Haki)", sub: "คุณสมบัติแห่งราชา 1 ในล้านผู้ยืนบนจุดสูงสุด!", bonus: { S: 65, K: 50, J: 25 } }
        ]
    };

    // GAME STATE
    const Game = {
        name: "มังกี้ ดี ไคลด์",
        age: 0,
        maxAge: 78,
        role: "ชาวบ้าน (Civilian)",
        hasHeir: false,
        fruit: null, // Devil Fruit object from DEVIL_FRUITS_DATABASE

        // STATS
        stats: {
            H: 100, // พลังชีวิต (Health)
            maxH: 100,
            J: 50,  // ความสุขและอิสรภาพ (Joy)
            S: 25,  // ฝีมือการต่อสู้และฮาคิ (Skill)
            C: 15,  // เส้นสายและพรรคพวก (Connections)
            Beli: 5000,
            Bounty: 0,
            Karma: 10
        },

        // ALLIES COLLECTED
        allies: ["ลูฟี่ หมวกฟาง", "โรโรโนอา โซโล", "นามิ แมวขโมย", "ซันจิ ขาดำ", "โทนี่ ช็อปเปอร์"],

        // PRE-BIRTH SELECTIONS
        birth: {
            sea: null,
            race: null,
            family: null,
            talent: null
        },

        // LOGBOOK
        logs: [],

        // REBIRTH ACCUMULATOR
        reincarnationBonus: {
            useKBonus: false,
            legacyBeli: 0,
            isHeirMode: false
        },

        // PIXEL ENGINE INSTANCE
        pixelEngine: null,
        currentBattle: null
    };

    // Initialize UI on DOM Ready
    window.addEventListener("DOMContentLoaded", () => {
        initUI();
    });

    function initUI() {
        // Sound toggle
        const soundBtn = document.getElementById("soundToggleBtn");
        if (soundBtn) {
            soundBtn.addEventListener("click", () => {
                window.soundEngine.enabled = !window.soundEngine.enabled;
                soundBtn.textContent = window.soundEngine.enabled ? "🔊 เสียง: เปิด" : "🔇 เสียง: ปิด";
                if (window.soundEngine.enabled) window.soundEngine.playClick();
            });
        }

        // Initialize Pixel Art Engine
        Game.pixelEngine = new window.PixelArtEngine("pixelBattleCanvas");

        // Roulette buttons
        document.getElementById("spinSeaBtn")?.addEventListener("click", () => spinSlot("sea"));
        document.getElementById("spinRaceBtn")?.addEventListener("click", () => spinSlot("race"));
        document.getElementById("spinFamilyBtn")?.addEventListener("click", () => spinSlot("family"));
        document.getElementById("spinTalentBtn")?.addEventListener("click", () => spinSlot("talent"));

        document.getElementById("spinAllBtn")?.addEventListener("click", () => spinAllSlots(false));
        document.getElementById("startGameBtn")?.addEventListener("click", startGame);

        // Battle actions
        document.getElementById("battleAtkBtn")?.addEventListener("click", () => performBattleAction("atk"));
        document.getElementById("battleSpecialBtn")?.addEventListener("click", () => performBattleAction("special"));
        document.getElementById("battleHakiBtn")?.addEventListener("click", () => performBattleAction("haki"));
        document.getElementById("battleAllyBtn")?.addEventListener("click", () => performBattleAction("ally"));
        document.getElementById("battleHealBtn")?.addEventListener("click", () => performBattleAction("heal"));

        // Rebirth buttons
        document.getElementById("rebirthHeirBtn")?.addEventListener("click", () => handleRebirth("heir"));
        document.getElementById("rebirthKarmaBtn")?.addEventListener("click", () => handleRebirth("karma"));
        document.getElementById("rebirthPureBtn")?.addEventListener("click", () => handleRebirth("pure"));

        // Initial default roulette spin preview
        spinAllSlots(true);
    }

    // ROULETTE LOGIC
    function spinSlot(type, silent = false) {
        if (!silent) window.soundEngine.playSpinTick();
        const pool = ROULETTE_POOLS[type];
        let chosen;

        // Apply Karma bonus logic if active
        if (Game.reincarnationBonus.useKBonus) {
            if (type === "race") {
                chosen = Math.random() < 0.65 ? pool.find(p => p.id === "will_of_d") : pool[Math.floor(Math.random() * pool.length)];
            } else if (type === "talent") {
                chosen = Math.random() < 0.70 ? pool.find(p => p.id === "haoshoku") : pool[Math.floor(Math.random() * pool.length)];
            } else if (type === "family") {
                chosen = Math.random() < 0.55 ? pool.find(p => p.id === "noble") : pool[Math.floor(Math.random() * pool.length)];
            } else {
                chosen = pool[Math.floor(Math.random() * pool.length)];
            }
        } else {
            chosen = pool[Math.floor(Math.random() * pool.length)];
        }

        Game.birth[type] = chosen;

        // UI Update
        const titleEl = document.getElementById(`slotVal_${type}`);
        const subEl = document.getElementById(`slotSub_${type}`);
        const boxEl = document.getElementById(`slotBox_${type}`);

        if (titleEl && subEl) {
            titleEl.textContent = chosen.name;
            subEl.textContent = chosen.sub;
        }

        if (boxEl && !silent) {
            boxEl.classList.add("highlight");
            setTimeout(() => boxEl.classList.remove("highlight"), 300);
        }

        checkReadyToStart();
    }

    function spinAllSlots(silent = false) {
        if (!silent) {
            window.soundEngine.playHaki();
        }
        ["sea", "race", "family", "talent"].forEach((t, i) => {
            setTimeout(() => {
                spinSlot(t, silent);
            }, silent ? 0 : i * 150);
        });
    }

    function checkReadyToStart() {
        const ready = Game.birth.sea && Game.birth.race && Game.birth.family && Game.birth.talent;
        const btn = document.getElementById("startGameBtn");
        if (btn) btn.disabled = !ready;
    }

    // START GAME
    function startGame() {
        window.soundEngine.playCoin();
        const nameInput = document.getElementById("charNameInput");
        if (nameInput && nameInput.value.trim() !== "") {
            Game.name = nameInput.value.trim();
        }

        resetStats();
        applyBirthBonuses();

        document.getElementById("rouletteSection").classList.add("hidden");
        document.getElementById("gameDashboard").classList.remove("hidden");

        addLog(`ยินดีต้อนรับสู่โลกวันพีซ! เจ้าถือกำเนิดที่ ${Game.birth.sea.name} ในฐานะ ${Game.birth.race.name}`);

        updateDashboardUI();
        loadYearEvent(Game.age);
    }

    function resetStats() {
        Game.age = 0;
        Game.maxAge = 76 + Math.floor(Math.random() * 14); // 76 - 90 years
        Game.stats.H = 100;
        Game.stats.maxH = 100;
        Game.stats.J = 50;
        Game.stats.S = 25;
        Game.stats.C = 15;
        Game.stats.Beli = 5000;
        Game.stats.Bounty = 0;
        Game.stats.Karma = 10;
        Game.hasHeir = false;
        Game.fruit = null;
        Game.role = "ชาวบ้าน (Civilian)";
        Game.logs = [];

        if (Game.reincarnationBonus.isHeirMode && Game.reincarnationBonus.legacyBeli > 0) {
            Game.stats.Beli += Game.reincarnationBonus.legacyBeli;
            Game.stats.Karma += 30;
            addLog(`🌟 เจ้าได้รับมรดกเงิน 70% จากพ่อแม่รุ่นก่อน จำนวน ฿${Game.reincarnationBonus.legacyBeli.toLocaleString()} เบรี!`);
            Game.reincarnationBonus.isHeirMode = false;
        }
    }

    function applyBirthBonuses() {
        ["sea", "race", "family", "talent"].forEach(k => {
            const b = Game.birth[k]?.bonus;
            if (b) {
                if (b.H) { Game.stats.H += b.H; Game.stats.maxH += b.H; }
                if (b.J) Game.stats.J += b.J;
                if (b.S) Game.stats.S += b.S;
                if (b.C) Game.stats.C += b.C;
                if (b.Beli) Game.stats.Beli += b.Beli;
                if (b.K) Game.stats.Karma += b.K;
            }
        });
        clampStats();
    }

    function clampStats() {
        Game.stats.H = Math.max(0, Math.min(Game.stats.maxH, Game.stats.H));
        Game.stats.J = Math.max(0, Math.min(100, Game.stats.J));
        Game.stats.S = Math.max(0, Game.stats.S);
        Game.stats.C = Math.max(0, Game.stats.C);
        Game.stats.Beli = Math.max(0, Game.stats.Beli);
        Game.stats.Bounty = Math.max(0, Game.stats.Bounty);
    }

    // UPDATE DASHBOARD UI WITH FULL THAI LABELS
    function updateDashboardUI() {
        document.getElementById("wantedName").textContent = Game.name;
        document.getElementById("wantedRole").textContent = Game.role;
        document.getElementById("wantedBounty").textContent = `฿ ${Game.stats.Bounty.toLocaleString()}`;
        document.getElementById("currentAgeBadge").textContent = `อายุ ${Game.age} ปี`;

        // Progress bars with full Thai values
        const hPercent = Math.min(100, Math.max(0, (Game.stats.H / Game.stats.maxH) * 100));
        document.getElementById("statHealthFill").style.width = `${hPercent}%`;
        document.getElementById("statHealthVal").textContent = `${Math.round(Game.stats.H)} / ${Game.stats.maxH}`;

        document.getElementById("statJoyFill").style.width = `${Game.stats.J}%`;
        document.getElementById("statJoyVal").textContent = `${Math.round(Game.stats.J)}%`;

        document.getElementById("statSkillVal").textContent = Math.round(Game.stats.S);
        const sPercent = Math.min(100, (Game.stats.S / 500) * 100);
        document.getElementById("statSkillFill").style.width = `${sPercent}%`;

        document.getElementById("statConnVal").textContent = Math.round(Game.stats.C);
        const cPercent = Math.min(100, (Game.stats.C / 200) * 100);
        document.getElementById("statConnFill").style.width = `${cPercent}%`;

        document.getElementById("statBeliVal").textContent = `฿ ${Game.stats.Beli.toLocaleString()}`;

        // Devil Fruit Badge Display
        const fruitBadge = document.getElementById("devilFruitBadge");
        if (fruitBadge) {
            if (Game.fruit) {
                fruitBadge.classList.remove("hidden");
                fruitBadge.innerHTML = `<span style="font-size: 1.2rem;">${Game.fruit.icon}</span> <strong>${Game.fruit.name}</strong> (${Game.fruit.type})`;
                fruitBadge.style.borderColor = Game.fruit.color || "#d4af37";
            } else {
                fruitBadge.classList.add("hidden");
            }
        }

        // Avatar update
        let avatar = "👦";
        if (Game.age >= 60) avatar = "👴";
        else if (Game.age >= 16) {
            if (Game.fruit?.id === "gomu") avatar = "☀️";
            else if (Game.fruit?.id === "mera") avatar = "🔥";
            else if (Game.fruit?.id === "uo") avatar = "🐉";
            else if (Game.role.includes("Pirate")) avatar = "🏴‍☠️";
            else if (Game.role.includes("Marine")) avatar = "⚓";
            else if (Game.role.includes("Revolutionary")) avatar = "🔥";
            else avatar = "⚔️";
        }
        document.getElementById("wantedAvatar").textContent = avatar;
    }

    // LOGBOOK
    function addLog(text) {
        Game.logs.unshift({ age: Game.age, text });
        const listEl = document.getElementById("logbookList");
        if (listEl) {
            const entry = document.createElement("div");
            entry.className = "log-entry";
            entry.innerHTML = `<span class="log-entry-age">[อายุ ${Game.age} ปี]</span> ${text}`;
            listEl.prepend(entry);
        }
    }

    // YEAR-BY-YEAR STORY EVENT
    function loadYearEvent(age) {
        if (Game.stats.H <= 0 || age > Game.maxAge) {
            triggerEndgame();
            return;
        }

        let event = window.EVENTS_DATABASE[age];
        if (!event) {
            const pool = window.GENERIC_ANNUAL_POOL;
            const template = pool[Math.floor(Math.random() * pool.length)];
            event = {
                title: template.title,
                lore: template.lore,
                question: "ในปีนี้ เจ้าจะเลือกดำเนินการอย่างไร?",
                options: template.options
            };
        }

        renderEvent(event);
    }

    function renderEvent(event) {
        document.getElementById("eventTitle").textContent = event.title;
        document.getElementById("eventLore").textContent = event.lore;
        document.getElementById("eventQuestion").textContent = event.question || "เจ้าจะตัดสินใจอย่างไร?";

        const optionsContainer = document.getElementById("eventOptionsContainer");
        optionsContainer.innerHTML = "";

        event.options.forEach((opt) => {
            const btn = document.createElement("button");
            btn.className = `choice-btn ${opt.color === "boss" ? "boss-choice" : ""}`;

            // Check Requirement
            let canChoose = true;
            let reqNotice = "";
            if (opt.req) {
                if (opt.req.type === "skill" && Game.stats.S < opt.req.value) {
                    canChoose = false;
                    reqNotice = `(ต้องการฝีมือต่อสู้ ≥ ${opt.req.value})`;
                } else if (opt.req.type === "connections" && Game.stats.C < opt.req.value) {
                    canChoose = false;
                    reqNotice = `(ต้องการเส้นสายพรรคพวก ≥ ${opt.req.value})`;
                } else if (opt.req.type === "beli" && Game.stats.Beli < opt.req.value) {
                    canChoose = false;
                    reqNotice = `(ต้องการเงิน ฿${opt.req.value.toLocaleString()} เบรี)`;
                } else if (opt.req.type === "karma" && Game.stats.Karma < opt.req.value) {
                    canChoose = false;
                    reqNotice = `(ต้องการแต้มบุญ ≥ ${opt.req.value})`;
                } else if (opt.req.type === "talent" && Game.birth.talent?.id !== opt.req.value) {
                    canChoose = false;
                    reqNotice = `(${opt.reqText || "เงื่อนไขไม่ตรง"})`;
                }
            }

            btn.disabled = !canChoose;

            let riskBadge = "";
            if (opt.risk) {
                riskBadge = `<span class="impact-badge badge-risk">⚠️ เสี่ยงล้มเหลว ${Math.round(opt.risk * 100)}%</span>`;
            }

            // Generate Full Thai impact badges
            let badgesHtml = "";
            if (opt.impact) {
                if (opt.impact.H) badgesHtml += `<span class="impact-badge badge-health">${opt.impact.H > 0 ? "+" : ""}${opt.impact.H} พลังชีวิต</span>`;
                if (opt.impact.J) badgesHtml += `<span class="impact-badge badge-joy">${opt.impact.J > 0 ? "+" : ""}${opt.impact.J} ความสุข</span>`;
                if (opt.impact.S) badgesHtml += `<span class="impact-badge badge-skill">${opt.impact.S > 0 ? "+" : ""}${opt.impact.S} ฝีมือต่อสู้</span>`;
                if (opt.impact.C) badgesHtml += `<span class="impact-badge badge-conn">${opt.impact.C > 0 ? "+" : ""}${opt.impact.C} เส้นสายพรรคพวก</span>`;
                if (opt.impact.Beli) badgesHtml += `<span class="impact-badge badge-beli">${opt.impact.Beli > 0 ? "+" : ""}${opt.impact.Beli.toLocaleString()} เบรี</span>`;
                if (opt.impact.Bounty) badgesHtml += `<span class="impact-badge badge-bounty">${opt.impact.Bounty > 0 ? "+" : ""}${opt.impact.Bounty.toLocaleString()} ค่าหัว</span>`;
                if (opt.impact.K) badgesHtml += `<span class="impact-badge badge-karma">${opt.impact.K > 0 ? "+" : ""}${opt.impact.K} แต้มบุญ</span>`;
            }

            btn.innerHTML = `
                <div class="choice-text">${opt.text}</div>
                ${!canChoose ? `<div class="choice-req-warning">🔒 ${reqNotice}</div>` : ""}
                <div class="choice-impacts">${riskBadge}${badgesHtml}</div>
            `;

            btn.addEventListener("click", () => {
                chooseOption(opt);
            });

            optionsContainer.appendChild(btn);
        });
    }

    function chooseOption(opt) {
        window.soundEngine.playClick();

        // Risk Roll Check (โอกาสผิดพลาดและบทลงโทษ)
        if (opt.risk && Math.random() < opt.risk) {
            window.soundEngine.playDefeat();
            if (opt.failImpact) {
                if (opt.failImpact.H) Game.stats.H += opt.failImpact.H;
                if (opt.failImpact.J) Game.stats.J += opt.failImpact.J;
                if (opt.failImpact.S) Game.stats.S += opt.failImpact.S;
                if (opt.failImpact.C) Game.stats.C += opt.failImpact.C;
                if (opt.failImpact.Beli) Game.stats.Beli += opt.failImpact.Beli;
            }
            const penaltyMsg = opt.failText || 'การตัดสินใจผิดพลาดอย่างมหันต์และได้รับผลกระทบรุนแรง!';
            addLog('⚠️ [ล้มเหลว!] ' + penaltyMsg);
            alert('⚠️ การตัดสินใจผิดพลาด! ' + penaltyMsg);
            clampStats();
            updateDashboardUI();
            Game.age += 1;
            if (Game.age >= 60) Game.stats.H -= 2;
            setTimeout(() => { loadYearEvent(Game.age); }, 300);
            return;
        }

        // If Devil Fruit Chosen
        if (opt.fruitId && window.DEVIL_FRUITS_DATABASE[opt.fruitId]) {
            Game.fruit = window.DEVIL_FRUITS_DATABASE[opt.fruitId];
            window.soundEngine.playHaki();
        }

        // If Boss Battle
        if (opt.bossId) {
            startBossBattle(opt.bossId);
            return;
        }

        // Apply Impacts
        if (opt.impact) {
            if (opt.impact.H) Game.stats.H += opt.impact.H;
            if (opt.impact.J) Game.stats.J += opt.impact.J;
            if (opt.impact.S) Game.stats.S += opt.impact.S;
            if (opt.impact.C) Game.stats.C += opt.impact.C;
            if (opt.impact.Beli) Game.stats.Beli += opt.impact.Beli;
            if (opt.impact.Bounty) Game.stats.Bounty += opt.impact.Bounty;
            if (opt.impact.K) Game.stats.Karma += opt.impact.K;
        }

        if (opt.role) {
            Game.role = opt.role === "Pirate" ? "โจรสลัด (Pirate)" :
                        opt.role === "Marine" ? "ทหารเรือ (Marine)" :
                        opt.role === "Revolutionary" ? "คณะปฏิวัติ (Revolutionary)" : "นักล่าค่าหัว (Hunter)";
        }

        if (opt.unlocks === "has_heir") {
            Game.hasHeir = true;
        }

        if (opt.log) {
            addLog(opt.log);
        }

        clampStats();
        updateDashboardUI();

        Game.age += 1; // เล่นแบบปีต่อปี

        if (Game.age >= 60) {
            Game.stats.H -= 2;
        }

        setTimeout(() => {
            loadYearEvent(Game.age);
        }, 300);
    }

    // BOSS BATTLE WITH PIXEL ART CANVAS ENGINE
    function startBossBattle(bossId) {
        window.soundEngine.playHaki();
        const bossData = window.BOSS_DATABASE[bossId];
        if (!bossData) return;

        Game.currentBattle = {
            boss: { ...bossData, currentHp: bossData.maxHp },
            playerHp: Math.max(50, Game.stats.H * 4),
            playerMaxHp: Math.max(50, Game.stats.H * 4),
            hakiShield: false,
            turn: 1
        };

        const modal = document.getElementById("battleModalOverlay");
        modal.classList.remove("hidden");

        // Start Pixel Canvas Animation
        if (Game.pixelEngine) {
            Game.pixelEngine.start(bossData.scene || "eastblue", bossId, Game.fruit);
        }

        document.getElementById("battleTitle").textContent = `⚔️ BOSS BATTLE: ${bossData.name}`;
        document.getElementById("battleSub").textContent = bossData.title;
        document.getElementById("battleBossName").textContent = bossData.name;
        document.getElementById("battlePlayerName").textContent = Game.name;

        // Custom Special Move Button based on Fruit
        const specialBtn = document.getElementById("battleSpecialBtn");
        if (specialBtn) {
            if (Game.fruit && Game.fruit.moves && Game.fruit.moves.length > 0) {
                const move = Game.fruit.moves[1] || Game.fruit.moves[0];
                specialBtn.innerHTML = `<span>💥 ${move.name}</span><span class="battle-btn-sub">ท่าไม้ตาย ${Game.fruit.name} (x${move.dmgMult})</span>`;
            } else {
                specialBtn.innerHTML = `<span>💥 เพลงดาบผ่าสวรรค์</span><span class="battle-btn-sub">พลังทำลายล้าง x2</span>`;
            }
        }

        const logBox = document.getElementById("battleLogBox");
        logBox.innerHTML = `<div style="color: #ffd885;">${bossData.introText}</div>`;

        updateBattleUI();
    }

    function updateBattleUI() {
        const b = Game.currentBattle;
        if (!b) return;

        const bossPercent = Math.max(0, (b.boss.currentHp / b.boss.maxHp) * 100);
        document.getElementById("battleBossHpFill").style.width = `${bossPercent}%`;
        document.getElementById("battleBossHpText").textContent = `${Math.round(b.boss.currentHp)} / ${b.boss.maxHp}`;

        const playerPercent = Math.max(0, (b.playerHp / b.playerMaxHp) * 100);
        document.getElementById("battlePlayerHpFill").style.width = `${playerPercent}%`;
        document.getElementById("battlePlayerHpText").textContent = `${Math.round(b.playerHp)} / ${b.playerMaxHp}`;
    }

    function addBattleLog(msg) {
        const logBox = document.getElementById("battleLogBox");
        const row = document.createElement("div");
        row.innerHTML = msg;
        logBox.appendChild(row);
        logBox.scrollTop = logBox.scrollHeight;
    }

    function performBattleAction(actionType) {
        const b = Game.currentBattle;
        if (!b || b.boss.currentHp <= 0 || b.playerHp <= 0) return;

        let playerDmg = 0;
        let actionDesc = "";

        if (actionType === "atk") {
            window.soundEngine.playSlash();
            playerDmg = Math.round(Game.stats.S * 0.95 + Math.random() * 25);
            actionDesc = `🗡️ เจ้าโจมตีรวดเร็ว สร้างความเสียหาย <strong>${playerDmg}</strong> ดาเมจ!`;
            Game.pixelEngine?.triggerPlayerAttack("normal");
            Game.pixelEngine?.showDamageText(Game.pixelEngine.boss.x, Game.pixelEngine.boss.y, `-${playerDmg}`, "#f87171");

        } else if (actionType === "special") {
            window.soundEngine.playHaki();
            let mult = 2.0;
            let moveName = "เพลงดาบผ่ามิติ";
            if (Game.fruit && Game.fruit.moves) {
                const move = Game.fruit.moves[1] || Game.fruit.moves[0];
                mult = move.dmgMult;
                moveName = move.name;
            }
            playerDmg = Math.round(Game.stats.S * mult + Math.random() * 50);
            actionDesc = `💥 <strong>${moveName}!</strong> ปลดปล่อยพลังถล่มบอสอย่างจัง <strong>${playerDmg}</strong> ดาเมจ!!`;
            Game.pixelEngine?.triggerPlayerAttack("special");
            Game.pixelEngine?.showDamageText(Game.pixelEngine.boss.x, Game.pixelEngine.boss.y, `-${playerDmg} CRIT!`, "#f59e0b");

        } else if (actionType === "haki") {
            window.soundEngine.playHaki();
            b.hakiShield = true;
            playerDmg = Math.round(Game.stats.S * 0.7);
            actionDesc = `🛡️ เจ้าเคลือบฮาคิเกราะขั้นสูง! ลดความเสียหายในเทิร์นถัดไป 50% และกระแทกคลื่นฮาคิใส่ <strong>${playerDmg}</strong> ดาเมจ!`;
            Game.pixelEngine?.triggerPlayerAttack("haki");
            Game.pixelEngine?.showDamageText(Game.pixelEngine.boss.x, Game.pixelEngine.boss.y, `-${playerDmg}`, "#a855f7");

        } else if (actionType === "ally") {
            window.soundEngine.playVictory();
            const ally = Game.allies[Math.floor(Math.random() * Game.allies.length)];
            playerDmg = Math.round(Game.stats.S * 1.5 + Game.stats.C * 1.2);
            actionDesc = `🤝 <strong>พันธมิตรช่วยรบ!</strong> ${ally} พุ่งเข้ามาประสานการโจมตีสร้างความเสียหาย <strong>${playerDmg}</strong> ดาเมจ!`;
            Game.pixelEngine?.triggerPlayerAttack("special");
            Game.pixelEngine?.showDamageText(Game.pixelEngine.boss.x, Game.pixelEngine.boss.y, `-${playerDmg}`, "#38bdf8");

        } else if (actionType === "heal") {
            window.soundEngine.playCoin();
            const healAmt = Math.round(b.playerMaxHp * 0.35);
            b.playerHp = Math.min(b.playerMaxHp, b.playerHp + healAmt);
            actionDesc = `🍖 เจ้าซัดเนื้อย่างก้อนยักษ์ ฟื้นฟูเลือด <strong>+${healAmt} พลังชีวิต</strong>!`;
            Game.pixelEngine?.showDamageText(Game.pixelEngine.player.x, Game.pixelEngine.player.y, `+${healAmt} HP`, "#4ade80");
        }

        b.boss.currentHp = Math.max(0, b.boss.currentHp - playerDmg);
        addBattleLog(actionDesc);
        updateBattleUI();

        if (b.boss.currentHp <= 0) {
            handleBossVictory();
            return;
        }

        disableBattleButtons(true);
        setTimeout(() => {
            bossTurn();
            disableBattleButtons(false);
        }, 650);
    }

    function bossTurn() {
        const b = Game.currentBattle;
        if (!b || b.boss.currentHp <= 0) return;

        window.soundEngine.playHit();
        const skill = b.boss.skills[Math.floor(Math.random() * b.boss.skills.length)];
        let bossDmg = skill.dmg;

        if (b.hakiShield) {
            bossDmg = Math.round(bossDmg * 0.5);
            b.hakiShield = false;
            addBattleLog(`🛡️ ฮาคิเกราะของเจ้าช่วยลดทอนพลังโจมตีของบอสลงครึ่งหนึ่ง!`);
        }

        b.playerHp = Math.max(0, b.playerHp - bossDmg);
        addBattleLog(`👹 <strong>${b.boss.name}</strong> ใช้ท่า [${skill.name}]: ${skill.desc} เจ้าโดนดาเมจ <strong>-${bossDmg} พลังชีวิต</strong>!`);

        Game.pixelEngine?.triggerBossAttack(skill);
        Game.pixelEngine?.showDamageText(Game.pixelEngine.player.x, Game.pixelEngine.player.y, `-${bossDmg}`, "#ef4444");

        updateBattleUI();

        if (b.playerHp <= 0) {
            handlePlayerBattleLoss();
        }
    }

    function disableBattleButtons(disabled) {
        document.querySelectorAll(".battle-btn").forEach(btn => btn.disabled = disabled);
    }

    function handleBossVictory() {
        window.soundEngine.playVictory();
        const b = Game.currentBattle;
        addBattleLog(`<div style="color: #4caf50; font-weight: bold; font-size: 1.1rem; margin-top: 8px;">🎉 ชัยชนะอันยิ่งใหญ่! ${b.boss.defeatText}</div>`);

        Game.stats.Beli += b.boss.beliReward;
        Game.stats.Bounty += b.boss.bountyReward;
        Game.stats.Karma += b.boss.karmaReward;
        Game.stats.S += 30;
        Game.stats.J += 25;
        clampStats();

        addLog(`⚔️ เอาชนะ ${b.boss.name}! ได้รับรางวัลค่าหัว +฿${b.boss.bountyReward.toLocaleString()} และเงิน +฿${b.boss.beliReward.toLocaleString()} เบรี!`);

        setTimeout(() => {
            Game.pixelEngine?.stop();
            document.getElementById("battleModalOverlay").classList.add("hidden");
            Game.currentBattle = null;
            updateDashboardUI();

            Game.age += 1;
            loadYearEvent(Game.age);
        }, 2200);
    }

    function handlePlayerBattleLoss() {
        window.soundEngine.playDefeat();
        addBattleLog(`<div style="color: #ff3333; font-weight: bold; margin-top: 8px;">💀 เจ้าพ่ายแพ้ในศึกตัดสินอันดุเดือด... พลังชีวิตหมดสิ้น!</div>`);
        setTimeout(() => {
            Game.pixelEngine?.stop();
            document.getElementById("battleModalOverlay").classList.add("hidden");
            Game.currentBattle = null;
            Game.stats.H = 0;
            updateDashboardUI();
            triggerEndgame();
        }, 1800);
    }

    // ENDGAME & FUNERAL
    function triggerEndgame() {
        window.soundEngine.playDefeat();

        const title = calculateTitle();
        const percentile = calculatePercentile();

        document.getElementById("endgameTitle").textContent = `วาระสุดท้ายแห่งตำนาน: ${Game.name}`;
        document.getElementById("endgameTitleVal").textContent = title;
        document.getElementById("endgameAgeVal").textContent = `${Game.age} ปี`;
        document.getElementById("endgameBountyVal").textContent = `฿ ${Game.stats.Bounty.toLocaleString()}`;
        document.getElementById("endgameBeliVal").textContent = `฿ ${Game.stats.Beli.toLocaleString()}`;
        document.getElementById("endgameKarmaVal").textContent = `${Game.stats.Karma} แต้มบุญ`;
        document.getElementById("endgamePercentileVal").textContent = `Top ${percentile}% ของโลก`;

        document.getElementById("endgameEpitaph").textContent = 
            `“ผู้คนต่างกล่าวขานว่า... ชายผู้มีนามว่า ${Game.name} ${Game.fruit ? `ผู้ครอบครองพลังของ ${Game.fruit.name}` : ''} ได้ใช้ชีวิตอย่างสมเกียรติและกลายเป็นตำนานแห่งท้องทะเลตลอดกาล!”`;

        const heirCard = document.getElementById("rebirthCardHeir");
        const heirBtn = document.getElementById("rebirthHeirBtn");
        if (Game.hasHeir) {
            heirCard.classList.remove("locked");
            heirBtn.disabled = false;
            heirBtn.textContent = `👶 สืบทอดรุ่นลูก (รับมรดก ฿${Math.round(Game.stats.Beli * 0.7).toLocaleString()} เบรี)`;
        } else {
            heirCard.classList.add("locked");
            heirBtn.disabled = true;
            heirBtn.textContent = `🔒 ต้องแต่งงานมีลูกก่อน (อายุ 32 ปี)`;
        }

        document.getElementById("endgameModalOverlay").classList.remove("hidden");
    }

    function calculateTitle() {
        const s = Game.stats;
        if (s.Bounty >= 3000000000 && s.S >= 350) return "ราชาโจรสลัดผู้พิชิตโลก (Pirate King)";
        if (s.Bounty >= 2000000000 && s.S >= 320) return "4 จักรพรรดิแห่งท้องทะเล (Four Emperors Yonko)";
        if (Game.role.includes("Marine") && s.S >= 320) return "จอมพลเรือผู้ผดุงความยุติธรรมสูงสุด (Fleet Admiral)";
        if (Game.role.includes("Marine") && s.S >= 250) return "พลเรือเอกแห่งกองทัพเรือ (Marine Admiral)";
        if (Game.role.includes("Revolutionary") && s.Karma >= 200) return "วีรบุรุษผู้ปลดปล่อยโลก (Hero of Liberation)";
        if (Game.role.includes("Revolutionary") && s.S >= 280) return "เสนาธิการใหญ่คณะปฏิวัติ (Chief of Staff)";
        if (s.Beli >= 500000000) return "มหาเศรษฐีผู้กุมเศรษฐกิจมหาสมุทร (Ocean Tycoon)";
        if (s.Beli >= 100000000) return "ราชาตลาดมืดใต้ดิน (Underworld Kingpin)";
        if (s.S >= 320) return "นักรบไร้พ่ายแห่งท้องทะเล (Undefeated Warrior)";
        if (s.S >= 220) return "ยอดนักดาบอันดับหนึ่งแห่งปฐพี (Greatest Swordsman)";
        if (s.J >= 85) return "ผู้มีชีวิตที่เป็นอิสระที่สุดในโลก (Freest Soul on the Seas)";
        if (s.Karma >= 250) return "พระเจ้าผู้กอบกู้โลก (Savior of the World)";
        if (s.Karma <= -50) return "จอมวายร้ายไร้ความปรานี (Calamity of the Seas)";
        if (s.C >= 150) return "ผู้บัญชาการมหากองเรือพันธมิตร (Grand Fleet Commander)";
        return "ตำนานผู้มีชีวิตแห่งแกรนด์ไลน์ (Living Grand Line Legend)";
    }

    function calculatePercentile() {
        const score = (Game.stats.S * 0.4) + (Game.stats.J * 0.3) + (Game.stats.Karma * 0.3) + (Game.stats.Bounty / 50000000);
        if (score >= 400) return "0.01";
        if (score >= 250) return "0.5";
        if (score >= 150) return "2.5";
        if (score >= 80) return "10";
        return "35";
    }

    // REBIRTH LOGIC
    function handleRebirth(mode) {
        window.soundEngine.playCoin();
        document.getElementById("endgameModalOverlay").classList.add("hidden");
        document.getElementById("gameDashboard").classList.add("hidden");
        document.getElementById("rouletteSection").classList.remove("hidden");

        if (mode === "heir") {
            Game.reincarnationBonus.isHeirMode = true;
            Game.reincarnationBonus.legacyBeli = Math.round(Game.stats.Beli * 0.7);
            Game.reincarnationBonus.useKBonus = false;

            const parts = Game.name.split(" ");
            const surname = parts.length > 1 ? parts.slice(0, -1).join(" ") : parts[0];
            const randomChildNames = ["เอซ", "ลูอิส", "โซเฟีย", "ไคโตะ", "เรย์", "มารีน", "ดอว์น"];
            const childName = `${surname} ${randomChildNames[Math.floor(Math.random() * randomChildNames.length)]}`;
            document.getElementById("charNameInput").value = childName;

            alert(`👶 เจ้าเริ่มชีวิตใหม่ในฐานะรุ่นลูก: "${childName}" พร้อมรับมรดกเงินเบรี 70% และสายเลือดเดิม!`);
        } else if (mode === "karma") {
            Game.reincarnationBonus.useKBonus = true;
            Game.reincarnationBonus.legacyBeli = 0;
            Game.reincarnationBonus.isHeirMode = false;
            alert(`🌟 แต้มบุญ K ทำงาน! ในการหมุนรอบนี้ เจ้ามีโอกาสสูงมากที่จะสุ่มได้ตระกูล D, ฮาคิราชันย์ และเกิดในตระกูลสูง!`);
        } else {
            Game.reincarnationBonus.useKBonus = false;
            Game.reincarnationBonus.legacyBeli = 0;
            Game.reincarnationBonus.isHeirMode = false;
        }

        spinAllSlots();
    }

    window.OnePieceLifeGame = Game;
})();
