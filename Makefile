# Extension name
EXTENSION_NAME = commonplace-book
VERSION = 1.3.0

# Directories
SRC_DIR = src
ICONS_DIR = icons
DIST_DIR = dist
ZIP_DIR = $(DIST_DIR)/$(EXTENSION_NAME)-v$(VERSION)

# Files to include
FILES = \
	manifest.json \
	$(SRC_DIR)/popup.html \
	$(SRC_DIR)/popup.js \
	$(SRC_DIR)/styles.css \
	$(SRC_DIR)/background.js \
	$(SRC_DIR)/content.js

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
	cp $(FILES) $(ZIP_DIR)/
	cp -r $(ICONS_DIR) $(ZIP_DIR)/

# Create zip file
package: $(ZIP_DIR)
	cd $(DIST_DIR) && zip -r $(EXTENSION_NAME)-v$(VERSION).zip $(EXTENSION_NAME)-v$(VERSION)
	@echo "\nExtension packaged successfully!"
	@echo "Zip file location: $(DIST_DIR)/$(EXTENSION_NAME)-v$(VERSION).zip"

# Clean up temporary files
distclean: clean
	rm -f $(DIST_DIR)/*.zip

.PHONY: all clean package distclean 
