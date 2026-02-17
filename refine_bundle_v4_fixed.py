import os

bundle_path = "/Users/karansethi/Downloads/app/dist/assets/index-4yg8eD9p.js"

if not os.path.exists(bundle_path):
    print(f"Error: {bundle_path} not found")
    exit(1)

with open(bundle_path, 'r') as f:
    content = f.read()

# 1. Hide the "Why this formula works" section
print("Hiding 'Why this formula works' section...")
# We'll use the className injection trick to hide the container
# Based on my grep, the h3 has code-path src/pages/ProductPage.tsx:359:15
# And it's probably preceded by a div with some classes.
# I'll look for the specific h3 tag and hide its parent or itself.
target_section_header = 'children:"Why this formula works"'
replacement_section_header = 'className:"hidden",children:"Why this formula works"'
content = content.replace(target_section_header, replacement_section_header)

# 2. Fix the "Daily serving daily" typo (just in case the hidden section is still findable by search)
print("Fixing double 'daily' typo...")
content = content.replace('Daily serving daily for stress response', 'Daily serving for stress response')

# 3. Add explicit "Flavor: Mixed Berry" line
print("Adding flavor line...")
# Target the subtitle area in ProductPage
# className:"text-base lg:text-lg text-charcoal-600",children:a.subtitle
# We want to add a p tag after it.
target_subtitle = 'className:"text-base lg:text-lg text-charcoal-600",children:a.subtitle'
# Avoid double patching if already patched
if 'Flavor: Mixed Berry' not in content:
    replacement_subtitle = 'className:"text-base lg:text-lg text-charcoal-600",children:a.subtitle}),c.jsx("p",{className:"text-sm font-medium text-sage-700 mt-1",children:"Flavor: Mixed Berry"'
    content = content.replace(target_subtitle, replacement_subtitle)

# 4. Final Typos in footer/subscription from previous verification
print("Applying final typo fixes...")
content = content.replace('Daily serving KSM-66® daily', 'Daily serving KSM-66®')

with open(bundle_path, 'w') as f:
    f.write(content)

print("Bundle v4 patched successfully.")
