import sys
import os
from PIL import Image

def remove_background(input_path, output_path, tolerance=235):
    try:
        img = Image.open(input_path).convert("RGBA")
        data = img.getdata()
        
        new_data = []
        for item in data:
            # Check if the pixel is close to pure white
            if item[0] >= tolerance and item[1] >= tolerance and item[2] >= tolerance:
                # Change to transparent
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        img.save(output_path, "PNG")
        print(f"Successfully processed {input_path} -> {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python rmbg.py <input> <output> [tolerance]")
    else:
        tolerance = int(sys.argv[3]) if len(sys.argv) > 3 else 235
        remove_background(sys.argv[1], sys.argv[2], tolerance)
