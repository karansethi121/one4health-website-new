import re
import os
import shutil

def patch_file(filepath):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return

    with open(filepath, 'r') as f:
        content = f.read()

    # Replace /images/filename.ext with window.ShopifyAssetsUrl + "filename.ext"
    pattern = r'[\"\']\/images\/([^\"\'+?&%]+)[\"\']'
    replacement = r'(window.ShopifyAssetsUrl || "/images/") + "\1"'
    
    new_content = re.sub(pattern, replacement, content)

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Successfully patched {filepath}")
    else:
        print(f"No changes made to {filepath}")

def flatten_images():
    # Flatten images directory: Shopify doesn't support subdirectories in assets/
    assets_images = "/Users/karansethi/Downloads/app/assets/images"
    assets_root = "/Users/karansethi/Downloads/app/assets"
    
    if os.path.exists(assets_images):
        for f in os.listdir(assets_images):
            src = os.path.join(assets_images, f)
            dst = os.path.join(assets_root, f)
            if os.path.isfile(src):
                shutil.copy2(src, dst)
                print(f"Flattened: {f} -> assets/")

if __name__ == "__main__":
    # 1. Flatten images first so they are in assets/ root
    flatten_images()
    
    # 2. Patch the main Shopify assembly
    patch_file("/Users/karansethi/Downloads/app/assets/bundle.js")
    
    # 3. Patch any other JS files in assets
    assets_root = "/Users/karansethi/Downloads/app/assets"
    for f in os.listdir(assets_root):
        if f.endswith(".js") and f != "bundle.js":
            patch_file(os.path.join(assets_root, f))
