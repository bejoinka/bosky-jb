# Sample extension component

Running the repo

1. Copy the `.env.example` file to `.env.local` in the host directory and add an API key for development (for the getPathways query)

2. Run the following commands in three terminal windows:

```bash
# terminal 1 --> build your react app (using vite) and run a watch, so it rebuilds as you make changes
$ cd extension-as-react-app && npm i && npm run build -- --watch

# terminal 2 --> serve your vite app
$ cd extension-as-react-app && npm run preview

# terminal 3 --> install deps and run your nextjs app
$ cd host && npm i && npm run dev
```

the extension component is rendered as part of the DOM inside the nextjs application, meaning there are no boundaries for CSS
