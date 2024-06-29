from psd_tools import PSDImage
import psd_tools
import cv2
import numpy as np

# Load the PSD file
#psd = PSDImage.open('high res.psd')  # Replace 'your_file.psd' with the path to your PSD file
psd = PSDImage.open('MOckup PRac.psd')  # Replace 'your_file.psd' with the path to your PSD file

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
def visualize_layers(layers):
    for i, layer in enumerate(layers):
        # Check if the layer is a pixel layer
        if layer.has_pixels():
            print("Layer Name:", layer.name)
            print("Layer Type:", layer.kind)
            print("Visible:", layer.visible)
            print("Opacity:", layer.opacity)
            print("Blend mode:", layer.blend_mode)
            print("Layer size:", layer.bbox)
            print()
            # For pixel layers, render the image and display it
            layer_image = layer.topil()
            plt.figure(figsize=(6, 6))
            plt.imshow(layer_image)
            plt.title(f'Layer Name: {layer.name} Layer Type: {layer.kind} Pixel Layer {i}')
            plt.axis('off')
            plt.show()
        elif layer.is_group():
            print(f'Group Started: {layer.name}')
            print()
            visualize_layers(layer)  # Recursively visualize layers within the group
        elif hasattr(layer, 'is_artboard') and layer.is_artboard():
            print(f'Artboard Started: {layer.name}')
            print()
            visualize_layers(layer)  # Recursively visualize layers within the artboard
        elif hasattr(layer, 'is_smart_object') and layer.is_smart_object():
            print("Layer Name:", layer.name)
            print("Layer Type:", layer.kind)
            print("Visible:", layer.visible)
            print("Opacity:", layer.opacity)
            print("Blend mode:", layer.blend_mode)
            print("Layer size:", layer.bbox)
            print()
            # For smart object layers, render the embedded PSD and visualize its layers
            embedded_psd = layer.smart_object
            visualize_layers(embedded_psd._layers)
        else:
            print("Unhandled Layer Type:", layer.kind)
            print()

# Visualize pixel and smart object layers
visualize_layers(psd._layers)
