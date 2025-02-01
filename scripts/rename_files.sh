#!/bin/bash

DIR="/Users/bb/code/my_blog/tmp/"

# Counter for new file names
counter=1

# Loop through each file in the directory
for file in "$DIR"/Pasted\ image*; do
  # Get the file extension
  extension="${file##*.}"
  
  # Rename the file
  mv "$file" "$DIR/$counter.$extension"
  
  # Increment the counter
  counter=$((counter + 1))
done
