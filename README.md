
# CLIPPER

install dependencies: `$ npm i`
start database: `$ rethinkdb`
start server: `$ npm run server`
mobile app: `$ npm start`
web app: `$ npm run web`

### CURRENT FUNCTIONALITY

**mobile + web**
- copy/paste youtube url to play video
- watch at 1.0x/1.5x/2.0x playback speed
- execute clip bounds with to nearest 0.1 second accuracy with user playback check
- edit clip info: `title`, `who`, `thumbnail text`

**web**
- create thumbnail images with image frame from video
- download zip file:
  -  `clip.mp4`
  - `thumbnails.png`
  - `info.txt`

### external dependency packages

- [ffmpeg](https://ffmpeg.org/download.html#build-linux)
- [youtube-dl](https://ytdl-org.github.io/youtube-dl/download.html)
- [rethinkDB](https://rethinkdb.com/docs/install/)

### developed with
- node.js v14.15.3
- npm v7.7.6

[current issues](https://github.com/ddaaggeett/clipper/issues)

Please reach out to help with a fun project. [This youtube channel](https://www.youtube.com/channel/UCJxVVEGm6TFz68Y9Qe3IZtA) is an example of this software's output. If you listen to long conversations, this project could be for you. Let's fix the limited cultural narrative capacity.

license MIT
copyright Dave Daggett @ ddaaggeett.xyz
date 2021
