import cv2
import numpy as np
from mrcnn import visualize
from mrcnn.config import Config
from mrcnn.model import MaskRCNN

# Define the Mask R-CNN configuration for your specific model (e.g., COCO weights)
class ClothingConfig(Config):
    NAME = "clothing"
    GPU_COUNT = 1
    IMAGES_PER_GPU = 1
    NUM_CLASSES = 2  # Background + Clothing

config = ClothingConfig()

# Create and load the Mask R-CNN model with pre-trained weights
model = MaskRCNN(mode="inference", config=config, model_dir='./')
model.load_weights('path_to_pretrained_weights.h5', by_name=True)

# Load the original image and the replacement color image
original_image = cv2.imread('model.jpg')
replacement_color_image = cv2.imread('bg.jpg')

# Run the Mask R-CNN model to detect and segment the clothing
results = model.detect([original_image], verbose=1)
r = results[0]

# Create a mask for the clothing (class_id = 1)
clothing_mask = r['masks'][:, :, 0]

# Create a mask for the background
background_mask = np.invert(clothing_mask)

# Apply the replacement color to the clothing area
original_image[clothing_mask] = replacement_color_image[clothing_mask]

# Display the result or save it to a file
cv2.imshow('Replaced Image', original_image)
cv2.waitKey(0)
cv2.destroyAllWindows()
# To save the result:
# cv2.imwrite('result_image.jpg', original_image)
