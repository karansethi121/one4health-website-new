import os
import re

bundle_path = "/Users/karansethi/Downloads/app/dist/assets/index-4yg8eD9p.js"

if not os.path.exists(bundle_path):
    print(f"Error: {bundle_path} not found")
    exit(1)

with open(bundle_path, "r") as f:
    content = f.read()

# 1. Update subtitle
content = content.replace("KSM-66\u00ae with Vitamin D2 & BioPerine\u00ae", "KSM-66\u00ae Mixed Berry Gummies")

# 2. Update flavor labels
content = content.replace("Natural berry flavor", "Mixed berry flavor")
content = content.replace("berry-flavored gummies", "mixed berry-flavored gummies")

# 3. Add Flavor mention in ProductPage
# Look for the subtitle rendering and inject the flavor line
# src/pages/ProductPage.tsx:141
# c.jsx("p",{"code-path":"src/pages/ProductPage.tsx:141:15",className:"text-base lg:text-lg text-charcoal-600",children:a.subtitle})
flavor_line = 'c.jsx("p",{className:"text-sm font-medium text-sage-700 mt-1",children:"Flavor: Mixed Berry"})'
content = content.replace('children:a.subtitle})', 'children:a.subtitle}),' + flavor_line)

# 4. Remove "Why this matters" section
# src/sections/CleanFormulaSection.tsx:141
# c.jsx("div",{className:"bg-sage-100 rounded-2xl p-5 mb-6",children:c.jsxs("p",{className:"text-sm text-charcoal-600",children:[c.jsx("span",{className:"font-semibold text-charcoal-900",children:"Why this matters:"})," When you support your body with Ashwagandha, you shouldn't have to worry about artificial additives working against you."]})}
# We'll try to find a pattern that matches this.
pattern = r'c\.jsx\("div",\{className:"bg-sage-100 rounded-2xl p-5 mb-6",children:c\.jsxs\("p",\{className:"text-sm text-charcoal-600",children:\[c\.jsx\("span",\{className:"font-semibold text-charcoal-900",children:"Why this matters:"\}\)," When you support your body with Ashwagandha, you shouldn\'t have to worry about artificial additives working against you\."\]\}\)\}\)'
content = re.sub(pattern, 'null', content)

# 5. Fix "How to Use" if blank? 
# Let's ensure the How to Use content is there. 
# It likely is, but maybe the state isn't updating correctly or it's empty in data.
# The previous patch already updated subtitle and description.

# 6. Force a refresh of the page title/description if needed?
# Not really possible here.

with open(bundle_path, "w") as f:
    f.write(content)

print("Batch patching complete!")
