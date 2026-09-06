# EonPulse

A minimal new tab page with a bunch of space and time stuff I thought would be cool to have.

<img width="1911" height="883" alt="image" src="https://github.com/user-attachments/assets/ad6eb19c-4bf2-478c-947c-9f0c62651a47" />


## Overview

EonPulse is basically a new tab page that I made because the normal browser new tab pages are kinda boring.

it has the normal stuff like the clock, search and shortcuts but i wanted to add some more interesting things to it too, so it has stuff like the age of the universe, Mars time, solar activity and NASA's Astronomy Picture of the Day.

the main idea was to make something that looks simple but has a lot of little things going on in the background.

## Features

live clock and date

search bar

custom shortcuts

animated particle background

UTC time

Mars time

age of the universe

time until the Sun becomes a red giant

live solar activity

NASA Astronomy Picture of the Day

responsive layout

reduced motion support

## Screenshots

### Main page

<img width="1911" height="883" alt="image" src="https://github.com/user-attachments/assets/dddbbefb-3c1f-411e-85dc-0a12fe17100b" />


the main page with the clock, search bar, shortcuts and the space/time information.

this is the main desktop layout.

### APOD

<img width="1897" height="892" alt="image" src="https://github.com/user-attachments/assets/8e9275e3-0d72-4584-8889-6c6c2353c490" />


the NASA Astronomy Picture of the Day section opened up to show the image and its information.

## How It Works

EonPulse is split into a few smaller javascript files instead of putting everything into one massive file.

| Path                  | Contents                             |
| --------------------- | ------------------------------------ |
| `src/main.js`         | starts the app                       |
| `src/background.js`   | animated particle background         |
| `src/deepTime.js`     | time and space related calculations  |
| `src/search.js`       | search bar and URL handling          |
| `src/shortcuts.js`    | shortcut management and localStorage |
| `src/spaceWeather.js` | solar activity data                  |
| `src/apod.js`         | NASA APOD data                       |
| `src/style.css`       | styling                              |
| `index.html`          | main page                            |

## APIs

### NASA

the NASA Astronomy Picture of the Day API is used for the APOD section.

### NOAA

NOAA data is used for the solar activity section.

the other time calculations are done locally in the browser.

## Running It

clone the repo:

```bash
git clone https://github.com/Nithish1201-code/EonPulse.git
cd EonPulse
```

install the dependencies:

```bash
npm install
```

then run:

```bash
npm run dev
```

and open the local address Vite gives you.

## What I Learned

This project was mostly me wanting to mess around with a bunch of different browser stuff and see if I could make it all work together without making the page feel cluttered.

I learned more about canvas animations, working with APIs, localStorage, date/time calculations, responsive css and deploying Vite projects with GitHub Pages.

## Why I Built It

Mostly because I wanted a new tab page that i would actually want to use.

I also liked the idea of having random space/time information sitting there every time I opened a new tab.

It started as a simple new tab page and then I kept adding things that i thought were cool until it turned into this.

## Current Status

The main thing works and it's deployed on GitHub Pages.

there are still some things id like to improve later, especially the smaller interactions and some of the API handling.

## Project Structure

| Path                  | Contents                     |
| --------------------- | ---------------------------- |
| `src/`                | javascript and css           |
| `src/main.js`         | app entry point              |
| `src/background.js`   | particle background          |
| `src/deepTime.js`     | time calculations            |
| `src/search.js`       | search                       |
| `src/shortcuts.js`    | shortcuts                    |
| `src/spaceWeather.js` | NOAA data                    |
| `src/apod.js`         | NASA data                    |
| `src/style.css`       | styling                      |
| `.env.example`        | environment variable example |
| `vite.config.mjs`     | Vite configuration           |
| `package.json`        | dependencies and scripts     |
| `README.md`           | this file                    |


