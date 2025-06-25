# Sticker.ly API Wrapper – Contribution Guide

## Overview
Sticker.ly API Wrapper is a Nuxt.js-based HTTP API for searching and integrating Sticker.ly stickers, packs, tags, and artists. It provides endpoints and documentation for easy integration.

## Structure
- `server/api/v1/`: API endpoint handlers by resource
- `server/utils/`: Utilities for fetching, mapping, and formatting
- `content/`: Markdown documentation
- `app/`: Nuxt.js docs website

## Conventions
- **Responses**: Use `responseFormatter.ts` for all API responses
- **Mapping**: Use mappers in `server/utils/` for data transformation
- **Error Handling**: Use try/catch and return formatted errors
- **TypeScript**: Type all variables and functions
- **Docs**: Update `content/` docs for any API changes

## Resources
- **Stickers**: Individual items
- **Packs**: Sticker collections
- **Tags**: Categories/labels
- **Artists**: Sticker creators
- **Home Tabs**: Featured sections

## Common Tasks

### Add an Endpoint
1. Add a file in `server/api/v1/`
2. Use utility functions for fetch/transform
3. Add error handling
4. Document in `content/`

### Modify Response Data
1. Update the relevant mapper in `server/utils/`
2. Update types in `types.ts` if needed
3. Update docs in `content/`
