import re
import os

def patch_file(filepath, patterns):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content
    for pattern, replacement in patterns:
        new_content = re.sub(pattern, replacement, new_content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Successfully patched {filepath}")
    else:
        print(f"No changes made to {filepath}")

if __name__ == "__main__":
    # Define regex patterns and their replacements
    patterns = [
        # 1. Fix Shopify Asset URL prefix once and for all
        (r'(\(window\.ShopifyAssetsUrl\|\|"/images/"\)) \+ ', r'"/images/" + '),
        (r'window\.ShopifyAssetsUrl \+ ', r'"/images/" + '),
        
        # 2. Content refinements (Regex versions to catch variations)
        (r'300mg KSM-66® (?:per|every) day', 'Daily serving'),
        (r'300\s?mg', 'Daily serving'),
        (r'24\+ studies on KSM-66® efficacy\.', '24+ clinical studies on efficacy.'),
        (r'KSM-66® Ashwagandha', 'Clinically studied Ashwagandha'),
    ]

    # Paths to patch
    paths = [
        "/Users/karansethi/Downloads/app/assets/bundle.js",
        "/Users/karansethi/Downloads/app/dist/assets/index-4yg8eD9p.js"
    ]

    for path in paths:
        patch_file(path, patterns)
