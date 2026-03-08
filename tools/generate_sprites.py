#!/usr/bin/env python3
"""
Generate character spritesheets by compositing LPC spritesheet layers.

Uses assets from the Universal LPC Spritesheet Character Generator.
Layers are composited in z-order (lower = behind, higher = in front).
"""

import os
import json
from PIL import Image

# Path to the cloned LPC generator repo
LPC_DIR = "/tmp/lpc-gen/spritesheets"

# Animations to include in the final spritesheet (in order, top to bottom)
ANIMATIONS = [
    "spellcast",
    "thrust",
    "walk",
    "slash",
    "shoot",
    "hurt",
]

# Frame counts per animation (width in 64px frames) x 4 directions (height in 64px)
FRAME_COUNTS = {
    "spellcast": 7,
    "thrust": 8,
    "walk": 9,
    "slash": 6,
    "shoot": 13,
    "hurt": 6,
    "idle": 2,
    "run": 8,
    "jump": 5,
    "sit": 3,
    "emote": 3,
    "climb": 6,
}

FRAME_SIZE = 64
DIRECTIONS = 4  # up, left, down, right


def load_layer_animation(layer_path, animation, variant):
    """Load a single animation PNG for a layer with a given color variant."""
    # Try different path patterns
    patterns = [
        os.path.join(layer_path, animation, f"{variant}.png"),
        os.path.join(layer_path, animation, variant, f"{variant}.png"),
    ]

    for path in patterns:
        if os.path.exists(path):
            img = Image.open(path).convert("RGBA")
            return img

    return None


def composite_character(layers, output_path, character_name):
    """
    Composite multiple layers into a single spritesheet.

    layers: list of (layer_path, variant, z_order) tuples
    """
    # Sort layers by z-order
    layers = sorted(layers, key=lambda x: x[2])

    # Build each animation row
    animation_rows = []
    for anim in ANIMATIONS:
        frame_count = FRAME_COUNTS.get(anim, 9)
        row_width = frame_count * FRAME_SIZE
        row_height = DIRECTIONS * FRAME_SIZE

        # Start with transparent canvas
        row_img = Image.new("RGBA", (row_width, row_height), (0, 0, 0, 0))

        for layer_path, variant, z_order in layers:
            layer_anim = load_layer_animation(layer_path, anim, variant)
            if layer_anim:
                # Resize/crop to match expected dimensions if needed
                paste_w = min(layer_anim.width, row_width)
                paste_h = min(layer_anim.height, row_height)
                crop = layer_anim.crop((0, 0, paste_w, paste_h))
                row_img.alpha_composite(crop, (0, 0))

        animation_rows.append(row_img)

    # Calculate final spritesheet dimensions
    max_width = max(row.width for row in animation_rows)
    total_height = sum(row.height for row in animation_rows)

    # Create final spritesheet
    spritesheet = Image.new("RGBA", (max_width, total_height), (0, 0, 0, 0))
    y_offset = 0
    for row in animation_rows:
        spritesheet.alpha_composite(row, (0, y_offset))
        y_offset += row.height

    spritesheet.save(output_path)
    print(f"  Saved {character_name}: {output_path} ({spritesheet.width}x{spritesheet.height})")


def build_layer(base_path, variant):
    """Helper to construct a layer tuple."""
    full_path = os.path.join(LPC_DIR, base_path)
    return full_path, variant


# Character definitions
# Each character is a list of (layer_base_path, variant, z_order)
# z_order: body=10, eyes=15, nose=16, hair=20, facial_hair=22,
#          legs=30, feet=35, torso=40, cape=5, hat=50, head_details=25

