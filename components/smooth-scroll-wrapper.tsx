"use client";

import React, { useEffect } from 'react';
import useSmoothScroll from "@/hooks/useSmoothScroll";

interface SmoothScrollWrapperProps {
  children: React.ReactNode;
  smoothWrapperId?: string;
  smoothContentId?: string;
}

const SmoothScrollWrapper: React.FC<SmoothScrollWrapperProps> = ({ 
  children, 
  smoothWrapperId = 'smooth-wrapper', 
  smoothContentId = 'smooth-content' 
}) => {
  useSmoothScroll(smoothWrapperId, smoothContentId);

  return (
    <div id={smoothWrapperId} style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <div id={smoothContentId} style={{ width: '100%' }}>
        {children}
      </div>
    </div>
  );
};

export default SmoothScrollWrapper;