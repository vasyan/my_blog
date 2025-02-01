from PIL import Image
import os

# Directory containing the files
DIR = "/Users/bb/code/my_blog/tmp"

# Loop through each file in the directory
for filename in os.listdir(DIR):
    if filename.endswith(".jpg") or filename.endswith(".png"):
        filepath = os.path.join(DIR, filename)
        
        # Open an image file
        with Image.open(filepath) as img:
            # Optimize the image
            if filename.endswith(".png"):
                # Convert PNG to JPG
                rgb_img = img.convert('RGB')
                new_filepath = os.path.join(DIR, filename.rsplit('.', 1)[0] + '.jpg')
                rgb_img.save(new_filepath, optimize=True, quality=85)
                os.remove(filepath)  # Remove the original PNG file
            else:
                img.save(filepath, optimize=True, quality=85)
