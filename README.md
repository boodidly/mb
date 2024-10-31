# Ollama Terminal UI

A colorful terminal interface for interacting with Ollama AI models.

![Terminal UI Preview](https://i.imgur.com/placeholder.png)

## Prerequisites

First, install the required system packages on Arch Linux:

```bash
sudo pacman -S nodejs npm ollama
```

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd ollama-terminal
```

2. Install dependencies:
```bash
npm install
```

## Setting up Ollama

1. Start the Ollama service:
```bash
sudo systemctl start ollama
```

2. Enable Ollama to start on boot (optional):
```bash
sudo systemctl enable ollama
```

3. Pull the models you want to use:
```bash
ollama pull llama2
ollama pull codellama
ollama pull mistral
ollama pull neural-chat
```

## Usage

1. Start the terminal interface:
```bash
npm start
```

2. Use the interface:
   - Select a model using arrow keys
   - Type your prompts and press Enter
   - Type `exit` to quit

## Available Models

- 🦙 Llama 2 - General purpose model
- 👨‍💻 Code Llama - Specialized for code generation
- 🌪 Mistral - Fast and efficient model
- 🧠 Neural Chat - Optimized for conversation

## Troubleshooting

If you encounter any issues:

1. Check if Ollama is running:
```bash
systemctl status ollama
```

2. Verify the Ollama API is accessible:
```bash
curl http://localhost:11434/api/tags
```

3. Make sure you have pulled the models:
```bash
ollama list
```

## System Requirements

- Node.js 18 or higher
- npm 8 or higher
- Ollama latest version
- At least 8GB RAM (16GB recommended for larger models)
- Sufficient disk space for AI models (varies by model)