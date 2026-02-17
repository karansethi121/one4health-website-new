import os

bundle_path = "/Users/karansethi/Downloads/app/dist/assets/index-4yg8eD9p.js"

if not os.path.exists(bundle_path):
    print(f"Error: {bundle_path} not found")
    exit(1)

with open(bundle_path, 'r') as f:
    content = f.read()

# 1. Hide the "Why this formula works" section (already done in v4, but making it robust)
if 'className:"hidden",children:"Why this formula works"' not in content:
    content = content.replace('children:"Why this formula works"', 'className:"hidden",children:"Why this formula works"')

# 2. Fix the "Daily serving daily" typo
content = content.replace('Daily serving daily for stress response', 'Daily serving for stress response')

# 3. Add explicit "Flavor: Mixed Berry" line using the correct variable 'h.subtitle'
# Avoid double patching
if 'Flavor: Mixed Berry' not in content:
    target_subtitle = 'className:"text-base lg:text-lg text-charcoal-600",children:h.subtitle'
    # Use h instead of a
    replacement_subtitle = 'className:"text-base lg:text-lg text-charcoal-600",children:h.subtitle}),c.jsx("p",{className:"text-sm font-medium text-sage-700 mt-1",children:"Flavor: Mixed Berry"'
    content = content.replace(target_subtitle, replacement_subtitle)

with open(bundle_path, 'w') as f:
    f.write(content)

print("Bundle v5 patched successfully.")
