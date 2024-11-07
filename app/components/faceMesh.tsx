import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import ml5 from "ml5";

export default function FaceMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animationFrameRef = useRef<number>();
  const [faceMeshModel, setFaceMeshModel] = useState<any>(null);
  const facesRef = useRef<any[]>([]); // Use ref instead of state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastDrawTime = useRef<number>(0);
  const lastDetectionTime = useRef<number>(0);
  const FPS_LIMIT = 30;
  const DETECTION_INTERVAL = 50; // Detection throttling in ms
  const FRAME_DURATION = 1000 / FPS_LIMIT;

  // Cache canvas dimensions
  const dimensions = useMemo(() => ({ width: 1024, height: 768 }), []);
  // 2. Update the styles object to include explicit background properties
  const styles = {
    container: {
      position: "fixed" as const,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 0,
    },
    canvas: {
      background: "transparent",
      backgroundColor: "transparent",
      WebkitBackgroundClip: "padding-box",
      backgroundClip: "padding-box",
      transform: "translateZ(0)", // Force GPU acceleration
      WebkitTransform: "translateZ(0)",
      width: "100%",
      height: "100%",
      maxWidth: "100vw",
      maxHeight: "100vh",
      objectFit: "contain",
    },
  };

  const gotFaces = useCallback((results: any[]) => {
    const now = performance.now();
    if (now - lastDetectionTime.current < DETECTION_INTERVAL) return;

    lastDetectionTime.current = now;
    facesRef.current = results;
  }, []);

  const initializeWebGL = useCallback((canvas: HTMLCanvasElement) => {
    const gl = canvas.getContext("webgl", {
      antialias: false,
      depth: false,
      alpha: false,
      stencil: false,
    });
    return gl;
  }, []);

  // Update the draw function
  const draw = useCallback(() => {
    const now = performance.now();
    const elapsed = now - lastDrawTime.current;

    if (elapsed < 1000 / 30) {
      animationFrameRef.current = requestAnimationFrame(draw);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", {
      alpha: true, // Enable transparency
      desynchronized: true,
    });

    if (!ctx || !videoRef.current) return;

    lastDrawTime.current = now - (elapsed % (1000 / 30));

    // Clear with transparent background
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);
    const faces = facesRef.current;
    if (faces.length > 0) {
      ctx.save();
      ctx.translate(dimensions.width, 0);
      ctx.scale(-1, 1);

      faces.forEach((face) => {
        // Batch all paths
        const linePath = new Path2D();
        const pointsPath = new Path2D();
        const glowPath = new Path2D();

        face.keypoints.forEach((point: any, i: number) => {
          const size = 2 + Math.sin(now / 500 + i * 0.1);

          if (i < face.keypoints.length - 1) {
            const nextPoint = face.keypoints[i + 1];
            linePath.moveTo(point.x, point.y);
            linePath.lineTo(nextPoint.x, nextPoint.y);
          }

          // Add glow effects
          glowPath.moveTo(point.x + size * 3, point.y);
          glowPath.arc(point.x, point.y, size * 3, 0, Math.PI * 2);

          // Add points
          pointsPath.moveTo(point.x + size, point.y);
          pointsPath.arc(point.x, point.y, size, 0, Math.PI * 2);
        });

        // // Draw lines with neon green effect
        // ctx.strokeStyle = "rgba(57, 255, 20, 0.6)";
        // ctx.lineWidth = 1;
        // ctx.stroke(linePath);

        // // Draw glows
        // ctx.fillStyle = "rgba(57, 255, 20, 0.2)";
        // ctx.fill(glowPath);

        // Draw points
        ctx.fillStyle = "rgba(57, 255, 20, 0.8)";
        ctx.fill(pointsPath);
      });

      ctx.restore();
    }

    animationFrameRef.current = requestAnimationFrame(draw);
  }, [dimensions]);

  const startCamera = useCallback(() => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Camera not supported");
      return;
    }

    const video = document.createElement("video");
    Object.assign(video, dimensions, { autoplay: true });
    videoRef.current = video;

    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: dimensions.width },
          height: { ideal: dimensions.height },
        },
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setIsCameraActive(true);
        }
      })
      .catch((error) => setError("Camera access denied"));

    const options = {
      maxFaces: 1,
      refineLandmarks: true,
      flipped: false,
    };

    ml5.faceMesh(options, (model: any) => {
      setFaceMeshModel(model);
      model.detectStart(video, gotFaces);
    });
  }, [dimensions, gotFaces]);

  useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [startCamera]);

  useEffect(() => {
    if (isCameraActive) {
      draw();
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [draw, isCameraActive]);

  return (
    <div style={styles.container}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={
          {
            ...styles.canvas,
            backgroundColor: "rgba(0,0,0,0)",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
          } as React.CSSProperties
        }
      />
    </div>
  );
}
