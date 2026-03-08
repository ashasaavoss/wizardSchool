// Character Creator for Wizarding School
// Manages UI state and character configuration

// ── Asset Definitions ──
// These define the available options, filtered for wizarding-school appropriateness.
// Each option maps to a path structure in the LPC spritesheet repo.

const BODY_TYPES = [
    { id: 'male', label: 'Male' },
    { id: 'female', label: 'Female' },
    { id: 'muscular', label: 'Muscular' },
    { id: 'teen', label: 'Teen' },
    { id: 'child', label: 'Child' },
];

const SKIN_COLORS = [
    { id: 'light', label: 'Light' },
    { id: 'amber', label: 'Amber' },
    { id: 'olive', label: 'Olive' },
    { id: 'bronze', label: 'Bronze' },
    { id: 'brown', label: 'Brown' },
    { id: 'black', label: 'Dark' },
    { id: 'taupe', label: 'Taupe' },
    { id: 'lavender', label: 'Lavender' },
];

// Hair styles. 'layered' means the asset uses bg/fg sublayers.
const HAIR_STYLES = [
    { id: 'none', label: 'None' },
    { id: 'plain', label: 'Plain' },
    { id: 'bangs', label: 'Bangs' },
    { id: 'bangslong', label: 'Long Bangs' },
    { id: 'bangsshort', label: 'Short Bangs' },
    { id: 'bob', label: 'Bob' },
    { id: 'bunches', label: 'Bunches', layered: true },
    { id: 'buzzcut', label: 'Buzzcut' },
    { id: 'curly_long', label: 'Curly Long' },
    { id: 'curly_short', label: 'Curly Short' },
    { id: 'halfmessy', label: 'Half Messy' },
    { id: 'long', label: 'Long' },
    { id: 'long_messy', label: 'Long Messy' },
    { id: 'long_straight', label: 'Long Straight' },
    { id: 'long_tied', label: 'Long Tied', layered: true },
    { id: 'loose', label: 'Loose' },
    { id: 'messy1', label: 'Messy' },
    { id: 'natural', label: 'Natural' },
    { id: 'page', label: 'Page' },
    { id: 'parted', label: 'Parted' },
    { id: 'pigtails', label: 'Pigtails' },
    { id: 'pixie', label: 'Pixie' },
    { id: 'ponytail', label: 'Ponytail', layered: true },
    { id: 'ponytail2', label: 'High Ponytail', layered: true },
    { id: 'princess', label: 'Princess', layered: true },
    { id: 'shoulderl', label: 'Shoulder (Left)', layered: true },
    { id: 'shoulderr', label: 'Shoulder (Right)', layered: true },
    { id: 'spiked', label: 'Spiked' },
    { id: 'swoop', label: 'Swoop' },
    { id: 'unkempt', label: 'Unkempt' },
];

const HAIR_COLORS = [
    { id: 'black', label: 'Black' },
    { id: 'dark_brown', label: 'Dark Brown' },
    { id: 'chestnut', label: 'Chestnut' },
    { id: 'light_brown', label: 'Light Brown' },
    { id: 'blonde', label: 'Blonde' },
    { id: 'sandy', label: 'Sandy' },
    { id: 'platinum', label: 'Platinum' },
    { id: 'white', label: 'White' },
    { id: 'ginger', label: 'Ginger' },
    { id: 'redhead', label: 'Redhead' },
    { id: 'strawberry', label: 'Strawberry' },
    { id: 'raven', label: 'Raven' },
    { id: 'gray', label: 'Gray' },
    { id: 'blue', label: 'Blue' },
    { id: 'green', label: 'Green' },
    { id: 'purple', label: 'Purple' },
    { id: 'pink', label: 'Pink' },
    { id: 'violet', label: 'Violet' },
];

// Wizard-appropriate tops (robes, longsleeves, tunics)
const TOPS = [
    { id: 'none', label: 'None', path: null },
    { id: 'longsleeve', label: 'Longsleeve Shirt', basePath: 'torso/clothes/longsleeve/longsleeve' },
    { id: 'longsleeve2', label: 'Longsleeve Tunic', basePath: 'torso/clothes/longsleeve/longsleeve2' },
    { id: 'longsleeve2_buttoned', label: 'Buttoned Tunic', basePath: 'torso/clothes/longsleeve/longsleeve2_buttoned' },
    { id: 'scoop', label: 'Scoop Neck Robe', basePath: 'torso/clothes/longsleeve/longsleeve2_scoop' },
    { id: 'vest', label: 'Vest', basePath: 'torso/clothes/longsleeve/longsleeve2_cardigan' },
];

