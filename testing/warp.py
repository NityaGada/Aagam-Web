"""import cv2
import numpy as np
from psd_tools import PSDImage

def warp_and_blend_psd(psd_file, overlay_image_path, output_path):
    # Load the PSD file
    psd = PSDImage.open(psd_file)

    # Extract the white layer (or any desired layer) from the PSD file
    white_layer = psd._layers[5][0]
    if white_layer is None:
        raise ValueError("White layer not found in PSD file.")

    # Convert the white layer to a numpy array
    white_layer_data = np.array(white_layer.topil())

    # Define the corners of the white layer
    layer_height, layer_width = white_layer_data.shape[:2]
    layer_corners = np.float32([[0, 0], [layer_width, 0], [layer_width, layer_height], [0, layer_height]])
    print("Layer dimensions:", layer_height, "x", layer_width)

    # Define the new corners for the warp transformation
    new_corners = np.float32([[0, 0], [layer_width, 0], [layer_width * 0.8, layer_height * 0.2], [layer_width * 0.2, layer_height * 0.8]])

    # Compute the perspective transform matrix
    M = cv2.getPerspectiveTransform(layer_corners, new_corners)

    # Warp the white layer
    warped_white_layer = cv2.warpPerspective(white_layer_data, M, (layer_width, layer_height))

    # Load the overlay image
    overlay_image = cv2.imread(overlay_image_path)

    # Print dimensions of overlay image
    overlay_height, overlay_width = overlay_image.shape[:2]
    print("Overlay dimensions:", overlay_height, "x", overlay_width)

    # Crop the overlay image to match the dimensions of the warped white layer
    overlay_image = overlay_image[:layer_height, :layer_width]

    # Blend the overlay image onto the warped white layer
    result = cv2.addWeighted(warped_white_layer, 1, overlay_image, 0.5, 0)

    # Save the result
    cv2.imwrite(output_path, result)

# Example usage:
psd_file = 'high res.psd'
overlay_image_path = 'red_bg.png'
output_path = 'output.jpg'
warp_and_blend_psd(psd_file, overlay_image_path, output_path)
"""






import cv2
import numpy as np
from psd_tools import PSDImage

def warp_and_blend_psd(psd_file, overlay_image_index, output_path):
    # Load the PSD file
    psd = PSDImage.open(psd_file)

    # Extract the white layer (or any desired layer) from the PSD file
    white_layer = psd._layers[5][0]
    if white_layer is None:
        raise ValueError("White layer not found in PSD file.")

    # Convert the white layer to a numpy array
    white_layer_data = np.array(white_layer.topil())

    # Define the corners of the white layer
    layer_height, layer_width = white_layer_data.shape[:2]
    layer_corners = np.float32([[0, 0], [layer_width, 0], [layer_width, layer_height], [0, layer_height]])
    print("Layer dimensions:", layer_height, "x", layer_width)

    # Define the new corners for the warp transformation
    new_corners = np.float32([[0, 0], [layer_width, 0], [layer_width * 0.8, layer_height * 0.2], [layer_width * 0.2, layer_height * 0.8]])

    # Compute the perspective transform matrix
    M = cv2.getPerspectiveTransform(layer_corners, new_corners)

    # Warp the white layer
    warped_white_layer = cv2.warpPerspective(white_layer_data, M, (layer_width, layer_height))

    # Extract the overlay image layer from the PSD file
    overlay_layer = psd._layers[overlay_image_index][1]
    if overlay_layer is None:
        raise ValueError("Overlay layer not found in PSD file.")

    # Convert overlay layer to a PIL Image and then to a numpy array
    overlay_layer_data = np.array(overlay_layer.as_PIL())

    # Crop the overlay image to match the dimensions of the warped white layer
    overlay_layer_data = overlay_layer_data[:layer_height, :layer_width]

    # Blend the overlay image onto the warped white layer
    result = cv2.addWeighted(warped_white_layer, 1, overlay_layer_data, 0.5, 0)

    # Save the result
    cv2.imwrite(output_path, result)

# Example usage:
psd_file = 'high res.psd'
overlay_image_index = 3  # Adjust as per the index of the overlay image layer in the PSD file
output_path = 'output.jpg'
warp_and_blend_psd(psd_file, overlay_image_index, output_path)
