import React, { useState } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import './ZoomableGridEditor.css'

interface ZoomableGridEditorProps {
    children: React.ReactNode;
}

function ZoomableGridEditor({ children }: ZoomableGridEditorProps) {
    const [zoom, setZoom] = useState(1);

    const handleZoomIn = () => {
        setZoom((prev) => Math.min(prev + 0.1, 2));
    };

    const handleZoomOut = () => {
        setZoom((prev) => Math.max(prev - 0.1, 0.5));
    };

    return (
        <section className='zoom-section'>
            <article className='zoom'>
                <span>Current Zoom: {Math.round(zoom * 100)}%</span>
                <button 
                    onClick={handleZoomOut} 
                    aria-label='Zoom out'
                >
                    <ZoomOut />
                </button>
                <button 
                    onClick={handleZoomIn} 
                    aria-label='Zoom in'
                >
                    <ZoomIn />
                </button>

            </article>
            <div
                className="grid-editor"
                style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: 'top left'
                }}
            >
                {children}
            </div>
        </section>
    );
};

export default ZoomableGridEditor;