const TOP_COLORS = [
    { id: 'black', label: 'Black' },
    { id: 'navy', label: 'Navy' },
    { id: 'maroon', label: 'Maroon' },
    { id: 'purple', label: 'Purple' },
    { id: 'forest', label: 'Forest Green' },
    { id: 'brown', label: 'Brown' },
    { id: 'gray', label: 'Gray' },
    { id: 'charcoal', label: 'Charcoal' },
    { id: 'blue', label: 'Blue' },
    { id: 'green', label: 'Green' },
    { id: 'red', label: 'Red' },
    { id: 'teal', label: 'Teal' },
    { id: 'white', label: 'White' },
    { id: 'slate', label: 'Slate' },
    { id: 'lavender', label: 'Lavender' },
    { id: 'rose', label: 'Rose' },
];

const LEGS = [
    { id: 'none', label: 'None', path: null },
    { id: 'pants', label: 'Pants', basePath: 'legs/pants' },
    { id: 'leggings', label: 'Leggings', basePath: 'legs/leggings' },
    { id: 'skirts', label: 'Skirt', basePath: 'legs/skirts/plain' },
    { id: 'formal', label: 'Formal', basePath: 'legs/formal' },
];

const LEG_COLORS = [
    { id: 'black', label: 'Black' },
    { id: 'navy', label: 'Navy' },
    { id: 'charcoal', label: 'Charcoal' },
    { id: 'brown', label: 'Brown' },
    { id: 'gray', label: 'Gray' },
    { id: 'maroon', label: 'Maroon' },
    { id: 'forest', label: 'Forest Green' },
    { id: 'white', label: 'White' },
    { id: 'blue', label: 'Blue' },
    { id: 'slate', label: 'Slate' },
    { id: 'tan', label: 'Tan' },
];

const FOOTWEAR = [
    { id: 'none', label: 'None (Barefoot)', path: null },
    { id: 'shoes', label: 'Shoes', basePath: 'feet/shoes/basic' },
    { id: 'boots', label: 'Boots', basePath: 'feet/boots/basic' },
    { id: 'slippers', label: 'Slippers', basePath: 'feet/slippers' },
];

const SHOE_COLORS = [
    { id: 'black', label: 'Black' },
    { id: 'brown', label: 'Brown' },
    { id: 'leather', label: 'Leather' },
    { id: 'walnut', label: 'Walnut' },
    { id: 'gray', label: 'Gray' },
    { id: 'maroon', label: 'Maroon' },
    { id: 'navy', label: 'Navy' },
    { id: 'white', label: 'White' },
    { id: 'tan', label: 'Tan' },
];

// Wizard hats and headwear
const HEADWEAR = [
    { id: 'none', label: 'None', path: null },
    { id: 'wizard', label: 'Wizard Hat', basePath: 'hat/magic/wizard/base' },
    { id: 'celestial', label: 'Celestial Hat', basePath: 'hat/magic/celestial' },
    { id: 'headband', label: 'Headband', basePath: 'hat/headband/thick' },
    { id: 'hood_cloth', label: 'Hood', basePath: 'hat/cloth/hood' },
];

const HAT_COLORS = [
    { id: 'black', label: 'Black' },
    { id: 'navy', label: 'Navy' },
    { id: 'purple', label: 'Purple' },
    { id: 'maroon', label: 'Maroon' },
    { id: 'forest', label: 'Forest Green' },
    { id: 'brown', label: 'Brown' },
    { id: 'blue', label: 'Blue' },
    { id: 'red', label: 'Red' },
    { id: 'gray', label: 'Gray' },
    { id: 'white', label: 'White' },
];

// Capes - very wizardly!
const CAPES = [
    { id: 'none', label: 'None', path: null },
    { id: 'solid', label: 'Solid Cape', basePath: 'cape/solid' },
    { id: 'tattered', label: 'Tattered Cape', basePath: 'cape/tattered' },
];

const CAPE_COLORS = [
    { id: 'black', label: 'Black' },
    { id: 'navy', label: 'Navy' },
    { id: 'purple', label: 'Purple' },
    { id: 'maroon', label: 'Maroon' },
    { id: 'forest', label: 'Forest Green' },
    { id: 'red', label: 'Red' },
    { id: 'blue', label: 'Blue' },
    { id: 'gray', label: 'Gray' },
    { id: 'white', label: 'White' },
];

// ── Character State ──

