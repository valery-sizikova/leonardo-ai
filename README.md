This application is create as Tech Challenge for Leonardo.Ai.

You can find a deployment here - https://leonardo-ai.vercel.app/

It allows a new user to enter their name and job title and then access an Info page where they can find a list of all episodes
of Rick and Morty. Each episode is clickable and opens up additional info on it in a modal.

While user is "logged in" they can also navigate to Profile page via the top right menu. They can also logout, which will automatically propt the "intro" modal to show up again.

Here you can find a video with a demo - https://www.loom.com/share/d146b527b8ea4fc99b1971c389460d11

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## To run locally

Install dependencies:
```bash
npm i
```

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Developer's notes

This is my first time using the latest version on NextJS with App Router + React Server Components. I could not avoid some issues with hydration, given more time I would look into that. Mostly it is caused by the usage of `localStorage` for data persistence, which I chose for the sake of speed.
