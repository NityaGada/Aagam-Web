from psd_tools import PSDImage
import cv2
import numpy as np

# Load the PSD file
psd = PSDImage.open('high res.psd')  # Replace 'your_file.psd' with the path to your PSD file

print("Number of layers:", len(psd._layers))
print("Image size:", psd.size)
#print("Resolution:", psd._resolution)
print("Color mode:", psd.color_mode)
print("Depth:", psd.depth)

# Iterate over each layer and print its name and type
for layer in psd._layers:
    print("Layer Name:", layer.name)
    print("Layer Type:", layer.kind)
    print("Visible:", layer.visible)
    print("Opacity:", layer.opacity)
    print("Blend mode:", layer.blend_mode)
    print("Layer size:", layer.bbox)
    # Add more properties as needed
    print()

import matplotlib.pyplot as plt
def visualize_layers(psd):
    # Iterate over each layer in the PSD
    for i, layer in enumerate(psd._layers):
        # Check if the layer is a pixel layer or smart object layer
        if layer.has_pixels():
            # For pixel layers, render the image and display it
            layer_image = layer.topil()
            plt.figure(figsize=(6, 6))
            plt.imshow(layer_image)
            plt.title(f'Layer Name: {layer.name}Layer Type: {layer.kind} Pixel Layer {i}')
            plt.axis('off')
            plt.show()
        elif layer.is_group():
            print(f'Group Started: {layer.name}')
            # For smart object layers (group layers), visualize their contents recursively
            visualize_layers(layer)

# Visualize pixel and smart object layers
visualize_layers(psd)
