
      import React from 'react';

      const VideoBackground = () => {
        // Placeholder video URL - replace with an actual concert video URL
        // Ideally, use a short, seamlessly looping clip hosted efficiently (e.g., CDN)
        const videoUrl = "https://res.cloudinary.com/dqtilqeky/video/upload/v1746479384/0505_x6xrnv.mov"; // Placeholder

        return (
          <div className="video-background-container">
            <video autoPlay loop muted playsInline>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-overlay"></div>
          </div>
        );
      };

      export default VideoBackground;
    
