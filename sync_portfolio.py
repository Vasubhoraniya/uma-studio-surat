import os
import sys
import json
import hashlib
import time
import subprocess

# ==============================================================================
# 🚀 AUTOMATIC DEPENDENCY BOOTSTRAPPER
# ==============================================================================
required_packages = {
    "cloudinary": "cloudinary",
    "dotenv": "python-dotenv"
}

installed_any = False
for module_name, pip_name in required_packages.items():
    try:
        __import__(module_name)
    except ImportError:
        print(f"[PACKAGES] Installing missing dependency: '{pip_name}'...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", pip_name])
        installed_any = True

if installed_any:
    print("[SUCCESS] All dependencies successfully installed and verified!\n")

# Import the newly verified packages
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv

# ==============================================================================
# 🔑 CREDENTIALS LOAD / TEMPLATE CREATION
# ==============================================================================
ENV_FILE = ".env"
MANIFEST_FILE = ".cloudinary_manifest.json"

# Create a template .env file if it doesn't exist
if not os.path.exists(ENV_FILE):
    with open(ENV_FILE, "w", encoding="utf-8") as f:
        f.write("# Cloudinary API Credentials\n")
        f.write("# Replace the placeholders below with your actual details from your Cloudinary dashboard!\n\n")
        f.write("CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name\n")
        f.write("CLOUDINARY_API_KEY=your_api_key\n")
        f.write("CLOUDINARY_API_SECRET=your_api_secret\n")
    
    print("=" * 70)
    print("[INFO] CREATED A TEMPLATE '.env' FILE IN YOUR PROJECT FOLDER!")
    print("=" * 70)
    print("Before running this script, please open the newly created '.env' file")
    print("and replace the placeholders with your actual Cloudinary credentials:")
    print("  1. CLOUDINARY_CLOUD_NAME")
    print("  2. CLOUDINARY_API_KEY")
    print("  3. CLOUDINARY_API_SECRET")
    print("=" * 70)
    sys.exit(0)

# Load variables from .env file
load_dotenv(ENV_FILE)

cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME")
api_key = os.getenv("CLOUDINARY_API_KEY")
api_secret = os.getenv("CLOUDINARY_API_SECRET")

# Check if placeholders are still present
if not cloud_name or "your_cloudinary_cloud" in cloud_name or not api_key or "your_api_key" in api_key:
    print("[ERROR] Your '.env' file is still using placeholder values!")
    print("Please open the '.env' file and put your actual Cloudinary API keys first.")
    sys.exit(1)

# Configure Cloudinary SDK
cloudinary.config(
    cloud_name=cloud_name,
    api_key=api_key,
    api_secret=api_secret,
    secure=True
)

