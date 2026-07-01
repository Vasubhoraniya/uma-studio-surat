import subprocess, sys

# Auto-install dependencies
for pkg, pip_name in [("cloudinary", "cloudinary"), ("dotenv", "python-dotenv")]:
    try:
        __import__(pkg)
    except ImportError:
        subprocess.check_call([sys.executable, "-m", "pip", "install", pip_name])

import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
import os

load_dotenv(".env")

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

uploads = [
    {
        "file": "0202.jpg",
        "public_id": "umaphotostudio/0202",
        "label": "About Us Mobile Cover"
    },
    {
        "file": "324 copy.jpg",
        "public_id": "umaphotostudio/324_copy",
        "label": "Home Page Mobile Cover"
    }
]

results = {}

for item in uploads:
    filepath = item["file"]
    if not os.path.exists(filepath):
        print(f"[ERROR] File not found: {filepath}")
        continue
    
    size_mb = os.path.getsize(filepath) / (1024 * 1024)
    print(f"\n[UPLOADING] {item['label']}: {filepath} ({size_mb:.2f} MB)...")
    
    try:
        response = cloudinary.uploader.upload(
            filepath,
            public_id=item["public_id"],
            overwrite=True,
            resource_type="image",
            invalidate=True
        )
        url = response.get("secure_url")
        print(f"[SUCCESS] Uploaded: {url}")
        results[item["label"]] = url
    except Exception as e:
        print(f"[FAIL] {item['label']}: {e}")

print("\n--- UPLOAD SUMMARY ---")
for label, url in results.items():
    print(f"{label}: {url}")
print("----------------------")
