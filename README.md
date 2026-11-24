> **Frontend configuration.** Set `VITE_BACKEND_API_URL` to the Express API base including `/api` and `VITE_AI_SERVICE_URL` to the FastAPI service origin when deploying. Local defaults are `http://localhost:5000/api` and `http://localhost:8000`. The frontend uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Keep `SUPABASE_SERVICE_ROLE_KEY` in the server environments only.

# Akashvaani AI

A HackMSIT team prototype for discovering government schemes. The application combines document OCR, profile extraction and eligibility scoring to help users explore relevant schemes.

## Repository layout

| Directory | Purpose |
| --- | --- |
| [frontend](frontend) | React and Vite user interface |
| [backend](backend) | Node.js and Express application API |
| [ai-service](ai-service) | FastAPI service for OCR, profile extraction and eligibility logic |

## Local development

Install the Node dependencies in both JavaScript directories and run `npm run dev` from each. In `ai-service`, create a Python virtual environment, install `requirements.txt` and run `uvicorn app.main:app` from that directory. Configure local service URLs and your own Supabase credentials in untracked environment files. OCR also requires a local Tesseract installation. Use sample documents when evaluating the prototype.

## Attribution

This repository is a fork of the original HackMSIT team project. GitHub’s parent repository link and commit history identify the upstream project and contributors.