const characterState = {
    name: '',
    bodyType: 'male',
    skinColor: 'light',
    hairStyle: 'plain',
    hairColor: 'dark_brown',
    top: 'longsleeve',
    topColor: 'navy',
    legs: 'pants',
    legColor: 'charcoal',
    footwear: 'boots',
    shoeColor: 'brown',
    headwear: 'none',
    hatColor: 'purple',
    cape: 'none',
    capeColor: 'navy',
};

let renderer = null;

// ── Layer Building ──

function buildLayers() {
    const layers = [];
    const bt = characterState.bodyType;

    // Helper: standard path pattern {basePath}/{bodyType}/{anim}/{color}.png
    const stdUrl = (basePath, bodyType, color) => (anim) =>
        `${ASSET_BASE}/${basePath}/${bodyType}/${anim}/${color}.png`;

    // Helper: no-bodytype pattern {basePath}/{anim}/{color}.png
    const noBtUrl = (basePath, color) => (anim) =>
        `${ASSET_BASE}/${basePath}/${anim}/${color}.png`;

    // Map body type to head/face type
    const headTypeMap = { male: 'male', female: 'female', muscular: 'male', teen: 'male', child: 'child' };
    const faceTypeMap = { male: 'male', female: 'female', muscular: 'male', teen: 'male', child: 'male' };
    const headType = headTypeMap[bt] || 'male';
    const faceType = faceTypeMap[bt] || 'male';

    // 1. Body (z: 10) — body/bodies/{bodyType}/{anim}/{skinColor}.png
    layers.push({
        id: 'body',
        urlBuilder: stdUrl('body/bodies', bt, characterState.skinColor),
        zIndex: 10,
    });

    // 1b. Head (z: 15) — head/heads/human/{headType}/{anim}/{skinColor}.png
    layers.push({
        id: 'head',
        urlBuilder: stdUrl('head/heads/human', headType, characterState.skinColor),
        zIndex: 15,
    });

    // 1c. Face expression (z: 16) — head/faces/{faceType}/neutral/{anim}.png
    layers.push({
        id: 'face',
        urlBuilder: (anim) => `${ASSET_BASE}/head/faces/${faceType}/neutral/${anim}.png`,
        zIndex: 16,
    });

    // 2. Legs (z: 20) — {basePath}/{bodyType}/{anim}/{color}.png
    if (characterState.legs !== 'none') {
        const legDef = LEGS.find(l => l.id === characterState.legs);
        if (legDef?.basePath) {
            layers.push({
                id: 'legs',
                urlBuilder: stdUrl(legDef.basePath, bt, characterState.legColor),
                zIndex: 20,
            });
        }
    }

    // 3. Footwear (z: 25) — {basePath}/{bodyType}/{anim}/{color}.png
    if (characterState.footwear !== 'none') {
        const footDef = FOOTWEAR.find(f => f.id === characterState.footwear);
        if (footDef?.basePath) {
            layers.push({
                id: 'footwear',
                urlBuilder: stdUrl(footDef.basePath, bt, characterState.shoeColor),
                zIndex: 25,
            });
        }
    }

    // 4. Top (z: 30) — {basePath}/{bodyType}/{anim}/{color}.png
    if (characterState.top !== 'none') {
        const topDef = TOPS.find(t => t.id === characterState.top);
        if (topDef?.basePath) {
            layers.push({
                id: 'top',
                urlBuilder: stdUrl(topDef.basePath, bt, characterState.topColor),
                zIndex: 30,
            });
        }
    }

    // 5. Cape behind (z: 5) — cape/{type}_behind/{anim}/{color}.png (no body type)
    if (characterState.cape !== 'none') {
        const capeDef = CAPES.find(c => c.id === characterState.cape);
        if (capeDef?.basePath) {
            layers.push({
                id: 'cape',
                urlBuilder: noBtUrl(capeDef.basePath + '_behind', characterState.capeColor),
                zIndex: 5,
            });
        }
    }

    // 6. Hair (z: 40)
    if (characterState.hairStyle !== 'none') {
        const hairDef = HAIR_STYLES.find(h => h.id === characterState.hairStyle);
        if (hairDef?.layered) {
            // Layered hair: bg behind body (z: 8), fg in front (z: 40)
            layers.push({
                id: 'hair_bg',
                urlBuilder: noBtUrl(`hair/${characterState.hairStyle}/adult/bg`, characterState.hairColor),
                zIndex: 8,
            });
            layers.push({
                id: 'hair_fg',
                urlBuilder: noBtUrl(`hair/${characterState.hairStyle}/adult/fg`, characterState.hairColor),
                zIndex: 40,
            });
        } else {
            // Simple hair: single layer
            layers.push({
                id: 'hair',
                urlBuilder: noBtUrl(`hair/${characterState.hairStyle}/adult`, characterState.hairColor),
                zIndex: 40,
            });
        }
    }

    // 7. Headwear (z: 50) — {basePath}/adult/{anim}/{color}.png
    if (characterState.headwear !== 'none') {
        const hatDef = HEADWEAR.find(h => h.id === characterState.headwear);
        if (hatDef?.basePath) {
            layers.push({
                id: 'headwear',
                urlBuilder: stdUrl(hatDef.basePath, 'adult', characterState.hatColor),
                zIndex: 50,
            });
        }
    }

    return layers;
}

