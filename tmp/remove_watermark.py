from PIL import Image
import os

files = [
    'public/images/gallery-cortisol.png',
    'public/images/gallery-lifestyle.jpeg',
    'public/images/gallery-wellness.jpeg',
    'public/images/gallery-ingredients.jpeg'
]

W_BOX = 110 # Width of watermark box
H_BOX = 110 # Height of watermark box

for f in files:
    if os.path.exists(f):
        img = Image.open(f).convert('RGB')
        pixels = img.load()
        
        # Blend the pixels from the right and bottom edges of the box
        for y in range(H_BOX):
            for x in range(W_BOX):
                color_right = pixels[W_BOX, y]
                color_bottom = pixels[x, H_BOX]
                
                # Simple average blend of the two edges
                r = (color_right[0] + color_bottom[0]) // 2
                g = (color_right[1] + color_bottom[1]) // 2
                b = (color_right[2] + color_bottom[2]) // 2
                
                pixels[x, y] = (r, g, b)
                
        # Re-save with original extension rules
        if f.endswith('.png'):
            img.save(f, 'PNG')
        else:
            img.save(f, 'JPEG', quality=95)
            
        print(f"Removed watermark from {f}")
    else:
        print(f"File not found: {f}")

