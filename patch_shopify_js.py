import os
import shutil
import re

def patch_file(file_path):
    if not os.path.exists(file_path):
        return
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Patch Image URLs: "/images/FILENAME" -> (window.ShopifyAssetsUrl || "/images/") + "FILENAME"
    # This ensures compatibility with both local dev and Shopify CDN
    def replace_image_path(match):
        filename = match.group(1)
        return f'(window.ShopifyAssetsUrl||"/images/")+"{filename}"'

    # Global replace for all image paths
    new_content = re.sub(r'"/images/([^"]+)"', replace_image_path, content)
    
    # Also patch CSS background images if they exist: url("/images/...")
    new_content = re.sub(r'url\("?\/images\/([^"\)]+)"?\)', r'url("\1")', new_content)

    if new_content != content:
        with open(file_path, 'w') as f:
            f.write(new_content)
        print(f"Patched: {file_path}")
    else:
        print(f"No changes needed for: {file_path}")

def flatten_images():
    # Flatten images directory: Shopify doesn't support subdirectories in assets/
    base_dir = os.path.dirname(os.path.abspath(__file__))
    assets_images = os.path.join(base_dir, "assets/images")
    assets_root = os.path.join(base_dir, "assets")
    
    if os.path.exists(assets_images):
        for f in os.listdir(assets_images):
            src = os.path.join(assets_images, f)
            dst = os.path.join(assets_root, f)
            if os.path.isfile(src):
                # Only copy if it's not already in the root
                if not os.path.exists(dst):
                    shutil.copy2(src, dst)
                    print(f"Flattened: {f} -> assets/")
                else:
                    # If it exists, overwrite if different
                    shutil.copy2(src, dst)

if __name__ == "__main__":
    # 1. Flatten images first so they are in assets/ root
    flatten_images()
    
    # 2. Patch the main Shopify assembly
    base_dir = os.path.dirname(os.path.abspath(__file__))
    patch_file(os.path.join(base_dir, "assets/bundle.js"))
    
    # 3. Patch any other JS or CSS files in assets
    assets_root = os.path.join(base_dir, "assets")
    if os.path.exists(assets_root):
        for f in os.listdir(assets_root):
            if (f.endswith(".js") or f.endswith(".css")) and f != "bundle.js":
                patch_file(os.path.join(assets_root, f))
