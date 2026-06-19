declare namespace JSX {
  interface IntrinsicElements {
    'wistia-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      'media-id'?: string;
      aspect?: string;
      autoplay?: string;
      muted?: string;
      loop?: string;
      playbar?: string;
      'volume-control'?: string;
      'fullscreen-button'?: string;
      'playback-rate-control'?: string;
      'settings-control'?: string;
      'small-play-button'?: string;
      'end-video-behavior'?: string;
      sharing?: string;
      'download-button'?: string;
      'plugin-share'?: string;
    }, HTMLElement>;
  }
}
