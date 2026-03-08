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
    { id: 'afro', label: 'Afro' },
    { id: 'balding', label: 'Balding' },
    { id: 'bangs', label: 'Bangs' },
    { id: 'bangs_bun', label: 'Bangs Bun', layered: true },
    { id: 'bangslong', label: 'Long Bangs' },
    { id: 'bangslong2', label: 'Long Bangs 2' },
    { id: 'bangsshort', label: 'Short Bangs' },
    { id: 'bedhead', label: 'Bedhead' },
    { id: 'bob', label: 'Bob' },
    { id: 'bob_side_part', label: 'Bob Side Part' },
    { id: 'braid', label: 'Braid', layered: true },
    { id: 'braid2', label: 'Braid 2', layered: true },
    { id: 'bunches', label: 'Bunches', layered: true },
    { id: 'buzzcut', label: 'Buzzcut' },
    { id: 'cornrows', label: 'Cornrows' },
    { id: 'cowlick', label: 'Cowlick' },
    { id: 'cowlick_tall', label: 'Tall Cowlick' },
    { id: 'curls_large', label: 'Large Curls' },
    { id: 'curls_large_xlong', label: 'Extra Long Curls', layered: true },
    { id: 'curly_long', label: 'Curly Long' },
    { id: 'curly_short', label: 'Curly Short' },
    { id: 'curly_short2', label: 'Curly Short 2' },
    { id: 'curtains', label: 'Curtains' },
    { id: 'curtains_long', label: 'Long Curtains', layered: true },
    { id: 'dreadlocks_long', label: 'Long Dreadlocks', layered: true },
    { id: 'dreadlocks_short', label: 'Short Dreadlocks' },
    { id: 'extensions', label: 'Extensions', layered: true },
    { id: 'flat_top_fade', label: 'Flat Top Fade' },
    { id: 'flat_top_straight', label: 'Flat Top Straight' },
    { id: 'half_up', label: 'Half Up', layered: true },
    { id: 'halfmessy', label: 'Half Messy' },
    { id: 'high_and_tight', label: 'High & Tight' },
    { id: 'high_ponytail', label: 'High Ponytail', layered: true },
    { id: 'idol', label: 'Idol' },
    { id: 'jewfro', label: 'Jewfro' },
    { id: 'lob', label: 'Lob' },
    { id: 'long', label: 'Long' },
    { id: 'long_band', label: 'Long Band', layered: true },
    { id: 'long_center_part', label: 'Long Center Part', layered: true },
    { id: 'long_messy', label: 'Long Messy' },
    { id: 'long_messy2', label: 'Long Messy 2' },
    { id: 'long_straight', label: 'Long Straight' },
    { id: 'long_tied', label: 'Long Tied', layered: true },
    { id: 'longhawk', label: 'Longhawk' },
    { id: 'loose', label: 'Loose' },
    { id: 'messy1', label: 'Messy' },
    { id: 'messy2', label: 'Messy 2' },
    { id: 'messy3', label: 'Messy 3' },
    { id: 'mop', label: 'Mop' },
    { id: 'natural', label: 'Natural' },
    { id: 'page', label: 'Page' },
    { id: 'page2', label: 'Page 2' },
    { id: 'parted', label: 'Parted' },
    { id: 'parted2', label: 'Parted 2' },
    { id: 'parted3', label: 'Parted 3' },
    { id: 'parted_side_bangs', label: 'Parted Side Bangs' },
    { id: 'parted_side_bangs2', label: 'Parted Side Bangs 2' },
    { id: 'pigtails', label: 'Pigtails' },
    { id: 'pigtails_bangs', label: 'Pigtails w/ Bangs', layered: true },
    { id: 'pixie', label: 'Pixie' },
    { id: 'plain', label: 'Plain' },
    { id: 'ponytail', label: 'Ponytail', layered: true },
    { id: 'ponytail2', label: 'High Ponytail 2', layered: true },
    { id: 'princess', label: 'Princess', layered: true },
    { id: 'sara', label: 'Sara', layered: true },
    { id: 'shorthawk', label: 'Short Hawk' },
    { id: 'shoulderl', label: 'Shoulder (Left)', layered: true },
    { id: 'shoulderr', label: 'Shoulder (Right)', layered: true },
    { id: 'single', label: 'Single' },
    { id: 'spiked', label: 'Spiked' },
    { id: 'spiked2', label: 'Spiked 2' },
    { id: 'spiked_liberty', label: 'Liberty Spikes' },
    { id: 'swoop', label: 'Swoop' },
    { id: 'swoop_side', label: 'Swoop Side' },
    { id: 'twists_fade', label: 'Twists Fade' },
    { id: 'twists_straight', label: 'Twists Straight' },
    { id: 'unkempt', label: 'Unkempt' },
    { id: 'wavy', label: 'Wavy' },
    { id: 'xlong', label: 'Extra Long', layered: true },
    { id: 'xlong_wavy', label: 'Extra Long Wavy', layered: true },
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
    { id: 'celestial_moon', label: 'Moon & Stars Hat', basePath: 'hat/magic/celestial_moon' },
    { id: 'large_magic', label: 'Large Wizard Hat', basePath: 'hat/magic/large' },
    { id: 'headband', label: 'Headband', basePath: 'hat/headband/thick' },
    { id: 'hood_cloth', label: 'Hood', basePath: 'hat/cloth/hood' },
    { id: 'hood_sack', label: 'Sack Hood', basePath: 'hat/cloth/hood_sack' },
    { id: 'bandana', label: 'Bandana', basePath: 'hat/cloth/bandana' },
    { id: 'bandana2', label: 'Bandana 2', basePath: 'hat/cloth/bandana2' },
    { id: 'leather_cap', label: 'Leather Cap', basePath: 'hat/cloth/leather_cap' },
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
    { id: 'trim', label: 'Trimmed Cape', basePath: 'cape/trim' },
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

