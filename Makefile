# Extension name
EXTENSION_NAME = commonplace-book

# Directories
SRC_DIR = src
ICONS_DIR = icons
DIST_DIR = dist
ZIP_DIR = $(DIST_DIR)/$(EXTENSION_NAME)

# Files to include
FILES = \
	manifest.json \
	$(SRC_DIR) \
	$(ICONS_DIR)

# Default target
all: clean package

# Clean distribution directory
clean:
	rm -rf $(DIST_DIR)

# Create distribution directory
$(DIST_DIR):
	mkdir -p $(DIST_DIR)

# Copy files to distribution directory
$(ZIP_DIR): $(DIST_DIR)
	mkdir -p $(ZIP_DIR)
	cp -r $(FILES) $(ZIP_DIR)/

# Create zip file
package: $(ZIP_DIR)
	cd $(DIST_DIR) && zip -r $(EXTENSION_NAME).zip $(EXTENSION_NAME)
	@echo "\nExtension packaged successfully!"
	@echo "Zip file location: $(DIST_DIR)/$(EXTENSION_NAME)"

# Clean up temporary files
distclean: clean
	rm -f $(DIST_DIR)/*.zip

.PHONY: all clean package distclean 
