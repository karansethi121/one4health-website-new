import os
import shutil

def patch_file(file_path):
    if not os.path.exists(file_path):
        return
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Patch Asset URLs - Shopify assets are served from the root assets folder
    content = content.replace('"/images/"', 'window.ShopifyAssetsUrl || "/images/"')
    
    with open(file_path, 'w') as f:
        f.write(content)
    print(f"Patched: {file_path}")

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
                shutil.copy2(src, dst)
                print(f"Flattened: {f} -> assets/")

if __name__ == "__main__":
    # 1. Flatten images first so they are in assets/ root
    flatten_images()
    
    # 2. Patch the main Shopify assembly
    base_dir = os.path.dirname(os.path.abspath(__file__))
    patch_file(os.path.join(base_dir, "assets/bundle.js"))
    
    # 3. Patch any other JS files in assets
    assets_root = os.path.join(base_dir, "assets")
    if os.path.exists(assets_root):
        for f in os.listdir(assets_root):
            if f.endswith(".js") and f != "bundle.js":
                patch_file(os.path.join(assets_root, f))