// Ears
const EARS = [
    { id: 'none', label: 'None (Human)', path: null },
    { id: 'elven', label: 'Elven' },
    { id: 'big', label: 'Big' },
    { id: 'long', label: 'Long' },
    { id: 'cat', label: 'Cat' },
    { id: 'dragon', label: 'Dragon' },
    { id: 'wolf', label: 'Wolf' },
    { id: 'medium', label: 'Medium' },
    { id: 'down', label: 'Floppy' },
];

// Noses
const NOSES = [
    { id: 'none', label: 'Default' },
    { id: 'button', label: 'Button' },
    { id: 'big', label: 'Big' },
    { id: 'straight', label: 'Straight' },
    { id: 'large', label: 'Large' },
];

// Facial hair
const FACIAL_HAIR = [
    { id: 'none', label: 'None', path: null },
    { id: 'beard_basic', label: 'Basic Beard', basePath: 'beards/beard/basic' },
    { id: 'beard_trimmed', label: 'Trimmed Beard', basePath: 'beards/beard/trimmed' },
    { id: 'beard_medium', label: 'Medium Beard', basePath: 'beards/beard/medium' },
    { id: 'beard_winter', label: 'Winter Beard', basePath: 'beards/beard/winter' },
    { id: 'beard_5oclock', label: '5 O\'Clock Shadow', basePath: 'beards/beard/5oclock_shadow' },
    { id: 'mustache_basic', label: 'Mustache', basePath: 'beards/mustache/basic' },
    { id: 'mustache_handlebar', label: 'Handlebar', basePath: 'beards/mustache/handlebar' },
    { id: 'mustache_walrus', label: 'Walrus', basePath: 'beards/mustache/walrus' },
    { id: 'mustache_french', label: 'French', basePath: 'beards/mustache/french' },
    { id: 'mustache_bigstache', label: 'Big Stache', basePath: 'beards/mustache/bigstache' },
    { id: 'mustache_horseshoe', label: 'Horseshoe', basePath: 'beards/mustache/horseshoe' },
];

const FACIAL_HAIR_COLORS = [
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
    { id: 'gray', label: 'Gray' },
    { id: 'raven', label: 'Raven' },
];

// Glasses & face accessories
const GLASSES = [
    { id: 'none', label: 'None', path: null },
    { id: 'round', label: 'Round Glasses' },
    { id: 'halfmoon', label: 'Half-Moon Glasses' },
    { id: 'nerd', label: 'Thick Frames' },
    { id: 'secretary', label: 'Secretary' },
    { id: 'shades', label: 'Shades' },
    { id: 'sunglasses', label: 'Sunglasses' },
];

// Earrings
const EARRINGS = [
    { id: 'none', label: 'None', path: null },
    { id: 'simple', label: 'Simple' },
    { id: 'stud', label: 'Stud' },
    { id: 'emerald', label: 'Emerald' },
    { id: 'moon', label: 'Moon' },
    { id: 'pear', label: 'Pear' },
    { id: 'princess', label: 'Princess' },
];

// ── Character State ──

