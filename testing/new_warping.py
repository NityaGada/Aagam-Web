from psd_tools import PSDImage
from psd_tools.api.layers import SmartObjectLayer

psd = PSDImage.open('MOckup PRac.psd')

# Function to print layer details
def print_layer_details(layer, depth=0):
    prefix = ' ' * depth * 2
    print(f"{prefix}Layer name: {layer.name}, kind: {layer.kind}, size: {layer.width}x{layer.height}")
    if hasattr(layer, 'text_data') and layer.text_data:
        print(f"{prefix} Text: {layer.text_data.text}")
    if layer.has_mask():
        print(f"{prefix} Mask size: {layer.mask.width}x{layer.mask.height}")

# Iterate through all layers
def iterate_layers(layers, depth=0):
    for layer in layers:
        print_layer_details(layer, depth)
        if layer.is_group():
            iterate_layers(layer, depth + 1)

# Start the iteration from the root layers
iterate_layers(psd)

"""
required_level = None
for layer in psd:
    if layer.name == 'Group 1':
        for sublayer in layer:
            if sublayer.name == 'Right Sleeves':
                for subsublayer in sublayer:
                    if subsublayer.name == 'Levels Adjustemnt (Multiply)':
                        required_level = subsublayer
                        break
            if required_level:
                break
    if required_level:
        break

if isinstance(required_level, SmartObjectLayer):
    smart_object = required_level.smart_object
    warp_info = smart_object.resource_dict.get('warp')
    liquify_info = smart_object.resource_dict.get('liquify')
else:
    for tag in required_level.tagged_blocks:
        print(f"Tag: {tag.key} - Type: {type(tag.data)}")
        if tag.key == 'warp':
            warp_info = tag.data
        elif tag.key == 'liquify':
            liquify_info = tag.data
    for resource in required_level.tagged_blocks:
        # Debug print to inspect resource attributes
        print(f"Resource Type: {type(resource)}")
        print(f"Resource Attributes: {dir(resource)}")
        print(f"Resource Data: {resource.data}")
        if resource.key == 'warp':
            warp_info = resource.data
        elif resource.key == 'liquify':
            liquify_info = resource.data
        print(f"Warp: {warp_info}, Liquify: {liquify_info}")
"""


from psd_tools import PSDImage
from PIL import Image, ImageChops, ImageOps

def blend_pattern_with_mask(layer, pattern_image_path, output_path):
    # Load the pattern image
    pattern_image = Image.open(pattern_image_path).convert('RGBA')

    # Composite the original layer image
    original_image = layer.composite()
    if original_image is None:
        return  # Skip if there's no image in this layer

    # Resize pattern to match the layer size
    pattern_resized = pattern_image.resize((layer.width, layer.height), Image.LANCZOS)

    # Apply the mask if available
    if layer.has_mask():
        mask = layer.mask.topil()
        print("yes")
        mask = ImageOps.grayscale(mask).resize((layer.width, layer.height), Image.LANCZOS)

        # Blend the pattern with the original image using the mask
        blended_image = Image.composite(pattern_resized, original_image, mask)

        # Save the resulting image
        blended_image.save(output_path)

def process_layers(layers, pattern_image_path, output_directory, depth=0):
    for layer in layers:
        print(layer.name)
        if "Right Sleeves" in layer.name or "Left Sleeves" in layer.name or "Main Body" in layer.name:
            output_path = f"{output_directory}/{layer.name.replace(' ', '_')}_blended.png"
            blend_pattern_with_mask(layer, pattern_image_path, output_path)
        if layer.is_group():
            process_layers(layer, pattern_image_path, output_directory, depth + 1)

# Load the PSD file
psd = PSDImage.open('MOckup PRac.psd')

# Define the path to the new pattern image
pattern_image_path = 's.png'

# Define the output directory for the blended images
output_directory = 'C:/Users/Anant/Downloads/Aagam/Aagam-Web/testing'

# Process the layers to blend the new pattern
process_layers(psd, pattern_image_path, output_directory)


"""
from psd_tools import PSDImage
from PIL import Image, ImageOps
import os

def find_layer_by_path(psd, layer_path):
    layer = psd
    for name in layer_path:
        layer = next((l for l in layer if l.name == name), None)
        if layer is None:
            raise ValueError(f"Layer named '{name}' not found")
    return layer

def extract_pattern_layer(pattern_psd_path, layer_path):
    # Load the pattern PSD file
    pattern_psd = PSDImage.open(pattern_psd_path)

    # Find the pattern layer by path
    pattern_layer = find_layer_by_path(pattern_psd, layer_path)
    
    # Return the composite image of the pattern layer
    return pattern_layer.composite()

def blend_pattern_with_mask(layer, pattern_image, output_path):
    # Composite the original layer image
    original_image = layer.composite()
    if original_image is None:
        return  # Skip if there's no image in this layer

    # Resize pattern to match the layer size
    pattern_resized = pattern_image.resize(original_image.size, Image.LANCZOS)

    # Apply the mask if available
    if layer.has_mask():
        mask = layer.mask.topil()
        mask = ImageOps.grayscale(mask).resize(original_image.size, Image.LANCZOS)

        # Blend the pattern with the original image using the mask
        blended_image = Image.composite(pattern_resized, original_image, mask)

        # Save the resulting image
        blended_image.save(output_path)

def process_layers(layers, pattern_image, output_directory, depth=0):
    for layer in layers:
        if "Right Sleeves" in layer.name or "Left Sleeves" in layer.name:
            output_path = f"{output_directory}/{layer.name.replace(' ', '_')}_blended_recent.png"
            blend_pattern_with_mask(layer, pattern_image, output_path)
        if layer.is_group():
            process_layers(layer, pattern_image, output_directory, depth + 1)

# Paths to the PSD files
main_psd_path = 'MOckup PRac.psd'
pattern_psd_path = 'high res.psd'

# Path to the pattern layer in the pattern PSD file
pattern_layer_path = ['BLUE', 'body', 'Rectangle 2']

# Define the output directory for the blended images
output_directory = 'C:/Users/Anant/Downloads/Aagam/Aagam-Web/testing'

# Ensure the output directory exists
os.makedirs(output_directory, exist_ok=True)

# Load the main PSD file
psd = PSDImage.open(main_psd_path)

# Extract the pattern layer as an image
pattern_image = extract_pattern_layer(pattern_psd_path, pattern_layer_path)

# Process the layers in the main PSD file to blend the new pattern
process_layers(psd, pattern_image, output_directory)"""
