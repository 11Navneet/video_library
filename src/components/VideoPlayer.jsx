import ReactPlayer from "react-player";
import ReactModal from "react-modal";

function VideoPlayer({ src, isOpen, onClose }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{ content: { padding: 0 } }}
    >
      <ReactPlayer width="100%" height="100%" url={src} controls />
    </ReactModal>
  );
}

export default VideoPlayer;
