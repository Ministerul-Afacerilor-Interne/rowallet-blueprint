FROM node:20.19.5-bookworm-slim

# Install basic development utilities
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace

# Expose the Docusaurus development server and PlantUML server
EXPOSE 3000 8080
