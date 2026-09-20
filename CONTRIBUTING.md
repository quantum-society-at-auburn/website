# Contributing content

Most club content (slides, notes, notebooks, schedule, forms) is added through the Decap CMS admin panel at `/website/admin/`, not by editing files directly.

## Content size policy

Decap commits uploaded files straight onto `main`. **Do not upload large binaries** (large PDFs, `.pptx` decks, video, etc.) through the CMS media library — link to them from external storage instead (e.g. a shared Google Drive folder) and put the link in the entry's `fileUrl` field. Keep anything committed to the repo small (small PDFs, images, markdown, notebook stub metadata).

## Notebooks

The `notebooks` collection stores metadata and links only (`githubUrl`, `colabUrl`) — it does not store `.ipynb` files or their content. Host the actual notebook on GitHub or Google Colab and link to it.
