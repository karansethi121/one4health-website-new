from PIL import Image
import os

def pad_with_edge_stretch(file_path):
    img = Image.open(file_path).convert('RGB')
    w, h = img.size
    if w >= h:
        return
        
    pad_total = h - w
    pad_left = pad_total // 2
    pad_right = pad_total - pad_left
    
    new_img = Image.new('RGB', (h, h))
    
    # Left stretch
    left_edge = img.crop((0, 0, 1, h))
    left_stretch = left_edge.resize((pad_left, h))
    new_img.paste(left_stretch, (0, 0))
    
    # Center original
    new_img.paste(img, (pad_left, 0))
    
    # Right stretch
    right_edge = img.crop((w-1, 0, w, h))
    right_stretch = right_edge.resize((pad_right, h))
    new_img.paste(right_stretch, (pad_left + w, 0))
    
    new_img.save(file_path, quality=100)
    print(f"Stretch-padded {file_path} to {h}x{h}")

def center_crop_to_square(file_path):
    img = Image.open(file_path).convert('RGB')
    w, h = img.size
    if w == h:
        return
        
    size = min(w, h)
    left = (w - size) // 2
    top = (h - size) // 2
    
    img = img.crop((left, top, left + size, top + size))
    img.save(file_path, quality=100)
    print(f"Cropped {file_path} to {size}x{size}")

# Apply to the files:
if os.path.exists('public/images/gallery-cortisol.png'):
    pad_with_edge_stretch('public/images/gallery-cortisol.png')
else:
    print('gallery-cortisol missing')
    
if os.path.exists('public/images/gallery-lifestyle.jpeg'):
    center_crop_to_square('public/images/gallery-lifestyle.jpeg')
else:
    print('gallery-lifestyle missing')
