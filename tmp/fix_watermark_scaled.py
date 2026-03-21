from PIL import Image, ImageFilter
import os

files = [
    ('photo/info/Clinical_Cortisol_Control_version_1.png', 'public/images/clean-gallery-cortisol.png'),
    ('photo/creative/New Product Imagery.jpeg', 'public/images/clean-gallery-lifestyle.jpeg'),
    ('photo/info/Product Infographics-2.jpeg', 'public/images/clean-gallery-wellness.jpeg'),
    ('photo/info/Product Infographics.jpeg', 'public/images/clean-gallery-ingredients.jpeg')
]

for src, dst in files:
    if os.path.exists(src):
        img = Image.open(src).convert('RGB')
        
        # Make the patch exactly 15% of the image width to cover the AI watermark completely on any size image
        box_size = int(img.width * 0.15)
        
        source_region = img.crop((box_size, 0, box_size * 2, box_size))
        mirrored = source_region.transpose(Image.FLIP_LEFT_RIGHT)
        mirrored = mirrored.filter(ImageFilter.GaussianBlur(radius=int(box_size * 0.1)))
        
        img.paste(mirrored, (0, 0))
        
        if dst.endswith('.png'):
            img.save(dst, 'PNG')
        else:
            img.save(dst, 'JPEG', quality=100)
            
        print(f"Patched {box_size}x{box_size} watermark and saved to {dst}")
    else:
        print(f"File not found: {src}")
