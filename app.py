import os
from PIL import Image

# Directory containing the images
image_dir = './public/images/'

# List of image filenames to process
image_filenames = [
    'customer-bg-01.png',
    'customer-bg-02.png',
    'customer-bg-03.png',
    'customer-bg-04.png',
    'customer-bg-05.png',
    'customer-bg-06.png',
    'customer-bg-07.png',
    'customer-bg-08.png',
    'customer-bg-09.png',
    'customer-bg-10.png',
]

# Function to convert image to green and save as WebP
def process_image(filename):
    # Open the image
    img = Image.open(os.path.join(image_dir, filename))
    
    # Convert to RGB if not already
    img = img.convert('RGB')
    
    # Split the image into its red, green, and blue components
    r, g, b = img.split()
    
    # Merge the image back with reduced red and blue channels
    green_img = Image.merge('RGB', (r.point(lambda i: i * 0), g, b.point(lambda i: i * 0)))
    
    # Save the image as WebP
    new_filename = filename.replace('.png', '.webp')
    green_img.save(os.path.join(image_dir, new_filename), 'webp')
    
    return new_filename

# Process each image
new_filenames = [process_image(filename) for filename in image_filenames]

# Update the imports in the TypeScript file
tsx_file = 'customers-list.tsx'
with open(tsx_file, 'r') as file:
    tsx_content = file.read()

for old_filename, new_filename in zip(image_filenames, new_filenames):
    tsx_content = tsx_content.replace(old_filename, new_filename)

with open(tsx_file, 'w') as file:
    file.write(tsx_content)

print("Images processed and TypeScript file updated.")