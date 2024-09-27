import React from 'react';

interface EmbedPDFViewerProps {
  pdfUrl: string;
  width?: string | number;
  height?: string | number;
}

const EmbedPDFViewer: React.FC<EmbedPDFViewerProps> = ({
  pdfUrl,
  width = '100%',
  height = '100%',
}) => {
  return (
    <div className="pdf-viewer-container w-full h-full">
      <embed
        src={`/root/Documents/${pdfUrl}`}
        type="application/pdf"
        width={width}
        height={height}
      />
    </div>
  );
};

export default EmbedPDFViewer;
