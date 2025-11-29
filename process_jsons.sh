



# #!/bin/bash

# # Set the directories and metadata file
# INPUT_DIR="./All Data"   # Replace with the path to your JSON files
# OUTPUT_DIR="./pakistani_fashion_dataset"
# METADATA_FILE="metadata.jsonl"

# # Create the output directory if it doesn't exist
# mkdir -p "$OUTPUT_DIR"

# # Initialize the counter
# counter=1

# # Clear the metadata file if it exists
# > "$METADATA_FILE"

# # Check if jq is installed
# if ! command -v jq &> /dev/null
# then
#     echo "Error: jq is not installed. Install it by running 'sudo apt-get install jq' or 'brew install jq'."
#     exit 1
# fi

# # Loop over all JSON files in the input directory
# for json_file in "$INPUT_DIR"/*.json; do
#     # Check if the file exists
#     if [[ ! -f "$json_file" ]]; then
#         echo "No JSON files found in $INPUT_DIR."
#         break
#     fi

#     # Extract the description and first image URL using jq
#     description=$(jq -r '.description' "$json_file")
#     image_url=$(jq -r '.imageUrls[0]' "$json_file")

#     # Check if the image URL exists
#     if [ "$image_url" = "null" ] || [ -z "$image_url" ]; then
#         echo "No image URL found in $json_file"
#         continue
#     fi

#     # Get the content type and determine the file extension
#     content_type=$(curl -sI "$image_url" | grep -i 'Content-Type:' | awk '{print $2}' | tr -d '\r')
#     if [[ "$content_type" == *"image/jpeg"* ]] || [[ "$image_url" == *.jpg ]] || [[ "$image_url" == *.jpeg ]]; then
#         extension=".jpg"
#     elif [[ "$content_type" == *"image/png"* ]] || [[ "$image_url" == *.png ]]; then
#         extension=".png"
#     elif [[ "$content_type" == *"image/webp"* ]] || [[ "$image_url" == *.webp ]]; then
#         extension=".webp"
#     else
#         extension=".jpg"  # Default to .jpg if unknown
#     fi

#     # Set the image filename and path
#     image_filename="${counter}${extension}"
#     image_path="$OUTPUT_DIR/$image_filename"

#     # Download the image
#     curl -s -o "$image_path" "$image_url"
#     if [ $? -ne 0 ]; then
#         echo "Failed to download image from $image_url"
#         continue
#     fi

#     # Add the metadata entry to the JSON Lines file
#     metadata_entry=$(jq -n --arg file_name "$image_filename" --arg text "$description" '{file_name: $file_name, text: $text}')
#     echo "$metadata_entry" >> "$METADATA_FILE"

#     echo "Processed $json_file, saved image as $image_filename"

#     # Increment the counter
#     counter=$((counter + 1))
# done

#!/bin/bash

# Set the directories and metadata file
INPUT_DIR="./All Data"   # Replace with the path to your JSON files
OUTPUT_DIR="./pakistani_fashion_dataset"
METADATA_FILE="metadata.jsonl"

# Create the output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Initialize the counter
counter=1

# Clear the metadata file if it exists
> "$METADATA_FILE"

# Check if jq is installed
if ! command -v jq &> /dev/null
then
    echo "Error: jq is not installed. Install it by running 'sudo apt-get install jq' or 'brew install jq'."
    exit 1
fi

# Loop over all JSON files in the input directory
for json_file in "$INPUT_DIR"/*.json; do
    # Check if the file exists
    if [[ ! -f "$json_file" ]]; then
        echo "No JSON files found in $INPUT_DIR."
        break
    fi

    # Extract the description and first image URL using jq
    description=$(jq -r '.description' "$json_file")
    image_url=$(jq -r '.imageUrls[0]' "$json_file")

    # Check if the image URL exists
    if [ "$image_url" = "null" ] || [ -z "$image_url" ]; then
        echo "No image URL found in $json_file"
        continue
    fi

    # Get the content type and determine the file extension
    content_type=$(curl -sI "$image_url" | grep -i 'Content-Type:' | awk '{print $2}' | tr -d '\r')
    if [[ "$content_type" == *"image/jpeg"* ]] || [[ "$image_url" == *.jpg ]] || [[ "$image_url" == *.jpeg ]]; then
        extension=".jpg"
    elif [[ "$content_type" == *"image/png"* ]] || [[ "$image_url" == *.png ]]; then
        extension=".png"
    elif [[ "$content_type" == *"image/webp"* ]] || [[ "$image_url" == *.webp ]]; then
        extension=".webp"
    else
        extension=".jpg"  # Default to .jpg if unknown
    fi

    # Set the image filename and path
    image_filename="${counter}${extension}"
    image_path="$OUTPUT_DIR/$image_filename"

    # Download the image
    curl -s -o "$image_path" "$image_url"
    if [ $? -ne 0 ]; then
        echo "Failed to download image from $image_url"
        continue
    fi

    # Ensure the description is UTF-8 encoded and replace newline characters with spaces
    description_clean=$(echo "$description" | iconv -c -t UTF-8 | tr '\n' ' ')

    # Add the metadata entry to the JSON Lines file using compact JSON
    metadata_entry=$(jq -c -n --arg file_name "$image_filename" --arg text "$description_clean" '{file_name: $file_name, text: $text}')
    echo "$metadata_entry" >> "$METADATA_FILE"

    echo "Processed $json_file, saved image as $image_filename"

    # Increment the counter
    counter=$((counter + 1))
done
