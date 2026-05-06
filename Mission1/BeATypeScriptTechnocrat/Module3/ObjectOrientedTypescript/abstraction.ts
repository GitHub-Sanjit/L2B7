//* OOP --> abstraction
/* 
  1. Interface
  2. Abstract class
*/

/** 
interface MediaPlayer {
  play(): void;
  pause(): void;
  stop(): void;
}

class MusicPlayer implements MediaPlayer {
  play() {
    console.log("Playing Music....");
  }
  pause() {
    console.log("Pausing the Music....");
  }
  stop() {
    console.log("Stoping the Music....");
  }
}

const maxPlayer = new MusicPlayer();

maxPlayer.play();

*/

abstract class MediaPlayer {
  abstract play(): void;
  abstract pause(): void;
  abstract stop(): void;
}

class MusicPlayer extends MediaPlayer {
  play(): void {
    console.log("Playing Music");
  }
  pause(): void {
    console.log("Pausing Music");
  }
  stop(): void {
    console.log("Stoping Music");
  }
}

const maxPlayer = new MusicPlayer();

maxPlayer.play();
maxPlayer.pause();
maxPlayer.stop();
