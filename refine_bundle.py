import re
import os

def patch_file(filepath, replacements):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Successfully patched {filepath}")
    else:
        print(f"No changes made to {filepath}")

if __name__ == "__main__":
    # Define replacements
    # 1. ScienceSection stats label
    # 2. ScienceSection studies desc
    replacements = {
        "300mg KSM-66® per day": "Daily serving",
        "24+ studies on KSM-66® efficacy.": "24+ clinical studies on efficacy."
    }

    # Paths to patch
    paths = [
        "/Users/karansethi/Downloads/app/assets/bundle.js"
    ]
    
    # Also find current JS in dist/assets
    dist_assets = "/Users/karansethi/Downloads/app/dist/assets"
    if os.path.exists(dist_assets):
        for f in os.listdir(dist_assets):
            if f.endswith(".js"):
                paths.append(os.path.join(dist_assets, f))

    for path in paths:
        patch_file(path, replacements)
