# a.py
import sys
import os
import torch
from dotenv import load_dotenv
from diffusers import StableDiffusionPipeline
from PIL import Image

# Load environment variables from .env
load_dotenv()

class CFG:
    device = "cuda" if torch.cuda.is_available() else "cpu"
    seed = 500
    generator = torch.Generator().manual_seed(seed)
    image_gen_steps = 50
    image_gen_model_id = "stabilityai/stable-diffusion-2"
    image_gen_size = (360, 360)
    image_gen_guidance_scale = 9
    hf_token = os.getenv("HF_TOKEN")  # Load token from environment

# Read the prompt from command-line arguments
prompt = sys.argv[1] if len(sys.argv) > 1 else "A fantasy landscape"

# Load the model
image_gen_model = StableDiffusionPipeline.from_pretrained(
    CFG.image_gen_model_id,
    torch_dtype=torch.float16 if CFG.device == "cuda" else torch.float32,
    variant="fp16" if CFG.device == "cuda" else None,
    token=CFG.hf_token
)

# Move model to appropriate device
image_gen_model = image_gen_model.to(CFG.device)

# Generate the image
image = image_gen_model(
    prompt,
    num_inference_steps=CFG.image_gen_steps,
    generator=CFG.generator,
    guidance_scale=CFG.image_gen_guidance_scale
).images[0]

# Resize and save image
image = image.resize(CFG.image_gen_size)
output_path = "output.png"
image.save(output_path)

# Output the file path for Node backend
print(output_path)