// ── UI Rendering ──

function populateSelect(selectId, options, currentValue) {
    const select = document.getElementById(selectId);
    if (!select) return;
    select.innerHTML = '';
    for (const opt of options) {
        const el = document.createElement('option');
        el.value = opt.id;
        el.textContent = opt.label;
        if (opt.id === currentValue) el.selected = true;
        select.appendChild(el);
    }
}

function initUI() {
    populateSelect('body-type', BODY_TYPES, characterState.bodyType);
    populateSelect('skin-color', SKIN_COLORS, characterState.skinColor);
    populateSelect('hair-style', HAIR_STYLES, characterState.hairStyle);
    populateSelect('hair-color', HAIR_COLORS, characterState.hairColor);
    populateSelect('top-style', TOPS, characterState.top);
    populateSelect('top-color', TOP_COLORS, characterState.topColor);
    populateSelect('leg-style', LEGS, characterState.legs);
    populateSelect('leg-color', LEG_COLORS, characterState.legColor);
    populateSelect('footwear-style', FOOTWEAR, characterState.footwear);
    populateSelect('shoe-color', SHOE_COLORS, characterState.shoeColor);
    populateSelect('headwear-style', HEADWEAR, characterState.headwear);
    populateSelect('hat-color', HAT_COLORS, characterState.hatColor);
    populateSelect('cape-style', CAPES, characterState.cape);
    populateSelect('cape-color', CAPE_COLORS, characterState.capeColor);

    // Set name field
    const nameInput = document.getElementById('char-name');
    if (nameInput) nameInput.value = characterState.name;

    updateColorVisibility();
}

function updateColorVisibility() {
    // Hide color selectors when "none" is selected for a category
    toggleColorRow('hair-color-row', characterState.hairStyle !== 'none');
    toggleColorRow('top-color-row', characterState.top !== 'none');
    toggleColorRow('leg-color-row', characterState.legs !== 'none');
    toggleColorRow('shoe-color-row', characterState.footwear !== 'none');
    toggleColorRow('hat-color-row', characterState.headwear !== 'none');
    toggleColorRow('cape-color-row', characterState.cape !== 'none');
}

function toggleColorRow(rowId, visible) {
    const row = document.getElementById(rowId);
    if (row) row.style.display = visible ? '' : 'none';
}

function bindEvents() {
    const bindings = {
        'char-name': (v) => characterState.name = v,
        'body-type': (v) => characterState.bodyType = v,
        'skin-color': (v) => characterState.skinColor = v,
        'hair-style': (v) => characterState.hairStyle = v,
        'hair-color': (v) => characterState.hairColor = v,
        'top-style': (v) => characterState.top = v,
        'top-color': (v) => characterState.topColor = v,
        'leg-style': (v) => characterState.legs = v,
        'leg-color': (v) => characterState.legColor = v,
        'footwear-style': (v) => characterState.footwear = v,
        'shoe-color': (v) => characterState.shoeColor = v,
        'headwear-style': (v) => characterState.headwear = v,
        'hat-color': (v) => characterState.hatColor = v,
        'cape-style': (v) => characterState.cape = v,
        'cape-color': (v) => characterState.capeColor = v,
    };

    for (const [id, setter] of Object.entries(bindings)) {
        const el = document.getElementById(id);
        if (!el) continue;
        const event = el.tagName === 'INPUT' ? 'input' : 'change';
        el.addEventListener(event, (e) => {
            setter(e.target.value);
            updateColorVisibility();
            refreshPreview();
        });
    }

    // Animation control buttons
    document.getElementById('btn-idle')?.addEventListener('click', () => {
        renderer.stopAnimation();
    });
    document.getElementById('btn-walk')?.addEventListener('click', () => {
        renderer.startAnimation('walk', 'down');
    });
    document.getElementById('btn-spellcast')?.addEventListener('click', () => {
        renderer.startAnimation('spellcast', 'down');
    });

    // Direction buttons
    document.getElementById('btn-up')?.addEventListener('click', () => renderer.setDirection('up'));
    document.getElementById('btn-down')?.addEventListener('click', () => renderer.setDirection('down'));
    document.getElementById('btn-left')?.addEventListener('click', () => renderer.setDirection('left'));
    document.getElementById('btn-right')?.addEventListener('click', () => renderer.setDirection('right'));

    // Randomize button
    document.getElementById('btn-randomize')?.addEventListener('click', randomizeCharacter);

    // Confirm button
    document.getElementById('btn-confirm')?.addEventListener('click', confirmCharacter);
}

