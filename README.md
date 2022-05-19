# ||--------CLIPPER--------||
### mobile [youtube, etc.] video clipper while watching

Please reach out to help with a fun project. [This youtube channel](https://www.youtube.com/c/ddaaggeett/videos) is an example of this software's output. If you listen to long conversations, this project could be for you. Let's fix the limited cultural narrative capacity.

prerequisite installs: [node.js](https://nodejs.org/en/download/), [rethinkDB](https://rethinkdb.com/docs/install/), [ffmpeg](https://ffmpeg.org/download.html#build-linux), [youtube-dl](https://ytdl-org.github.io/youtube-dl/download.html), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable), [expo-cli](https://docs.expo.dev/get-started/installation/)

read the [documentation](https://github.com/ddaaggeett/clipper/wiki)

	git clone https://github.com/ddaaggeett/clipper.git
	cd clipper
	yarn

- `npm run server` - start server
- `npm run web` - start web app
- `npm start` - start native app

### CURRENT FUNCTIONALITY

**mobile + web**
- copy/paste youtube url to play video
- watch at 1.0x/1.5x/2.0x playback speed
- execute clip bounds to nearest 0.1 second accuracy with user playback check
- edit clip info: `title`, `who`, `thumbnail text`

**web**
- create thumbnail images with image frame from video
- download zip file:
  - `clip.mp4`
  - `thumbnails.png`
  - `info.txt`

# developers: visit the [wiki](https://github.com/ddaaggeett/clipper/wiki)

<img src="/assets/demo.jpg" width="300" height="" alt="demo image">

license MIT<br />
copyright Dave Daggett @ ddaaggeett.xyz<br />
date 2022<br />
