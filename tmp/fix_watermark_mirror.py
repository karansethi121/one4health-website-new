from PIL import Image, ImageFilter
import os

files = [
    'public/images/gallery-cortisol.png',
    'public/images/gallery-lifestyle.jpeg',
    'public/images/gallery-wellness.jpeg',
    'public/images/gallery-ingredients.jpeg'
]

W_BOX = 120
H_BOX = 120

for f in files:
    if os.path.exists(f):
        img = Image.open(f).convert('RGB')
        
        # Crop the region immediately to the right of the watermark
        source_region = img.crop((W_BOX, 0, W_BOX * 2, H_BOX))
        
        # Flip it horizontally so the left edge perfectly seamlessly aligns with the inner right edge of the patch
        mirrored = source_region.transpose(Image.FLIP_LEFT_RIGHT)
        
        # Apply a gaussian blur to remove cloned texture/details so it becomes a smooth continuous gradient
        mirrored = mirrored.filter(ImageFilter.GaussianBlur(radius=8))
        
        # Paste it over the watermark
        img.paste(mirrored, (0, 0))
        
        if f.endswith('.png'):
            img.save(f, 'PNG')
        else:
            img.save(f, 'JPEG', quality=100)
            
        print(f"Smoothly patched watermark in {f}")
    else:
        print(f"File not found: {f}")
