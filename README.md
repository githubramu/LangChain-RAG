# Simple RAG pipeline using `LangChain.js`

This repository contains the JavaScript version of the python RAG implementation by **Jodie Burchell**
as demoed in her [Beyond the Hype: A Realistic Look at Large Language Models](https://www.youtube.com/watch?v=Pv0cfsastFs) GOTO 2024 presentation.

- [Original repository](https://github.com/t-redactyl/simple-rag-document-qa) (Make sure to star)

## Prerequisites

If you intend to use a local LLM through Ollama, you will need to install [Ollama](https://ollama.com/) and the [llama3 LLM model](https://ollama.com/library/llama3) via Ollama. You will also need to install the [all-minilm](https://ollama.com/library/all-minilm) embeddings model, also via Ollama.

To ensure that you have successfully downloaded and installed all of the above, run the following commands through your terminal:

- Check whether Ollama is installed: `ollama --version`

- Check whether the required models are available: `ollama list`

## Key differences between the [original python repository](https://github.com/t-redactyl/simple-rag-document-qa/tree/main) and the JavaScript version 

- This is **not** a Jupyter Notebook.

- This code uses two types of Vector stores instead of one. The original code used the `ChromaDB` vector store, whereas this repo contains code using `ChromaDB` but also code using the In-memory vector store module provided by `LangChain.js`.

- The original code used OpenAI's API to connect with a remote LLM. This code uses OpenAI along with Anthropic's Claude and also uses a local LLM powered by Ollama. In this last case, the code uses OllamaEmbeddings which in turn uses the `all-minilm` embeddings model instead of OpenAIEmbeddings.

- The `nDocuments` variable found in the original code has been renamed to `kDocuments`.

- The original code used the `CharacterSplitter` for splitting the PDF documents, whereas this repo contains a variation using the `RecursiveCharacterTextSplitter`.

## Usage

- `git clone https://github.com/in-tech-gration/simple-rag-document-qa.git`
- `cd simple-rag-document-qa`
- `npm install`
- `node rag-pdf-qa.js`

## Repository contents

This repository contains the following material:

**JavaScript Branch:**

* `rag-pdf-qa.js` contains the code for the simple RAG pipeline. There are extensive comments in the code to help you understand how to adapt this for your own use case.
* `talk-materials/talk-sources.md` contains all of the papers and other sources Jodie Burchell used for her talk. It also contains all of her image credits.
* `talk-materials/beyond-the-hype.pdf` contains a copy of her slides.

---

The repo contains the following materials for Jodie Burchell's talk delivered at GOTO Amsterdam 2024.

**[Python Branch](https://github.com/in-tech-gration/simple-rag-document-qa/tree/python-original):**

* `/notebooks/rag-pdf-qa.ipynb` contains the code for the simple python RAG pipeline she demoed during the talk. There are extensive notes in Markdown in this notebook to help you understand how to adapt this for your own use case.
* `talk-materials/talk-sources.md` contains all of the papers and other sources she used for her talk. It also contains all of her image credits.
* `talk-materials/beyond-the-hype.pdf` contains a copy of her slides.