function refreshPreview() {
    if (!renderer) return;
    const layers = buildLayers();
    renderer.setLayers(layers);

    // Update name display
    const nameDisplay = document.getElementById('name-display');
    if (nameDisplay) {
        nameDisplay.textContent = characterState.name || '';
    }
}

function randomizeCharacter() {
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)].id;

    characterState.bodyType = pick(BODY_TYPES);
    characterState.skinColor = pick(SKIN_COLORS);
    characterState.hairStyle = pick(HAIR_STYLES.filter(h => h.id !== 'none'));
    characterState.hairColor = pick(HAIR_COLORS);
    characterState.top = pick(TOPS.filter(t => t.id !== 'none'));
    characterState.topColor = pick(TOP_COLORS);
    characterState.legs = pick(LEGS.filter(l => l.id !== 'none'));
    characterState.legColor = pick(LEG_COLORS);
    characterState.footwear = pick(FOOTWEAR.filter(f => f.id !== 'none'));
    characterState.shoeColor = pick(SHOE_COLORS);

    // 50% chance of headwear
    characterState.headwear = Math.random() > 0.5
        ? pick(HEADWEAR.filter(h => h.id !== 'none'))
        : 'none';
    characterState.hatColor = pick(HAT_COLORS);

    // 30% chance of cape
    characterState.cape = Math.random() > 0.7
        ? pick(CAPES.filter(c => c.id !== 'none'))
        : 'none';
    characterState.capeColor = pick(CAPE_COLORS);

    // Random wizard name
    const firstNames = [
        'Alaric', 'Bramwell', 'Celestine', 'Daphne', 'Elwin', 'Fern',
        'Gideon', 'Hazel', 'Isolde', 'Jasper', 'Kira', 'Lysander',
        'Morgana', 'Neville', 'Orla', 'Percival', 'Quinn', 'Rowena',
        'Silas', 'Thalia', 'Ursula', 'Vesper', 'Wren', 'Xander',
        'Yara', 'Zephyr',
    ];
    const lastNames = [
        'Ashwood', 'Blackthorn', 'Crowley', 'Duskhollow', 'Emberstone',
        'Foxglove', 'Grimshaw', 'Hawthorne', 'Ironbark', 'Juniper',
        'Kettleburn', 'Larkspire', 'Moonwhisper', 'Nightshade', 'Oakenstaff',
        'Pendleton', 'Quicksilver', 'Ravenwood', 'Stormweaver', 'Thornwick',
        'Underhill', 'Valewind', 'Willowmere', 'Yarrow', 'Zephyrcrest',
    ];
    const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
    const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
    characterState.name = `${fn} ${ln}`;

    initUI();
    refreshPreview();
}

function confirmCharacter() {
    if (!characterState.name.trim()) {
        const nameInput = document.getElementById('char-name');
        nameInput?.focus();
        nameInput?.classList.add('input-error');
        setTimeout(() => nameInput?.classList.remove('input-error'), 1500);
        return;
    }

    // Store character data for the game
    const characterData = { ...characterState };
    localStorage.setItem('wizardSchool_character', JSON.stringify(characterData));

    // Show confirmation
    const confirmPanel = document.getElementById('confirm-panel');
    if (confirmPanel) {
        confirmPanel.innerHTML = `
            <div class="confirm-message">
                <h2>${characterState.name}</h2>
                <p>Your wizard is ready for adventure!</p>
                <p class="confirm-sub">Character saved. The journey begins soon...</p>
            </div>
        `;
        confirmPanel.style.display = 'flex';
    }
}

// ── Initialization ──

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('sprite-preview');
    if (!canvas) return;

    renderer = new SpriteRenderer(canvas);
    initUI();
    bindEvents();
    refreshPreview();

    // Start with a gentle walk animation
    setTimeout(() => {
        renderer.startAnimation('walk', 'down');
    }, 500);
});
