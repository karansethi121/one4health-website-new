import re
import os

def patch_file(filepath):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return

    with open(filepath, 'r') as f:
        content = f.read()

    # Replace /images/filename.ext with window.ShopifyAssetsUrl + "filename.ext"
    # We look for patterns like "/images/[anything but quotes or whitespace]"
    # We want to catch instances in JS like src:"/images/logo.png" or "/images/logo.png"
    
    # Simple regex to find /images/... inside quotes
    # Pattern: "/images/([^"'>\s]+)"
    pattern = r'\"/images/([^\"\'>\s]+)\"'
    replacement = r'window.ShopifyAssetsUrl + "\1"'
    
    new_content = re.sub(pattern, replacement, content)
    
    # Also handle single quotes
    pattern_sq = r"\'/images/([^\"\'>\s]+)\'"
    new_content = re.sub(pattern_sq, replacement, new_content)

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Successfully patched {filepath}")
    else:
        print(f"No changes made to {filepath}")

if __name__ == "__main__":
    # Patch the main Shopify assembly
    patch_file("/Users/karansethi/Downloads/app/assets/bundle.js")
    # Also patch the dist one just in case
    # Find the current js file in dist/assets
    dist_assets = "/Users/karansethi/Downloads/app/dist/assets"
    if os.path.exists(dist_assets):
        for f in os.listdir(dist_assets):
            if f.endswith(".js"):
                patch_file(os.path.join(dist_assets, f))