CHARACTERS = {
    "headmaster": {
        "description": "Headmaster - wise elderly wizard (Dumbledore archetype)",
        "layers": [
            ("body/bodies/male", "light", 10),
            ("head/heads/human/male_elderly", "light", 11),
            ("head/nose/big/adult", "light", 16),
            ("eyes/human/adult/default", "blue", 15),
            ("hair/long/adult", "white", 20),
            ("beards/beard/medium", "white", 22),
            ("beards/mustache/walrus", "white", 23),
            ("torso/clothes/longsleeve/longsleeve/male", "purple", 40),
            ("legs/pantaloons/male", "purple", 30),
            ("feet/boots/basic/male", "brown", 35),
            ("cape/solid/male", "maroon", 5),
            ("hat/magic/celestial/adult", "purple", 50),
        ],
    },
    "mean_teacher": {
        "description": "Mean Teacher - dark and brooding (Snape archetype)",
        "layers": [
            ("body/bodies/male", "light", 10),
            ("head/heads/human/male", "light", 11),
            ("head/nose/big/adult", "light", 16),
            ("eyes/human/adult/default", "brown", 15),
            ("hair/long/adult", "black", 20),
            ("torso/clothes/longsleeve/longsleeve/male", "black", 40),
            ("legs/pantaloons/male", "black", 30),
            ("feet/boots/basic/male", "black", 35),
            ("cape/solid/male", "black", 5),
        ],
    },
    "mysterious_teacher": {
        "description": "Mysterious Teacher - enigmatic and hooded",
        "layers": [
            ("body/bodies/male", "olive", 10),
            ("head/heads/human/male", "olive", 11),
            ("head/nose/straight/adult", "olive", 16),
            ("eyes/human/adult/default", "green", 15),
            ("torso/clothes/longsleeve/longsleeve/male", "navy", 40),
            ("legs/pantaloons/male", "navy", 30),
            ("feet/boots/basic/male", "brown", 35),
            ("cape/solid/male", "blue", 5),
            ("hat/cloth/hood/adult", "navy", 50),
        ],
    },
    "best_friend": {
        "description": "Best Friend Student - loyal and cheerful (Ron archetype)",
        "layers": [
            ("body/bodies/male", "light", 10),
            ("head/heads/human/male", "light", 11),
            ("head/nose/button/adult", "light", 16),
            ("eyes/human/adult/default", "blue", 15),
            ("hair/messy2/adult", "carrot", 20),
            ("torso/clothes/longsleeve/longsleeve/male", "maroon", 40),
            ("legs/pantaloons/male", "charcoal", 30),
            ("feet/shoes/revised/male", "brown", 35),
        ],
    },
    "silly_student": {
        "description": "Silly Student - goofy and fun-loving",
        "layers": [
            ("body/bodies/male", "light", 10),
            ("head/heads/human/male", "light", 11),
            ("head/nose/button/adult", "light", 16),
            ("eyes/human/adult/default", "brown", 15),
            ("hair/spiked/adult", "blonde", 20),
            ("torso/clothes/longsleeve/longsleeve/male", "yellow", 40),
            ("legs/pantaloons/male", "green", 30),
            ("feet/slippers/male", "brown", 35),
        ],
    },
    "enemy_student": {
        "description": "Enemy Student - arrogant rival (Malfoy archetype)",
        "layers": [
            ("body/bodies/male", "light", 10),
            ("head/heads/human/male", "light", 11),
            ("head/nose/straight/adult", "light", 16),
            ("eyes/human/adult/default", "gray", 15),
            ("hair/parted/adult", "blonde", 20),
            ("torso/clothes/longsleeve/longsleeve/male", "green", 40),
            ("legs/formal/male", "black", 30),
            ("feet/boots/basic/male", "black", 35),
            ("cape/solid/male", "green", 5),
        ],
    },
    "prefect": {
        "description": "Prefect - uptight rule-follower (Percy archetype)",
        "layers": [
            ("body/bodies/male", "light", 10),
            ("head/heads/human/male", "light", 11),
            ("head/nose/straight/adult", "light", 16),
            ("eyes/human/adult/default", "brown", 15),
            ("hair/parted/adult", "carrot", 20),
            ("torso/clothes/longsleeve/longsleeve/male", "maroon", 40),
            ("torso/clothes/vest/male", "charcoal", 42),
            ("legs/formal/male", "charcoal", 30),
            ("feet/shoes/revised/male", "black", 35),
        ],
    },
    "evil_sorcerer": {
        "description": "Evil Sorcerer - dark lord villain (Voldemort archetype)",
        "layers": [
            ("body/bodies/male", "light", 10),
            ("head/heads/human/male_gaunt", "light", 11),
            ("head/nose/big/adult", "light", 16),
            ("eyes/human/adult/default", "red", 15),
            ("torso/clothes/longsleeve/longsleeve/male", "black", 40),
            ("legs/pantaloons/male", "black", 30),
            ("feet/boots/basic/male", "black", 35),
            ("cape/solid/male", "black", 5),
            ("hat/cloth/hood/adult", "black", 50),
        ],
    },
}


def main():
    output_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "assets", "characters")
    os.makedirs(output_dir, exist_ok=True)

    for char_id, char_def in CHARACTERS.items():
        print(f"Generating {char_def['description']}...")
        layers = [
            (os.path.join(LPC_DIR, path), variant, z)
            for path, variant, z in char_def["layers"]
        ]
        output_path = os.path.join(output_dir, f"{char_id}.png")
        composite_character(layers, output_path, char_id)

    # Also save character definitions as JSON for reference
    definitions = {}
    for char_id, char_def in CHARACTERS.items():
        definitions[char_id] = {
            "description": char_def["description"],
            "layers": [
                {"path": path, "variant": variant, "z_order": z}
                for path, variant, z in char_def["layers"]
            ],
        }

    json_path = os.path.join(output_dir, "characters.json")
    with open(json_path, "w") as f:
        json.dump(definitions, f, indent=2)
    print(f"\nSaved character definitions: {json_path}")


if __name__ == "__main__":
    main()
