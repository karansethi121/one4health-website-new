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
    # 1. Global image fix: handle both window.ShopifyAssetsUrl and relative paths
    # 2. Science Section text fix (more broad)
    replacements = {
        'window.ShopifyAssetsUrl + ': '(window.ShopifyAssetsUrl||"/images/") + ',
        '300mg KSM-66® per day': 'Daily serving',
        '24+ studies on KSM-66® efficacy.': '24+ clinical studies on efficacy.',
        '300 mg': 'Daily serving', # More aggressive replacement for stats
    }

    # Paths to patch
    paths = [
        "/Users/karansethi/Downloads/app/assets/bundle.js",
        "/Users/karansethi/Downloads/app/dist/assets/index-4yg8eD9p.js"
    ]

    for path in paths:
        patch_file(path, replacements)
