from psd_tools import PSDImage
from PIL import Image

def find_layer_by_name(layers, name):
    for layer in layers:
        if layer.name == name:
            return layer
        if layer.kind == 'group':
            result = find_layer_by_name(layer, name)
            if result:
                return result
    return None

def apply_pattern_to_parts(psd_path, pattern_paths, part_names, output_path):
    psd = PSDImage.open(psd_path)
    final_image = Image.new("RGBA", psd.size)
    modified_parts = {}

    if len(pattern_paths) != len(part_names):
        raise ValueError("The number of patterns and part names must match")
    
    for pattern_path, part_name in zip(pattern_paths, part_names):
        part_layer = find_layer_by_name(psd, part_name)
        if part_layer is None:
            raise ValueError(f"Part '{part_name}' not found in the PSD file")

        pattern = Image.open(pattern_path)
        part_image = part_layer.composite()

        resized_pattern = pattern.resize(part_image.size)
        part_image = Image.composite(resized_pattern, part_image, part_image)

        modified_parts[part_name] = (part_image, part_layer.offset)

    # Composite all layers to the final image
    def composite_layers(layers, final_image):
        for layer in layers:
            if layer.kind == 'group':
                composite_layers(layer, final_image)
            else:
                if layer.name in modified_parts:
                    part_image, offset = modified_parts[layer.name]
                    final_image.paste(part_image, offset, part_image)
                else:
                    final_image.paste(layer.composite(), layer.offset, layer.composite())

    #composite_layers(psd, final_image)

    for i in modified_parts:
        part_image, offset = modified_parts[i]
        final_image.paste(part_image, offset, part_image)
    
    # Save the final image
    final_image.save(output_path, "PNG")

apply_pattern_to_parts('MOckup PRac.psd', ['s.png','blue.png', 'red_bg.png'], ['Right Sleeves texture (Liquify) (Levels) (Normal)','Left Sleeves texture (Liquify) (Normal)','Main Body'], 'some.png')
