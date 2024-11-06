'use client'
import { useEffect, useRef, useState } from "react";
import faceMesh from "ml5";

export default function FaceMesh() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [faceMeshModel, setFaceMeshModel] = useState(null);
  const [faces, setFaces] = useState([]);

  useEffect(() => {
    // Initialize the webcam video
    const video = document.createElement("video");
    video.width = 640;
    video.height = 480;
    video.autoplay = true;
    videoRef.current = video;

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      video.srcObject = stream;
    });

    // Load the FaceMesh model
    const options = { maxFaces: 1, refineLandmarks: false, flipped: false };
    faceMesh(options, (model) => {
      setFaceMeshModel(model);
      model.detectStart(video, gotFaces);
    });

    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Callback function to update detected faces
  const gotFaces = (results) => {
    setFaces(results);
  };

  // Draw faces on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      faces.forEach((face) => {
        face.keypoints.forEach((keypoint) => {
          ctx.fillStyle = "green";
          ctx.beginPath();
          ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
          ctx.fill();
        });
      });

      requestAnimationFrame(draw);
    };

    if (videoRef.current) {
      draw();
    }
  }, [faces]);

  return (
    <div>
      <canvas ref={canvasRef} width="640" height="480"></canvas>
    </div>
  );
}
