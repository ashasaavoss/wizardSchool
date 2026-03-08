// LPC Spritesheet Compositing Engine
// Handles loading, layering, and animating LPC spritesheets

const ASSET_BASE = 'https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/refs/heads/master/spritesheets';

// Standard LPC frame size
const FRAME_W = 64;
const FRAME_H = 64;

// Walk animation: 4 directions, 9 frames each
// Row layout in walk.png: up(0), left(1), down(2), right(3)
// Each row has 9 frames
const WALK_ROWS = { up: 0, left: 1, down: 2, right: 3 };
const WALK_FRAMES = 9;

// Idle animation uses the first frame of walk (standing still)
const IDLE_FRAME = 0;

// Spellcast animation: 4 directions, 7 frames each
const SPELLCAST_ROWS = { up: 0, left: 1, down: 2, right: 3 };
const SPELLCAST_FRAMES = 7;

class SpriteRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.layers = [];
        this.imageCache = new Map();
        this.animationFrame = 0;
        this.animationTimer = null;
        this.currentAnimation = 'idle';
        this.currentDirection = 'down';
        this.scale = 3;
        this.canvas.width = FRAME_W * this.scale;
        this.canvas.height = FRAME_H * this.scale;
        this.ctx.imageSmoothingEnabled = false;
    }

    // Build a spritesheet URL from layer config
    buildUrl(layer, animation) {
        // Each layer has a urlBuilder function that constructs the full path
        if (layer.urlBuilder) {
            return layer.urlBuilder(animation);
        }
        // Fallback: basePath/bodyType/animation/color.png
        const { basePath, bodyType, color } = layer;
        const parts = [ASSET_BASE, basePath, bodyType, animation, color ? `${color}.png` : null].filter(Boolean);
        return parts.join('/');
    }

    async loadImage(url) {
        if (this.imageCache.has(url)) {
            return this.imageCache.get(url);
        }
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                this.imageCache.set(url, img);
                resolve(img);
            };
            img.onerror = () => {
                // Cache the failure so we don't retry endlessly
                this.imageCache.set(url, null);
                resolve(null);
            };
            img.src = url;
        });
    }

    setLayers(layers) {
        this.layers = layers.sort((a, b) => a.zIndex - b.zIndex);
        this.imageCache.clear();
        this.preloadCurrentAnimation();
    }

    async preloadCurrentAnimation() {
        const animation = this.currentAnimation === 'idle' ? 'walk' : this.currentAnimation;
        const promises = this.layers.map(layer => {
            const url = this.buildUrl(layer, animation);
            return this.loadImage(url);
        });
        await Promise.all(promises);
        this.render();
    }

    render() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const animation = this.currentAnimation === 'idle' ? 'walk' : this.currentAnimation;
        const dirIndex = WALK_ROWS[this.currentDirection];

        let frame;
        if (this.currentAnimation === 'idle') {
            frame = IDLE_FRAME;
        } else if (this.currentAnimation === 'walk') {
            frame = this.animationFrame % WALK_FRAMES;
        } else if (this.currentAnimation === 'spellcast') {
            frame = this.animationFrame % SPELLCAST_FRAMES;
        } else {
            frame = this.animationFrame % WALK_FRAMES;
        }

        for (const layer of this.layers) {
            const url = this.buildUrl(layer, animation);
            const img = this.imageCache.get(url);
            if (!img) continue;

            // Calculate source position in the spritesheet
            // Each row in the per-animation PNG has frames for one direction
            const sx = frame * FRAME_W;
            const sy = dirIndex * FRAME_H;

            ctx.drawImage(
                img,
                sx, sy, FRAME_W, FRAME_H,
                0, 0, FRAME_W * this.scale, FRAME_H * this.scale
            );
        }
    }

    startAnimation(animation, direction) {
        this.currentAnimation = animation;
        this.currentDirection = direction || this.currentDirection;
        this.animationFrame = 0;

        if (this.animationTimer) {
            clearInterval(this.animationTimer);
            this.animationTimer = null;
        }

        if (animation === 'idle') {
            this.preloadCurrentAnimation();
            return;
        }

        const maxFrames = animation === 'spellcast' ? SPELLCAST_FRAMES : WALK_FRAMES;
        this.preloadCurrentAnimation().then(() => {
            this.animationTimer = setInterval(() => {
                this.animationFrame = (this.animationFrame + 1) % maxFrames;
                this.render();
            }, 120);
        });
    }

    stopAnimation() {
        if (this.animationTimer) {
            clearInterval(this.animationTimer);
            this.animationTimer = null;
        }
        this.currentAnimation = 'idle';
        this.animationFrame = 0;
        this.render();
    }

    setDirection(direction) {
        this.currentDirection = direction;
        this.render();
    }

    destroy() {
        this.stopAnimation();
        this.imageCache.clear();
    }
}
