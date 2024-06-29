from psd_tools import PSDImage
import matplotlib.pyplot as plt
from psd_tools.constants import BlendMode
import numpy as np
import cv2

def compute_warp_points(layer):
    # Assume the layer has a perspective transformation matrix applied
    transform_matrix = layer.transform
    if transform_matrix is None:
        raise ValueError("No transformation matrix found for the layer.")
    
    # Define the corners of the original image
    layer_height, layer_width = layer.bbox.height, layer.bbox.width
    original_corners = np.float32([[0, 0], [layer_width, 0], [layer_width, layer_height], [0, layer_height]])
    
    # Compute the warp points using the transformation matrix
    warped_points = cv2.perspectiveTransform(np.array([original_corners]), transform_matrix)
    
    return warped_points[0]

def visualize_layers(layer):
    # Visualize the layer
    layer_image = layer.topil()
    plt.figure(figsize=(6, 6))
    plt.imshow(layer_image)
    plt.title(f'Layer Name: {layer.name}  Layer Type: {layer.kind}')
    plt.axis('off')
    plt.show()

def blend_layers(psd):
    background_layer = psd._layers[5][0]  # Assuming the first layer you want to blend onto
    overlay_layer = psd._layers[3][0][1]  # Assuming the second layer you want to blend
    
    # Compute warp points for the background layer
    background_warp_points = compute_warp_points(background_layer)
    
    # Warp the overlay layer using the computed warp points
    overlay_image = overlay_layer.topil()
    overlay_width, overlay_height = overlay_image.size
    M = cv2.getPerspectiveTransform(np.float32([[0, 0], [overlay_width, 0], [overlay_width, overlay_height], [0, overlay_height]]), background_warp_points)
    warped_overlay_image = cv2.warpPerspective(np.array(overlay_image), M, (overlay_width, overlay_height))
    warped_overlay_layer = PSDImage(warped_overlay_image)
    
    # Blend the overlay layer onto the background layer using the "Normal" blend mode
    background_layer.compose(warped_overlay_layer, BlendMode.NORMAL)
    
    # Visualize the blended image
    visualize_layers(background_layer)

psd = PSDImage.open('high res.psd')

# Visualize the original layers
visualize_layers(psd._layers[5][0])
visualize_layers(psd._layers[3][0][1])

# Blend the layers and visualize the result
blend_layers(psd)
