from psd_tools import PSDImage
from psd_tools.constants import BlendMode
import matplotlib.pyplot as plt
from PIL import Image
import numpy as np

# Load the PSD file
psd_file = PSDImage.open('high res.psd')

# Access the layers
layer1 = psd_file._layers[5][0]
layer2 = psd_file._layers[3][0][1]  # Assuming layer1 is the first layer you want to blend # Assuming layer2 is the second layer you want to blend
def convert_to_grayscale(layer, brightness_percent):
    # Convert the layer to grayscale
    if layer.has_pixels():
        # Convert layer to Pillow Image
        layer_image = layer.topil()

        # Convert to grayscale
        grayscale_image = layer_image.convert('L')

        # Adjust brightness
        brightness_factor = brightness_percent / 100
        adjusted_image = Image.eval(grayscale_image, lambda x: x * brightness_factor)

        return adjusted_image
    else:
        raise ValueError("Layer does not have pixels.")

grayscale_layer = convert_to_grayscale(layer1, brightness_percent=70)
#layer1.compose(layer2, BlendMode.MULTIPLY)
def blend_layers(layer1, layer2, blend_mode):
    target_size = layer1.size
    layer2_image = layer2.topil()
    layer2_resized = layer2_image.resize(target_size)

    # Convert layers to PIL Images
    #image1 = layer1.topil()
    #image2 = layer2_resized.topil()

    # Convert images to numpy arrays for pixel-wise blending
    array1 = np.array(layer1.topil())
    array2 = np.array(layer2_resized)

    # Perform pixel-wise blending based on the specified blend mode
    if blend_mode == BlendMode.MULTIPLY:
        blended_array = np.multiply(array1, array2) // 255
    elif blend_mode == BlendMode.SCREEN:
        blended_array = 255 - np.multiply(255 - array1, 255 - array2) // 255
    # Add more blend modes as needed

    # Convert the blended array back to a PIL Image
    blended_image = Image.fromarray(blended_array.astype('uint8'))

    return blended_image


blended_image = blend_layers(layer1, layer2, BlendMode.MULTIPLY)

# Save the blended image
blended_image.save('output.png')    
"""
# Get the pixel data for both layers
pixel_data1 = layer1.topil()
pixel_data2 = layer2.topil()

# Apply the Multiply blend mode
blended_pixels = ImageChops.multiply(pixel_data1, pixel_data2)

#blended_pixels = ImageChops.multiply(pixel_data1, pixel_data2)

# Convert the image to RGB mode
blended_pixels = blended_pixels.convert('RGB')

# Save the blended image
blended_pixels.save('blended_image_multiply.jpg')"""