const characterState = {
    name: '',
    bodyType: 'male',
    skinColor: 'light',
    hairStyle: 'plain',
    hairColor: 'dark_brown',
    ears: 'none',
    nose: 'none',
    facialHair: 'none',
    facialHairColor: 'dark_brown',
    glasses: 'none',
    earrings: 'none',
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
    // Most clothing assets only have male/female/teen variants — map others to closest match
    const clothingBtMap = { male: 'male', female: 'female', muscular: 'male', teen: 'teen', child: 'male' };
    const headType = headTypeMap[bt] || 'male';
    const faceType = faceTypeMap[bt] || 'male';
    const clothingBt = clothingBtMap[bt] || 'male';

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
    // Skip face overlay for children — the child head sprite already includes the face
    if (bt !== 'child') {
        layers.push({
            id: 'face',
            urlBuilder: (anim) => `${ASSET_BASE}/head/faces/${faceType}/neutral/${anim}.png`,
            zIndex: 16,
        });
    }

    // 1d. Ears (z: 17) — head/ears/{earType}/adult/{anim}/{skinColor}.png
    if (characterState.ears !== 'none') {
        layers.push({
            id: 'ears',
            urlBuilder: stdUrl(`head/ears/${characterState.ears}`, 'adult', characterState.skinColor),
            zIndex: 17,
        });
    }

    // 1e. Nose (z: 18) — head/nose/{noseType}/adult/{anim}.png
    if (characterState.nose !== 'none') {
        layers.push({
            id: 'nose',
            urlBuilder: (anim) => `${ASSET_BASE}/head/nose/${characterState.nose}/adult/${anim}.png`,
            zIndex: 18,
        });
    }

    // 2. Legs (z: 20) — {basePath}/{clothingBt}/{anim}/{color}.png
    if (characterState.legs !== 'none') {
        const legDef = LEGS.find(l => l.id === characterState.legs);
        if (legDef?.basePath) {
            layers.push({
                id: 'legs',
                urlBuilder: stdUrl(legDef.basePath, clothingBt, characterState.legColor),
                zIndex: 20,
            });
        }
    }

    // 3. Footwear (z: 25) — {basePath}/{clothingBt}/{anim}/{color}.png
    if (characterState.footwear !== 'none') {
        const footDef = FOOTWEAR.find(f => f.id === characterState.footwear);
        if (footDef?.basePath) {
            layers.push({
                id: 'footwear',
                urlBuilder: stdUrl(footDef.basePath, clothingBt, characterState.shoeColor),
                zIndex: 25,
            });
        }
    }

    // 4. Top (z: 30) — {basePath}/{clothingBt}/{anim}/{color}.png
    if (characterState.top !== 'none') {
        const topDef = TOPS.find(t => t.id === characterState.top);
        if (topDef?.basePath) {
            layers.push({
                id: 'top',
                urlBuilder: stdUrl(topDef.basePath, clothingBt, characterState.topColor),
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

    // 7. Facial hair (z: 35) — {basePath}/{anim}/{color}.png (no body type)
    if (characterState.facialHair !== 'none') {
        const fhDef = FACIAL_HAIR.find(f => f.id === characterState.facialHair);
        if (fhDef?.basePath) {
            layers.push({
                id: 'facial_hair',
                urlBuilder: noBtUrl(fhDef.basePath, characterState.facialHairColor),
                zIndex: 35,
            });
        }
    }

    // 7b. Glasses (z: 45) — facial/glasses/{style}/adult/{anim}.png (no color)
    if (characterState.glasses !== 'none') {
        layers.push({
            id: 'glasses',
            urlBuilder: (anim) => `${ASSET_BASE}/facial/glasses/${characterState.glasses}/adult/${anim}.png`,
            zIndex: 45,
        });
    }

    // 7c. Earrings (z: 42) — facial/earrings/{style}/{genderType}/{anim}.png (no color)
    if (characterState.earrings !== 'none') {
        const earringGender = (bt === 'female') ? 'female' : 'male';
        layers.push({
            id: 'earrings',
            urlBuilder: (anim) => `${ASSET_BASE}/facial/earrings/${characterState.earrings}/${earringGender}/${anim}.png`,
            zIndex: 42,
        });
    }

    // 8. Headwear (z: 50) — {basePath}/adult/{anim}/{color}.png
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
    populateSelect('ear-style', EARS, characterState.ears);
    populateSelect('nose-style', NOSES, characterState.nose);
    populateSelect('facial-hair-style', FACIAL_HAIR, characterState.facialHair);
    populateSelect('facial-hair-color', FACIAL_HAIR_COLORS, characterState.facialHairColor);
    populateSelect('glasses-style', GLASSES, characterState.glasses);
    populateSelect('earring-style', EARRINGS, characterState.earrings);
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
    toggleColorRow('facial-hair-color-row', characterState.facialHair !== 'none');
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
        'ear-style': (v) => characterState.ears = v,
        'nose-style': (v) => characterState.nose = v,
        'facial-hair-style': (v) => characterState.facialHair = v,
        'facial-hair-color': (v) => characterState.facialHairColor = v,
        'glasses-style': (v) => characterState.glasses = v,
        'earring-style': (v) => characterState.earrings = v,
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

    // 20% chance of special ears
    characterState.ears = Math.random() > 0.8
        ? pick(EARS.filter(e => e.id !== 'none'))
        : 'none';

    // 30% chance of nose
    characterState.nose = Math.random() > 0.7
        ? pick(NOSES.filter(n => n.id !== 'none'))
        : 'none';

    // 25% chance of facial hair
    characterState.facialHair = Math.random() > 0.75
        ? pick(FACIAL_HAIR.filter(f => f.id !== 'none'))
        : 'none';
    characterState.facialHairColor = pick(FACIAL_HAIR_COLORS);

    // 15% chance of glasses
    characterState.glasses = Math.random() > 0.85
        ? pick(GLASSES.filter(g => g.id !== 'none'))
        : 'none';

    // 10% chance of earrings
    characterState.earrings = Math.random() > 0.9
        ? pick(EARRINGS.filter(e => e.id !== 'none'))
        : 'none';

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
