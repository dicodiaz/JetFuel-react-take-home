import { useRef, useState } from 'react';
import { Button, ButtonGroup, Card, Col, OverlayTrigger, Popover } from 'react-bootstrap';
import { FaDownload, FaLink, FaPlay } from 'react-icons/fa';

const Media = ({ media }) => {
  const {
    cover_photo_url: coverPhoto,
    download_url: downloadUrl,
    media_type: mediaType,
    tracking_link: trackingLink,
  } = media;
  const [showPopover, setShowPopover] = useState(false);
  const [timeoutId, setTimeoutId] = useState(false);
  const [play, setPlay] = useState(false);
  const anchorRef = useRef(null);

  const handleLinkButtonClick = () => {
    clearTimeout(timeoutId);
    navigator.clipboard.writeText(trackingLink);
    setShowPopover(true);
    const newTimeoutId = setTimeout(() => setShowPopover(false), 1000);
    setTimeoutId(newTimeoutId);
  };

  const handleDownloadButtonClick = async () => {
    const response = await fetch(
      `https://serene-atoll-43082-edacc091e5a0.herokuapp.com/${downloadUrl}`,
    );
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    anchorRef.current.href = url;
    anchorRef.current.click();
  };

  const handlePlayButtonClick = () => {
    setPlay(true);
  };

  return (
    <Col className="px-2 d-flex flex-column">
      <Card className="w-card mb-1 flex-grow-1">
        {play ? (
          <video controls autoPlay>
            <source src={downloadUrl} type="video/mp4" />
            Sorry, your browser doesn&apos;t support embedded videos.
          </video>
        ) : (
          <>
            <Card.Img src={coverPhoto} alt={coverPhoto} />
            <Card.ImgOverlay className="bg-custom2 d-flex justify-content-center align-items-center">
              {mediaType === 'video' && (
                <FaPlay className="text-white fs-2" onClick={handlePlayButtonClick} />
              )}
            </Card.ImgOverlay>
          </>
        )}
      </Card>
      <ButtonGroup className="w-100">
        <OverlayTrigger
          placement="top"
          show={showPopover}
          overlay={
            <Popover>
              <Popover.Body>Copied tracking link</Popover.Body>
            </Popover>
          }
        >
          <Button
            className="bg-white border-custom1 d-flex justify-content-center align-items-center py-2"
            onClick={handleLinkButtonClick}
          >
            <FaLink className="text-icon fs-5" />
          </Button>
        </OverlayTrigger>
        <Button
          className="bg-white border-custom1 d-flex justify-content-center align-items-center py-2"
          onClick={handleDownloadButtonClick}
        >
          <FaDownload className="text-icon fs-5" />
        </Button>
      </ButtonGroup>
      <a className="invisible" download="video.mp4" ref={anchorRef} />
    </Col>
  );
};

export default Media;
