import React, { useState, useEffect } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CarouselComponent = () => {
  const theme = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample slides data - you can replace with your own images
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop',
      title: 'Latest Agent Mechanism',
      subtitle: 'Anyone Can Become An Agent',
      description: 'Investment • Risk • High Commission'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop',
      title: 'Gaming Excellence',
      subtitle: 'Premium Experience',
      description: 'Play • Win • Enjoy'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop',
      title: 'Join Our Community',
      subtitle: 'Connect & Play',
      description: 'Social • Interactive • Fun'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop',
      title: 'Exclusive Rewards',
      subtitle: 'Earn While You Play',
      description: 'Bonuses • Prizes • Benefits'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '1000px',
        margin: '36px auto',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: theme.shadows[8],
        background: 'linear-gradient(135deg,rgba(252, 195, 130, 0.33) 0%,rgba(217, 143, 91, 0.62) 100%)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Carousel Container */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '250px', sm: '300px', md: '400px' },
          overflow: 'hidden',
        }}
      >
        {/* Slides */}
        {slides.map((slide, index) => (
          <Box
            key={slide.id}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: index === currentSlide ? 1 : 0,
              transform: `translateX(${(index - currentSlide) * 100}%)`,
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <Box sx={{ padding: 3, maxWidth: '600px' }}>
              <Box
                component="h1"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                  fontWeight: 'bold',
                  marginBottom: 1,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                  background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {slide.title}
              </Box>
              <Box
                component="h2"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                  fontWeight: 500,
                  marginBottom: 2,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                }}
              >
                {slide.subtitle}
              </Box>
              <Box
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  opacity: 0.9,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                }}
              >
                {slide.description}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Indicator Dots */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px 0',
          gap: 1,
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              width: currentSlide === index ? '32px' : '12px',
              height: '12px',
              borderRadius: '6px',
              backgroundColor: currentSlide === index 
                ? 'rgba(255,255,255,0.9)' 
                : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: currentSlide === index ? 'scale(1.1)' : 'scale(1)',
              boxShadow: currentSlide === index 
                ? '0 2px 8px rgba(255,255,255,0.3)' 
                : 'none',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.7)',
                transform: 'scale(1.1)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CarouselComponent;