# ==============================================================================
# 🗃️ LOCAL MANIFEST (CACHE SYSTEM FOR INCREMENTAL SYNC)
# ==============================================================================
def load_manifest():
    if os.path.exists(MANIFEST_FILE):
        try:
            with open(MANIFEST_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {}
    return {}

def save_manifest(manifest):
    with open(MANIFEST_FILE, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

def get_file_hash(filepath):
    """Calculate MD5 hash of a file to check if it has been modified."""
    hasher = hashlib.md5()
    with open(filepath, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            hasher.update(chunk)
    return hasher.hexdigest()

# ==============================================================================
# 🔄 MAIN PORTFOLIO SYNC ENGINE
# ==============================================================================
def sync_portfolio():
    print("--- UMA PHOTO STUDIO - SMART PORTFOLIO SYNC ---\n")
    
    images_dir = "images"
    if not os.path.isdir(images_dir):
        print(f"[ERROR] Could not find '{images_dir}/' folder in the current directory!")
        print("Please make sure you run this script from your project's root folder.")
        sys.exit(1)

    # 1. Scan local images
    local_files = []
    valid_extensions = (".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg")
    
    for root, _, files in os.walk(images_dir):
        for file in files:
            if file.lower().endswith(valid_extensions):
                full_path = os.path.join(root, file)
                # Keep it as forward slashes for cross-platform and cloud consistency
                relative_path = os.path.relpath(full_path, ".").replace("\\", "/")
                local_files.append((full_path, relative_path))
                
    total_found = len(local_files)
    print(f"[SCAN] Scanned local images: Found {total_found} photos.")

    # 2. Load manifest cache
    manifest = load_manifest()
    
    to_upload = []
    skipped_count = 0
    
    for full_path, rel_path in local_files:
        file_hash = get_file_hash(full_path)
        file_size = os.path.getsize(full_path)
        
        # Skip if MD5 matches what we already successfully uploaded
        if rel_path in manifest and manifest[rel_path].get("hash") == file_hash:
            skipped_count += 1
        else:
            to_upload.append((full_path, rel_path, file_hash, file_size))

    print(f"[SYNC] Smart Caching: {skipped_count} photos are already uploaded and untouched. Skipping them!")
    
    if not to_upload:
        print("\n[SUCCESS] All photos are 100% in sync! Your cloud is fully updated.")
        print("[INFO] Tip: You can now set 'enabled: true' inside 'js/data.js' under window.CLOUDINARY_CONFIG!")
        return

    total_upload_size_mb = sum(item[3] for item in to_upload) / (1024 * 1024)
    print(f"[SYNC] Prepare to upload {len(to_upload)} new/modified photos (~{total_upload_size_mb:.2f} MB)...")
    print("-" * 70)

    # 3. Upload loop
    success_count = 0
    failed_count = 0
    start_time = time.time()
    
    # 9.9 MB safety threshold for Cloudinary free tier (10,380,902 bytes)
    MAX_BYTES = 10400000 
    
    for i, (full_path, rel_path, file_hash, file_size) in enumerate(to_upload, 1):
        # We replace "images/" with our cloud root "umaphotostudio/"
        cloud_path = rel_path.replace("images/", "umaphotostudio/")
        
        # Cloudinary uses filename as public_id, but excludes extension.
        # We preserve the exact path structure and filename (minus extension)
        public_id_with_folders_raw, _ = os.path.splitext(cloud_path)
        
        # Sanitize public ID: replace spaces, ampersands, and special characters with underscores
        public_id_with_folders = "".join(
            c if (c.isalnum() or c in ('/', '_', '-', '.')) else '_' 
            for c in public_id_with_folders_raw
        )
        
        upload_path = full_path
        is_temp = False
        
        # If file exceeds Cloudinary's 10MB limit, compress it dynamically on-the-fly
        if file_size > MAX_BYTES:
            print(f"[{i}/{len(to_upload)}] [LIMIT] {rel_path} ({file_size / (1024 * 1024):.2f} MB) exceeds 10MB limit. Compressing dynamically...")
            try:
                from PIL import Image
                img = Image.open(full_path)
                
                _, ext = os.path.splitext(full_path)
                temp_path = "temp_upload" + ext.lower()
                
                # Check and clean format
                img_format = img.format if img.format else "JPEG"
                if img_format == "MPO":  # Some DSLRs save multiple picture objects
                    img_format = "JPEG"
                
                # Handle RGBA/transparency for JPEG conversion
                if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                    img = img.convert('RGB')
                
                # Recursively compress down to fit exactly under the 10MB limit
                quality = 95
                while quality >= 50:
                    img.save(temp_path, "JPEG" if img_format in ("JPEG", "JPG", "MPO") else img_format, quality=quality, optimize=True)
                    temp_size = os.path.getsize(temp_path)
                    if temp_size <= MAX_BYTES:
                        break
                    quality -= 5
                
                print(f"       -> Compressed successfully: {file_size / (1024 * 1024):.2f} MB -> {temp_size / (1024 * 1024):.2f} MB (Quality: {quality}%)")
                upload_path = temp_path
                is_temp = True
            except Exception as ce:
                print(f"       -> [WARN] Compression failed: {ce}. Attempting direct upload anyway...")
                upload_path = full_path
                is_temp = False
        else:
            print(f"[{i}/{len(to_upload)}] Uploading: {rel_path} ({file_size / (1024 * 1024):.2f} MB)...")
        
        try:
            # Uploading high-res file to Cloudinary.
            response = cloudinary.uploader.upload(
                upload_path,
                public_id=public_id_with_folders,
                overwrite=True,
                resource_type="image",
                invalidate=True
            )
            
            # Save success metadata to manifest cache using ORIGINAL file hash!
            manifest[rel_path] = {
                "hash": file_hash,
                "url": response.get("secure_url"),
                "uploaded_at": time.strftime("%Y-%m-%d %H:%M:%S")
            }
            save_manifest(manifest)
            success_count += 1
            
        except Exception as e:
            print(f"[FAIL] FAILED to upload {rel_path}! Error: {e}")
            failed_count += 1
        finally:
            # Clean up temp file
            if is_temp and os.path.exists(upload_path):
                try:
                    os.remove(upload_path)
                except Exception:
                    pass
            
    # 4. Summary report
    elapsed_time = time.time() - start_time
    print("-" * 70)
    print("SYNC COMPLETE SUMMARY:")
    print("-" * 70)
    print(f"Successfully Uploaded: {success_count} photos")
    if failed_count > 0:
        print(f"Failed Uploads: {failed_count} photos")
    print(f"Total Time Elapsed: {elapsed_time:.1f} seconds")
    print(f"Cloud Sync Saved: {skipped_count} identical photos from re-uploading.")
    
    print("\nNEXT STEPS:")
    print("1. Open 'js/data.js' in your text editor.")
    print(f"2. Set 'cloudName: \"{cloud_name}\"' and 'enabled: true' inside window.CLOUDINARY_CONFIG.")
    print("3. Launch your website locally and verify that photos load instantly and download in full DSLR quality!")
    print("4. Once verified, copy your local 'images/' folder to a backup hard drive, and delete it from your code folder.")
    print("-" * 70)

if __name__ == "__main__":
    try:
        sync_portfolio()
    except KeyboardInterrupt:
        print("\n\nProcess interrupted by user. Caches saved, safely exiting.")
        sys.exit(0)
